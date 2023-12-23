const jwt = require('jsonwebtoken');
let ConstantCtrl = require('../utils/constants.js');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.send({ success: false, message: 'Not authenticated' });
  }
  const token = authHeader.split('#')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, ConstantCtrl.JWT_SECRET);
    console.log(decodedToken.userId);

  } catch (err) {
    err.statusCode = 500;
    return res.send({ success: false, message: 'Authentication  Failed' });
    throw err;
  }
  if (!decodedToken) {
    error.statusCode = 401;
    res.send({ success: false, message: 'Authentication  Failed' });
  }
  req.userId = decodedToken.userId;
  next();
};
