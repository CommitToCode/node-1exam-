const Product = require('../models/product');
const Category = require('../models/category');

exports.getHome = async (req, res) => {
  const { category, search } = req.query;
  let query = { isDeleted: false };

  if (category) query.category = category;
  if (search) query.name = { $regex: search, $options: 'i' };

  const products = await Product.find(query).populate('category');
  const categories = await Category.find({ isDeleted: false });

  res.render('customer/home', { products, categories });
};

exports.getProductDetail = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isDeleted: false }).populate('category');
  if (!product) return res.status(404).send('Not Found');
  res.render('customer/detail', { product });
};
