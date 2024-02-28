// authenticationConfig.js

const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "my_secret_key";

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: "1h" });
    return token;
};

const verifyToken = (req, res, next) => {
    const headerAuthorization = req.header("Authorization");

    if (!headerAuthorization || !headerAuthorization.startsWith("Bearer ")) {
        return res.status(401).json({
            status: "error",
            message: "Access denied. Token not provided.",
        });
    }

    const token = headerAuthorization.replace("Bearer ", "");

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: "error",
                message: "Invalid token.",
            });
        }

        req.userId = decoded.userId;
        next();
    });
};

module.exports = {
    generateToken,
    verifyToken,
};
