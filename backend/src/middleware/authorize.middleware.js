
function authorize(...requiredPermissions) {
    // Validate the permissions configured on the route.
    if (
        requiredPermissions.length === 0 ||
        requiredPermissions.some(
            (permission) =>
                typeof permission !== 'string' ||
                permission.trim() === ''
        )
    ) {
        throw new Error(
            'authorize() requires valid permission codes'
        );
    }

    return function authorizeMiddleware(req, res, next) {
        // Authentication middleware must run before authorization.
        if (!req.auth || !req.auth.userId) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        const userPermissions = Array.isArray(
            req.auth.permissions
        )
            ? req.auth.permissions
            : [];

        // Require every permission specified by the route.
        const hasAllPermissions =
            requiredPermissions.every(
                (permission) =>
                    userPermissions.includes(permission)
            );

        if (!hasAllPermissions) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to perform this action'
            });
        }

        return next();
    };
}

module.exports = authorize;
