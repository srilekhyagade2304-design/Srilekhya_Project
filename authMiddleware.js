const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Not authenticated"
            });
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store user information in request
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = {
    protect
};