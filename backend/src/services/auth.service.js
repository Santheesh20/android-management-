const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

require('../models/role.model');

const env = require('../config/env');

const {
    createAccessToken,
    verifyRefreshToken
} = require('../utils/jwt');

const {
    createRefreshTokenForUser
} = require('../utils/refresh-token');

const {
    createRefreshSession,
    findRefreshSession,
    revokeRefreshSession,
    revokeRefreshSessionFamily,
    revokeRefreshSessionsForUser
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
                permissionIds,

            mustChangePassword:
                user.mustChangePassword
        }
    };
}


async function refreshLoginSession(
    refreshToken
) {
    let payload;

    try {
        payload =
            verifyRefreshToken(
                refreshToken
            );
    } catch (error) {
        return {
            success: false,
            reason: 'INVALID_REFRESH_TOKEN'
        };
    }

    if (
        payload.type !== 'refresh' ||
        !payload.sub ||
        !payload.jti ||
        !payload.fid
    ) {
        return {
            success: false,
            reason: 'INVALID_REFRESH_TOKEN'
        };
    }

    const refreshSession =
        await findRefreshSession(
            payload.jti
        );

    if (!refreshSession) {
        return {
            success: false,
            reason: 'REFRESH_SESSION_NOT_FOUND'
        };
    }

    if (
        refreshSession.userId.toString() !==
        payload.sub
    ) {
        return {
            success: false,
            reason: 'INVALID_REFRESH_TOKEN'
        };
    }

    if (
        refreshSession.familyId !==
        payload.fid
    ) {
        return {
            success: false,
            reason: 'INVALID_REFRESH_TOKEN'
        };
    }

    if (refreshSession.revokedAt) {
        await revokeRefreshSessionFamily(
            refreshSession.familyId
        );

        return {
            success: false,
            reason: 'REFRESH_TOKEN_REUSED'
        };
    }

    if (
        refreshSession.expiresAt <=
        new Date()
    ) {
        return {
            success: false,
            reason: 'REFRESH_SESSION_EXPIRED'
        };
    }

    const user =
        await User.findById(
            payload.sub
        ).populate({
            path: 'roleId',
            select:
                'name code permissionIds isActive'
        });

    if (!user) {
        return {
            success: false,
            reason: 'USER_NOT_FOUND'
        };
    }

    if (user.status !== 'active') {
        return {
            success: false,
            reason: 'ACCOUNT_NOT_ACTIVE'
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

    const newRefreshTokenData =
        createRefreshTokenForUser(
            user._id,
            refreshSession.familyId
        );

    const revokedSession =
        await revokeRefreshSession(
            refreshSession.tokenId,
            newRefreshTokenData.tokenId
        );

    if (!revokedSession) {
        await revokeRefreshSessionFamily(
            refreshSession.familyId
        );

        return {
            success: false,
            reason: 'REFRESH_TOKEN_REUSED'
        };
    }

    const expiresAt =
        new Date(
            Date.now() +
            env.jwt
                .refreshExpiresInMilliseconds
        );

    await createRefreshSession({
        userId: user._id,
        familyId:
            newRefreshTokenData.familyId,

        tokenId:
            newRefreshTokenData.tokenId,
        expiresAt: expiresAt
    });

    return {
        success: true,

        accessToken: accessToken,

        refreshToken:
            newRefreshTokenData.token,

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
                permissionIds,

            mustChangePassword:
                user.mustChangePassword
        }
    };
}
async function logoutLoginSession(
    refreshToken
) {
    let payload;

    try {
        payload =
            verifyRefreshToken(
                refreshToken
            );
    } catch (error) {
        return {
            success: true,
            reason: 'INVALID_REFRESH_TOKEN'
        };
    }

    if (
        payload.type !== 'refresh' ||
        !payload.sub ||
        !payload.jti ||
        !payload.fid
    ) {
        return {
            success: true,
            reason: 'INVALID_REFRESH_TOKEN'
        };
    }

    const refreshSession =
        await findRefreshSession(
            payload.jti
        );

    if (!refreshSession) {
        return {
            success: true,
            reason: 'REFRESH_SESSION_NOT_FOUND'
        };
    }

    if (
        refreshSession.userId.toString() !==
        payload.sub
    ) {
        return {
            success: true,
            reason: 'INVALID_REFRESH_TOKEN'
        };
    }

    if (
        refreshSession.familyId !==
        payload.fid
    ) {
        return {
            success: true,
            reason: 'INVALID_REFRESH_TOKEN'
        };
    }

    if (!refreshSession.revokedAt) {
        await revokeRefreshSession(
            refreshSession.tokenId
        );
    }

    return {
        success: true,
        reason: 'LOGOUT_COMPLETED'
    };
}
async function changePassword(
    userId,
    currentPassword,
    newPassword
) {
    const user =
        await User.findById(userId)
            .select('+passwordHash');

    if (!user) {
        return {
            success: false,
            reason: 'USER_NOT_FOUND'
        };
    }

    if (user.status !== 'active') {
        return {
            success: false,
            reason: 'ACCOUNT_NOT_ACTIVE'
        };
    }

    const currentPasswordIsValid =
        await verifyPassword(
            currentPassword,
            user.passwordHash
        );

    if (!currentPasswordIsValid) {
        return {
            success: false,
            reason: 'CURRENT_PASSWORD_INVALID'
        };
    }

    const newPasswordIsSame =
        await verifyPassword(
            newPassword,
            user.passwordHash
        );

    if (newPasswordIsSame) {
        return {
            success: false,
            reason: 'NEW_PASSWORD_SAME_AS_CURRENT'
        };
    }

    const newPasswordHash =
        await bcrypt.hash(
            newPassword,
            12
        );

    user.passwordHash =
        newPasswordHash;

    user.passwordChangedAt =
        new Date();

    user.mustChangePassword =
        false;

    user.temporaryPasswordExpiresAt =
        null;

    user.tokenVersion =
        (user.tokenVersion || 0) + 1;

    await user.save();

    await revokeRefreshSessionsForUser(
        user._id
    );

    return {
        success: true
    };
}

module.exports = {
    verifyPassword,
    findUserForLogin,
    validateUserForLogin,
    getEffectivePermissionIds,
    createLoginSession,
    refreshLoginSession,
    logoutLoginSession,
    changePassword
};
