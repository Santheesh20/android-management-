const dotenv = require('dotenv');

dotenv.config();

const requiredEnvironmentVariables = [
    'NODE_ENV',
    'PORT',
    'MONGODB_URI',
    'FRONTEND_URL',
    'JWT_ACCESS_SECRET',
    'JWT_REFRESH_SECRET',
    'JWT_ACCESS_EXPIRES_IN',
    'JWT_REFRESH_EXPIRES_IN'
];

for (const variableName of requiredEnvironmentVariables) {
    if (!process.env[variableName]) {
        throw new Error(
            `Missing required environment variable: ${variableName}`
        );
    }
}

const nodeEnv = process.env.NODE_ENV;
const port = Number(process.env.PORT);

const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

const jwtAccessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN;
const jwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN;

const allowedNodeEnvironments = [
    'development',
    'test',
    'production'
];

function parseDurationToMilliseconds(duration) {
    const durationPattern =
        /^(\d+)(s|m|h|d|w)$/;

    const match = duration.match(
        durationPattern
    );

    if (!match) {
        throw new Error(
            `Invalid duration format: ${duration}. Use values such as 30s, 15m, 2h, 7d or 1w`
        );
    }

    const value = Number(match[1]);
    const unit = match[2];

    const millisecondsPerUnit = {
        s: 1000,
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        d: 24 * 60 * 60 * 1000,
        w: 7 * 24 * 60 * 60 * 1000
    };

    return value * millisecondsPerUnit[unit];
}

for (const environment of allowedNodeEnvironments) {
    if (nodeEnv === environment) {
        break;
    }
}

if (!allowedNodeEnvironments.includes(nodeEnv)) {
    throw new Error(
        'NODE_ENV must be one of: development, test, production'
    );
}

if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(
        'PORT must be an integer between 1 and 65535'
    );
}

if (jwtAccessSecret.length < 32) {
    throw new Error(
        'JWT_ACCESS_SECRET must be at least 32 characters long'
    );
}

if (jwtRefreshSecret.length < 32) {
    throw new Error(
        'JWT_REFRESH_SECRET must be at least 32 characters long'
    );
}

if (jwtAccessSecret === jwtRefreshSecret) {
    throw new Error(
        'JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be different'
    );
}

const jwtAccessExpiresInMilliseconds =
    parseDurationToMilliseconds(
        jwtAccessExpiresIn
    );

const jwtRefreshExpiresInMilliseconds =
    parseDurationToMilliseconds(
        jwtRefreshExpiresIn
    );

const mailPort = Number(
    process.env.MAIL_PORT || 587
);

const mailSecure =
    process.env.MAIL_SECURE === 'true';

const env = {
    nodeEnv: nodeEnv,
    port: port,

    mongodbUri: process.env.MONGODB_URI,

    frontendUrl: process.env.FRONTEND_URL,

    jwt: {
        accessSecret: jwtAccessSecret,
        refreshSecret: jwtRefreshSecret,

        accessExpiresIn: jwtAccessExpiresIn,
        refreshExpiresIn: jwtRefreshExpiresIn,

        accessExpiresInMilliseconds:
            jwtAccessExpiresInMilliseconds,

        refreshExpiresInMilliseconds:
            jwtRefreshExpiresInMilliseconds
    },

    mail: {
        host: process.env.MAIL_HOST || '',
        port: mailPort,
        secure: mailSecure,
        user: process.env.MAIL_USER || '',
        password: process.env.MAIL_PASSWORD || '',
        from: process.env.MAIL_FROM || ''
    }
};

module.exports = env;