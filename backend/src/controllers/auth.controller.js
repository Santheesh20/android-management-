const {
    validateUserForLogin,
    createLoginSession
} = require('../services/auth.service');

const {
    setRefreshTokenCookie
} = require('../utils/auth-cookie');

const env = require('../config/env');

async function login(req, res, next) {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const validation =
            await validateUserForLogin(
                email,
                password
            );

        if (!validation.success) {
            return res.status(401).json({
                success: false,
                message:
                    'Invalid email or password'
            });
        }

        const loginSession =
            await createLoginSession(
                validation.user
            );

        setRefreshTokenCookie(
            res,
            loginSession.refreshToken
        );

        return res.status(200).json({
            success: true,
            message: 'Login successful',

            data: {
                accessToken:
                    loginSession.accessToken,

                tokenType: 'Bearer',

                expiresIn:
                    env.jwt
                        .accessExpiresInMilliseconds /
                    1000,

                user:
                    loginSession.user
            }
        });
    } catch (error) {
        next(error);
    }
}

async function getMe(req, res, next) {
    try {
        const user = req.user;

        return res.status(200).json({
            success: true,
            message: 'Authenticated user',

            data: {
                user: {
                    id:
                        user._id.toString(),

                    email:
                        user.email,

                    username:
                        user.username,

                    role: {
                        id:
                            user.roleId._id.toString(),

                        name:
                            user.roleId.name,

                        code:
                            user.roleId.code
                    },

                    permissionIds:
                        req.auth.permissionIds,

                    permissions:
                        req.auth.permissions,

                    mustChangePassword:
                        user.mustChangePassword
                }
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    login,
    getMe
};
