const jwt = require('jsonwebtoken');

//User middleware
exports.userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.spliit(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, token missing" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Not authorized, token invalid or expired" });
  }
};

// Admin only middleware
exports.isAdmin = (req, res, next) => {
  if (req.user?.role !== 'Admin') {
    return res.status(403).json({ message: 'Admin only access' });
  }
  next();
};
