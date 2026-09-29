const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 20;

function validatePassword(password) {
    if (typeof password !== 'string') {
        throw new Error('Password must be a string');
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
        throw new Error(
            `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
        );
    }

    if (password.length > MAX_PASSWORD_LENGTH) {
        throw new Error(
            `Password must not exceed ${MAX_PASSWORD_LENGTH} characters`
        );
    }
}

module.exports = {
    MIN_PASSWORD_LENGTH,
    MAX_PASSWORD_LENGTH,
    validatePassword
};
