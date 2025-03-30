const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productTitle: { type: String, required: true },
  productDescription: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  memory: { type: String },
  memoryInterface: { type: String },
  boostClock: { type: String },
  TDP: { type: String },
  connectivity: { type: String },
  productDetails: { type: String }
}, { _id: true }); 

const graphicsCardContentSchema = new mongoose.Schema({
  descriptionTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  products: [ productSchema ]
}, {
  collection: 'graphicscards'
});

module.exports = mongoose.model('GraphicsCardContent', graphicsCardContentSchema);