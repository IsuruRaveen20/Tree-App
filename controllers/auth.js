const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('../utils/logger');

exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    logger.info(`User ${user.email} signed up successfully`);
    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    logger.error(`Error signing up user: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    logger.info(`User ${user.email} signed in successfully`);
    res.json({ token });
  } catch (error) {
    logger.error(`Error signing in user: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};
