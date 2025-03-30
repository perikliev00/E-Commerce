const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  notes: {
    type: String,
  },
  items: [
    {
      title: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      _id: {
        type: Schema.Types.ObjectId,
        required: true
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  },{
  collection: 'Orders'
});


module.exports = mongoose.model('Order', orderSchema);