const {
    validateUserForLogin,
    createLoginSession,
    refreshLoginSession,
    logoutLoginSession,
    changePassword
} = require('../services/auth.service');

const {
    setRefreshTokenCookie,
    getRefreshTokenFromRequest,
    clearRefreshTokenCookie
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


async function refresh(req, res, next) {
    try {
        const refreshToken =
            getRefreshTokenFromRequest(req);

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message:
                    'Refresh token required'
            });
        }

        const refreshResult =
            await refreshLoginSession(
                refreshToken
            );

        if (!refreshResult.success) {
            clearRefreshTokenCookie(res);

            return res.status(401).json({
                success: false,
                message:
                    'Refresh token is invalid or expired'
            });
        }

        setRefreshTokenCookie(
            res,
            refreshResult.refreshToken
        );

        return res.status(200).json({
            success: true,

            message:
                'Token refreshed successfully',

            data: {
                accessToken:
                    refreshResult.accessToken,

                tokenType: 'Bearer',

                expiresIn:
                    env.jwt
                        .accessExpiresInMilliseconds /
                    1000,

                user:
                    refreshResult.user
            }
        });
    } catch (error) {
        next(error);
    }
}


async function logout(req, res, next) {
    try {
        const refreshToken =
            getRefreshTokenFromRequest(req);

        if (refreshToken) {
            await logoutLoginSession(
                refreshToken
            );
        }

        clearRefreshTokenCookie(res);

        return res.status(200).json({
            success: true,

            message:
                'Logout successful'
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

            message:
                'Authenticated user',

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
async function changeUserPassword(
    req,
    res,
    next
) {
    try {
        const userId =
            req.auth.userId;

        const currentPassword =
            req.body.currentPassword;

        const newPassword =
            req.body.newPassword;

        const result =
            await changePassword(
                userId,
                currentPassword,
                newPassword
            );

        if (!result.success) {
            if (
                result.reason ===
                'CURRENT_PASSWORD_INVALID'
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        'Current password is incorrect'
                });
            }

            if (
                result.reason ===
                'NEW_PASSWORD_SAME_AS_CURRENT'
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        'New password must be different from current password'
                });
            }

            if (
                result.reason ===
                'ACCOUNT_NOT_ACTIVE'
            ) {
                return res.status(403).json({
                    success: false,
                    message:
                        'Account is not active'
                });
            }

            return res.status(400).json({
                success: false,
                message:
                    'Unable to change password'
            });
        }

        clearRefreshTokenCookie(res);

        return res.status(200).json({
            success: true,
            message:
                'Password changed successfully. Please log in again.'
        });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    login,
    refresh,
    logout,
    getMe,
    changeUserPassword
};