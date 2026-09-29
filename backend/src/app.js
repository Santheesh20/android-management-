const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const notFoundMiddleware = require('./middleware/not-found.middleware');
const errorMiddleware = require('./middleware/error.middleware');
const rateLimitMiddleware = require('./middleware/rate-limit.middleware');
const authRoutes = require('./routes/auth.routes');

const env = require('./config/env');

const app = express();

app.use(helmet());

app.use(cors({
    origin: env.frontendUrl,
    credentials: true
}));

app.use(express.json({
    limit: '1mb'
}));

app.use(express.urlencoded({
    extended: true,
    limit: '100kb'
}));

app.use(cookieParser());

app.get('/health', function (req, res) {
    res.status(200).json({
        success: true,
        message: 'TV-Max Connect backend is running'
    });
});

app.use('/api', rateLimitMiddleware.globalRateLimiter);

app.use('/api/v1/auth', authRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;