const rateLimit = require('express-rate-limit');

function createRateLimiter(options) {
    return rateLimit({
        windowMs: options.windowMs,
        limit: options.limit,
        standardHeaders: true,
        legacyHeaders: false,

        handler: function (req, res) {
            res.status(429).json({
                success: false,
                message:
                    'Too many requests. Please try again later.'
            });
        }
    });
}

const globalRateLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 300
});

const loginRateLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 10
});

const refreshRateLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 30
});

const changePasswordRateLimiter =
    createRateLimiter({
        windowMs: 15 * 60 * 1000,
        limit: 5
    });

const registerRateLimiter = createRateLimiter({
    windowMs: 60 * 60 * 1000,
    limit: 5
});

module.exports = {
    globalRateLimiter,
    loginRateLimiter,
    refreshRateLimiter,
    changePasswordRateLimiter,
    registerRateLimiter
};