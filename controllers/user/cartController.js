const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../../models/User'); 

    exports.postCart = async (req, res, next) => {
        try {
          const productTitle = req.body.productTitle;
          const productPrice = req.body.price;
          const product = { title: productTitle, price: productPrice };
          console.log('Adding product to cart:', productTitle, productPrice);
          const user = await User.findById(req.session.user._id);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          await user.addToCart(product);
      
          return res.redirect('/cart');
      
        } catch (err) {
          console.error(err);
          if(err.message === "Cannot read properties of undefined (reading '_id')") {
            return res.redirect('/login');
                    }
          res.status(500).json({ message: 'Server error', error: err.message });
        }
      };

exports.getCart = (req, res, next) => {
  try {
    const filePath = path.join(__dirname, '../../public/views', 'cart.html');
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.deleteProduct = async (req, res, next) => {
    try {
      const productId = req.body.productId;
      console.log('Deleting product from cart:', productId);
  
      const user = await User.findById(req.session.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await user.removeFromCart(productId);
  
      return res.redirect('/cart');
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };