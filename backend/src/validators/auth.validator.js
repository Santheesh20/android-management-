function validateLoginRequest(req, res, next) {
    const body = req.body || {};

    const email =
        typeof body.email === 'string'
            ? body.email.trim().toLowerCase()
            : '';

    const password =
        typeof body.password === 'string'
            ? body.password
            : '';

    const errors = [];

    if (!email) {
        errors.push({
            field: 'email',
            message: 'Email is required'
        });
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
        errors.push({
            field: 'email',
            message: 'Email format is invalid'
        });
    }

    if (!password) {
        errors.push({
            field: 'password',
            message: 'Password is required'
        });
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    req.body.email = email;

    next();
}

function validateChangePasswordRequest(
    req,
    res,
    next
) {
    const body = req.body || {};

    const currentPassword =
        typeof body.currentPassword === 'string'
            ? body.currentPassword
            : '';

    const newPassword =
        typeof body.newPassword === 'string'
            ? body.newPassword
            : '';

    const errors = [];

    if (!currentPassword) {
        errors.push({
            field: 'currentPassword',
            message: 'Current password is required'
        });
    }

    if (!newPassword) {
        errors.push({
            field: 'newPassword',
            message: 'New password is required'
        });
    } else if (newPassword.length < 8) {
        errors.push({
            field: 'newPassword',
            message:
                'New password must be at least 8 characters long'
        });
    } else if (newPassword.length > 20) {
        errors.push({
            field: 'newPassword',
            message:
                'New password must not exceed 20 characters'
        });
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    next();
}

module.exports = {
    validateLoginRequest,
    validateChangePasswordRequest
};
