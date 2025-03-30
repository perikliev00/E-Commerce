const express = require('express');
const router = express.Router();

const adminController = require('../../controllers/data/adminController');

router.get('/api/orders', adminController.getAllOrders);
router.delete('/api/orders/:id', adminController.deleteOrder);

module.exports = router;