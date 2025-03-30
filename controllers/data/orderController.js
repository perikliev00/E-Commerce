const User = require('../../models/User');
const Order = require('../../models/Order');
const sendOrderConfirmationEmail = require('../../sendEmail/sendEmail');

exports.postOrder = async (req, res, next) => {
  let user = await User.findById(req.session.user._id);
  if (!user) {
    return res.redirect('/login');
  }

  let orderDetails = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    postalCode: req.body.postcode,
    notes: req.body.notes,
    items: req.session.user.cart.items,
    totalPrice: req.session.user.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
  };

  req.session.user.orderDetails = orderDetails;

  await user.clearCart();
  await user.save();
  await Order.create(orderDetails);

  sendOrderConfirmationEmail(orderDetails.email, JSON.stringify(orderDetails));

  console.log("Test");
  console.log(orderDetails);
  res.redirect('/');
};
////////////