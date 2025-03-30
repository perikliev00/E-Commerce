const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productTitle: { type: String, required: true },
  productDescription: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  wattage: { type: String },
  efficiencyRating: { type: String },
  modular: { type: String },
  productDetails: { type: String }
}, { _id: true }); 

const powerSupplyContentSchema = new mongoose.Schema({
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
  collection: 'powersupply'
});

module.exports = mongoose.model('PowerSupplyContent', powerSupplyContentSchema);
