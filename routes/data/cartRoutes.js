const express = require('express');
const cartController = require('../../controllers/data/cartController');
const router = express.Router();

router.get('/api/cart', cartController.getCart);

module.exports = router;