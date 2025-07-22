const Product = require('../models/product');
const Category = require('../models/category');

exports.showDashboard = async (req, res) => {
  try {
    const searchQuery = (req.query.search || '').trim();
    const filter = { isDeleted: false };

    if (searchQuery) {
      filter.$or = [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
      ];
    }

    const products = await Product.find(filter).populate('category');
    const productCount = await Product.countDocuments({ isDeleted: false });
    const categoryCount = await Category.countDocuments({ isDeleted: false });

    res.render('admin/dashboard', {
      productCount,
      categoryCount,
      products,
      searchQuery,
      messages: req.flash()
    });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Failed to load dashboard');
    res.render('admin/dashboard', {
      productCount: 0,
      categoryCount: 0,
      products: [],
      searchQuery: '',
      messages: req.flash()
    });
  }
};
