import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   UNSPLASH IMAGE CONFIG
─────────────────────────────────────────────*/
const imageKeywords = {
  'Party Jollof Rice': 'jollof rice',
  'Jollof Rice & Beans': 'jollof rice beans',
  'Village Rice': 'Nigerian rice palm oil',
  'White Rice & Beans': 'white rice beans',
  'Spicy Spaghetti': 'spicy spaghetti pasta',
  'Fusili Pasta': 'fusilli pasta tomato',
  'Fried Plantain': 'fried plantain dodo',
  'Egusi Soup': 'egusi soup Nigerian',
  'Okro Soup': 'okra soup',
  'Vegetable Soup': 'vegetable soup Nigerian',
  'Efo Riro': 'spinach stew Nigerian',
  'White Yam': 'boiled yam Nigerian',
  'Porridge Yam': 'yam porridge',
  'Eba': 'eba garri swallow',
  'Poundo': 'pounded yam',
  'Instant Noodles': 'noodles spicy bowl',
  'Akara': 'akara bean cakes',
  'Pap': 'ogi pap Nigerian',
  'Shawarma (Single)': 'shawarma wrap',
  'Shawarma (Double)': 'shawarma double wrap',
  'Suya': 'suya grilled meat skewer',
  'Barbecue': 'BBQ grilled meat',
  'Roasted Chicken': 'roasted chicken whole',
  'Roasted Turkey Finger': 'turkey grilled',
  'Banga Soup & Starch': 'palm nut soup',
  'Owo Soup & Starch': 'Nigerian soup starch',
  'Peppered Chicken': 'peppered chicken Nigerian',
  'Peppered Turkey': 'peppered turkey Nigerian',
  'Goat Meat': 'goat meat stew',
  'Goat Meat Pepper Soup': 'pepper soup goat',
  'Beef': 'beef stew Nigerian',
  'Assorted': 'assorted meat Nigerian',
  'Cow Leg': 'cow leg stew',
  'Plantain': 'fried plantain',
  'Boiled Egg': 'boiled egg',
  'Sauce Egg': 'egg tomato sauce',
  'Hollandia Yoghurt': 'yoghurt drink',
  'Big Chivita Exotic': 'exotic juice drink',
  'Small Chivita Exotic': 'fruit juice pack',
  'Vitamilk': 'soy milk drink',
  'Caprisun': 'juice pouch drink',
  'Fanta': 'fanta orange soda',
  'Sprite': 'sprite soda cold',
  'Malta Guinness': 'malt drink bottle',
  'Fayrouz': 'malt drink can',
  'Bottle Water': 'water bottle cold',
};

// Maps each item to a Foodish category (free API, no key needed)
const foodishMap = {
  'Party Jollof Rice': 'rice',
  'Jollof Rice & Beans': 'rice',
  'Village Rice': 'rice',
  'White Rice & Beans': 'rice',
  'Spicy Spaghetti': 'pasta',
  'Fusili Pasta': 'pasta',
  'Fried Plantain': 'dessert',
  'Egusi Soup': 'butter-chicken',
  'Okro Soup': 'butter-chicken',
  'Vegetable Soup': 'butter-chicken',
  'Efo Riro': 'butter-chicken',
  'White Yam': 'rice',
  'Porridge Yam': 'rice',
  'Eba': 'rice',
  'Poundo': 'rice',
  'Instant Noodles': 'pasta',
  'Akara': 'dessert',
  'Pap': 'dessert',
  'Shawarma (Single)': 'burger',
  'Shawarma (Double)': 'burger',
  'Suya': 'biryani',
  'Barbecue': 'biryani',
  'Roasted Chicken': 'biryani',
  'Roasted Turkey Finger': 'biryani',
  'Banga Soup & Starch': 'butter-chicken',
  'Owo Soup & Starch': 'butter-chicken',
  'Peppered Chicken': 'biryani',
  'Peppered Turkey': 'biryani',
  'Goat Meat': 'biryani',
  'Goat Meat Pepper Soup': 'butter-chicken',
  'Beef': 'biryani',
  'Assorted': 'biryani',
  'Cow Leg': 'biryani',
  'Plantain': 'dessert',
  'Boiled Egg': 'dessert',
  'Sauce Egg': 'butter-chicken',
  'Hollandia Yoghurt': 'dessert',
  'Big Chivita Exotic': 'dessert',
  'Small Chivita Exotic': 'dessert',
  'Vitamilk': 'dessert',
  'Caprisun': 'dessert',
  'Fanta': 'dessert',
  'Sprite': 'dessert',
  'Malta Guinness': 'dessert',
  'Fayrouz': 'dessert',
  'Bottle Water': 'dessert',
};

function getUnsplashUrl(itemName) {
  const category = foodishMap[itemName] || 'biryani';
  // Use a random image number per item so cards look varied
  const seed = Math.floor(Math.random() * 50) + 1;
  return `https://foodish-api.com/images/${category}/${category}${seed}.jpg`;
}

/* ─────────────────────────────────────────────
   MENU DATA
─────────────────────────────────────────────*/
const menuData = {
  main: [
    { name:'Party Jollof Rice', price:4000, emoji:'🍛', desc:'The classic smoky, tomato-rich party jollof.' },
    { name:'Jollof Rice & Beans', price:4000, emoji:'🥘', desc:'Comforting combo of jollof & protein-packed beans.' },
    { name:'Village Rice', price:5500, emoji:'🌾', desc:'Old-school village-style palm oil rice, pure comfort.' },
    { name:'White Rice & Beans', price:4500, emoji:'🍚', desc:'Steamed white rice paired with seasoned beans.' },
    { name:'Spicy Spaghetti', price:4000, emoji:'🍝', desc:'Nigerian-style spaghetti with a serious kick.' },
    { name:'Fusili Pasta', price:6000, emoji:'🍜', desc:'Premium fusili with rich tomato-based Nigerian sauce.' },
    { name:'Fried Plantain', price:1000, emoji:'🍌', desc:'Golden crispy dodo — the perfect side.' },
    { name:'Egusi Soup', price:3500, emoji:'🫕', desc:'Thick, creamy melon seed soup. A Nigerian staple.' },
    { name:'Okro Soup', price:3500, emoji:'🥬', desc:'Fresh okra soup, smooth and perfectly seasoned.' },
    { name:'Vegetable Soup', price:3500, emoji:'🥦', desc:'Mixed vegetable soup, light and packed with flavour.' },
    { name:'Efo Riro', price:3500, emoji:'🌿', desc:'Spinach stew cooked with assorted meats & peppers.' },
    { name:'White Yam', price:3000, emoji:'🍠', desc:'Steamed white yam served with your choice of soup.' },
    { name:'Porridge Yam', price:4000, emoji:'🍯', desc:'Soft yam porridge cooked in palm oil & seasoning.' },
    { name:'Eba', price:1000, emoji:'🍡', desc:'Smooth garri swallow, best paired with any soup.' },
    { name:'Poundo', price:1500, emoji:'🫓', desc:'Fluffy poundo yam, perfectly pounded.' },
    { name:'Instant Noodles', price:8000, emoji:'🍜', desc:'Premium loaded noodles — not your average packet.' },
    { name:'Akara', price:2000, emoji:'🟠', desc:'Crispy bean cakes, fried fresh to order.' },
    { name:'Pap', price:200, emoji:'🥣', desc:'Smooth, warm ogi/akamu. Comfort in a bowl.' },
    { name:'Shawarma (Single)', price:6000, emoji:'🌯', desc:'Grilled meat, veggies & sauce in warm flatbread.' },
    { name:'Shawarma (Double)', price:7000, emoji:'🌯', desc:'Double the filling, double the satisfaction.' },
    { name:'Suya', price:1500, emoji:'🍢', desc:'Classic spiced suya skewers, smoky and hot.' },
    { name:'Barbecue', price:18000, emoji:'🍖', desc:'Full BBQ spread — premium large share portion.' },
    { name:'Roasted Chicken', price:6000, emoji:'🐔', desc:'Whole roasted chicken, crispy skin, juicy inside.' },
    { name:'Roasted Turkey Finger', price:3500, emoji:'🦃', desc:'Flavourful turkey fingers, roasted to perfection.' },
    { name:'Banga Soup & Starch', price:null, emoji:'🥣', desc:'Rich palm nut soup served with starch.', variants:[{label:'Big',price:30000},{label:'Small',price:15000}] },
    { name:'Owo Soup & Starch', price:null, emoji:'🍲', desc:'Delta-style Owo soup with starch swallow.', variants:[{label:'Big',price:30000},{label:'Small',price:15000}] },
  ],
  protein: [
    { name:'Peppered Chicken', price:5500, emoji:'🍗', desc:'Tender chicken in thick peppered sauce.' },
    { name:'Peppered Turkey', price:6500, emoji:'🦃', desc:'Juicy turkey in spicy, rich pepper sauce.' },
    { name:'Goat Meat', price:4000, emoji:'🐐', desc:'Slow-cooked, well-seasoned tender goat meat.' },
    { name:'Goat Meat Pepper Soup', price:null, emoji:'🍵', desc:'Hot, aromatic goat meat pepper soup.', variants:[{label:'Big',price:30000},{label:'Small',price:15000}] },
    { name:'Beef', price:2000, emoji:'🥩', desc:'Seasoned beef cuts, stewed to perfection.' },
    { name:'Assorted', price:2000, emoji:'🍱', desc:'Mixed assorted meats — the chef\'s selection.' },
    { name:'Cow Leg', price:2000, emoji:'🦴', desc:'Slow-cooked cow leg, fall-off-the-bone tender.' },
    { name:'Plantain', price:1000, emoji:'🍌', desc:'Sweet fried plantain — always a crowd pleaser.' },
    { name:'Boiled Egg', price:1000, emoji:'🥚', desc:'Perfectly boiled egg, seasoned and tender.' },
    { name:'Sauce Egg', price:3000, emoji:'🍳', desc:'Eggs cooked in a rich, spiced tomato sauce.' },
  ],
  drinks: [
    { name:'Hollandia Yoghurt', price:5500, emoji:'🥛', desc:'Creamy Hollandia yoghurt drink.' },
    { name:'Big Chivita Exotic', price:5500, emoji:'🧃', desc:'Large exotic juice blend from Chivita.' },
    { name:'Small Chivita Exotic', price:1500, emoji:'🧃', desc:'Small exotic juice blend.' },
    { name:'Vitamilk', price:5000, emoji:'🥛', desc:'Nutritious soy milk drink, smooth and sweet.' },
    { name:'Caprisun', price:1000, emoji:'🫙', desc:'Kids\' favourite juice pouch.' },
    { name:'Fanta', price:1700, emoji:'🟠', desc:'Classic Fanta — cold, fizzy, sweet.' },
    { name:'Sprite', price:1000, emoji:'🟢', desc:'Refreshing Sprite, crisp and cold.' },
    { name:'Malta Guinness', price:1500, emoji:'🍺', desc:'Rich malt drink, full-bodied and energising.' },
    { name:'Fayrouz', price:1500, emoji:'🍶', desc:'Fayrouz malt drink, your choice of flavour.' },
    { name:'Bottle Water', price:700, emoji:'💧', desc:'Fresh, chilled bottled water.' },
  ]
};

/* ─────────────────────────────────────────────
   CART STATE
─────────────────────────────────────────────*/
let cart = {};

function cartKey(name, variant = '') {
  return variant ? `${name}:${variant}` : name;
}

function addToCart(name, price, emoji, variant = '', cardEl = null) {
  const key = cartKey(name, variant);
  const label = variant ? `${name} (${variant})` : name;
  if (cart[key]) {
    cart[key].qty++;
  } else {
    cart[key] = { name: label, price, emoji, qty: 1 };
  }
  updateCartUI();
  bounceCartBtn();
  if (cardEl) flyToCart(cardEl, emoji);
  showToast(`${emoji} ${label} added to cart!`);
}

function removeFromCart(key) {
  delete cart[key];
  updateCartUI();
}

function changeQty(key, delta) {
  if (!cart[key]) return;
  cart[key].qty += delta;
  if (cart[key].qty <= 0) removeFromCart(key);
  else updateCartUI();
}

function getCartTotal() {
  return Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0);
}

function getCartCount() {
  return Object.values(cart).reduce((s, i) => s + i.qty, 0);
}

function formatPrice(n) {
  return '₦' + n.toLocaleString('en-NG');
}

/* ─────────────────────────────────────────────
   UPDATE CART UI
─────────────────────────────────────────────*/
function updateCartUI() {
  const count = getCartCount();
  const total = getCartTotal();
  const countEl = document.getElementById('cart-count');

  countEl.textContent = count;
  if (count > 0) countEl.classList.add('visible');
  else countEl.classList.remove('visible');

  updateMobileCartBadge(count);

  document.getElementById('cart-subtotal').textContent = formatPrice(total);

  const listEl = document.getElementById('cart-items-list');
  if (count === 0) {
    listEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <div class="cart-empty-text">Your cart is empty. Start adding items!</div>
      </div>`;
  } else {
    listEl.innerHTML = Object.entries(cart).map(([key, item]) => `
      <div class="cart-item">
        <div class="cart-item-emoji">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" data-key="${key}" data-delta="-1">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" data-key="${key}" data-delta="1">+</button>
        </div>
        <button class="remove-btn" data-key="${key}">✕</button>
      </div>
    `).join('');

    listEl.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => changeQty(btn.dataset.key, parseInt(btn.dataset.delta)));
    });
    listEl.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(btn.dataset.key));
    });
  }

  updateOrderSummary();
}

function updateOrderSummary() {
  const items = Object.values(cart);
  const summaryEl = document.getElementById('order-summary-items');
  const totalRow = document.getElementById('order-total-row');
  const totalDisplay = document.getElementById('order-total-display');

  if (items.length === 0) {
    summaryEl.innerHTML = `
      <div class="checkout-empty-msg">
        <p>Your cart is empty.<br><strong>Add items from the menu above.</strong></p>
      </div>`;
    totalRow.style.display = 'none';
  } else {
    summaryEl.innerHTML = items.map(item => `
      <div class="order-summary-item">
        <span class="order-item-name">
          ${item.emoji} ${item.name}
          <span class="order-item-qty">×${item.qty}</span>
        </span>
        <span class="order-item-price">${formatPrice(item.price * item.qty)}</span>
      </div>
    `).join('');
    totalRow.style.display = 'block';
    totalDisplay.textContent = formatPrice(getCartTotal());
  }
}

/* ─────────────────────────────────────────────
   CART OPEN / CLOSE
─────────────────────────────────────────────*/
function openCart() {
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-drawer').classList.remove('open');
  document.body.style.overflow = '';
}

function bounceCartBtn() {
  const btn = document.getElementById('cart-btn');
  btn.classList.remove('bounce');
  void btn.offsetWidth;
  btn.classList.add('bounce');
}

/* ─────────────────────────────────────────────
   FLY TO CART ANIMATION
─────────────────────────────────────────────*/
function flyToCart(sourceEl, emoji) {
  const cartBtn = document.getElementById('cart-btn');
  const sourceRect = sourceEl.getBoundingClientRect();
  const cartRect = cartBtn.getBoundingClientRect();

  const fly = document.createElement('div');
  fly.className = 'fly-item';
  fly.textContent = emoji;
  fly.style.cssText = `
    left: ${sourceRect.left + sourceRect.width / 2 - 25}px;
    top: ${sourceRect.top + sourceRect.height / 2 - 25}px;
    transition: all 0.7s cubic-bezier(0.4,0,0.2,1);
  `;
  document.body.appendChild(fly);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      fly.style.left = `${cartRect.left + cartRect.width / 2 - 25}px`;
      fly.style.top = `${cartRect.top + cartRect.height / 2 - 25}px`;
      fly.style.transform = 'scale(0.3)';
      fly.style.opacity = '0';
    });
  });

  setTimeout(() => fly.remove(), 800);
}

/* ─────────────────────────────────────────────
   MENU TABS
─────────────────────────────────────────────*/
function switchTab(btn, tabId) {
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('panel-' + tabId).classList.add('active');
  moveTabIndicator(btn);
}

function moveTabIndicator(activeTab) {
  const ind = document.getElementById('tab-indicator');
  const tabsEl = document.getElementById('menu-tabs');
  const tabsRect = tabsEl.getBoundingClientRect();
  const btnRect = activeTab.getBoundingClientRect();
  ind.style.left = (btnRect.left - tabsRect.left) + 'px';
  ind.style.width = btnRect.width + 'px';
}

/* ─────────────────────────────────────────────
   BUILD MENU CARDS WITH IMAGES
─────────────────────────────────────────────*/
function buildMenuGrid(category, gridId) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = menuData[category].map((item, i) => {
    const hasVariants = item.variants && item.variants.length > 0;
    const cardId = `card-${gridId}-${i}`;
    const imgUrl = getUnsplashUrl(item.name);

    return `
      <div class="menu-card reveal" style="transition-delay:${i * 0.05}s" id="${cardId}">
        <div class="card-img-wrap">
          <img
            src="${imgUrl}"
            alt="${item.name}"
            onerror="this.parentElement.innerHTML='<div class=card-img-placeholder>${item.emoji}</div>'"
          />
        </div>
        <div class="card-name">${item.name}</div>
        <div class="card-desc">${item.desc}</div>
        <div class="card-footer">
          ${hasVariants ? `
            <div class="price-variants">
              ${item.variants.map(v => `
                <div class="price-variant">
                  <span class="price-variant-label">${v.label}:</span>
                  <span class="price-variant-val">${formatPrice(v.price)}</span>
                </div>
              `).join('')}
              <div style="display:flex;gap:8px;margin-top:8px;">
                ${item.variants.map(v => `
                  <button class="add-variant-btn"
                    data-name="${item.name}"
                    data-price="${v.price}"
                    data-emoji="${item.emoji}"
                    data-variant="${v.label}"
                    data-card="${cardId}">
                    + ${v.label}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : `
            <div class="card-price">
              <small>from</small>
              ${formatPrice(item.price)}
            </div>
            <button class="add-btn"
              data-name="${item.name}"
              data-price="${item.price}"
              data-emoji="${item.emoji}"
              data-card="${cardId}">
              <svg viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
          `}
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cardEl = document.getElementById(btn.dataset.card);
      addToCart(btn.dataset.name, parseInt(btn.dataset.price), btn.dataset.emoji, '', cardEl);
    });
  });

  grid.querySelectorAll('.add-variant-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cardEl = document.getElementById(btn.dataset.card);
      addToCart(btn.dataset.name, parseInt(btn.dataset.price), btn.dataset.emoji, btn.dataset.variant, cardEl);
    });
  });

  grid.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('mousemove', (e) => tiltCard(card, e));
    card.addEventListener('mouseleave', () => resetTilt(card));
  });
}

/* ─────────────────────────────────────────────
   3D TILT EFFECT
─────────────────────────────────────────────*/
function tiltCard(el, e) {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const rotateX = ((y - cy) / cy) * -8;
  const rotateY = ((x - cx) / cx) * 8;
  el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
}

function resetTilt(el) {
  el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
}

/* ─────────────────────────────────────────────
   SCROLL HELPERS
─────────────────────────────────────────────*/
function scrollToMenu() {
  document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

function goToCheckout() {
  closeCart();
  setTimeout(() => {
    document.getElementById('checkout').scrollIntoView({ behavior: 'smooth' });
  }, 300);
}

/* ─────────────────────────────────────────────
   PLACE ORDER
─────────────────────────────────────────────*/
function placeOrder() {
  const name = document.getElementById('cust-name').value.trim();
  const phone = document.getElementById('cust-phone').value.trim();
  const addr = document.getElementById('cust-address').value.trim();

  if (!name) { showToast('⚠️ Please enter your name.'); return; }
  if (!phone) { showToast('⚠️ Please enter your phone number.'); return; }
  if (!addr) { showToast('⚠️ Please enter your delivery address.'); return; }
  if (getCartCount() === 0) { showToast('⚠️ Your cart is empty!'); return; }

  showSuccessScreen();
}

function showSuccessScreen() {
  const ss = document.getElementById('success-screen');
  ss.classList.add('visible');
  document.body.style.overflow = 'hidden';
  launchConfetti();
  startOrderStatus();
}

function closeSuccess() {
  const ss = document.getElementById('success-screen');
  ss.classList.remove('visible');
  document.body.style.overflow = '';

  saveOrderToHistory();

  cart = {};
  updateCartUI();
  document.getElementById('cust-name').value = '';
  document.getElementById('cust-phone').value = '';
  document.getElementById('cust-address').value = '';
  setTimeout(() => {
    document.getElementById('status-section').scrollIntoView({ behavior: 'smooth' });
  }, 300);
}

/* ─────────────────────────────────────────────
   ORDER STATUS
─────────────────────────────────────────────*/
function startOrderStatus() {
  document.getElementById('step-1').className = 'status-step done';
  document.getElementById('step-2').className = 'status-step';
  document.getElementById('step-3').className = 'status-step';
  document.getElementById('conn-1').classList.remove('active');
  document.getElementById('conn-2').classList.remove('active');

  const msg = document.getElementById('status-msg');
  const eta = document.getElementById('status-eta');
  msg.className = 'status-msg-text active';
  msg.textContent = '✅ Order received! We\'re on it.';
  eta.textContent = 'Estimated wait: 30–45 minutes';

  setTimeout(() => {
    document.getElementById('conn-1').classList.add('active');
    setTimeout(() => {
      document.getElementById('step-2').classList.add('active');
      msg.textContent = '👨‍🍳 Your food is being prepared with love!';
      eta.textContent = 'Almost there — just a little longer...';
      setTimeout(() => {
        document.getElementById('conn-2').classList.add('active');
        setTimeout(() => {
          document.getElementById('step-2').classList.remove('active');
          document.getElementById('step-2').classList.add('done');
          document.getElementById('step-3').classList.add('active');
          msg.textContent = '🔥 Your order is ready! Enjoy your meal.';
          eta.textContent = 'Hot food incoming 🚀';
        }, 1500);
      }, 4000);
    }, 1200);
  }, 1500);
}

/* ─────────────────────────────────────────────
   TOAST NOTIFICATIONS
─────────────────────────────────────────────*/
function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/* ─────────────────────────────────────────────
   CONFETTI BURST
─────────────────────────────────────────────*/
function launchConfetti() {
  const canvas = document.getElementById('success-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 120 }, () => ({
    x: canvas.width * 0.5 + (Math.random() - 0.5) * 200,
    y: canvas.height * 0.4,
    vx: (Math.random() - 0.5) * 14,
    vy: -(Math.random() * 18 + 6),
    r: Math.random() * 8 + 4,
    color: ['#E8400A','#F5A623','#FF6B35','#FFD700','#FF4500'][Math.floor(Math.random() * 5)],
    rot: Math.random() * Math.PI * 2,
    rotV: (Math.random() - 0.5) * 0.3,
    life: 1,
    shape: Math.random() > 0.5 ? 'rect' : 'circle'
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      p.vy += 0.4; p.vx *= 0.99;
      p.rot += p.rotV;
      p.life -= 0.012;
      if (p.life <= 0) return;
      alive = true;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === 'rect') ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      else { ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.fill(); }
      ctx.restore();
    });
    if (alive) requestAnimationFrame(draw);
  }
  draw();
}

/* ─────────────────────────────────────────────
   HERO PARTICLE CANVAS
─────────────────────────────────────────────*/
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const dots = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    color: Math.random() > 0.6 ? '#E8400A' : Math.random() > 0.5 ? '#F5A623' : 'rgba(255,255,255,0.4)'
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0) d.x = canvas.width;
      if (d.x > canvas.width) d.x = 0;
      if (d.y < 0) d.y = canvas.height;
      if (d.y > canvas.height) d.y = 0;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = d.color;
      ctx.globalAlpha = 0.6;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    dots.forEach((a, i) => {
      dots.slice(i + 1).forEach(b => {
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(232,64,10,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ─────────────────────────────────────────────
   CUSTOM CURSOR
─────────────────────────────────────────────*/
function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function animRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('button, a, .menu-card, .add-btn').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
  });
}

/* ─────────────────────────────────────────────
   SCROLL REVEAL
─────────────────────────────────────────────*/
function initScrollReveal() {
  // On mobile — show all reveal elements immediately
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  // Desktop — use IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
/* ─────────────────────────────────────────────
   NAV SCROLL STYLE
─────────────────────────────────────────────*/
function initNavScroll() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });
}

/* ─────────────────────────────────────────────
   HERO GSAP ENTRANCE
─────────────────────────────────────────────*/
function initHeroAnimation() {
  // On mobile — skip GSAP entirely, just show everything immediately
  if (window.innerWidth <= 768) {
    ['#hero-logo','#hero-tagline','#hero-cta','#hero-stats'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
    return;
  }

  // Desktop — run full GSAP animation
  setTimeout(() => {
    gsap.to('#hero-logo', { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', delay: 0.1 });
    gsap.to('#hero-tagline', { opacity: 1, duration: 1, ease: 'power2.out', delay: 0.4 });
    gsap.to('#hero-cta', { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.6 });
    gsap.to('#hero-stats', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.8 });
  }, 100);
}

/* ─────────────────────────────────────────────
   TAB INDICATOR
─────────────────────────────────────────────*/
function initTabIndicator() {
  const activeTab = document.querySelector('.menu-tab.active');
  if (activeTab) setTimeout(() => moveTabIndicator(activeTab), 100);
  window.addEventListener('resize', () => {
    const at = document.querySelector('.menu-tab.active');
    if (at) moveTabIndicator(at);
  });
}

/* ─────────────────────────────────────────────
   PROFILE — Save & Load
─────────────────────────────────────────────*/
function saveProfile() {
  const name = document.getElementById('profile-name').value.trim();
  const phone = document.getElementById('profile-phone').value.trim();
  const addr = document.getElementById('profile-address').value.trim();

  if (!name && !phone && !addr) {
    showToast('⚠️ Please fill in at least one field.');
    return;
  }

  localStorage.setItem('bf_name', name);
  localStorage.setItem('bf_phone', phone);
  localStorage.setItem('bf_address', addr);

  if (document.getElementById('cust-name')) document.getElementById('cust-name').value = name;
  if (document.getElementById('cust-phone')) document.getElementById('cust-phone').value = phone;
  if (document.getElementById('cust-address')) document.getElementById('cust-address').value = addr;

  showToast('✅ Profile saved! Checkout is prefilled.');
}

function loadProfile() {
  const name = localStorage.getItem('bf_name') || '';
  const phone = localStorage.getItem('bf_phone') || '';
  const addr = localStorage.getItem('bf_address') || '';

  const pName = document.getElementById('profile-name');
  const pPhone = document.getElementById('profile-phone');
  const pAddr = document.getElementById('profile-address');
  if (pName) pName.value = name;
  if (pPhone) pPhone.value = phone;
  if (pAddr) pAddr.value = addr;

  if (name && document.getElementById('cust-name')) document.getElementById('cust-name').value = name;
  if (phone && document.getElementById('cust-phone')) document.getElementById('cust-phone').value = phone;
  if (addr && document.getElementById('cust-address')) document.getElementById('cust-address').value = addr;
}

/* ─────────────────────────────────────────────
   ORDER HISTORY
─────────────────────────────────────────────*/
function saveOrderToHistory() {
  const items = Object.values(cart);
  if (items.length === 0) return;

  const order = {
    id: Date.now(),
    date: new Date().toLocaleDateString('en-NG', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }),
    items: items.map(i => ({ name: i.name, qty: i.qty, price: i.price, emoji: i.emoji })),
    total: getCartTotal(),
  };

  const history = JSON.parse(localStorage.getItem('bf_orders') || '[]');
  history.unshift(order);
  if (history.length > 20) history.pop();
  localStorage.setItem('bf_orders', JSON.stringify(history));
  renderOrderHistory();
}

function renderOrderHistory() {
  const listEl = document.getElementById('order-history-list');
  if (!listEl) return;

  const history = JSON.parse(localStorage.getItem('bf_orders') || '[]');

  if (history.length === 0) {
    listEl.innerHTML = `
      <div class="checkout-empty-msg">
        <p>No orders yet.<br><strong>Place your first order to see it here.</strong></p>
      </div>`;
    return;
  }

  listEl.innerHTML = history.map(order => `
    <div class="order-history-item">
      <div class="order-history-header">
        <span class="order-history-date">📅 ${order.date}</span>
        <span class="order-history-badge">✅ Completed</span>
      </div>
      <div class="order-history-items-list">
        ${order.items.map(i => `${i.emoji} ${i.name} ×${i.qty}`).join(' · ')}
      </div>
      <div style="margin-top:10px;">
        <span class="order-history-total">${formatPrice(order.total)}</span>
      </div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────
   MOBILE NAV
─────────────────────────────────────────────*/
function initMobileNav() {
  const sectionMap = {
    'hero': 'mnav-home',
    'menu': 'mnav-menu',
    'checkout': 'mnav-order',
    'profile': 'mnav-profile',
  };

  window.addEventListener('scroll', () => {
    let current = 'hero';
    
    // Check each section and find which one is currently in view
    Object.keys(sectionMap).forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      
      // If we've scrolled past this section's top (with 300px buffer), mark it as current
      if (window.scrollY >= el.offsetTop - 300) {
        current = id;
      }
    });
    
    // Update active nav item
    document.querySelectorAll('.mobile-nav-item').forEach(el => el.classList.remove('active'));
    const activeId = sectionMap[current];
    if (activeId) {
      const activeNav = document.getElementById(activeId);
      if (activeNav) activeNav.classList.add('active');
    }
  });
}

function updateMobileCartBadge(count) {
  const badge = document.getElementById('mobile-cart-badge');
  if (!badge) return;
  badge.textContent = count;
  if (count > 0) badge.classList.add('visible');
  else badge.classList.remove('visible');
}

/* ─────────────────────────────────────────────
   EXPOSE FUNCTIONS TO HTML
─────────────────────────────────────────────*/
window.scrollToMenu = scrollToMenu;
window.openCart = openCart;
window.closeCart = closeCart;
window.goToCheckout = goToCheckout;
window.placeOrder = placeOrder;
window.closeSuccess = closeSuccess;
window.switchTab = switchTab;
window.saveProfile = saveProfile;

/* ─────────────────────────────────────────────
   BOOT
─────────────────────────────────────────────*/
document.addEventListener('DOMContentLoaded', () => {
  buildMenuGrid('main', 'grid-main');
  buildMenuGrid('protein', 'grid-protein');
  buildMenuGrid('drinks', 'grid-drinks');

  initHeroCanvas();
  initHeroAnimation();
  initTabIndicator();
  initScrollReveal();
  initNavScroll();
  initCursor();
  initMobileNav();
  loadProfile();
  renderOrderHistory();

  setTimeout(() => {
    document.querySelectorAll('.menu-card.reveal').forEach(el => {
      new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.05 }).observe(el);
    });
  }, 100);
});