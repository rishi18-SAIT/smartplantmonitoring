// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // No token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info from token
    req.user = decoded.user || decoded;

    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);

    // Token expired
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        msg: "Token expired",
        expired: true,
      });
    }

    // Other token errors
    return res.status(401).json({
      msg: "Invalid token",
      error: err.message,
    });
  }
};

module.exports = authMiddleware;
