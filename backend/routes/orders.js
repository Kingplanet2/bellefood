const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { verifyAdmin } = require('../middleware/auth');
const { Resend } = require('resend');
const twilio = require('twilio');

const resend = new Resend(process.env.RESEND_API_KEY);
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// ── EMAIL NOTIFICATION ──────────────────────────────────
async function sendOrderEmail(order) {
  const itemRows = order.items.map(item =>
    '<tr><td style="padding:8px 12px;">' + item.emoji + ' ' + item.name + '</td><td style="padding:8px 12px;text-align:center;">x' + item.qty + '</td><td style="padding:8px 12px;text-align:right;">N' + (item.price * item.qty).toLocaleString('en-NG') + '</td></tr>'
  ).join('');

  await resend.emails.send({
    from: 'Belle Food <onboarding@resend.dev>',
    to: process.env.ORDER_EMAIL,
    subject: 'New Order from ' + order.customer.name,
    html: '<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#111;color:#fff;border-radius:16px;overflow:hidden;"><div style="background:#E8400A;padding:32px;text-align:center;"><h1 style="margin:0;font-size:2rem;">New Order!</h1><p style="margin:8px 0 0;opacity:0.9;">Belle Food</p></div><div style="padding:32px;"><h2 style="color:#F5A623;margin-top:0;">Customer</h2><p><strong>Name:</strong> ' + order.customer.name + '</p><p><strong>Phone:</strong> ' + order.customer.phone + '</p><p><strong>Address:</strong> ' + order.customer.address + '</p><h2 style="color:#F5A623;">Items</h2><table style="width:100%;border-collapse:collapse;background:#1a1a1a;border-radius:8px;overflow:hidden;"><thead><tr style="background:#E8400A;"><th style="padding:10px 12px;text-align:left;">Item</th><th style="padding:10px 12px;text-align:center;">Qty</th><th style="padding:10px 12px;text-align:right;">Price</th></tr></thead><tbody>' + itemRows + '</tbody></table><div style="margin-top:24px;padding:16px;background:#E8400A;border-radius:8px;text-align:right;"><span style="font-size:1.4rem;font-weight:900;">Total: N' + order.total.toLocaleString('en-NG') + '</span></div><p style="margin-top:16px;color:#888;font-size:0.85rem;">Ref: ' + order.paystackRef + '</p></div></div>',
  });
}

// ── WHATSAPP NOTIFICATION ───────────────────────────────
async function sendWhatsAppNotification(order) {
  const itemList = order.items.map(item =>
    item.emoji + ' ' + item.name + ' x' + item.qty + ' = N' + (item.price * item.qty).toLocaleString('en-NG')
  ).join('\n');

  await twilioClient.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM,
    to: process.env.WHATSAPP_TO,
    body: 'NEW ORDER - Belle Food\n\nCustomer: ' + order.customer.name + '\nPhone: ' + order.customer.phone + '\nAddress: ' + order.customer.address + '\n\nItems:\n' + itemList + '\n\nTotal: N' + order.total.toLocaleString('en-NG') + '\nRef: ' + order.paystackRef,
  });
}

// ─────────────────────────────────────────────
// POST /api/orders — Create new order
// ─────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { customer, items, total, paystackRef, status } = req.body;

    if (!customer || !items || !total || !paystackRef) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const order = new Order({
      customer,
      items,
      total,
      paystackRef,
      status: status || 'received',
    });

    await order.save();
    console.log('New order saved:', order._id);

    try {
      await sendOrderEmail(order);
      console.log('Order email sent');
    } catch (emailErr) {
      console.log('Email failed:', emailErr.message);
    }

    try {
      await sendWhatsAppNotification(order);
      console.log('WhatsApp sent');
    } catch (whatsappErr) {
      console.log('WhatsApp failed:', whatsappErr.message);
    }

    res.status(201).json(order);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Order already exists' });
    }
    console.error('Create order error:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// ─────────────────────────────────────────────
// GET /api/orders — Get all orders (Admin only)
// ─────────────────────────────────────────────
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Get orders error:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// ─────────────────────────────────────────────
// GET /api/orders/:id — Get single order
// ─────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// ─────────────────────────────────────────────
// PATCH /api/orders/:id/status — Update order status (Admin only)
// ─────────────────────────────────────────────
router.patch('/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['received', 'preparing', 'ready', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error('Update status error:', err);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// ─────────────────────────────────────────────
// DELETE /api/orders/:id — Delete order (Admin only)
// ─────────────────────────────────────────────
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

module.exports = router;