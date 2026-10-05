const express = require('express');

const authController =
    require('../controllers/auth.controller');

const {
    validateLoginRequest,
    validateChangePasswordRequest
} = require('../validators/auth.validator');

const {
    loginRateLimiter,
    refreshRateLimiter,
    changePasswordRateLimiter
} = require('../middleware/rate-limit.middleware');

const {
    csrfProtection,
    issueCsrfToken
} = require('../middleware/csrf.middleware');

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
    '/csrf',
    issueCsrfToken
);

router.post(
    '/refresh',
    refreshRateLimiter,
    csrfProtection,
    authController.refresh
);

router.post(
    '/logout',
    refreshRateLimiter,
    csrfProtection,
    authController.logout
);

router.get(
    '/me',
    authenticate,
    authController.getMe
);

router.post(
    '/change-password',
    changePasswordRateLimiter,
    authenticate,
    validateChangePasswordRequest,
    authController.changeUserPassword
);

module.exports = router;