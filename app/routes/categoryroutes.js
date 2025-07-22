const express = require('express');
const router = express.Router();
const catCtrl = require('../controller/categorycontroller');

router.get('/add', catCtrl.showAddForm);


router.post('/', catCtrl.createCategory);


router.get('/', catCtrl.listCategories);
router.get('/edit/:id', catCtrl.showEditForm);
router.post('/edit/:id', catCtrl.updateCategory);
router.post('/delete/:id', catCtrl.deleteCategory);

module.exports = router;
