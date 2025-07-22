const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  description: { type: String },
  image: { type: String },
  isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Product', productSchema);
