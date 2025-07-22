const Product = require('../models/product');
const Category = require('../models/category');
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

// exports.listProducts = async (req, res) => {
//   const products = await Product.find({ isDeleted: false }).populate('category');
//   const categories = await Category.find({ isDeleted: false });
//   res.render('admin/products', { products, categories });
// };

exports.listProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = { isDeleted: false };

    if (category) {
      filter.category = category;
    }
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    const products = await Product.find(filter).populate('category');
    const categories = await Category.find({ isDeleted: false });

    res.render('admin/products', { products, categories, selectedCategory: category || '', searchQuery: search || '', messages: req.flash() });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Failed to load products');
    res.redirect('/admin/products');
  }
};



exports.showAddProductForm = async (req, res) => {
  try {
    const categories = await Category.find({ isDeleted: false });
    res.render('admin/addproduct', { categories, messages: req.flash() });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Failed to load categories');
    res.redirect('/admin/products');
  }
};






exports.createProduct = async (req, res) => {
  const { name, description, category } = req.body;
  const image = req.file?.filename;
  await Product.create({
    name,
    slug: slugify(name, { lower: true }),
    description,
    category,
    image,
  });
  req.flash('success', 'Product added');
  res.redirect('/admin/products');
};

exports.updateProduct = async (req, res) => {
  const { name, description, category } = req.body;
  const product = await Product.findById(req.params.id);
  if (req.file) {
    fs.unlinkSync(path.join('uploads', product.image));
    product.image = req.file.filename;
  }
  product.name = name;
  product.slug = slugify(name, { lower: true });
  product.description = description;
  product.category = category;
  await product.save();
  req.flash('success', 'Product updated');
  res.redirect('/admin/products');
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  fs.unlinkSync(path.join('uploads', product.image));
  await Product.findByIdAndUpdate(req.params.id, { isDeleted: true });
  req.flash('success', 'Product deleted');
  res.redirect('/admin/products');
};


exports.productDetail = async (req, res) => {
  try {
    const { slug, id } = req.params;
    let product;

    if (slug) {
      product = await Product.findOne({ slug, isDeleted: false }).populate('category');
    } else if (id) {
      product = await Product.findById(id).populate('category');
    }

    if (!product) {
      req.flash('error', 'Product not found');
      return res.redirect('/admin/products');
    }

    res.render('productdetail', { product });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Something went wrong');
    res.redirect('/admin/products');
  }
};
