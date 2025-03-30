const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productTitle: { type: String, required: true },
  productDescription: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  capacity: { type: String },
  memoryType: { type: String },
  frequency: { type: String },
  productDetails: { type: String }
}, { _id: true }); 

const ramContentSchema = new mongoose.Schema({
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
  collection: 'ram'
});

module.exports = mongoose.model('RamContent', ramContentSchema);
