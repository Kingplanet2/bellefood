import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   SCREEN NAVIGATION — The core of the app
   Each tab shows a different screen entirely
─────────────────────────────────────────────*/
let currentScreen = 'home';

function navigateTo(screenId) {
  if (screenId === currentScreen) return;

  const current = document.getElementById(`screen-${currentScreen}`);
  const next = document.getElementById(`screen-${screenId}`);

  if (!next) return;

  // Slide current screen out to the left
  current.classList.remove('active');
  current.classList.add('slide-left');

  // Slide next screen in from the right
  next.classList.add('active');

  // Clean up after animation
  setTimeout(() => {
    current.classList.remove('slide-left');
  }, 400);

  currentScreen = screenId;

  // Update bottom nav active state
  document.querySelectorAll('.mobile-nav-item').forEach(el => el.classList.remove('active'));
  const navBtn = document.getElementById(`mnav-${screenId}`);
  if (navBtn) navBtn.classList.add('active');

  // Scroll the new screen to top
  const scroll = next.querySelector('.screen-scroll');
  if (scroll) scroll.scrollTop = 0;

  // Init tab indicator when switching to menu
  if (screenId === 'menu') {
    setTimeout(() => {
      const activeTab = document.querySelector('.menu-tab.active');
      if (activeTab) moveTabIndicator(activeTab);
    }, 50);
  }
}

/* ─────────────────────────────────────────────
   FOOD IMAGE CONFIG
─────────────────────────────────────────────*/
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

function getFoodImage(itemName) {
  const category = foodishMap[itemName] || 'biryani';
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
    { name:'Village Rice', price:5500, emoji:'🌾', desc:'Old-school village-style palm oil rice.' },
    { name:'White Rice & Beans', price:4500, emoji:'🍚', desc:'Steamed white rice paired with seasoned beans.' },
    { name:'Spicy Spaghetti', price:4000, emoji:'🍝', desc:'Nigerian-style spaghetti with a serious kick.' },
    { name:'Fusili Pasta', price:6000, emoji:'🍜', desc:'Premium fusili with rich tomato-based sauce.' },
    { name:'Fried Plantain', price:1000, emoji:'🍌', desc:'Golden crispy dodo — the perfect side.' },
    { name:'Egusi Soup', price:3500, emoji:'🫕', desc:'Thick, creamy melon seed soup.' },
    { name:'Okro Soup', price:3500, emoji:'🥬', desc:'Fresh okra soup, smooth and seasoned.' },
    { name:'Vegetable Soup', price:3500, emoji:'🥦', desc:'Mixed vegetable soup, light and flavourful.' },
    { name:'Efo Riro', price:3500, emoji:'🌿', desc:'Spinach stew with assorted meats & peppers.' },
    { name:'White Yam', price:3000, emoji:'🍠', desc:'Steamed white yam served with any soup.' },
    { name:'Porridge Yam', price:4000, emoji:'🍯', desc:'Soft yam porridge in palm oil & seasoning.' },
    { name:'Eba', price:1000, emoji:'🍡', desc:'Smooth garri swallow, best with any soup.' },
    { name:'Poundo', price:1500, emoji:'🫓', desc:'Fluffy poundo yam, perfectly pounded.' },
    { name:'Instant Noodles', price:8000, emoji:'🍜', desc:'Premium loaded noodles — not your average packet.' },
    { name:'Akara', price:2000, emoji:'🟠', desc:'Crispy bean cakes, fried fresh to order.' },
    { name:'Pap', price:200, emoji:'🥣', desc:'Smooth, warm ogi/akamu. Comfort in a bowl.' },
    { name:'Shawarma (Single)', price:6000, emoji:'🌯', desc:'Grilled meat, veggies & sauce in flatbread.' },
    { name:'Shawarma (Double)', price:7000, emoji:'🌯', desc:'Double the filling, double the satisfaction.' },
    { name:'Suya', price:1500, emoji:'🍢', desc:'Classic spiced suya skewers, smoky and hot.' },
    { name:'Barbecue', price:18000, emoji:'🍖', desc:'Full BBQ spread — premium large portion.' },
    { name:'Roasted Chicken', price:6000, emoji:'🐔', desc:'Whole roasted chicken, crispy and juicy.' },
    { name:'Roasted Turkey Finger', price:3500, emoji:'🦃', desc:'Turkey fingers roasted to perfection.' },
    { name:'Banga Soup & Starch', price:null, emoji:'🥣', desc:'Rich palm nut soup with starch.', variants:[{label:'Big',price:30000},{label:'Small',price:15000}] },
    { name:'Owo Soup & Starch', price:null, emoji:'🍲', desc:'Delta-style Owo soup with starch swallow.', variants:[{label:'Big',price:30000},{label:'Small',price:15000}] },
  ],
  protein: [
    { name:'Peppered Chicken', price:5500, emoji:'🍗', desc:'Tender chicken in thick peppered sauce.' },
    { name:'Peppered Turkey', price:6500, emoji:'🦃', desc:'Juicy turkey in spicy pepper sauce.' },
    { name:'Goat Meat', price:4000, emoji:'🐐', desc:'Slow-cooked, well-seasoned goat meat.' },
    { name:'Goat Meat Pepper Soup', price:null, emoji:'🍵', desc:'Hot, aromatic goat meat pepper soup.', variants:[{label:'Big',price:30000},{label:'Small',price:15000}] },
    { name:'Beef', price:2000, emoji:'🥩', desc:'Seasoned beef cuts, stewed to perfection.' },
    { name:'Assorted', price:2000, emoji:'🍱', desc:'Mixed assorted meats — chef\'s selection.' },
    { name:'Cow Leg', price:2000, emoji:'🦴', desc:'Slow-cooked cow leg, fall-off-the-bone.' },
    { name:'Plantain', price:1000, emoji:'🍌', desc:'Sweet fried plantain — crowd pleaser.' },
    { name:'Boiled Egg', price:1000, emoji:'🥚', desc:'Perfectly boiled egg, seasoned and tender.' },
    { name:'Sauce Egg', price:3000, emoji:'🍳', desc:'Eggs in rich, spiced tomato sauce.' },
  ],
  drinks: [
    { name:'Hollandia Yoghurt', price:5500, emoji:'🥛', desc:'Creamy Hollandia yoghurt drink.' },
    { name:'Big Chivita Exotic', price:5500, emoji:'🧃', desc:'Large exotic juice blend from Chivita.' },
    { name:'Small Chivita Exotic', price:1500, emoji:'🧃', desc:'Small exotic juice blend.' },
    { name:'Vitamilk', price:5000, emoji:'🥛', desc:'Nutritious soy milk drink.' },
    { name:'Caprisun', price:1000, emoji:'🫙', desc:'Kids\' favourite juice pouch.' },
    { name:'Fanta', price:1700, emoji:'🟠', desc:'Classic Fanta — cold, fizzy, sweet.' },
    { name:'Sprite', price:1000, emoji:'🟢', desc:'Refreshing Sprite, crisp and cold.' },
    { name:'Malta Guinness', price:1500, emoji:'🍺', desc:'Rich malt drink, full-bodied.' },
    { name:'Fayrouz', price:1500, emoji:'🍶', desc:'Fayrouz malt drink.' },
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
  bounceCartBadge();
  if (cardEl) flyToNav(cardEl, emoji);
  showToast(`${emoji} ${label} added!`);
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
   UPDATE ALL CART UI
─────────────────────────────────────────────*/
function updateCartUI() {
  const count = getCartCount();
  const total = getCartTotal();

  // Top bar badge
  const topBadge = document.getElementById('cart-count-top');
  if (topBadge) {
    topBadge.textContent = count;
    count > 0 ? topBadge.classList.add('visible') : topBadge.classList.remove('visible');
  }

  // Bottom nav badge
  const navBadge = document.getElementById('mobile-cart-badge');
  if (navBadge) {
    navBadge.textContent = count;
    count > 0 ? navBadge.classList.add('visible') : navBadge.classList.remove('visible');
  }

  // Cart screen
  const listEl = document.getElementById('cart-items-list');
  const footerBar = document.getElementById('cart-footer-bar');
  const subtotalEl = document.getElementById('cart-subtotal');

  if (subtotalEl) subtotalEl.textContent = formatPrice(total);

  if (listEl) {
    if (count === 0) {
      listEl.innerHTML = `
        <div class="cart-empty-screen">
          <div class="cart-empty-icon">🛒</div>
          <div class="cart-empty-text">Your cart is empty</div>
          <button class="btn-primary" style="margin-top:24px" onclick="navigateTo('menu')">
            Browse Menu
          </button>
        </div>`;
      if (footerBar) footerBar.style.display = 'none';
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

      if (footerBar) footerBar.style.display = 'block';
    }
  }

  // Order summary on order screen
  updateOrderSummary();
}

function updateOrderSummary() {
  const items = Object.values(cart);
  const summaryEl = document.getElementById('order-summary-items');
  const totalRow = document.getElementById('order-total-row');
  const totalDisplay = document.getElementById('order-total-display');

  if (!summaryEl) return;

  if (items.length === 0) {
    summaryEl.innerHTML = `
      <div class="checkout-empty-msg">
        <p>Your cart is empty.<br><strong>Add items from the menu.</strong></p>
      </div>`;
    if (totalRow) totalRow.style.display = 'none';
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
    if (totalRow) totalRow.style.display = 'block';
    if (totalDisplay) totalDisplay.textContent = formatPrice(getCartTotal());
  }
}

/* ─────────────────────────────────────────────
   BOUNCE CART BADGE
─────────────────────────────────────────────*/
function bounceCartBadge() {
  const btn = document.getElementById('mnav-cart');
  if (!btn) return;
  btn.style.transform = 'scale(1.3)';
  setTimeout(() => { btn.style.transform = ''; }, 300);
}

/* ─────────────────────────────────────────────
   FLY TO NAV ANIMATION
─────────────────────────────────────────────*/
function flyToNav(sourceEl, emoji) {
  const navCart = document.getElementById('mnav-cart');
  if (!navCart) return;
  const sourceRect = sourceEl.getBoundingClientRect();
  const targetRect = navCart.getBoundingClientRect();

  const fly = document.createElement('div');
  fly.className = 'fly-item';
  fly.textContent = emoji;
  fly.style.cssText = `
    left: ${sourceRect.left + sourceRect.width / 2 - 22}px;
    top: ${sourceRect.top + sourceRect.height / 2 - 22}px;
    transition: all 0.65s cubic-bezier(0.4,0,0.2,1);
  `;
  document.body.appendChild(fly);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      fly.style.left = `${targetRect.left + targetRect.width / 2 - 22}px`;
      fly.style.top = `${targetRect.top + targetRect.height / 2 - 22}px`;
      fly.style.transform = 'scale(0.2)';
      fly.style.opacity = '0';
    });
  });

  setTimeout(() => fly.remove(), 700);
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
  if (!ind || !tabsEl) return;
  const tabsRect = tabsEl.getBoundingClientRect();
  const btnRect = activeTab.getBoundingClientRect();
  ind.style.left = (btnRect.left - tabsRect.left) + 'px';
  ind.style.width = btnRect.width + 'px';
}

/* ─────────────────────────────────────────────
   BUILD MENU CARDS
─────────────────────────────────────────────*/
function buildMenuGrid(category, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  grid.innerHTML = menuData[category].map((item, i) => {
    const hasVariants = item.variants && item.variants.length > 0;
    const cardId = `card-${gridId}-${i}`;
    const imgUrl = getFoodImage(item.name);

    return `
      <div class="menu-card" id="${cardId}">
        <div class="card-img-wrap">
          <img
            src="${imgUrl}"
            alt="${item.name}"
            onerror="this.parentElement.innerHTML='<div class=card-img-placeholder>${item.emoji}</div>'"
          />
        </div>
        <div class="card-body">
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
                <div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap;">
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
      </div>
    `;
  }).join('');

  // Attach events
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

  // 3D tilt — desktop only
  if (window.innerWidth > 768) {
    grid.querySelectorAll('.menu-card').forEach(card => {
      card.addEventListener('mousemove', (e) => tiltCard(card, e));
      card.addEventListener('mouseleave', () => resetTilt(card));
    });
  }
}

/* ─────────────────────────────────────────────
   3D TILT
─────────────────────────────────────────────*/
function tiltCard(el, e) {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const rotX = ((y - cy) / cy) * -6;
  const rotY = ((x - cx) / cx) * 6;
  el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
}
function resetTilt(el) {
  el.style.transform = '';
}

/* ─────────────────────────────────────────────
   PLACE ORDER
─────────────────────────────────────────────*/
function placeOrder() {
  const name = document.getElementById('cust-name').value.trim();
  const phone = document.getElementById('cust-phone').value.trim();
  const addr = document.getElementById('cust-address').value.trim();
  const noteEl = document.getElementById('cust-note');
  const note = noteEl ? noteEl.value.trim() : '';

  if (!name) { showToast('⚠️ Please enter your name.'); return; }
  if (!phone) { showToast('⚠️ Please enter your phone number.'); return; }
  if (!addr) { showToast('⚠️ Please enter your delivery address.'); return; }
  if (getCartCount() === 0) { showToast('⚠️ Your cart is empty!'); return; }

  window.pendingOrder = {
    customer: { name, phone, address: addr, note },
    items: Object.values(cart).map(item => ({
      name: item.name,
      emoji: item.emoji,
      price: item.price,
      qty: item.qty,
    })),
    total: getCartTotal(),
  };

  const handler = PaystackPop.setup({
    key: 'pk_test_2f8c5eefa84731b078a0307fafd7be86ccf195fe',
    email: phone + '@bellefood.com',
    amount: getCartTotal() * 100,
    currency: 'NGN',
    ref: 'BF_' + Date.now(),
    metadata: {
      custom_fields: [
        { display_name: 'Customer Name', variable_name: 'name', value: name },
        { display_name: 'Phone', variable_name: 'phone', value: phone },
        { display_name: 'Address', variable_name: 'address', value: addr },
      ]
    },
    callback: function(response) {
      confirmOrderAfterPayment(response.reference);
    },
    onClose: function() {
      showToast('⚠️ Payment cancelled. Your cart is still saved.');
    }
  });

  handler.openIframe();
}

async function confirmOrderAfterPayment(reference) {
  try {
    showToast('⏳ Confirming your payment...');

    const orderData = {
      ...window.pendingOrder,
      paymentReference: reference,
      paymentStatus: 'paid',
    };

    const response = await fetch('https://bellefood-backend.onrender.com/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    if (result.success) {
      showToast('✅ Payment confirmed! Order placed.');
      saveOrderToHistory();
      const ss = document.getElementById('success-screen');
      ss.classList.add('visible');
      document.body.style.overflow = '';
      launchConfetti();
      setTimeout(() => {
        cart = {};
        updateCartUI();
        document.getElementById('cust-name').value = '';
        document.getElementById('cust-phone').value = '';
        document.getElementById('cust-address').value = '';
      }, 500);
    } else {
      showToast('❌ Order could not be saved. Call us directly.');
    }
  } catch (err) {
    console.error('Order error:', err);
    showToast('❌ Could not reach server. Please call us.');
  }
}

function closeSuccess() {
  document.getElementById('success-screen').classList.remove('visible');
  // Show order status overlay
  const overlay = document.getElementById('status-overlay');
  overlay.style.display = 'block';
  startOrderStatus();
}

function closeStatusOverlay() {
  document.getElementById('status-overlay').style.display = 'none';
  navigateTo('home');
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
      msg.textContent = '👨‍🍳 Your food is being prepared!';
      eta.textContent = 'Almost there...';
      setTimeout(() => {
        document.getElementById('conn-2').classList.add('active');
        setTimeout(() => {
          document.getElementById('step-2').classList.remove('active');
          document.getElementById('step-2').classList.add('done');
          document.getElementById('step-3').classList.add('active');
          msg.textContent = '🔥 Your order is ready!';
          eta.textContent = 'Hot food incoming 🚀';
        }, 1500);
      }, 4000);
    }, 1200);
  }, 1500);
}

/* ─────────────────────────────────────────────
   PROFILE
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

  // Prefill order form
  if (document.getElementById('cust-name')) document.getElementById('cust-name').value = name;
  if (document.getElementById('cust-phone')) document.getElementById('cust-phone').value = phone;
  if (document.getElementById('cust-address')) document.getElementById('cust-address').value = addr;

  showToast('✅ Profile saved!');
}

function loadProfile() {
  const name = localStorage.getItem('bf_name') || '';
  const phone = localStorage.getItem('bf_phone') || '';
  const addr = localStorage.getItem('bf_address') || '';

  const fields = [
    ['profile-name', name], ['profile-phone', phone], ['profile-address', addr],
    ['cust-name', name], ['cust-phone', phone], ['cust-address', addr],
  ];
  fields.forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el && val) el.value = val;
  });
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
      <div style="margin-top:8px;">
        <span class="order-history-total">${formatPrice(order.total)}</span>
      </div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────
   TOAST
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
  }, 2500);
}

/* ─────────────────────────────────────────────
   CONFETTI
─────────────────────────────────────────────*/
function launchConfetti() {
  const canvas = document.getElementById('success-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 100 }, () => ({
    x: canvas.width * 0.5 + (Math.random() - 0.5) * 200,
    y: canvas.height * 0.4,
    vx: (Math.random() - 0.5) * 14,
    vy: -(Math.random() * 16 + 5),
    r: Math.random() * 7 + 3,
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
      p.vy += 0.35; p.vx *= 0.99;
      p.rot += p.rotV; p.life -= 0.013;
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
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const dots = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
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
      ctx.globalAlpha = 0.5;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    dots.forEach((a, i) => {
      dots.slice(i + 1).forEach(b => {
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(232,64,10,${0.06 * (1 - dist / 100)})`;
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
   CUSTOM CURSOR — desktop only
─────────────────────────────────────────────*/
function initCursor() {
  if (window.innerWidth <= 768) return;
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

  document.querySelectorAll('button, a, .menu-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
  });
}

/* ─────────────────────────────────────────────
   HERO ANIMATION
─────────────────────────────────────────────*/
function initHeroAnimation() {
  if (window.innerWidth <= 768) return;

  gsap.fromTo('#hero-logo',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', delay: 0.3 }
  );
  gsap.fromTo('#hero-tagline',
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: 'power2.out', delay: 0.7 }
  );
  gsap.fromTo('#hero-cta',
    { opacity: 0 },
    { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 1.0 }
  );
  gsap.fromTo('#hero-stats',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 1.3 }
  );
}

/* ─────────────────────────────────────────────
   EXPOSE TO HTML
─────────────────────────────────────────────*/
window.navigateTo = navigateTo;
window.switchTab = switchTab;
window.placeOrder = placeOrder;
window.closeSuccess = closeSuccess;
window.closeStatusOverlay = closeStatusOverlay;
window.saveProfile = saveProfile;

/* ─────────────────────────────────────────────
   BOOT
─────────────────────────────────────────────*/
document.addEventListener('DOMContentLoaded', () => {
  // Build menus
  buildMenuGrid('main', 'grid-main');
  buildMenuGrid('protein', 'grid-protein');
  buildMenuGrid('drinks', 'grid-drinks');

  // Init systems
  initHeroCanvas();
  initHeroAnimation();
  initCursor();
  loadProfile();
  renderOrderHistory();

  // Set initial tab indicator
  setTimeout(() => {
    const activeTab = document.querySelector('.menu-tab.active');
    if (activeTab) moveTabIndicator(activeTab);
  }, 100);
});