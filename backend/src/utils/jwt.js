const jwt = require('jsonwebtoken');

const env = require('../config/env');

function createAccessToken(payload) {
    return jwt.sign(
        {
            ...payload,
            type: 'access'
        },
        env.jwt.accessSecret,
        {
            expiresIn: env.jwt.accessExpiresIn
        }
    );
}

function verifyAccessToken(token) {
    return jwt.verify(
        token,
        env.jwt.accessSecret
    );
}

function createRefreshToken(payload) {
    return jwt.sign(
        {
            ...payload,
            type: 'refresh'
        },
        env.jwt.refreshSecret,
        {
            expiresIn: env.jwt.refreshExpiresIn
        }
    );
}

function verifyRefreshToken(token) {
    return jwt.verify(
        token,
        env.jwt.refreshSecret
    );
}

module.exports = {
    createAccessToken,
    verifyAccessToken,
    createRefreshToken,
    verifyRefreshToken
};