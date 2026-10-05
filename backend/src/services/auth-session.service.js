const RefreshSession = require('../models/refresh-session.model');

async function createRefreshSession(data) {
    const session = await RefreshSession.create({
        userId: data.userId,

        familyId: data.familyId,

        tokenId: data.tokenId,

        expiresAt: data.expiresAt
    });

    return session;
}

async function findRefreshSession(tokenId) {
    return RefreshSession.findOne({
        tokenId: tokenId
    });
}

async function revokeRefreshSession(
    tokenId,
    replacedByTokenId
) {
    const now = new Date();

    const update = {
        revokedAt: now,

        lastUsedAt: now
    };

    if (replacedByTokenId) {
        update.replacedByTokenId =
            replacedByTokenId;
    }

    return RefreshSession.findOneAndUpdate(
        {
            tokenId: tokenId,

            revokedAt: null
        },
        {
            $set: update
        },
        {
            returnDocument: 'after'
        }
    );
}

async function updateRefreshSessionLastUsed(
    tokenId
) {
    return RefreshSession.findOneAndUpdate(
        {
            tokenId: tokenId
        },
        {
            $set: {
                lastUsedAt: new Date()
            }
        },
        {
            returnDocument: 'after'
        }
    );
}

async function revokeRefreshSessionFamily(
    familyId
) {
    return RefreshSession.updateMany(
        {
            familyId: familyId,

            revokedAt: null
        },
        {
            $set: {
                revokedAt: new Date()
            }
        }
    );
}

async function revokeRefreshSessionsForUser(
    userId
) {
    return RefreshSession.updateMany(
        {
            userId: userId,
            revokedAt: null
        },
        {
            $set: {
                revokedAt: new Date()
            }
        }
    );
}

module.exports = {
    createRefreshSession,

    findRefreshSession,

    revokeRefreshSession,

    updateRefreshSessionLastUsed,

    revokeRefreshSessionFamily,

    revokeRefreshSessionsForUser
};