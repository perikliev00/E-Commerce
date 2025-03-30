const Order = require('../../models/Order');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Unable to fetch orders.' });
  }
};

exports.deleteOrder = async (req, res) => {
    try {
      const orderId = req.params.id;
      await Order.findByIdAndDelete(orderId);
      return res.json({ message: 'Order deleted successfully.' });
    } catch (err) {
      console.error('Error deleting order:', err);
      return res.status(500).json({ message: 'Unable to delete order.' });
    }
  };
