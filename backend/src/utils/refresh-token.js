const crypto = require('crypto');

const {
    createRefreshToken
} = require('./jwt');

function generateRefreshTokenId() {
    return crypto.randomUUID();
}

function generateRefreshTokenFamilyId() {
    return crypto.randomUUID();
}

function createRefreshTokenForUser(
    userId,
    familyId
) {
    const refreshTokenFamilyId =
        familyId || generateRefreshTokenFamilyId();

    const tokenId =
        generateRefreshTokenId();

    const token = createRefreshToken({
        sub: userId.toString(),
        type: 'refresh',
        jti: tokenId,
        fid: refreshTokenFamilyId
    });

    return {
        token: token,
        tokenId: tokenId,
        familyId: refreshTokenFamilyId
    };
}

module.exports = {
    generateRefreshTokenId,
    generateRefreshTokenFamilyId,
    createRefreshTokenForUser
};