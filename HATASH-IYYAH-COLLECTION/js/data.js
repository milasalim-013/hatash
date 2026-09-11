/* ====== CORE DATA ====== */
const WHATSAPP_NUMBER = "255628827777";
const DISPLAY_PHONE = "0628 827 777";
const VAULT_PASSCODE = "HATASH"; // Private Suite access code
const ADMIN_PASSWORD = "HATASH"; // Admin Panel password (change this!)
const PRODUCTS_KEY = "hatash_products"; // localStorage key for the product catalog

/* ====== CURRENCIES ====== */
const CURRENCIES = {
    TZS: { rate: 1, symbol: "Tsh", name: "Tanzania Shilling" },
    USD: { rate: 0.00037, symbol: "$", name: "US Dollar" },
    EUR: { rate: 0.00034, symbol: "€", name: "Euro" },
    BTC: { rate: 0.0000000059, symbol: "₿", name: "Bitcoin" },
    ETH: { rate: 0.00000011, symbol: "Ξ", name: "Ethereum" }
};
let currentCurrency = "TZS";

/* ====== TANZANIA REGIONS (delivery destinations) ====== */
const TANZANIA_REGIONS = [
    "Dar es Salaam", "Arusha", "Mwanza", "Dodoma", "Mbeya", "Morogoro", "Tanga",
    "Kilimanjaro", "Tabora", "Kigoma", "Iringa", "Shinyanga", "Kagera", "Rukwa",
    "Ruvuma", "Singida", "Pwani", "Manyara", "Katavi", "Songwe", "Simiyu", "Geita",
    "Njombe", "Kaskazini Unguja", "Kusini Unguja", "Mjini Magharibi", "Kaskazini Pemba", "Kusini Pemba"
];

/* ====== ORDER STATUS LABELS ====== */
const ORDER_STATUS = {
    pending:   { sw: "Inasubiri Malipo", en: "Awaiting Payment" },
    confirmed: { sw: "Imethibitishwa",   en: "Confirmed" },
    shipped:   { sw: "Imesafirishwa",    en: "Shipped" },
    delivered: { sw: "Imefikishwa",      en: "Delivered" },
    cancelled: { sw: "Imeghairiwa",      en: "Cancelled" }
};

/* ====== PRODUCTS (Tanzanian luxury) ====== */
const defaultProducts = [
    {
        id: 1, category: "Haute Couture", emoji: "👗",
        title: { en: "18k-Gilded Kitenge Gown", sw: "Vazi la Kitenge la Dhahabu" },
        desc: { en: "Hand-embroidered ceremonial gown", sw: "Vazi la sherehe lililopambwa kwa mkono" },
        price: 1450000
    },
    {
        id: 2, category: "Heritage Textile", emoji: "🧣",
        title: { en: "Royal Kanga, Silk Edition", sw: "Kanga ya Kifalme, Silk" },
        desc: { en: "Limited silk kanga, hand-dyed", sw: "Kanga ya silk maalum" },
        price: 480000
    },
    {
        id: 3, category: "Artisan Fabric", emoji: "🧵",
        title: { en: "Vitenge de Luxe", sw: "Vitenge Bora" },
        desc: { en: "Premium woven vitenge fabric", sw: "Kitambaa bora cha vitenge" },
        price: 165000
    },
    {
        id: 4, category: "Menswear", emoji: "👔",
        title: { en: "Obsidian Kanzu", sw: "Kanzu ya Obsidian" },
        desc: { en: "Tailored ceremonial kanzu", sw: "Kanzu maalum" },
        price: 2280000
    },
    {
        id: 5, category: "Haute Jewelry", emoji: "📿",
        title: { en: "Maasai Beaded Collar", sw: "Ngozi ya Shanga" },
        desc: { en: "Handcrafted Maasai beaded collar", sw: "Shanga ya Kimaasai" },
        price: 890000
    },
    {
        id: 6, category: "Shoes", emoji: "👡",
        title: { en: "Crocodylus Leather Sandals", sw: "Viatu vya Ngozi" },
        desc: { en: "Handmade exotic leather sandals", sw: "Viatu vya ngozi bora" },
        price: 1250000
    },
    {
        id: 7, category: "Menswear", emoji: "👕",
        title: { en: "Serengeti Batik Shirt", sw: "Shati la Batik" },
        desc: { en: "Limited batik, hand-painted", sw: "Shati la batik la kipekee" },
        price: 720000
    },
    {
        id: 8, category: "Heritage Textile", emoji: "🟥",
        title: { en: "Maasai Shuka, Imperial", sw: "Shuka ya Kimaasai" },
        desc: { en: "Authentic ceremonial shuka", sw: "Shuka halisi ya sherehe" },
        price: 950000
    },
    {
        id: 9, category: "Accessories", emoji: "👜",
        title: { en: "Nile Leather Handbag", sw: "Mkoba wa Ngozi" },
        desc: { en: "Bespoke structured handbag", sw: "Mkoba maalum wa ngozi" },
        price: 3100000
    },
    {
        id: 10, category: "Fine Art", emoji: "🎨",
        title: { en: "Tinga Tinga, Original", sw: "Sanamu ya Tinga Tinga" },
        desc: { en: "Original hand-painted artwork", sw: "Sanamu halisi ya mkono" },
        price: 1150000
    },
    {
        id: 11, category: "Gourmet", emoji: "☕",
        title: { en: "Kilimanjaro AA Reserve", sw: "Kahawa ya Kilimanjaro" },
        desc: { en: "Single-estate reserve coffee", sw: "Kahawa bora ya shamba" },
        price: 240000
    },
    {
        id: 12, category: "Gourmet", emoji: "🌶️",
        title: { en: "Zanzibar Spice Collection", sw: "Viungo vya Zanzibar" },
        desc: { en: "Curation of rare island spices", sw: "Mchanganyiko wa viungo" },
        price: 180000
    }
];

/* ====== PRODUCT STORAGE (load from localStorage, else use defaults) ====== */
let products = loadProducts();
function loadProducts() {
    try {
        const raw = localStorage.getItem(PRODUCTS_KEY);
        if (raw) {
            const arr = JSON.parse(raw);
            if (Array.isArray(arr) && arr.length) return arr;
        }
    } catch (e) {}
    return JSON.parse(JSON.stringify(defaultProducts));
}
function saveProducts() {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}
function resetProducts() {
    products = JSON.parse(JSON.stringify(defaultProducts));
    saveProducts();
}

/* ====== TRANSLATIONS ====== */
const translations = {
    sw: {
        heroEyebrow: "Maison Binafsi ya Tanzania",
        heroTitle: "HATASH NA IYYAH",
        heroSub: "Mkusanyiko wa kipekee, kwa wateja wa hali ya juu. Kwa mwaliko tu.",
        heroCta: "Ingia kwenye Maison",
        collEyebrow: "Mkusanyiko Bora",
        collTitle: "Mkusanyiko Wetu",
        collSub: "Kila kipande ni sherehe ya ufundi wa Tanzania.",
        vizEyebrow: "Atelier ya Nafasi",
        vizTitle: "Ukaguzi wa 360°",
        vizHint: "Ukaguzi wa 3D wa moja kwa moja — vuta kuzungusha",
        cfgEyebrow: "Atelier Maalum",
        cfgTitle: "Sanidi Bidhaa Yako",
        cfgSub: "Nyenzo, mchongo, na upakaji wa zawadi — kukufaa wewe.",
        cfglabel2: "Mchongo Maalum",
        cfglabel3: "Ufungaji wa Zawadi",
        cfgTotal: "Jumla",
        cfgCta: "Agiza Kipande Hiki",
        vaultTitle: "Chumba cha Kipekee",
        vaultSub: "Mkusanyiko wa Uhuru na Vito. Kwa mwaliko tu.",
        vaultCta: "Omba Kuingia",
        vaultPrompt: "Weka Namba ya Kiingilio",
        vaultEnter: "Ingia",
        vaultErr: "Namba si sahihi. Kuingia kumekataliwa.",
        cartTitle: "Uchaguzi Wako",
        cartTotal: "Jumla",
        cartCta: "Checkout — Concierge Binafsi",
        coTitle: "Malipo Salama",
        coTotal: "Jumla",
        coCta: "Thibitisha kwa Concierge (WhatsApp)",
        coNote: "Agizo lako litapelekwa kwa Concierge Binafsi kwenye 0628 827 777 ili kupanga malipo.",
        conName: "Msaidizi Binafsi wa Ununuzi",
        conStatus: "Mtandaoni · Kwa usiri",
        conWelcome: "Karibu. Naweza kukusaidiaje katika ununuzi wako?",
        aboutEyebrow: "Maison",
        aboutTitle: "Imefanywa Tanzania, Ivaliwa Duniani",
        aboutText: "HATASH AND IYYAH COLLECTION ni maison binafsi ya Tanzania yenye kujitolea kwa ubora, usiri, na heshima ya urithi wa Afrika.",
        footContact: "Concierge Binafsi · ",
        footCopy: "© 2026 HATASH AND IYYAH COLLECTION · Tanzania · Haki zote zimehifadhiwa",
        addToCart: "Ongeza",
        cartEmpty: "Uchaguzi wako ni tupu.",
        quickAdd: "Ongeza"
    },
    en: {
        heroEyebrow: "A Private Tanzanian Maison",
        heroTitle: "HATASH & IYYAH",
        heroSub: "Bespoke collections, crafted for the discerning. By invitation only.",
        heroCta: "Enter the Maison",
        collEyebrow: "Signature Collections",
        collTitle: "The Collection",
        collSub: "Each piece, a celebration of Tanzanian craftsmanship.",
        vizEyebrow: "Spatial Atelier",
        vizTitle: "360° Inspection",
        vizHint: "Interactive 3D inspection — drag to rotate",
        cfgEyebrow: "Bespoke Atelier",
        cfgTitle: "Configure Your Piece",
        cfgSub: "Materials, engravings, and gift presentation — tailored to you.",
        cfglabel2: "Custom Engraving",
        cfglabel3: "Gift Wrapping",
        cfgTotal: "Total",
        cfgCta: "Order This Piece",
        vaultTitle: "The Private Suite",
        vaultSub: "Unreleased & High-Jewelry Collections. Access by invitation only.",
        vaultCta: "Request Access",
        vaultPrompt: "Enter Private Access Code",
        vaultEnter: "Enter",
        vaultErr: "Invalid code. Access denied.",
        cartTitle: "Your Selection",
        cartTotal: "Total",
        cartCta: "Checkout — Private Concierge",
        coTitle: "Secure Checkout",
        coTotal: "Total",
        coCta: "Confirm via Concierge (WhatsApp)",
        coNote: "Your order is relayed to our Private Concierge at 0628 827 777 to arrange payment.",
        conName: "Private Shopping Assistant",
        conStatus: "Online · Discreet",
        conWelcome: "Welcome. How may I assist your acquisition, Madam/Sir?",
        aboutEyebrow: "The Maison",
        aboutTitle: "Crafted in Tanzania, Worn Worldwide",
        aboutText: "HATASH AND IYYAH COLLECTION is a private Tanzanian maison dedicated to artisanal excellence, discretion, and the celebration of African heritage.",
        footContact: "Private Concierge · ",
        footCopy: "© 2026 HATASH AND IYYAH COLLECTION · Tanzania · All rights reserved",
        addToCart: "Add",
        cartEmpty: "Your selection is empty.",
        quickAdd: "Add"
    }
};
let currentLang = (function () {
    try { return localStorage.getItem('hatash_lang') === 'sw' ? 'sw' : 'en'; } catch (e) { return 'en'; }
})();

const t = (key) => translations[currentLang][key] || translations.en[key] || key;
