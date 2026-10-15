// Global middleware to handle errors and send appropriate HTTP responses
function errorHandler(err, req, res, next) {
    console.error("Error:", err.message);

    // Authentication errors
    if (err.statusCode === 401) {
        return res.status(401).json({
            success: false,
            message: err.message || "Unauthorized.",
        });
    }

    if (err.statusCode === 409) {
        return res.status(409).json({
            success: false,
            message: err.message || "Conflict.",
        });
    }

    // Generic errors with custom status codes
    if (
        Number.isInteger(err.statusCode) &&
        err.statusCode >= 400 &&
        err.statusCode < 600
    ) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message || "Request failed.",
        });
    }

    // Default fallback
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
}

module.exports = errorHandler;