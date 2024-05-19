const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

exports.register = async (req, res) => {
  const { email_address, user_name, password, passwordConfirm } = req.body;
  try {
    if (password !== passwordConfirm) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email_address,
      user_name,
      password: hashedPassword
    });

    const token = jwt.sign({ userId: user.user_id }, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });

    res.status(201).json({
      message: 'User created',
      token,
      user
    });

  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

exports.login = async (req, res) => {
  const { user_name, password } = req.body;
  try {
    const user = await User.findOne({ where: { user_name } });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user.user_id }, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

exports.logout = (req, res) => {
  res.json({ message: 'Logout successful' });
};

exports.authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
