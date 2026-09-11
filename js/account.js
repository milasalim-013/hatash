/* ====== BUYER CENTER (Alibaba-style customer panel, Tanzania-only) ====== */
let acLang = (function () {
    try { return localStorage.getItem('hatash_lang') || 'sw'; } catch (e) { return 'sw'; }
})();

const A = {
    sw: {
        buyerCenter: "Kituo cha Mnunuzi", login: "Ingia", register: "Sajili",
        lPhone: "Namba ya Simu (mfano 07XX XXX XXX)", signIn: "Ingia",
        createAccount: "Unda Akaunti", backShop: "← Rudi kwenye Duka",
        buyerTitle: "Kituo cha Mnunuzi", logout: "Toka",
        stOrders: "Maagizo", stSpent: "Jumla ya Matumizi", stSaved: "Bidhaa Zilizopendwa", stAddresses: "Anwani",
        tabOverview: "Muhtasari", tabOrders: "Maagizo Yangu", tabSaved: "Bidhaa Zilizopendwa",
        tabAddresses: "Anwani Zangu", tabProfile: "Taarifa",
        ovWelcome: "Chagua na Ununue kwa Utulivu.",
        ovText: "Tembelea duka letu, ongeza bidhaa kwenye kikapu, na ukimaliza agizo litapelekwa kwa WhatsApp kwa malipo ya haraka.",
        ovShop: "Nunua Sasa", recentOrders: "Maagizo ya Hivi Karibuni", viewAll: "Ona yote →",
        ordersTitle: "Maagizo Yangu", savedTitle: "Bidhaa Zilizopendwa",
        addrTitle: "Anwani Zangu", addAddress: "+ Ongeza Anwani", addrFormTitle: "Anwani ya Usafirishaji",
        save: "Hifadhi", cancel: "Ghairi", profileTitle: "Taarifa na Mpangilio",
        infoTitle: "Taarifa za Akaunti", fullName: "Jina Kamili", phone: "Namba ya Simu",
        memberSince: "Nimejiunga", saveChanges: "Hifadhi Mabadiliko",
        passTitle: "Badilisha Password", updatePass: "Sasisha Password",
        greeting: "Karibu", greetSub: "Meneja wa akaunti yako ya HATASH & IYYAH.",
        noOrders: "Bado huna maagizo. Nunua sasa kuanza!",
        noSaved: "Huna bidhaa zilizopendwa bado. Bonyeza ❤ kwenye bidhaa ili kuzihifadhi.",
        noAddresses: "Hujawai kuongeza anwani.",
        placedOn: "Iliyowekwa", total: "Jumla", items: "Bidhaa", status: "Hali", details: "Ona Maelezo",
        reorder: "Agiza Tena", back: "← Rudi", orderRef: "Rejea", note: "Ujumbe",
        qty: "idadi", product: "Bidhaa", price: "Bei",
        emptyCartCta: "Ili kuagiza tena, kikapu kimejazwa. Nenda kwenye duka na ukamilishe checkout.",
        errLogin: "Namba au password si sahihi.",
        errUsed: "Namba hii tayari imesajiliwa. Ingia chini.",
        errRequired: "Jaza taarifa zote zinazohitajika.",
        errPass: "Password hazilingani.",
        errOldPass: "Password ya sasa si sahihi.",
        registered: "Akaunti imeundwa. Karibu!",
        loggedIn: "Umeingia. Karibu tena!",
        loggedOut: "Umetoka kwenye akaunti.",
        savedAdded: "Imeongezwa kwenye kikapu. Nenda duka ukimalize!",
        savedRemoved: "Imeondolewa kwenye zilizopendwa.",
        ordersEmpty: "Bado huna maagizo.",
        welcomeBack: "Karibu tena",
        addressAdded: "Anwani imeongezwa.",
        addressRemoved: "Anwani imefutwa.",
        profileUpdated: "Taarifa zimehifadhiwa.",
        passUpdated: "Password imesasishwa.",
        addToCart: "Ongeza Kikapuni",
        regionPlh: "Mkoa (Region)",
        bothLang: "a"
    },
    en: {
        buyerCenter: "Buyer Center", login: "Login", register: "Sign Up",
        lPhone: "Phone number (e.g. 07XX XXX XXX)", signIn: "Sign In",
        createAccount: "Create Account", backShop: "← Back to Shop",
        buyerTitle: "Buyer Center", logout: "Logout",
        stOrders: "Orders", stSpent: "Total Spent", stSaved: "Saved Items", stAddresses: "Addresses",
        tabOverview: "Overview", tabOrders: "My Orders", tabSaved: "Saved Items",
        tabAddresses: "Address Book", tabProfile: "Profile",
        ovWelcome: "Shop with confidence.",
        ovText: "Browse the boutique, add pieces to your cart, and your order is sent to WhatsApp for fast payment.",
        ovShop: "Shop Now", recentOrders: "Recent Orders", viewAll: "View all →",
        ordersTitle: "My Orders", savedTitle: "Saved Items",
        addrTitle: "Address Book", addAddress: "+ Add Address", addrFormTitle: "Delivery Address",
        save: "Save", cancel: "Cancel", profileTitle: "Profile & Settings",
        infoTitle: "Account Information", fullName: "Full Name", phone: "Phone Number",
        memberSince: "Joined", saveChanges: "Save Changes",
        passTitle: "Change Password", updatePass: "Update Password",
        greeting: "Welcome", greetSub: "Your HATASH & IYYAH account hub. Everything you need is here.",
        noOrders: "You have no orders yet. Shop now to begin!",
        noSaved: "No saved items yet. Tap ❤ on a product to save it.",
        noAddresses: "You haven't added any address yet.",
        placedOn: "Placed on", total: "Total", items: "Items", status: "Status", details: "Details",
        reorder: "Reorder", back: "← Back", orderRef: "Ref", note: "Note",
        qty: "qty", product: "Product", price: "Price",
        emptyCartCta: "To reorder, the cart has been refilled. Go to the shop and complete checkout.",
        errLogin: "Incorrect number or password.",
        errUsed: "This number is already registered. Please sign in.",
        errRequired: "Please fill all required fields.",
        errPass: "Passwords do not match.",
        errOldPass: "Current password is incorrect.",
        registered: "Account created. Welcome!",
        loggedIn: "Signed in. Welcome back!",
        loggedOut: "Signed out.",
        savedAdded: "Added to cart. Finish your purchase at the shop!",
        savedRemoved: "Removed from saved items.",
        ordersEmpty: "You have no orders yet.",
        welcomeBack: "Welcome back",
        addressAdded: "Address added.",
        addressRemoved: "Address removed.",
        profileUpdated: "Profile updated.",
        passUpdated: "Password updated.",
        addToCart: "Add to Cart",
        regionPlh: "Region (Mkoa)",
        bothLang: "b"
    }
};
const at = (key) => (A[acLang] && A[acLang][key] != null) ? A[acLang][key] : A.en[key] || key;

function toast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2400);
}

function setAccountLang(l) {
    acLang = l;
    try { localStorage.setItem('hatash_lang', l); } catch (e) {}
    syncLangButtons();
    applyAText();
    const active = document.querySelector('.tab-btn.active');
    const cur = active && active.getAttribute('onclick') ? active.getAttribute('onclick').match(/'(.*)'/)[1] : 'overview';
    renderSection(cur || 'overview');
}

function applyAText() {
    document.querySelectorAll('[data-at]').forEach(el => {
        const k = el.getAttribute('data-at');
        if (k && A.sw[k] && !el.hasAttribute('data-ph-deco')) el.textContent = at(k);
    });
}

/* ====== AUTH ====== */
function showAuthTab(tab) {
    document.getElementById('login-form').classList.toggle('hidden', tab !== 'login');
    document.getElementById('register-form').classList.toggle('hidden', tab !== 'register');
    document.getElementById('tab-login').className = 'flex-1 py-2.5 text-xs tracking-[0.25em] uppercase rounded-xl transition ' + (tab === 'login' ? 'status-confirmed font-semibold' : 'text-white/40 hover:text-white');
    document.getElementById('tab-register').className = 'flex-1 py-2.5 text-xs tracking-[0.25em] uppercase rounded-xl transition ' + (tab === 'register' ? 'status-confirmed font-semibold' : 'text-white/40 hover:text-white');
}

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const r = loginUser(document.getElementById('login-phone').value, document.getElementById('login-pass').value);
    if (r.ok) {
        toast(at('loggedIn'));
        enterDashboard();
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
});

document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const phone = document.getElementById('reg-phone').value;
    const pass = document.getElementById('reg-pass').value;
    const pass2 = document.getElementById('reg-pass2').value;
    const err = document.getElementById('register-error');
    if (pass !== pass2) { err.textContent = at('errPass'); err.classList.remove('hidden'); return; }
    const r = registerUser(name, phone, pass);
    if (r.ok) {
        err.classList.add('hidden');
        toast(at('registered'));
        enterDashboard();
    } else {
        err.textContent = r.error === 'USED' ? at('errUsed') : at('errRequired');
        err.classList.remove('hidden');
    }
});

function doLogout() {
    logoutUser();
    toast(at('loggedOut'));
    enterAuth();
}

function enterAuth() {
    document.getElementById('auth-gate').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('login-form').reset();
    document.getElementById('register-form').reset();
    document.getElementById('login-error').classList.add('hidden');
    document.getElementById('register-error').classList.add('hidden');
}

function enterDashboard() {
    const u = sessionUser();
    if (!u) { enterAuth(); return; }
    document.getElementById('auth-gate').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('ac-name').textContent = u.name;
    document.getElementById('ac-avatar').textContent = (u.name || 'H').charAt(0).toUpperCase();
    document.getElementById('p-phone').value = u.phone;
    document.getElementById('p-since').textContent = new Date(u.createdAt).toLocaleDateString();
    document.getElementById('greeting').textContent = at('greeting') + ', ' + u.name;
    applyAText();
    syncLangButtons();
    fillRegionSelect();
    renderSection('overview');
}

function syncLangButtons() {
    const sw = document.getElementById('ac-lang-sw');
    const en = document.getElementById('ac-lang-en');
    sw.className = 'px-3 py-1.5 text-[10px] tracking-widest transition ' + (acLang === 'sw' ? 'text-blush' : 'text-white/50');
    en.className = 'px-3 py-1.5 text-[10px] tracking-widest transition ' + (acLang === 'en' ? 'text-blush' : 'text-white/50');
}

function fillRegionSelect() {
    const sel = document.getElementById('a-region');
    sel.innerHTML = '<option value="" class="text-black" selected>' + esc(at('regionPlh')) + '</option>';
    TANZANIA_REGIONS.forEach(r => {
        const o = document.createElement('option');
        o.value = r; o.textContent = r; o.className = 'text-black';
        sel.appendChild(o);
    });
}

/* ====== TABS ====== */
function showTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => {
        const t = (b.getAttribute('onclick') || '').match(/'(.*)'/)[1];
        b.classList.toggle('active', t === tab);
    });
    renderSection(tab);
}

function renderSection(tab) {
    ['overview', 'orders', 'saved', 'addresses', 'profile'].forEach(t =>
        document.getElementById('sec-' + t).classList.toggle('hidden', t !== tab));
    if (tab === 'overview') renderOverview();
    if (tab === 'orders') renderOrders();
    if (tab === 'saved') renderSaved();
    if (tab === 'addresses') renderAddresses();
    if (tab === 'profile') renderProfile();
}

/* ====== STATS ====== */
function refreshStats() {
    const orders = myOrders();
    const spent = orders.reduce((s, o) => s + (o.totalTZS || 0), 0);
    document.getElementById('st-orders').textContent = orders.length;
    document.getElementById('st-spent').textContent = 'Tsh ' + spent.toLocaleString();
    document.getElementById('st-saved').textContent = getWishlist().length;
    document.getElementById('st-addrs').textContent = getUserAddresses().length;
    return orders;
}

function fmtTZS(n) { return 'Tsh ' + Number(n || 0).toLocaleString(); }

/* ====== OVERVIEW ====== */
function renderOverview() {
    const orders = refreshStats();
    const list = document.getElementById('ov-orders');
    if (!orders.length) {
        list.innerHTML = `<div class="card rounded-2xl p-5 text-sm text-white/50" data-at-literal="noOrders">${at('noOrders')}</div>`;
    } else {
        list.innerHTML = orders.slice(0, 3).map(o => orderRow(o)).join('');
    }
}

/* ====== ORDERS ====== */
function renderOrders() {
    refreshStats();
    const orders = myOrders();
    const list = document.getElementById('orders-list');
    document.getElementById('order-detail').classList.add('hidden');
    if (!orders.length) {
        list.innerHTML = `<div class="card rounded-2xl p-5 text-sm text-white/50">${at('noOrders')}</div>`;
    } else {
        list.innerHTML = orders.map(o => orderRow(o)).join('');
    }
}

function orderRow(o) {
    const st = ORDER_STATUS[o.status] || ORDER_STATUS.pending;
    const dd = new Date(o.createdAt);
    return `
        <div class="card rounded-2xl p-4 row-hover transition">
            <div class="flex flex-wrap items-center gap-3">
                <div class="min-w-[150px]">
                    <div class="font-serif text-lg text-white">${o.ref}</div>
                    <div class="text-[10px] text-white/40 tracking-widest uppercase">${at('placedOn')} ${dd.toLocaleDateString()}</div>
                </div>
                <div class="hidden sm:block text-white/50 text-sm">${(o.items || []).length} ${at('items')}</div>
                <div class="ml-auto flex items-center gap-4">
                    <div class="text-rose font-semibold text-sm">${fmtTZS(o.totalTZS)}</div>
                    <span class="px-3 py-1 text-[10px] tracking-wider rounded-full status-${o.status || 'pending'}">${st[acLang]}</span>
                </div>
            </div>
            <div class="flex gap-3 mt-3 text-[11px]">
                <button onclick="showOrderDetail('${o.ref}')" class="text-rose hover:text-blush transition">${at('details')} →</button>
                <button onclick="reorder('${o.ref}')" class="text-white/50 hover:text-white transition">↻ ${at('reorder')}</button>
            </div>
        </div>`;
}

function showOrderDetail(ref) {
    const o = findOrder(ref);
    const wrap = document.getElementById('order-detail');
    const list = document.getElementById('orders-list');
    list.classList.add('hidden');
    wrap.classList.remove('hidden');
    if (!o) { wrap.innerHTML = '<p class="text-white/50">Not found.</p>'; return; }
    const st = ORDER_STATUS[o.status] || ORDER_STATUS.pending;
    const dd = new Date(o.createdAt);
    wrap.innerHTML = `
        <button onclick="closeOrderDetail()" class="text-xs text-rose hover:text-blush transition mb-4">${at('back')}</button>
        <div class="flex flex-wrap items-center gap-4 mb-2">
            <h3 class="font-serif text-2xl text-white">${o.ref}</h3>
            <span class="px-3 py-1 text-[10px] tracking-wider rounded-full status-${o.status || 'pending'}">${st[acLang]}</span>
        </div>
        <p class="text-white/40 text-xs mb-4">${at('placedOn')} ${dd.toLocaleString()}</p>
        <div class="space-y-2 mb-5">
            ${(o.items || []).map(it => `
                <div class="flex items-center gap-3 bg-white/5 border rose-border rounded-xl px-3 py-2.5">
                    ${it.image
                        ? `<img src="${it.image}" alt="" class="w-10 h-10 rounded-lg object-cover border rose-border">`
                        : `<span class="text-xl">${it.emoji || '📦'}</span>`}
                    <div class="flex-1 min-w-0">
                        <div class="text-sm truncate">${(it.title ? it.title[acLang] : it.title) || ''}</div>
                        <div class="text-white/40 text-[10px]">${it.qty} × ${fmtTZS(it.price)}</div>
                    </div>
                    <div class="text-white/80 text-sm">${fmtTZS((it.price || 0) * (it.qty || 1))}</div>
                </div>`).join('')}
        </div>
        <div class="flex justify-between border-t rose-border pt-3 mb-2 text-sm">
            <span class="text-white/50">${at('total')}</span>
            <span class="text-rose font-semibold">${fmtTZS(o.totalTZS)}</span>
        </div>
        ${o.note ? `<p class="text-white/40 text-xs">&nbsp;${at('note')}: "${o.note}"</p>` : ''}
        <p class="text-white/40 text-[11px] mt-3">${at('orderRef')}: ${o.ref} · Payment arranged via WhatsApp 0628 827 777</p>
        <button onclick="reorder('${o.ref}')" class="btn-dark rounded-full px-6 py-2.5 mt-4 text-[10px] tracking-[0.25em] uppercase no-underline" style="display:inline-block">↻ ${at('reorder')}</button>
    `;
}

function closeOrderDetail() {
    document.getElementById('order-detail').classList.add('hidden');
    document.getElementById('orders-list').classList.remove('hidden');
}

function reorder(ref) {
    const o = findOrder(ref);
    if (!o) return;
    const cart = loadCart();
    (o.items || []).forEach(it => {
        const ex = cart.find(c => c.id === it.id);
        if (ex) ex.qty += it.qty; else cart.push({ ...it, qty: it.qty });
    });
    saveCartLocal(cart);
    toast(at('savedAdded') + ' ' + at('emptyCartCta'));
    setTimeout(() => { window.location.href = 'index.html'; }, 1400);
}

/* ====== SAVED / WISHLIST ====== */
function renderSaved() {
    refreshStats();
    const grid = document.getElementById('saved-grid');
    const ids = getWishlist();
    const list = (loadProducts()).filter(p => ids.includes(p.id));
    if (!list.length) {
        grid.innerHTML = `<div class="col-span-full card rounded-2xl p-5 text-sm text-white/50">${at('noSaved')}</div>`;
        return;
    }
    grid.innerHTML = list.map(p => `
        <div class="card rounded-2xl overflow-hidden group">
            <div class="w-full h-32 bg-gradient-to-br from-rose/20 to-transparent flex items-center justify-center overflow-hidden">
                ${p.image
                    ? `<img src="${p.image}" class="w-full h-full object-cover">`
                    : `<span class="text-5xl">${p.emoji || '📦'}</span>`}
            </div>
            <div class="p-3">
                <div class="text-sm truncate">${p.title[acLang]}</div>
                <div class="text-rose text-sm font-semibold mt-1">${fmtTZS(p.price)}</div>
                <div class="flex gap-2 mt-3">
                    <button onclick="wishAddToCart(${p.id})" class="flex-1 btn-dark rounded-full py-2 text-[9px] tracking-[0.2em] uppercase" data-at="addToCart">Add to Cart</button>
                    <button onclick="wishRemove(${p.id})" class="wish-heart rounded-full border rose-border px-3 py-2 text-xs hover:bg-red-500/20 transition" title="❤">💔</button>
                </div>
            </div>
        </div>`).join('');
}

function wishAddToCart(id) {
    const p = (loadProducts()).find(x => x.id === Number(id));
    if (!p) return;
    const cart = loadCart();
    const ex = cart.find(c => c.id === p.id);
    if (ex) ex.qty = (ex.qty || 1) + 1; else cart.push({ ...p, qty: 1 });
    saveCartLocal(cart);
    toast(at('savedAdded'));
}
function wishRemove(id) {
    toggleWishlist(id);
    renderSaved();
    toast(at('savedRemoved') || 'Removed from saved.');
}

/* ====== ADDRESSES ====== */
function renderAddresses() {
    refreshStats();
    const list = document.getElementById('addr-list');
    const addrs = getUserAddresses();
    if (!addrs.length) {
        list.innerHTML = `<div class="md:col-span-2 card rounded-2xl p-5 text-sm text-white/50">${at('noAddresses')}</div>`;
        return;
    }
    list.innerHTML = addrs.map((a, i) => `
        <div class="card rounded-2xl p-5">
            <div class="flex items-start justify-between gap-2">
                <div>
                    <div class="font-medium">${esc(a.name)}</div>
                    <div class="text-white/50 text-xs mt-1 leading-5">${esc(a.region)}<br>${esc(a.city)}${a.street ? ', ' + esc(a.street) : ''}<br>📞 ${esc(a.phone)}</div>
                </div>
                <button onclick="removeAddressAt(${i})" class="text-red-300/70 hover:text-red-300 text-xs shrink-0 transition">✕ ${at('cancel')}</button>
            </div>
        </div>`).join('');
}

function openAddressForm() { document.getElementById('addr-form').classList.remove('hidden'); }
function closeAddressForm() { document.getElementById('addr-form').classList.add('hidden'); }

function saveAddress() {
    const addr = {
        name: document.getElementById('a-name').value.trim(),
        region: document.getElementById('a-region').value,
        city: document.getElementById('a-city').value.trim(),
        street: document.getElementById('a-street').value.trim(),
        phone: document.getElementById('a-phone').value.trim()
    };
    if (!addr.name || !addr.region || !addr.city || !addr.phone) { toast(at('errRequired')); return; }
    addAddress(addr);
    document.getElementById('addr-form').classList.add('hidden');
    document.getElementById('a-name').value = '';
    document.getElementById('a-city').value = '';
    document.getElementById('a-street').value = '';
    document.getElementById('a-phone').value = '';
    renderAddresses();
    toast(at('addressAdded'));
}

function removeAddressAt(i) {
    removeAddress(i);
    renderAddresses();
    toast(at('addressRemoved'));
}

function esc(s) {
    const d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
}

/* ====== PROFILE ====== */
function renderProfile() {
    const u = sessionUser();
    if (!u) return;
    document.getElementById('p-name').value = u.name;
    document.getElementById('p-phone').value = u.phone;
    document.getElementById('p-since').textContent = new Date(u.createdAt).toLocaleDateString();
}

function saveProfile() {
    const name = document.getElementById('p-name').value.trim();
    if (!name) { toast(at('errRequired')); return; }
    updateUser({ name });
    document.getElementById('ac-name').textContent = name;
    document.getElementById('ac-avatar').textContent = name.charAt(0).toUpperCase();
    document.getElementById('greeting').textContent = at('greeting') + ', ' + name;
    toast(at('profileUpdated'));
}

function changePassword() {
    const u = sessionUser();
    const oldp = document.getElementById('p-oldpass').value;
    const newp = document.getElementById('p-newpass').value;
    if (!u || u.password !== oldp) { toast(at('errOldPass')); return; }
    if (!newp) { toast(at('errRequired')); return; }
    updateUser({ password: newp });
    document.getElementById('p-oldpass').value = '';
    document.getElementById('p-newpass').value = '';
    toast(at('passUpdated'));
}

/* ====== INIT ====== */
document.addEventListener('DOMContentLoaded', () => {
    fillRegionSelect();
    if (sessionUser()) { enterDashboard(); } else { enterAuth(); applyAText(); }
});