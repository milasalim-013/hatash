/* ====== ADMIN PANEL LOGIC ====== */
let editingId = null;
let loginOK = false;
let pendingImage = null; // data URL or null

function toast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2200);
}

function enter() {
    document.getElementById('login-gate').classList.add('hidden');
    document.getElementById('admin-panel').classList.remove('hidden');
    renderTable();
}

function logout() {
    sessionStorage.removeItem('hi_admin');
    location.reload();
}

/* ----- LOGIN ----- */
document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('hi_admin') === '1') enter();
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const pw = document.getElementById('login-pass').value;
        if (pw === ADMIN_PASSWORD) {
            sessionStorage.setItem('hi_admin', '1');
            document.getElementById('login-error').classList.add('hidden');
            enter();
        } else {
            document.getElementById('login-error').classList.remove('hidden');
        }
    });
});

/* ----- RENDER ----- */
function esc(s) {
    const d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
}

function fmtTZS(n) {
    return Number(n || 0).toLocaleString();
}

function renderTable() {
    const tbody = document.getElementById('product-table');
    tbody.innerHTML = products.map((p, i) => `
        <tr class="row-hover">
            <td class="px-4 py-3 text-obsidian/40">${i + 1}</td>
            <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                    ${p.image
                        ? `<img src="${esc(p.image)}" alt="" class="w-10 h-10 rounded-lg object-cover border rose-border shrink-0">`
                        : `<span class="text-2xl shrink-0">${p.emoji || '📦'}</span>`}
                    <div>
                        <div class="font-medium">${esc(p.title.en)}</div>
                        <div class="text-obsidian/40 text-xs">${esc(p.title.sw) || ''}</div>
                    </div>
                </div>
            </td>
            <td class="px-4 py-3 hidden md:table-cell text-obsidian/50">${esc(p.category || '')}</td>
            <td class="px-4 py-3 text-right text-rose font-medium">${fmtTZS(p.price)}</td>
            <td class="px-4 py-3 text-right whitespace-nowrap">
                <button onclick="startEdit(${p.id})" class="rounded-full px-3 py-1.5 text-xs border rose-border hover:bg-rose/20 transition mr-1">Edit</button>
                <button onclick="delProduct(${p.id})" class="rounded-full px-3 py-1.5 text-xs border border-red-400/40 text-red-500 hover:bg-red-500/20 transition">Delete</button>
            </td>
        </tr>
    `).join('');

    if (!products.length) {
        tbody.innerHTML = `<tr><td colspan="5" class="px-4 py-8 text-center text-obsidian/30">No products yet. Click “+ Add Product”.</td></tr>`;
    }

    const total = products.reduce((s, p) => s + (Number(p.price) || 0), 0);
    document.getElementById('stat-total').textContent = products.length;
    document.getElementById('stat-price').textContent = products.length
        ? 'TZS ' + fmtTZS(Math.round(total / products.length)) : '—';
    document.getElementById('stat-src').textContent =
        localStorage.getItem(PRODUCTS_KEY) ? 'local' : 'defaults saved on edit';
}

/* ----- FORM ----- */
function openForm() {
    editingId = null;
    document.getElementById('form-title').textContent = 'Add Product';
    ['f-titleEn', 'f-titleSw', 'f-descEn', 'f-descSw', 'f-category', 'f-emoji', 'f-price'].forEach(id =>
        document.getElementById(id).value = '');
    document.getElementById('f-emoji').value = '📦';
    pendingImage = null;
    resetImagePreview();
    document.getElementById('form-card').classList.remove('hidden');
    document.getElementById('f-titleEn').focus();
}

function startEdit(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    editingId = id;
    document.getElementById('form-title').textContent = 'Edit Product';
    document.getElementById('f-titleEn').value = p.title.en || '';
    document.getElementById('f-titleSw').value = p.title.sw || '';
    document.getElementById('f-descEn').value = p.desc ? (p.desc.en || '') : '';
    document.getElementById('f-descSw').value = p.desc ? (p.desc.sw || '') : '';
    document.getElementById('f-category').value = p.category || '';
    document.getElementById('f-emoji').value = p.emoji || '📦';
    document.getElementById('f-price').value = String(p.price || '');
    pendingImage = p.image || null;
    resetImagePreview();
    if (pendingImage) showImagePreview(pendingImage);
    document.getElementById('form-card').classList.remove('hidden');
    document.getElementById('form-card').scrollIntoView({ behavior: 'smooth' });
}

function closeForm() { document.getElementById('form-card').classList.add('hidden'); }

/* ----- IMAGE UPLOAD ----- */
function resetImagePreview() {
    const box = document.getElementById('f-image-preview');
    box.innerHTML = '<span class="text-3xl text-obsidian/30">🖼</span>';
    document.getElementById('f-image-remove').classList.add('hidden');
}
function showImagePreview(dataUrl) {
    const box = document.getElementById('f-image-preview');
    box.innerHTML = `<img src="${dataUrl}" alt="Preview" class="w-full h-full object-cover">`;
    document.getElementById('f-image-remove').classList.remove('hidden');
}
function clickImageUpload() { document.getElementById('f-image-input').click(); }

function onImagePick(input) {
    const file = input.files && input.files[0];
    input.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        toast('Please choose an image file (JPG or PNG).');
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const MAX = 800;
            let w = img.width, h = img.height;
            const scale = Math.min(1, MAX / Math.max(w, h));
            w = Math.round(w * scale); h = Math.round(h * scale);
            const canvas = document.createElement('canvas');
            canvas.width = w; canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            pendingImage = canvas.toDataURL('image/jpeg', 0.8);
            showImagePreview(pendingImage);
            toast('Photo added.');
        };
        img.onerror = () => toast('Could not read that image.');
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function removeImage() {
    pendingImage = null;
    resetImagePreview();
    toast('Photo removed.');
}

function saveProduct() {
    const val = (id) => document.getElementById(id).value.trim();
    const titleEn = val('f-titleEn');
    const price = Number(val('f-price'));
    if (!titleEn || !price || price <= 0) {
        toast('Name (English) and a valid TZS price are required.');
        return;
    }

    const data = {
        title: { en: titleEn, sw: val('f-titleSw') || titleEn },
        desc: { en: val('f-descEn') || '', sw: val('f-descSw') || '' },
        category: val('f-category') || 'Collection',
        emoji: val('f-emoji') || '📦',
        price
    };
    if (pendingImage) data.image = pendingImage;
    else data.image = null;

    if (editingId) {
        const idx = products.findIndex(x => x.id === editingId);
        if (idx > -1) products[idx] = { ...products[idx], ...data, id: editingId };
        toast('Product updated.');
    } else {
        const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({ ...data, id: newId });
        toast('Product added.');
    }
    saveProducts();
    renderTable();
    closeForm();
}

function delProduct(id) {
    if (!confirm('Delete this product?')) return;
    products = products.filter(p => p.id !== id);
    saveProducts();
    renderTable();
    toast('Product deleted.');
}

/* ----- TOOLS ----- */
function resetAll() {
    if (!confirm('Restore the default catalog? This overwrites your current products.')) return;
    resetProducts();
    renderTable();
    toast('Default catalog restored.');
}

function exportJSON() {
    const blob = new Blob([JSON.stringify(products, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'hatash-products-backup.json';
    a.click();
    toast('Backup downloaded.');
}

function importJSON(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const arr = JSON.parse(reader.result);
            if (!Array.isArray(arr)) throw new Error('bad');
            products = arr;
            saveProducts();
            renderTable();
            toast('Products imported (' + arr.length + ').');
        } catch (e) {
            toast('Import failed — invalid file.');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}