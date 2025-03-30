const express = require('express');
const router = express.Router();
const isAuth = require('../../middlewares/isAuth');
const authController = require('../../controllers/user/authController');

router.get('/login' ,isAuth,authController.getLogin);
router.get('/register',isAuth,authController.getRegister);

module.exports = router;