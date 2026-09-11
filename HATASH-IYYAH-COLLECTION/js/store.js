/* ====== CUSTOMER DATA LAYER (browser-local, Tanzania-only) ======
   Accounts, sessions, orders, wishlist and addresses are stored in
   localStorage. Used by both the storefront (index.html) and the
   Buyer Center (account.html). */

const USERS_KEY = 'hatash_users';
const SESSION_KEY = 'hatash_session';
const ORDERS_KEY = 'hatash_orders';
const WISHLIST_KEY = 'hatash_wishlist';

function _get(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
}
function _set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

/* ====== USERS & SESSION ====== */
function getUsers() { return _get(USERS_KEY, []); }
function saveUsers(users) { _set(USERS_KEY, users); }
function findUser(phone) { return getUsers().find(u => u.phone === String(phone).trim()) || null; }

function registerUser(name, phone, password) {
    name = String(name || '').trim();
    phone = String(phone || '').trim();
    password = String(password || '');
    if (!name || !phone || !password) return { ok: false, error: 'REQUIRED' };
    if (getUsers().some(u => u.phone === phone)) return { ok: false, error: 'USED' };
    const user = {
        id: 'u' + Date.now(),
        name, phone, password,
        createdAt: new Date().toISOString()
    };
    const users = getUsers();
    users.push(user);
    saveUsers(users);
    localStorage.setItem(SESSION_KEY, user.phone);
    return { ok: true, user };
}

function loginUser(phone, password) {
    const user = getUsers().find(u =>
        u.phone === String(phone || '').trim() && u.password === String(password || ''));
    if (!user) return { ok: false, error: 'BAD' };
    localStorage.setItem(SESSION_KEY, user.phone);
    return { ok: true, user };
}

function logoutUser() { localStorage.removeItem(SESSION_KEY); }

function sessionUser() { return findUser(localStorage.getItem(SESSION_KEY) || ''); }

function updateUser(patch) {
    const users = getUsers();
    const i = users.findIndex(u => u.phone === (localStorage.getItem(SESSION_KEY) || ''));
    if (i === -1) return null;
    users[i] = { ...users[i], ...patch };
    saveUsers(users);
    return users[i];
}

/* ====== WISHLIST (per browser) ====== */
function getWishlist() { return _get(WISHLIST_KEY, []).map(Number); }
function isWished(id) { return getWishlist().includes(Number(id)); }
function toggleWishlist(id) {
    id = Number(id);
    const w = getWishlist();
    const i = w.indexOf(id);
    if (i > -1) w.splice(i, 1); else w.push(id);
    _set(WISHLIST_KEY, w);
    return isWished(id);
}

/* ====== ORDERS ====== */
function getOrdersAll() { return _get(ORDERS_KEY, []); }
function saveOrders(o) { _set(ORDERS_KEY, o); }

function placeOrder(order) {
    const user = sessionUser();
    if (!user) return null;
    const orders = getOrdersAll();
    const ref = 'HI-' + Date.now().toString(36).toUpperCase();
    orders.unshift({
        ref,
        userId: user.id,
        createdAt: new Date().toISOString(),
        status: 'pending',
        ...order
    });
    saveOrders(orders);
    return ref;
}

function myOrders() {
    const user = sessionUser();
    if (!user) return [];
    return getOrdersAll().filter(o => o.userId === user.id);
}

function findOrder(ref) { return getOrdersAll().find(o => o.ref === ref) || null; }

/* ====== ADDRESS BOOK (per user) ====== */
function addrKey() {
    const u = sessionUser();
    return u ? 'hatash_addresses_' + u.id : 'hatash_addresses_anon';
}
function getUserAddresses() { return _get(addrKey(), []); }
function saveUserAddresses(list) { _set(addrKey(), list); }
function addAddress(addr) { const l = getUserAddresses(); l.push(addr); saveUserAddresses(l); return l; }
function removeAddress(index) { const l = getUserAddresses(); l.splice(index, 1); saveUserAddresses(l); return l; }

/* ====== CART persistence helper (shared with storefront) ====== */
const CART_KEY = 'hatash_cart';
function loadCart() { return _get(CART_KEY, []); }
function saveCartLocal(cart) { _set(CART_KEY, cart); }