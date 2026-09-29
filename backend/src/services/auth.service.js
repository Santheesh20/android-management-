const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
require('../models/role.model');

const env = require('../config/env');

const {
    createAccessToken
} = require('../utils/jwt');

const {
    createRefreshTokenForUser
} = require('../utils/refresh-token');

const {
    createRefreshSession
} = require('./auth-session.service');

async function verifyPassword(
    password,
    passwordHash
) {
    return bcrypt.compare(
        password,
        passwordHash
    );
}

async function findUserForLogin(email) {
    return User.findOne({
        email: email.toLowerCase().trim()
    })
        .select('+passwordHash')
        .populate({
            path: 'roleId',
            select:
                'name code permissionIds isActive'
        });
}

async function validateUserForLogin(
    email,
    password
) {
    const user =
        await findUserForLogin(email);

    if (!user) {
        return {
            success: false,
            reason: 'INVALID_CREDENTIALS'
        };
    }

    if (user.status !== 'active') {
        return {
            success: false,
            reason: 'ACCOUNT_NOT_ACTIVE'
        };
    }

    const passwordIsValid =
        await verifyPassword(
            password,
            user.passwordHash
        );

    if (!passwordIsValid) {
        return {
            success: false,
            reason: 'INVALID_CREDENTIALS'
        };
    }

    if (!user.roleId) {
        return {
            success: false,
            reason: 'ROLE_NOT_ASSIGNED'
        };
    }

    if (!user.roleId.isActive) {
        return {
            success: false,
            reason: 'ROLE_NOT_ACTIVE'
        };
    }

    if (
        user.mustChangePassword &&
        user.temporaryPasswordExpiresAt &&
        user.temporaryPasswordExpiresAt <
            new Date()
    ) {
        return {
            success: false,
            reason:
                'TEMPORARY_PASSWORD_EXPIRED'
        };
    }

    return {
        success: true,
        user: user
    };
}

async function getEffectivePermissionIds(
    user
) {
    const userPermissionIds =
        user.permissionIds || [];

    return userPermissionIds.map(
        function (permissionId) {
            return permissionId.toString();
        }
    );
}

async function createLoginSession(
    user
) {
    const permissionIds =
        await getEffectivePermissionIds(
            user
        );

    const accessToken =
        createAccessToken({
            sub: user._id.toString(),
            tokenVersion:
                user.tokenVersion || 0
        });

    const refreshTokenData =
        createRefreshTokenForUser(
            user._id
        );

    const expiresAt =
        new Date(
            Date.now() +
            env.jwt
                .refreshExpiresInMilliseconds
        );

    await createRefreshSession({
        userId: user._id,
        familyId:
            refreshTokenData.familyId,
        tokenId:
            refreshTokenData.tokenId,
        expiresAt: expiresAt
    });

    user.lastLoginAt =
        new Date();

    await user.save();

    return {
        accessToken: accessToken,

        refreshToken:
            refreshTokenData.token,

        user: {
            id: user._id.toString(),

            email: user.email,

            username: user.username,

            role: {
                id:
                    user.roleId._id.toString(),

                name:
                    user.roleId.name,

                code:
                    user.roleId.code
            },

            permissionIds:
                permissionIds,

            mustChangePassword:
                user.mustChangePassword
        }
    };
}

module.exports = {
    verifyPassword,
    findUserForLogin,
    validateUserForLogin,
    getEffectivePermissionIds,
    createLoginSession
};
