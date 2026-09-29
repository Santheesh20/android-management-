const env = require('../config/env');

const REFRESH_TOKEN_COOKIE_NAME =
    'tv_max_refresh_token';

const REFRESH_TOKEN_COOKIE_PATH =
    '/api/v1/auth';

function getRefreshTokenCookieOptions() {
    return {
        httpOnly: true,

        secure:
            env.nodeEnv === 'production',

        sameSite: 'lax',

        path: REFRESH_TOKEN_COOKIE_PATH,

        maxAge:
    env.jwt.refreshExpiresInMilliseconds
    };
}

function setRefreshTokenCookie(res, refreshToken) {
    res.cookie(
        REFRESH_TOKEN_COOKIE_NAME,
        refreshToken,
        getRefreshTokenCookieOptions()
    );
}

function clearRefreshTokenCookie(res) {
    res.clearCookie(
        REFRESH_TOKEN_COOKIE_NAME,
        {
            httpOnly: true,

            secure:
                env.nodeEnv === 'production',

            sameSite: 'lax',

            path: REFRESH_TOKEN_COOKIE_PATH
        }
    );
}

function getRefreshTokenFromRequest(req) {
    return req.cookies[
        REFRESH_TOKEN_COOKIE_NAME
    ] || null;
}

module.exports = {
    REFRESH_TOKEN_COOKIE_NAME,
    REFRESH_TOKEN_COOKIE_PATH,
    getRefreshTokenCookieOptions,
    setRefreshTokenCookie,
    clearRefreshTokenCookie,
    getRefreshTokenFromRequest
};