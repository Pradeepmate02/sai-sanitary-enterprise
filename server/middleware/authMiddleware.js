// server/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Route Guard: Confirms the client is logged in by verifying their JWT Bearer Token.
 */
const protect = async (req, res, next) => {
  let token;

  // Check for Token inside the incoming HTTP Authorization Header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Isolate the token string from the "Bearer <token>" array mapping
      token = req.headers.authorization.split(" ")[1];

      // Decrypt token payload using your master environment secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user profile from MongoDB and attach it to the request object (excluding password hash)
      req.user = await User.findById(decoded.id).select("-password");
      
      return next(); // Let the request proceed to the route controller
    } catch (error) {
      return res.status(401).json({ message: "Authorization failed: Token signature is invalid or expired" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Access Denied: Missing authentication token signature" });
  }
};

/**
 * Role-Based Access Control: Verifies if the authenticated user has Admin status clearance.
 */
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access Forbidden: Enterprise Administrator privileges required" });
  }
};

module.exports = { protect, adminOnly };