const express = require('express');
const router = express.Router();
const adminCtrl = require('../controller/admincontroller');

router.get('/', adminCtrl.showDashboard);


router.get('/products/add', (req, res) => {
  res.render('admin/addproduct', {
    categories: [], 
    messages: {}
  });
});

module.exports = router;
