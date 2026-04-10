const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  label: { type: String, required: true },
  price: { type: Number, required: true },
});

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: null },
  emoji: { type: String, required: true },
  desc: { type: String, required: true },
  category: {
    type: String,
    enum: ['main', 'protein', 'drinks'],
    required: true,
  },
  image: { type: String, default: '' },
  variants: [variantSchema],
  available: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);