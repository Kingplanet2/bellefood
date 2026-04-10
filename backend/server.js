const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// ─────────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://belle-food.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization' , 'x-admin-password'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────
const ordersRouter = require('./routes/orders');
const menuRouter = require('./routes/menu');

app.use('/api/orders', ordersRouter);
app.use('/api/menu', menuRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Belle Food API is running 🔥', timestamp: new Date() });
});

// ─────────────────────────────────────────────
// CONNECT TO MONGODB
// ─────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Belle Food server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

module.exports = app;
