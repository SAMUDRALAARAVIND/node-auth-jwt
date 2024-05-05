const jwt = require("jsonwebtoken");

const secretKey = "AravindSamudralaInstructorAcciojob";

function authenticate(req, resp, next) {
    try {
        const token = req.headers["authorization"].slice(8);
        jwt.verify(token, secretKey, (error, user) => {
            if (error) {
                resp.status(403).json({ message: error.message });
                return;
            }
            req.user = user;
            next();
        });
    }
    catch (error) {
        resp.status(401).json({ message: "You don't have access" })
    }
}

function generateTokenByUserId(userId) {
    return jwt.sign({ userId }, secretKey, { expiresIn: '10d' })
}

module.exports = { authenticate, generateTokenByUserId };