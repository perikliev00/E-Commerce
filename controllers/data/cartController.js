const User = require('../../models/User');




exports.getCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.cart || !user.cart.items || user.cart.items.length === 0) {
      return res.status(404).json({ message: 'Cart is empty', cart: [] });
    }

    res.json({ cart: user.cart.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

