const CpuContent = require('../../models/CpuContent');
const RamContent = require('../../models/RamContent');
const CoresContent = require('../../models/CoresContent');
const CoolingContent = require('../../models/CoolingContent');
const GraphicsCardContent = require('../../models/GraphicsCardContent');
const OtherPartsContent = require('../../models/OtherPartsContent');
const StorageContent = require('../../models/StorageContent');
const PowerSupplyContent = require('../../models/PowerSupplyContent');
const PcCaseContent = require('../../models/PcCaseContent');
const mongoose = require('mongoose');

exports.getProductDetails = async (req, res) => {
  const { id, category } = req.params;
  const objectId = new mongoose.Types.ObjectId(id);
  console.log('Requested product id:', id);
  console.log('Requested category:', category);
  
  let Model;
  switch (category) {
    case 'cpu':
      Model = CpuContent;
      break;
    case 'ram':
      Model = RamContent;
      break;
    case 'cores':
      Model = CoresContent;
      break;
    case 'cooling-systems':
      Model = CoolingContent;
      break;
    case 'graphics-card':
      Model = GraphicsCardContent;
      break;
    case 'other-pc-parts':
      Model = OtherPartsContent;
      break;
    case 'storage':
      Model = StorageContent;
      break;
    case 'power-supply':
      Model = PowerSupplyContent;
      break;
    case 'pc-cases':
      Model = PcCaseContent;
      break;
    default:
      return res.status(400).json({ message: "Invalid category" });
  }

  try {
    const doc = await Model.findOne({ "products._id": objectId });
    if (!doc) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log('Found document:', doc);
    const product = doc.products.id(objectId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (err) {
    console.error("Error fetching product details:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
