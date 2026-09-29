const express = require('express');

const authController =
    require('../controllers/auth.controller');

const {
    validateLoginRequest
} = require('../validators/auth.validator');

const {
    loginRateLimiter
} = require('../middleware/rate-limit.middleware');

const {
    authenticate
} = require('../middleware/auth.middleware');

const router = express.Router();

router.post(
    '/login',
    loginRateLimiter,
    validateLoginRequest,
    authController.login
);

router.get(
    '/me',
    authenticate,
    authController.getMe
);

module.exports = router;
