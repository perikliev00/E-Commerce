const express = require('express');
const router = express.Router();
const productController = require('../../controllers/data/productController');
const productDetailsController = require('../../controllers/data/productDetailsController');

router.get('/api/productDetails/:id/:category', productDetailsController.getProductDetails);
router.get('/api/home', productController.getHomeContent);
router.get('/api/cpus', productController.getCpus);
router.get('/api/cooling', productController.getCooling);
router.get('/api/ram', productController.getRam);
router.get('/api/cores', productController.getCores);
router.get('/api/other-pc-parts', productController.getOtherParts);
router.get('/api/graphics-card', productController.getGraphicsCard);
router.get('/api/storage', productController.getStorage);
router.get('/api/power-supply', productController.getPowerSupply);
router.get('/api/pc-cases', productController.getPcCases);


module.exports = router;  