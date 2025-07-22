const express = require('express');
const router = express.Router();
const custCtrl = require('../controller/customercontroller');

router.get('/', custCtrl.getHome);
router.get('/product/:slug', custCtrl.getProductDetail);

module.exports = router;
