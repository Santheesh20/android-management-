const crypto = require('crypto');
const CSRF_COOKIE_NAME =
    'tv_max_csrf_token';

const CSRF_HEADER_NAME =
    'x-csrf-token';

const CSRF_COOKIE_OPTIONS = {
    httpOnly: false,
    secure:
        process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
};

function generateCsrfToken() {
    return crypto.randomBytes(32).toString('hex');
}

function setCsrfCookie(
    res,
    token
) {
    res.cookie(
        CSRF_COOKIE_NAME,
        token,
        {
            ...CSRF_COOKIE_OPTIONS
        }
    );
}

function getCsrfTokenFromCookie(req) {
    return (
        req.cookies &&
        req.cookies[CSRF_COOKIE_NAME]
    ) || null;
}

function getCsrfTokenFromHeader(req) {
    const token =
        req.headers[CSRF_HEADER_NAME];

    if (
        typeof token !== 'string' ||
        !token
    ) {
        return null;
    }
    return token;
}

function tokensMatch(
    cookieToken,
    headerToken
) {
    if (
        !cookieToken ||
        !headerToken
    ) {
        return false;
    }

    const cookieBuffer =
        Buffer.from(
            cookieToken,
            'utf8'
        );

    const headerBuffer =
        Buffer.from(
            headerToken,
            'utf8'
        );

    if (
        cookieBuffer.length !==
        headerBuffer.length
    ) {
        return false;
    }

    return crypto.timingSafeEqual(
        cookieBuffer,
        headerBuffer
    );
}

function csrfProtection(
    req,
    res,
    next
) {
    const cookieToken =
        getCsrfTokenFromCookie(req);

    const headerToken =
        getCsrfTokenFromHeader(req);

    if (
        !tokensMatch(
            cookieToken,
            headerToken
        )
    ) {
        return res.status(403).json({
            success: false,
            message:
                'Invalid CSRF token'
        });
    }
    next();
}

function issueCsrfToken(
    req,
    res
) {
    const token =
        generateCsrfToken();

    setCsrfCookie(
        res,
        token
    );

    return res.status(200).json({
        success: true,

        message:
            'CSRF token generated',

        data: {
            csrfToken: token
        }
    });
}


module.exports = {
    CSRF_COOKIE_NAME,

    CSRF_HEADER_NAME,

    generateCsrfToken,

    setCsrfCookie,

    getCsrfTokenFromCookie,

    getCsrfTokenFromHeader,

    csrfProtection,

    issueCsrfToken
};