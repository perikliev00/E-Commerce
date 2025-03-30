const express = require('express');
const router = express.Router();
const isAuthOrder = require('../../middlewares/isAuthOrder');
const orderController = require('../../controllers/user/orderController');
const orderDetailsMiddleware = require('../../middlewares/orderDetails');
router.get('/order-details',isAuthOrder,orderDetailsMiddleware,orderController.getOrderDetails);

module.exports = router;