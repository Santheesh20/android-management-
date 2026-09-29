const User = require('../models/user.model');
const Permission = require('../models/permission.model');

require('../models/role.model');

const {
    verifyAccessToken
} = require('../utils/jwt');

function sendUnauthorized(res) {
    return res.status(401).json({
        success: false,
        message: 'Authentication required'
    });
}

async function authenticate(req, res, next) {
    try {
        const authorizationHeader =
            req.headers.authorization;

        if (
            !authorizationHeader ||
            typeof authorizationHeader !== 'string'
        ) {
            return sendUnauthorized(res);
        }

        const parts =
            authorizationHeader.trim().split(/\s+/);

        if (
            parts.length !== 2 ||
            parts[0].toLowerCase() !== 'bearer' ||
            !parts[1]
        ) {
            return sendUnauthorized(res);
        }

        const token = parts[1];

        let payload;

        try {
            payload =
                verifyAccessToken(token);
        } catch (error) {
            return sendUnauthorized(res);
        }

        if (
            payload.type !== 'access' ||
            !payload.sub
        ) {
            return sendUnauthorized(res);
        }

        const user =
            await User.findById(payload.sub)
                .populate({
                    path: 'roleId',
                    select:
                        'name code permissionIds isActive'
                });

        if (!user) {
            return sendUnauthorized(res);
        }

        if (user.status !== 'active') {
            return sendUnauthorized(res);
        }

        if (
            !user.roleId ||
            !user.roleId.isActive
        ) {
            return sendUnauthorized(res);
        }

        const currentTokenVersion =
            user.tokenVersion || 0;

        const tokenVersion =
            payload.tokenVersion;

        if (
            tokenVersion !==
            currentTokenVersion
        ) {
            return sendUnauthorized(res);
        }

        const permissionIds =
            user.permissionIds || [];

        const permissions =
            await Permission.find({
                _id: {
                    $in: permissionIds
                },
                isActive: true
            }).select(
                'code'
            );

        const permissionCodes =
            permissions.map(
                function (permission) {
                    return permission.code;
                }
            );

        req.auth = {
            userId:
                user._id.toString(),

            role: {
                id:
                    user.roleId._id.toString(),

                name:
                    user.roleId.name,

                code:
                    user.roleId.code
            },

            permissions:
                permissionCodes,

            permissionIds:
                permissionIds.map(
                    function (permissionId) {
                        return permissionId.toString();
                    }
                ),

            scope: null,

            mustChangePassword:
                user.mustChangePassword
        };

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    authenticate
};
