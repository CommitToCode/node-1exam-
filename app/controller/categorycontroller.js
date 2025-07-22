const Category = require('../models/category');
const slugify = require('slugify');

exports.listCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isDeleted: false });
    res.render('admin/categories', { categories, messages: req.flash() });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Failed to load categories');
    res.redirect('/admin');
  }
};


exports.showAddForm = (req, res) => {
  res.render('admin/addcategory', { messages: req.flash() });
};




exports.showEditForm = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      req.flash('error_msg', 'Category not found');
      return res.redirect('/admin/categories');
    }
    res.render('admin/editcategory', { category, messages: req.flash() });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Something went wrong');
    res.redirect('/admin/categories');
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = slugify(name, { lower: true });

    // Check if slug exists for non-deleted category
    const exists = await Category.findOne({ slug, isDeleted: false });
    if (exists) {
      req.flash('error', 'Category with this name already exists');
      return res.redirect('/admin/categories');
    }

    await Category.create({ name, slug });
    req.flash('success', 'Category created successfully');
    res.redirect('/admin/categories');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Something went wrong while creating category');
    res.redirect('/admin/categories');
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = slugify(name, { lower: true });

    // Check if slug exists for a different non-deleted category
    const exists = await Category.findOne({ slug, _id: { $ne: req.params.id }, isDeleted: false });
    if (exists) {
      req.flash('error', 'Another category with this name already exists');
      return res.redirect('/admin/categories');
    }

    await Category.findByIdAndUpdate(req.params.id, { name, slug });
    req.flash('success', 'Category updated successfully');
    res.redirect('/admin/categories');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Something went wrong while updating category');
    res.redirect('/admin/categories');
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, { isDeleted: true });
    req.flash('success', 'Category deleted successfully');
    res.redirect('/admin/categories');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Something went wrong while deleting category');
    res.redirect('/admin/categories');
  }
};
