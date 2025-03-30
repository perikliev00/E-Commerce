const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/user/adminController');
const isAuthAdmin = require('../../middlewares/isAuthAdmin');

router.get('/admin', isAuthAdmin , adminController.getAdmin);

module.exports = router;