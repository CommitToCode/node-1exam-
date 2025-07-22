const express = require('express');
const router = express.Router();
const prodCtrl = require('../controller/productcontroller');
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');
const productSchema = require('../validators/productvalidators');

router.get('/', prodCtrl.listProducts);
router.post('/', upload.single('image'), validate(productSchema), prodCtrl.createProduct);
router.post('/edit/:id', upload.single('image'), validate(productSchema), prodCtrl.updateProduct);
router.post('/delete/:id', prodCtrl.deleteProduct);
router.get('/add', prodCtrl.showAddProductForm);
router.get('/product/:slug', prodCtrl.productDetail);
router.get('/product/id/:id', prodCtrl.productDetail);

module.exports = router;
