function errorMiddleware(error, req, res, next) {
    const statusCode = error.statusCode || error.status || 500;

    if (statusCode >= 500) {
        console.error('Internal server error:', error);
    }

    if (error.type === 'entity.too.large') {
        return res.status(413).json({
            success: false,
            message: 'Request body is too large'
        });
    }

    if (error.type === 'entity.parse.failed') {
        return res.status(400).json({
            success: false,
            message: 'Invalid JSON request body'
        });
    }

    if (statusCode >= 400 && statusCode < 500) {
        return res.status(statusCode).json({
            success: false,
            message: error.message || 'Request could not be processed'
        });
    }

    return res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
}

module.exports = errorMiddleware;