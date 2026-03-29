const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Resend } = require('resend');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const resend = new Resend(process.env.RESEND_API_KEY);
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    phone: String,
    address: String,
    note: String,
  },
  items: [
    {
      name: String,
      emoji: String,
      price: Number,
      qty: Number,
    }
  ],
  total: Number,
  paymentReference: String,
  paymentStatus: { type: String, default: 'pending' },
  status: { type: String, default: 'received' },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

async function sendOrderEmail(order) {
  const itemRows = order.items.map(item =>
    '<tr><td style="padding:8px 12px;">' + item.emoji + ' ' + item.name + '</td><td style="padding:8px 12px;text-align:center;">x' + item.qty + '</td><td style="padding:8px 12px;text-align:right;">N' + (item.price * item.qty).toLocaleString('en-NG') + '</td></tr>'
  ).join('');

  await resend.emails.send({
    from: 'Belle Food <onboarding@resend.dev>',
    to: process.env.ORDER_EMAIL,
    subject: 'New Order from ' + order.customer.name,
    html: '<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#111;color:#fff;border-radius:16px;overflow:hidden;"><div style="background:#E8400A;padding:32px;text-align:center;"><h1 style="margin:0;font-size:2rem;">New Order!</h1><p style="margin:8px 0 0;opacity:0.9;">Belle Food — Someone is hungry</p></div><div style="padding:32px;"><h2 style="color:#F5A623;margin-top:0;">Customer Details</h2><p><strong>Name:</strong> ' + order.customer.name + '</p><p><strong>Phone:</strong> ' + order.customer.phone + '</p><p><strong>Address:</strong> ' + order.customer.address + '</p><h2 style="color:#F5A623;">Order Items</h2><table style="width:100%;border-collapse:collapse;background:#1a1a1a;border-radius:8px;overflow:hidden;"><thead><tr style="background:#E8400A;"><th style="padding:10px 12px;text-align:left;">Item</th><th style="padding:10px 12px;text-align:center;">Qty</th><th style="padding:10px 12px;text-align:right;">Price</th></tr></thead><tbody>' + itemRows + '</tbody></table><div style="margin-top:24px;padding:16px;background:#E8400A;border-radius:8px;text-align:right;"><span style="font-size:1.4rem;font-weight:900;">Total: N' + order.total.toLocaleString('en-NG') + '</span></div><p style="margin-top:16px;color:#888;font-size:0.85rem;">Payment Ref: ' + order.paymentReference + '</p></div></div>',
  });
}

async function sendWhatsAppNotification(order) {
  const itemList = order.items.map(item =>
    item.emoji + ' ' + item.name + ' x' + item.qty + ' = N' + (item.price * item.qty).toLocaleString('en-NG')
  ).join('\n');

  await twilioClient.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM,
    to: process.env.WHATSAPP_TO,
    body: 'NEW ORDER - Belle Food\n\nCustomer: ' + order.customer.name + '\nPhone: ' + order.customer.phone + '\nAddress: ' + order.customer.address + '\n\nItems:\n' + itemList + '\n\nTotal: N' + order.total.toLocaleString('en-NG') + '\nPayment: ' + order.paymentStatus + '\nRef: ' + order.paymentReference,
  });
}

app.get('/', (req, res) => {
  res.json({ message: 'Belle Food backend is running!' });
});

app.post('/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    console.log('New order saved:', order._id);

    try {
      await sendOrderEmail(order);
      console.log('Order email sent');
    } catch (emailErr) {
      console.log('Email failed but order saved:', emailErr.message);
    }

    try {
      await sendWhatsAppNotification(order);
      console.log('WhatsApp notification sent');
    } catch (whatsappErr) {
      console.log('WhatsApp failed but order saved:', whatsappErr.message);
    }

    res.status(201).json({ success: true, orderId: order._id });
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log('Belle Food server running on port ' + PORT);
});