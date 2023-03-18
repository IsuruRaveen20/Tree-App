const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const { body } = require('express-validator');
const { validateRequest } = require('../middlewares/validators');

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];

  validateRequest(req, res, () => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      logger.error(`Error verifying JWT token: ${error.message}`);
      return res.status(401).json({ message: 'Invalid token' });
    }
  });
};

module.exports = authenticateUser;

// const jwt = require('jsonwebtoken');
// const logger = require('../utils/logger');
// const { body } = require('express-validator');
// const { validateRequest } = require('../middlewares/validators');


// module.exports = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ message: 'Authorization header is missing' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     logger.error(`Error verifying JWT token: ${error.message}`);
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };


// module.exports = authenticateUser;
