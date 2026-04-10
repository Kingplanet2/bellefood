const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const MenuItem = require('../models/MenuItem');
const { verifyAdmin } = require('../middleware/auth');

// ─────────────────────────────────────────────
// MULTER — Handle image uploads
// ─────────────────────────────────────────────
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (isValid) cb(null, true);
    else cb(new Error('Only images are allowed'));
  },
});

// ─────────────────────────────────────────────
// DEFAULT MENU DATA — Seeds database if empty
// ─────────────────────────────────────────────
const defaultMenuItems = [
  // MAIN MEALS
  { name:'Party Jollof Rice', price:4000, emoji:'🍛', desc:'The classic smoky, tomato-rich party jollof.', category:'main', order:1 },
  { name:'Jollof Rice & Beans', price:4000, emoji:'🥘', desc:'Comforting combo of jollof & protein-packed beans.', category:'main', order:2 },
  { name:'Village Rice', price:5500, emoji:'🌾', desc:'Old-school village-style palm oil rice.', category:'main', order:3 },
  { name:'White Rice & Beans', price:4500, emoji:'🍚', desc:'Steamed white rice paired with seasoned beans.', category:'main', order:4 },
  { name:'Spicy Spaghetti', price:4000, emoji:'🍝', desc:'Nigerian-style spaghetti with a serious kick.', category:'main', order:5 },
  { name:'Fusili Pasta', price:6000, emoji:'🍜', desc:'Premium fusili with rich tomato-based sauce.', category:'main', order:6 },
  { name:'Fried Plantain', price:1000, emoji:'🍌', desc:'Golden crispy dodo — the perfect side.', category:'main', order:7 },
  { name:'Egusi Soup', price:3500, emoji:'🫕', desc:'Thick, creamy melon seed soup.', category:'main', order:8 },
  { name:'Okro Soup', price:3500, emoji:'🥬', desc:'Fresh okra soup, smooth and seasoned.', category:'main', order:9 },
  { name:'Vegetable Soup', price:3500, emoji:'🥦', desc:'Mixed vegetable soup, light and flavourful.', category:'main', order:10 },
  { name:'Efo Riro', price:3500, emoji:'🌿', desc:'Spinach stew with assorted meats & peppers.', category:'main', order:11 },
  { name:'White Yam', price:3000, emoji:'🍠', desc:'Steamed white yam served with any soup.', category:'main', order:12 },
  { name:'Porridge Yam', price:4000, emoji:'🍯', desc:'Soft yam porridge in palm oil & seasoning.', category:'main', order:13 },
  { name:'Eba', price:1000, emoji:'🍡', desc:'Smooth garri swallow, best with any soup.', category:'main', order:14 },
  { name:'Poundo', price:1500, emoji:'🫓', desc:'Fluffy poundo yam, perfectly pounded.', category:'main', order:15 },
  { name:'Instant Noodles', price:8000, emoji:'🍜', desc:'Premium loaded noodles — not your average packet.', category:'main', order:16 },
  { name:'Akara', price:2000, emoji:'🟠', desc:'Crispy bean cakes, fried fresh to order.', category:'main', order:17 },
  { name:'Pap', price:200, emoji:'🥣', desc:'Smooth, warm ogi/akamu. Comfort in a bowl.', category:'main', order:18 },
  { name:'Shawarma (Single)', price:6000, emoji:'🌯', desc:'Grilled meat, veggies & sauce in flatbread.', category:'main', order:19 },
  { name:'Shawarma (Double)', price:7000, emoji:'🌯', desc:'Double the filling, double the satisfaction.', category:'main', order:20 },
  { name:'Suya', price:1500, emoji:'🍢', desc:'Classic spiced suya skewers, smoky and hot.', category:'main', order:21 },
  { name:'Barbecue', price:18000, emoji:'🍖', desc:'Full BBQ spread — premium large portion.', category:'main', order:22 },
  { name:'Roasted Chicken', price:6000, emoji:'🐔', desc:'Whole roasted chicken, crispy and juicy.', category:'main', order:23 },
  { name:'Roasted Turkey Finger', price:3500, emoji:'🦃', desc:'Turkey fingers roasted to perfection.', category:'main', order:24 },
  { name:'Banga Soup & Starch', price:null, emoji:'🥣', desc:'Rich palm nut soup with starch.', category:'main', order:25, variants:[{label:'Big',price:30000},{label:'Small',price:15000}] },
  { name:'Owo Soup & Starch', price:null, emoji:'🍲', desc:'Delta-style Owo soup with starch swallow.', category:'main', order:26, variants:[{label:'Big',price:30000},{label:'Small',price:15000}] },
  // PROTEINS
  { name:'Peppered Chicken', price:5500, emoji:'🍗', desc:'Tender chicken in thick peppered sauce.', category:'protein', order:1 },
  { name:'Peppered Turkey', price:6500, emoji:'🦃', desc:'Juicy turkey in spicy pepper sauce.', category:'protein', order:2 },
  { name:'Goat Meat', price:4000, emoji:'🐐', desc:'Slow-cooked, well-seasoned goat meat.', category:'protein', order:3 },
  { name:'Goat Meat Pepper Soup', price:null, emoji:'🍵', desc:'Hot, aromatic goat meat pepper soup.', category:'protein', order:4, variants:[{label:'Big',price:30000},{label:'Small',price:15000}] },
  { name:'Beef', price:2000, emoji:'🥩', desc:'Seasoned beef cuts, stewed to perfection.', category:'protein', order:5 },
  { name:'Assorted', price:2000, emoji:'🍱', desc:"Mixed assorted meats — chef's selection.", category:'protein', order:6 },
  { name:'Cow Leg', price:2000, emoji:'🦴', desc:'Slow-cooked cow leg, fall-off-the-bone.', category:'protein', order:7 },
  { name:'Plantain', price:1000, emoji:'🍌', desc:'Sweet fried plantain — crowd pleaser.', category:'protein', order:8 },
  { name:'Boiled Egg', price:1000, emoji:'🥚', desc:'Perfectly boiled egg, seasoned and tender.', category:'protein', order:9 },
  { name:'Sauce Egg', price:3000, emoji:'🍳', desc:'Eggs in rich, spiced tomato sauce.', category:'protein', order:10 },
  // DRINKS
  { name:'Hollandia Yoghurt', price:5500, emoji:'🥛', desc:'Creamy Hollandia yoghurt drink.', category:'drinks', order:1 },
  { name:'Big Chivita Exotic', price:5500, emoji:'🧃', desc:'Large exotic juice blend from Chivita.', category:'drinks', order:2 },
  { name:'Small Chivita Exotic', price:1500, emoji:'🧃', desc:'Small exotic juice blend.', category:'drinks', order:3 },
  { name:'Vitamilk', price:5000, emoji:'🥛', desc:'Nutritious soy milk drink.', category:'drinks', order:4 },
  { name:'Caprisun', price:1000, emoji:'🫙', desc:"Kids' favourite juice pouch.", category:'drinks', order:5 },
  { name:'Fanta', price:1700, emoji:'🟠', desc:'Classic Fanta — cold, fizzy, sweet.', category:'drinks', order:6 },
  { name:'Sprite', price:1000, emoji:'🟢', desc:'Refreshing Sprite, crisp and cold.', category:'drinks', order:7 },
  { name:'Malta Guinness', price:1500, emoji:'🍺', desc:'Rich malt drink, full-bodied.', category:'drinks', order:8 },
  { name:'Fayrouz', price:1500, emoji:'🍶', desc:'Fayrouz malt drink.', category:'drinks', order:9 },
  { name:'Bottle Water', price:700, emoji:'💧', desc:'Fresh, chilled bottled water.', category:'drinks', order:10 },
];

// ─────────────────────────────────────────────
// SEED database with default menu if empty
// ─────────────────────────────────────────────
async function seedMenuIfEmpty() {
  const count = await MenuItem.countDocuments();
  if (count === 0) {
    await MenuItem.insertMany(defaultMenuItems);
    console.log('✅ Menu seeded with default items');
  }
}

// ─────────────────────────────────────────────
// GET /api/menu — Get full menu (public)
// Returns { main: [...], protein: [...], drinks: [...] }
// ─────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find({ available: true }).sort({ order: 1 });

    const menu = {
      main: items.filter(i => i.category === 'main'),
      protein: items.filter(i => i.category === 'protein'),
      drinks: items.filter(i => i.category === 'drinks'),
    };

    res.json(menu);
  } catch (err) {
    console.error('Get menu error:', err);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

// ─────────────────────────────────────────────
// GET /api/menu/all — Get all items including unavailable (Admin)
// ─────────────────────────────────────────────
router.get('/all', verifyAdmin, async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ category: 1, order: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// ─────────────────────────────────────────────
// PUT /api/menu/:id — Update menu item (Admin)
// ─────────────────────────────────────────────
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { name, price, desc, emoji, available, variants } = req.body;

    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, price, desc, emoji, available, variants },
      { new: true, runValidators: true }
    );

    if (!item) return res.status(404).json({ error: 'Menu item not found' });

    res.json(item);
  } catch (err) {
    console.error('Update menu item error:', err);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// ─────────────────────────────────────────────
// POST /api/menu/:id/image — Upload image for menu item (Admin)
// ─────────────────────────────────────────────
router.post('/:id/image', verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

    const imageUrl = `/uploads/${req.file.filename}`;

    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { image: imageUrl },
      { new: true }
    );

    if (!item) return res.status(404).json({ error: 'Menu item not found' });

    res.json({ message: 'Image uploaded successfully', image: imageUrl, item });
  } catch (err) {
    console.error('Upload image error:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// ─────────────────────────────────────────────
// POST /api/menu — Add new menu item (Admin)
// ─────────────────────────────────────────────
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error('Add menu item error:', err);
    res.status(500).json({ error: 'Failed to add menu item' });
  }
});

// ─────────────────────────────────────────────
// DELETE /api/menu/:id — Delete menu item (Admin)
// ─────────────────────────────────────────────
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Menu item not found' });
    res.json({ message: 'Menu item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});
// GET /api/menu/seed - seed menu if empty
router.get('/seed', async (req, res) => {
  try {
    const count = await MenuItem.countDocuments();
    if (count > 0) {
      return res.json({message: 'Menu already seeded' , count});
    }
    await MenuItem.insertMany(defaultMenuItems);
    res.json({ success: true, message: 'Menu seeded successfully', count: defaultMenuItems.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err});
  }
});

module.exports = router;