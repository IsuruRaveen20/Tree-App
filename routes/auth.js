const express = require('express');
// const { body } = require('express-validator');
const authController = require('../controllers/auth');
// const validators = require('../middlewares/validator');
// const validators = require('../middlewaress/validators');
const { body } = require('express-validator');
// const { validateRequest } = require('../middlewares/validators');

const validators = require('../middlewares/validators');

const router = express.Router();

router.post(
  '/signup',
  [
    body('name').notEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    validators.validateRequest
  ],
  authController.signUp
);

router.post(
  '/signin',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
    validators.validateRequest
  ],
  authController.signIn
);

module.exports = router;

// const express = require('express');
// const { signUp, signIn } = require('../controllers/auth');
// const { validateSignUpData, validateSignInData } = require('../middlewaress/validators');
// const { authenticate } = require('../middlewaress/auth');

// const router = express.Router();

// // Sign up route
// router.post('/signup', validateSignUpData, signUp);

// // Sign in route
// router.post('/signin', validateSignInData, signIn);

// // Example authenticated route
// router.get('/protected', authenticate, (req, res) => {
//   res.json({ message: 'This is a protected route' });
// });

// module.exports = router;
