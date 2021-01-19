const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      
      const token = req.headers.authorization.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ error: 'Request denied' });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } else {
      return res.status(401).json({ error: 'Request denied' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Request denied, Please sign in again!' });
  }
};

// const adminMiddleware = (req, res, next) => {
//   User.findById({ _id: req.user._id }).exec((err, user) => {
//     if (err || !user) {
//       return res.status(400).json({
//         error: "User not found",
//       });
//     }

//     if (user.role !== "admin") {
//       return res.status(400).json({
//         error: "Admin resource. Access denied.",
//       });
//     }

//     req.profile = user;
//     next();
//   });
// };
