const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: 'Validation failed.',
        errors: errors.array()
      });
    }
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(422).json({ message: 'E-Mail address already exists!' });
    }
    const email = req.body.email;
    const password = req.body.password;
    const hashPw = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashPw });
    await user.save();
    res.status(201).json({ message: 'User created!', userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: 'A user with this email could not be found.' });
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(401).json({ message: 'Wrong password!' });
    }
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save(err => {
      if (err) {
        console.error('Session save error:', err);
        return res
          .status(500)
          .json({ message: 'Session save failed', error: err.message });
      }
      res.status(200).json({
        message: 'Logged in successfully',
        user: { email: user.email, _id: user._id }
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
exports.logout = async (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) {
        console.error('Session destroy error:', err);
        return res
          .status(500)
          .json({ message: 'Session destroy failed', error: err.message });
      }
      res.status(200).json({ message: 'Logged out successfully' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}