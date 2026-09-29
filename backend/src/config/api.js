const API_VERSION = 'v1';

const API_PREFIX = `/api/${API_VERSION}`;

const AUTH_BASE_PATH = `${API_PREFIX}/auth`;

const API_ROUTES = {
    auth: {
        login: `${AUTH_BASE_PATH}/login`,
        refresh: `${AUTH_BASE_PATH}/refresh`,
        logout: `${AUTH_BASE_PATH}/logout`,
        me: `${AUTH_BASE_PATH}/me`,
        changePassword:
            `${AUTH_BASE_PATH}/change-password`
    }
};

module.exports = {
    API_VERSION,
    API_PREFIX,
    AUTH_BASE_PATH,
    API_ROUTES
};
