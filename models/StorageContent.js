const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productTitle: { type: String, required: true },
  productDescription: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  storageType: { type: String },
  capacity: { type: String },
  interface: { type: String },
  productDetails: { type: String }
}, { _id: true }); 

const storageContentSchema = new mongoose.Schema({
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
  collection: 'storage'
});

module.exports = mongoose.model('StorageContent', storageContentSchema);
