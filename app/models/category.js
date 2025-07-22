const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true }, 
  isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Category', categorySchema);
