const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  'product-title': {
    type: String,
    required: true
  },
  'product-description': {
    type: String,
    required: true
  }
}, { _id: false });

const homeContentSchema = new mongoose.Schema({
    'description-title': {
      type: String,
      required: true
    },
    'description': {
      type: String,
      required: true
    },
    'products': {
      type: [productSchema],
      default: []
    }
  }, { collection: 'products' }); 
  
  module.exports = mongoose.model('HomeContent', homeContentSchema);