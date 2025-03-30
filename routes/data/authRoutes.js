const express = require('express');
const { body } = require('express-validator');
const User = require('../../models/User');
const router = express.Router();
const authController = require('../../controllers/data/authController');

router.get('/session-status', (req, res) => {
    if (req.session.user) {
      return res.json({
        isLoggedIn: true,
        email: req.session.user.email,
      });
    } else {
      return res.json({ isLoggedIn: false });
    }
  });

router.post('/signup-api',[
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, {req}) => {
        return User.findOne({email: value})
        .then(userDoc => {
            if (userDoc) {
                return Promise.reject('E-Mail address already exists!');
            }
        });
    })
    .normalizeEmail(),
    body('password')
    .trim()
    .isLength({min: 5}),
],authController.signup);

router.post('/login-api',authController.login);

router.post('/logout',authController.logout);

module.exports = router;