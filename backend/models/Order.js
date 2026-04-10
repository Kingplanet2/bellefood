const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  emoji: { type: String, default: '🍛' },
});

const orderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  paystackRef: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ['received', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'received',
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);