# HATASH AND IYYAH COLLECTION — Ultra-Luxury Digital Flagship

An invite-only digital flagship experience for a private Tanzanian maison.
Aesthetic: Pure White · Rose Gold (#B76E79) · Soft Blush (#F4C2C2) · Obsidian Black (#0A0A0A).

## Experience Systems
1. **Cinematic & Micro-Interaction Layer**
   - Opulent preloader with signature H&I animation + curtain reveal
   - Custom luxury cursor (dot + trailing ring)
   - Magnetic buttons, parallax scroll, glassmorphism nav dock
   - Editorial asymmetric product grid with hover states / sliding quick-add panels

2. **AI Private Client Concierge**
   - Floating "Private Shopping Assistant" chat bubble (✦) in the corner
   - Rose-gold concierge panel with contextual recommendations

3. **VIP "Private Suite" Vault**
   - Gated section, passcode protected
   - Default passcode: `HATASH`  — change in `js/data.js` (`VAULT_PASSCODE`)

4. **360° Spatial Visualizer**
   - WebGL-ready canvas stage (drag-rotating geometry rendered at 60fps)
   - Placeholder scaffold ready for a Three.js / GLTF product model integration

5. **Bespoke Product Configurator**
   - Step-by-step UI: Material → Custom Engraving → Gift Wrapping
   - Live price computation with engraving & wrapping premiums

6. **Seamless Checkout → Concierge**
   - Distraction-free one-page checkout with security badges
   - Instantly relays the order to WhatsApp: **0628 827 777** for payment arrangement
   - Gift message field included

## Live Currency Switcher
TZS (default) · USD · EUR · BTC · ETH

## 👤 Buyer Center (Customer Accounts)
Open **`account.html`** (or click the **👤** icon in the storefront navigation).

Tanzania-first customer panel — no China features. Everything is stored in the browser (`localStorage`).

- **Customer accounts** — sign up / log in with a Tanzanian phone number (e.g. `07XX XXX XXX`) + password
- **Dashboard** — stats: total orders, total spent (TZS), saved items, address count
- **My Orders** — full order history with status (Pending/Confirmed/Shipped/Delivered/Cancelled), item detail view, and **Reorder**
- **Saved Items** — wishlist (tap **♥** on any product card in the store); add saved items straight to cart
- **Address Book** — Tanzanian delivery addresses with region picker (all 28 regions incl. Unguja & Pemba)
- **Profile** — edit your name, view member-since date, change password

**How it connects to the store:** when a logged-in customer checks out (cart or Bespoke Atelier order), the order is saved to their account with a **`HI-XXXXXX` reference** and the WhatsApp message (0628 827 777) carries that reference so payment is matched to the order.

> Orders are only saved when a customer is signed in — the WhatsApp payment flow still works for guests (no order reference).

Data layer: `js/store.js` (keys `hatash_users`, `hatash_session`, `hatash_orders`, `hatash_wishlist`, `hatash_addresses_*`, `hatash_cart`).

## 🛠 Admin Panel — How to Add Products
Open **`admin.html`** (or click the discreet **⚙ Admin** link in the storefront footer).

1. **Login** with the admin password (default: `HATASH` — change it in `js/data.js` → `ADMIN_PASSWORD`)
2. Click **+ Add Product** and fill in:
   - Name (English) + Jina (Kiswahili)
   - Description (English) + Maelezo (Kiswahili)
   - Category, **Product Photo (Upload)** — pick a JPG/PNG; it is auto-resized to ≤800px and stored in the browser, Emoji/Icon is the fallback when no photo
   - Price (in **TZS**)
3. Click **Save Product** — it appears on the storefront **instantly** (browser refresh to be sure).

You can also **Edit**, **Delete**, **Export** (JSON backup), **Import** (restore), and **Reset Defaults**.
Products are stored in the browser (`localStorage → hatash_products`), so on the same device/browser they persist.

> ⚠️ Change `ADMIN_PASSWORD` before going live. Prices must be entered in TZS (the site auto-converts for USD/EUR/BTC/ETH display).

## Files
```
HATASH-IYYAH-COLLECTION/
├── index.html         # Flagship experience shell
├── account.html       # Buyer Center — customer accounts/orders/saved/addresses/profile
├── admin.html         # Admin panel — add/edit/delete products
├── css/style.css      # Ultra-luxury design system
└── js/
    ├── data.js        # Products, currencies, translations, WhatsApp number, vault + admin passwords
    ├── store.js       # Customer data layer (users, session, orders, wishlist, addresses, cart)
    ├── three.js       # 3D WebGL visualizer scaffold
    ├── app.js         # Experience logic (preloader, cursor, cart, vault, concierge, configurator)
    ├── account.js     # Buyer Center logic (auth, tabs, orders, saved, addresses, profile)
    └── admin.js       # Admin panel logic (CRUD, export/import)
```

## Key Configuration (`js/data.js`)
- `WHATSAPP_NUMBER` — payment/concierge handoff target (default `255628827777` → 0628 827 777)
- `VAULT_PASSCODE` — Private Suite access code (default `HATASH`)
- `ADMIN_PASSWORD` — Admin panel login (default `HATASH` — **change before going live**)
- `products[]` — add/edit listings (price stored in TZS; auto-converted by currency switcher)

## Run
Simply open `index.html` in any modern browser (Chrome / Edge / Safari / Firefox).
No build step required — Tailwind is loaded via CDN and behaviors are vanilla JS.

© 2026 HATASH AND IYYAH COLLECTION · Tanzania