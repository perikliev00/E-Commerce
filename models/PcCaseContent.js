const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productTitle: { type: String, required: true },
  productDescription: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  formFactorSupport: { type: String },
  material: { type: String },
  dimensions: { type: String },
  productDetails: { type: String }
}, { _id: true }); 

const pcCaseContentSchema = new mongoose.Schema({
  descriptionTitle: { type: String, required: true },
  description: { type: String, required: true },
  products: [productSchema]  
}, {
  collection: 'pccases'
});

module.exports = mongoose.model('PcCaseContent', pcCaseContentSchema);