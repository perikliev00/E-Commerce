const express = require('express');
const router = express.Router();
const productController = require('../../controllers/user/productController');
router.get('/', productController.getHome);
router.get('/cpu', productController.getCpus);
router.get('/cooling-systems', productController.getCooling);
router.get('/ram', productController.getRam);
router.get('/cores', productController.getCores);
router.get('/other-pc-parts', productController.getOtherParts);
router.get('/graphics-card', productController.getGraphicsCard);
router.get('/storage', productController.getStorage);
router.get('/power-supply', productController.getPowerSupply);
router.get('/pc-cases', productController.getPcCases);
router.get('/productDetails/:id', productController.getProductDetails);

module.exports = router;