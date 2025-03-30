const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productTitle: { type: String, required: true },
  productDescription: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  formFactor: { type: String },
  chipset: { type: String },
  socket: { type: String },
  memorySupport: { type: String },
  wattage: { type: String },
  efficiencyRating: { type: String },
  modular: { type: String },
  formFactorSupport: { type: String },
  material: { type: String },
  dimensions: { type: String },
  storageType: { type: String },
  capacity: { type: String },
  interface: { type: String },
  fanSize: { type: String },
  rpm: { type: String },
  noiseLevel: { type: String },
  driveType: { type: String },
  readSpeed: { type: String },
  writeSpeed: { type: String },
  productDetails: { type: String }
}, { _id: true }); 

const otherPartsContentSchema = new mongoose.Schema({
  descriptionTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  products: [productSchema]
}, {
  collection: 'otherpcparts'
});

module.exports = mongoose.model('OtherPartsContent', otherPartsContentSchema);
