const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productTitle: { type: String, required: true },
  productDescription: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  cores: { type: Number },
  baseClock: { type: String },
  boostClock: { type: String },
  cache: { type: String },
  TDP: { type: String },
  socket: { type: String },
  productDetails: { type: String }
}, { _id: true }); 

const coresContentSchema = new mongoose.Schema({
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
  collection: 'cores'
});

module.exports = mongoose.model('CoresContent', coresContentSchema);
