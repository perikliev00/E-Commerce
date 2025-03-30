const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productTitle: { type: String, required: true },
  productDescription: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  coolingType: { type: String },
  fanSize: { type: String },
  noiseLevel: { type: String },
  rpm: { type: String },
  radiatorSize: { type: String },
  productDetails: { type: String }
}, { _id: true });  

const coolingContentSchema = new mongoose.Schema({
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
  collection: 'cooling'
});

module.exports = mongoose.model('CoolingContent', coolingContentSchema);