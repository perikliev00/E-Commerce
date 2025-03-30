const express = require('express');
const router = express.Router();

const cartController = require('../../controllers/user/cartController');

router.post('/postCart', cartController.postCart);
router.get('/cart', cartController.getCart);
router.post('/cartDeleteProduct', cartController.deleteProduct);

module.exports = router;  