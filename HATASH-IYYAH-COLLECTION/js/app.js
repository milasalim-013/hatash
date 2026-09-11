/* ====== APP CORE ====== */
let cart = loadCart(); // persistent cart (restored from localStorage)
let cfg = { material: 'Leather', engrave: '', wrap: 'Standard' };

function findP(id) {
    return products.find(p => p.id === id)
        || defaultProducts.find(p => p.id === id)
        || { id: 0, title: { en: 'Bespoke Piece', sw: 'Kipande Maalum' }, desc: { en: '', sw: '' }, category: 'Atelier', emoji: '✨', price: 500000 };
}
let cfgBase = findP(9).price;

/* ====== PRELOADER ====== */
window.addEventListener('load', () => {
    setTimeout(() => {
        const p = document.getElementById('preloader');
        p.classList.add('done');
        setTimeout(() => p.remove(), 900);
        document.body.classList.add('ready');
    }, 2200);
});

/* ====== CUSTOM LUXURY CURSOR ====== */
(function initCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
    if (window.matchMedia('(hover: none)').matches) return;
    window.addEventListener('mousemove', (e) => {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });
    (function ringLoop() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
        requestAnimationFrame(ringLoop);
    })();
})();

/* ====== MAGNETIC BUTTONS ====== */
document.addEventListener('mouseover', (e) => {
    const m = e.target.closest('.btn-magnetic');
    if (m) {
        const move = (ev) => {
            const r = m.getBoundingClientRect();
            const x = ev.clientX - r.left - r.width / 2;
            const y = ev.clientY - r.top - r.height / 2;
            m.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
        };
        const leave = () => { m.style.transform = ''; };
        m.addEventListener('mousemove', move);
        m.addEventListener('mouseleave', leave, { once: true });
    }
});

/* ====== PARALLAX SCROLL ====== */
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const bg = document.getElementById('hero-bg');
    if (bg) bg.style.transform = `translate3d(0, ${y * 0.3}px, 0)`;
    const marquee = document.querySelector('.marquee-track');
    if (marquee) marquee.style.transform = `translateX(${-(y * 0.1) % 200}px)`;
});

/* ====== REVEAL ON SCROLL ====== */
(function initReveal() {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            if (en.isIntersecting) en.target.classList.add('revealed');
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.section-head, .product-card, .cfg-grid, .vault-inner')
        .forEach(el => { el.classList.add('reveal-target'); io.observe(el); });
})();

/* ====== SEARCH ====== */
document.getElementById('search-toggle').addEventListener('click', () => {
    document.getElementById('search-overlay').classList.remove('hidden');
    document.getElementById('search-input').focus();
});
document.getElementById('search-close').addEventListener('click', () => {
    document.getElementById('search-overlay').classList.add('hidden');
});
document.getElementById('search-input').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const res = document.getElementById('search-results');
    if (!q) { res.innerHTML = ''; return; }
    const matches = products.filter(p =>
        (p.title.en + p.title.sw + p.category).toLowerCase().includes(q));
    res.innerHTML = matches.map(p => `
        <button class="search-result" onclick="addToCart(${p.id}); document.getElementById('search-overlay').classList.add('hidden');">
            ${p.image
                ? `<img src="${p.image}" alt="" class="search-thumb">`
                : `<span>${p.emoji}</span>`}
            <span style="flex:1;text-align:left">${escapeHtml(p.title[currentLang])}</span>
            <span class="search-price">${fmt(p.price)}</span>
        </button>`).join('') || `<p class="search-none">No match</p>`;
});

/* ====== CURRENCY SWITCHER ====== */
document.getElementById('currency-switcher').addEventListener('click', (e) => {
    if (e.target.closest('.currency-menu button')) {
        const cur = e.target.closest('.currency-menu button').dataset.cur;
        currentCurrency = cur;
        document.getElementById('currency-current').textContent = cur;
        document.getElementById('currency-switcher').querySelector('.currency-menu').classList.add('hidden');
        renderProducts(); updateCart();
    } else {
        const menu = document.getElementById('currency-switcher').querySelector('.currency-menu');
        menu.classList.toggle('hidden');
    }
});

function fmt(priceInTZS) {
    const c = CURRENCIES[currentCurrency];
    const val = priceInTZS * c.rate;
    if (currentCurrency === 'TZS') return c.symbol + ' ' + Math.round(val).toLocaleString();
    return c.symbol + (val >= 1000 ? val.toFixed(2).toLocaleString() : val.toFixed(4));
}

/* ====== LANGUAGE ====== */
function setLang(lang) {
    currentLang = lang === 'sw' ? 'sw' : 'en';
    try { localStorage.setItem('hatash_lang', currentLang); } catch (e) {}
    document.getElementById('lang-sw').classList.toggle('active', currentLang === 'sw');
    document.getElementById('lang-en').classList.toggle('active', currentLang === 'en');
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        const val = translations[currentLang][key];
        if (val !== undefined) el.textContent = val;
    });
    renderProducts();
    updateCart();
}

/* ====== WISHLIST ====== */
window.toggleWish = function (id) {
    const now = toggleWishlist(id);
    document.querySelectorAll('.wish-btn[data-id="' + id + '"]')
        .forEach(b => b.classList.toggle('wished', now));
};

/* ====== PRODUCTS RENDER ====== */
function renderProducts() {
    products = loadProducts();
    const grid = document.getElementById('product-grid');
    if (!products.length) {
        grid.innerHTML = `<div class="empty-store">${currentLang === 'sw'
            ? 'Bidhaa hazipatikani kwa sasa — karibuni tena.'
            : 'No products available at the moment — please return soon.'}</div>`;
        return;
    }
    grid.innerHTML = products.map((p, i) => `
        <article class="product-card reveal-target ${i % 3 === 0 ? 'prod-wide' : ''}" data-idx="${i}">
            <div class="prod-media">
                <button class="wish-btn ${isWished(p.id) ? 'wished' : ''}" data-id="${p.id}" onclick="toggleWish(${p.id})" aria-label="Save">♥</button>
                ${p.image
                    ? `<img src="${p.image}" alt="${escapeHtml(p.title[currentLang])}" class="prod-img" loading="lazy">`
                    : `<span class="prod-emoji">${p.emoji}</span>
                       <div class="prod-img2">${p.emoji}</div>`}
                <span class="prod-cat">${p.category}</span>
                <button class="quick-add" onclick="addToCart(${p.id})">${t('quickAdd')}</button>
            </div>
            <div class="prod-info">
                <h3 class="prod-title serif">${escapeHtml(p.title[currentLang])}</h3>
                <p class="prod-desc">${escapeHtml(p.desc[currentLang])}</p>
                <div class="prod-row">
                    <span class="prod-price">${fmt(p.price)}</span>
                    <button class="prod-btn" onclick="openViz(${i})">360°</button>
                </div>
            </div>
        </article>
    `).join('');
}

/* ====== CART ====== */
function addToCart(id) {
    const p = products.find(x => x.id === id);
    const ex = cart.find(x => x.id === id);
    if (ex) ex.qty++; else cart.push({ ...p, qty: 1 });
    saveCartLocal(cart);
    updateCart();
    const badge = document.getElementById('cart-count');
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 300);
}
function changeQty(id, d) {
    const it = cart.find(x => x.id === id);
    if (!it) return;
    it.qty += d;
    if (it.qty <= 0) cart = cart.filter(x => x.id !== id);
    saveCartLocal(cart);
    updateCart();
}
function cartTotal() {
    return cart.reduce((s, x) => s + x.price * x.qty, 0);
}
function updateCart() {
    const count = cart.reduce((s, x) => s + x.qty, 0);
    document.getElementById('cart-count').textContent = count;
    const items = document.getElementById('cart-items');
    if (!cart.length) {
        items.innerHTML = `<p class="empty-note">${t('cartEmpty')}</p>`;
    } else {
        items.innerHTML = cart.map(x => `
            <div class="co-item">
                <div class="co-item-name">
                    ${x.image
                        ? `<img src="${x.image}" alt="" class="cart-thumb">`
                        : `<span class="cart-emoji">${x.emoji}</span>`}
                    <span>${escapeHtml(x.title[currentLang])}</span>
                </div>
                <div class="co-item-ctrl">
                    <button onclick="changeQty(${x.id},-1)">−</button>
                    <span>${x.qty}</span>
                    <button onclick="changeQty(${x.id},1)">+</button>
                </div>
                <div class="co-item-price">${fmt(x.price * x.qty)}</div>
            </div>`).join('');
    }
    document.getElementById('cart-total').textContent = fmt(cartTotal());
}
function toggleCart() {
    document.getElementById('cart-overlay').classList.toggle('hidden');
    updateCart();
}
document.getElementById('cart-toggle').addEventListener('click', toggleCart);

/* ====== CHECKOUT ====== */
function checkoutNow() {
    if (!cart.length) { alert(currentLang === 'sw' ? 'Uchaguzi wako ni tupu!' : 'Your selection is empty!'); return; }
    document.getElementById('cart-overlay').classList.add('hidden');
    const coItems = document.getElementById('co-items');
    coItems.innerHTML = cart.map(x => `
        <div class="co-item">
            <span class="co-item-name">
                ${x.image
                    ? `<img src="${x.image}" alt="" class="cart-thumb">`
                    : `<span class="cart-emoji">${x.emoji}</span>`}
                <span>${escapeHtml(x.title[currentLang])} × ${x.qty}</span>
            </span>
            <span class="co-item-price">${fmt(x.price * x.qty)}</span>
        </div>`).join('');
    document.getElementById('co-total').textContent = fmt(cartTotal());
    document.getElementById('checkout-overlay').classList.remove('hidden');
}
function closeCheckout() { document.getElementById('checkout-overlay').classList.add('hidden'); }

function sendOrder() {
    const msg = document.getElementById('co-message').value.trim();
    const lines = cart.map(x =>
        `• ${x.title[currentLang]} ×${x.qty} — ${fmt(x.price * x.qty)}`).join('\n');
    const total = fmt(cartTotal());

    const items = cart.map(x => ({
        id: x.id, title: x.title, emoji: x.emoji, price: x.price, qty: x.qty,
        category: x.category || '', image: x.image || null
    }));

    let refLine = '';
    const ref = sessionUser()
        ? placeOrder({ items, totalTZS: cartTotal(), currency: currentCurrency, note: msg, source: 'store' })
        : null;
    if (ref) refLine = `\nOrder Ref: ${ref}`;

    const text = encodeURIComponent(
        `✨ HATASH & IYYAH COLLECTION — Private Order\n\n${lines}\n\nTotal: ${total}${refLine}\nGift Note: ${msg || '—'}\n\nCurrency: ${currentCurrency}\nThank you.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    cart = [];
    saveCartLocal(cart);
    updateCart();
    closeCheckout();
}

/* ====== CONFIGURATOR ====== */
function selectMat(btn) {
    const mats = { 'Leather': findP(9), 'Vitenge': findP(3), 'Beaded': findP(5) };
    if (mats[btn.dataset.mat]) cfgBase = mats[btn.dataset.mat].price;
    cfg.material = btn.dataset.mat;
    if (btn.dataset.mat === 'Vitenge') document.getElementById('cfg-emoji').textContent = '🧵';
    else if (btn.dataset.mat === 'Beaded') document.getElementById('cfg-emoji').textContent = '📿';
    else document.getElementById('cfg-emoji').textContent = '👜';
    document.querySelectorAll('#cfg-material button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateCfgTotal();
}
function selectWrap(btn) {
    cfg.wrap = btn.dataset.wrap;
    document.querySelectorAll('#cfg-wrap button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateCfgTotal();
}
function updateCfgTotal() {
    let total = cfgBase;
    if (cfg.engrave) total += 150000;
    if (cfg.wrap !== 'Standard') total += 80000;
    document.getElementById('cfg-total-value').textContent = fmt(total);
    document.getElementById('cfg-price').textContent = fmt(total);
    document.getElementById('cfg-name').textContent =
        `${cfg.material} — ${cfg.engrave ? `“${cfg.engrave}”` : ''} ${cfg.wrap}`.trim();
    window._cfgTotal = total;
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#cfg-material button').forEach(b =>
        b.addEventListener('click', () => selectMat(b)));
    document.querySelectorAll('#cfg-wrap button').forEach(b =>
        b.addEventListener('click', () => selectWrap(b)));
    document.getElementById('cfg-engrave').addEventListener('input', (e) => {
        cfg.engrave = e.target.value; updateCfgTotal();
    });
    updateCfgTotal();
});
function cfgCheckout() {
    const total = window._cfgTotal || cfgBase;
    const lines =
        `• Bespoke ${cfg.material} — ${fmt(total)}\n` +
        `  Engraving: ${cfg.engrave || 'None'}\n  Wrapping: ${cfg.wrap}`;

    let refLine = '';
    const ref = sessionUser()
        ? placeOrder({
            items: [{
                id: 'bespoke', title: { en: `Bespoke ${cfg.material}`, sw: `Maalum ${cfg.material}` },
                emoji: '👜', price: total, qty: 1, category: 'Atelier', image: null
            }],
            totalTZS: total, currency: currentCurrency, note: 'Atelier order', source: 'atelier'
        }) : null;
    if (ref) refLine = `\nOrder Ref: ${ref}`;

    const text = encodeURIComponent(
        `✨ HATASH & IYYAH — Atelier Order\n\n${lines}${refLine}\n\nTotal: ${fmt(total)}\nCurrency: ${currentCurrency}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
}

/* ====== 3D VIZ LAUNCH ====== */
function openViz(idx) {
    const stage = document.getElementById('visualizer');
    stage.scrollIntoView({ behavior: 'smooth' });
    stage.classList.add('active');
    document.querySelectorAll('.viz-thumb').forEach((b, i) =>
        b.classList.toggle('active', i === (idx % 3)));
}

/* ====== VIP VAULT ====== */
function openVault() { document.getElementById('vault-overlay').classList.remove('hidden'); }
function closeVault() { document.getElementById('vault-overlay').classList.add('hidden'); }
function submitVault() {
    const v = document.getElementById('vault-pass').value.trim().toUpperCase();
    if (v === VAULT_PASSCODE.toUpperCase()) {
        document.getElementById('vault-overlay').classList.add('hidden');
        alert(currentLang === 'sw'
            ? 'Karibu kwenye Chumba Binafsi. Access imethibitishwa.'
            : 'Welcome to the Private Suite. Access granted.');
    } else {
        document.getElementById('vault-error').classList.remove('hidden');
    }
}

/* ====== AI CONCIERGE ====== */
function toggleConcierge() {
    document.getElementById('concierge').classList.toggle('hidden');
}
function sendChat() {
    const input = document.getElementById('concierge-input');
    const q = input.value.trim();
    if (!q) return;
    const body = document.getElementById('concierge-body');
    body.insertAdjacentHTML('beforeend', `<div class="chat-msg user">${escapeHtml(q)}</div>`);
    input.value = '';
    const replies = [
        `Certainly. May I suggest our ${findP(1).title[currentLang]} — a signature piece.`,
        `For a truly private sale, connect with our concierge on WhatsApp ${DISPLAY_PHONE}.`,
        `Our ${findP(9).title[currentLang]} is exclusively available in the Private Suite.`,
        `Allow me to arrange a bespoke atelier session for you, Madam/Sir.`
    ];
    setTimeout(() => {
        body.insertAdjacentHTML('beforeend',
            `<div class="chat-msg bot">${replies[Math.floor(Math.random() * replies.length)]}</div>`);
        body.scrollTop = body.scrollHeight;
    }, 900);
}
document.getElementById('concierge-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChat();
});
function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
}

/* ====== INIT ====== */
document.addEventListener('DOMContentLoaded', () => {
    setLang(currentLang); // apply persisted language + re-render
    renderProducts();
    updateCart();
});
