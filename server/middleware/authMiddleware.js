exports.requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    // User is authenticated, proceed to next middleware/route handler
    next();
  } else {
    // User is not authenticated
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: No active session'
    });
  }
};
