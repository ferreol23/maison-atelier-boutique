// =========================================================
// MAISON ATELIER — Logique de la boutique
// Fonctionne seule ; animations.js (GSAP) ne fait qu'embellir.
// =========================================================

// ⬇⬇⬇ À PERSONNALISER ⬇⬇⬇
const WHATSAPP_NUMBER = "33600000000"; // format international, sans + ni espaces
const SHOP_NAME = "Maison Atelier";
const SHIPPING_FREE = 80;              // livraison offerte à partir de ce montant (€)

// Catalogue
// shape : "tshirt" | "hoodie" | "sweater" | "jacket" | "trench" | "pants" | "shorts" |
//         "dress" | "skirt" | "shoe" | "cap" | "beanie" | "scarf" | "bag"
// oldPrice (facultatif) = article en soldes · isNew (facultatif) = étiquette « Nouveau »
const PRODUCTS = [
  // Femme
  { id: 1,  name: "Trench en laine mélangée",   category: "femme", price: 189, shape: "trench",  colors: ["#c9a978", "#2a2621", "#796456"], isNew: true },
  { id: 2,  name: "Robe fluide en viscose",     category: "femme", price: 119, shape: "dress",   colors: ["#262626", "#9c3540"] },
  { id: 3,  name: "Robe midi en lin",           category: "femme", price: 139, oldPrice: 169, shape: "dress", colors: ["#efe4d0", "#7d8f6b"] },
  { id: 4,  name: "Chemise en soie",            category: "femme", price: 149, shape: "tshirt",  colors: ["#f5efe4", "#2a2621"], isNew: true },
  { id: 5,  name: "Pull en cachemire",          category: "femme", price: 165, shape: "sweater", colors: ["#efe4d0", "#2a2621", "#876e4a"], isNew: true },
  { id: 6,  name: "Pantalon large en laine",    category: "femme", price: 139, shape: "pants",   colors: ["#2d2a22", "#7a6a4f"] },
  { id: 7,  name: "Jupe plissée moutarde",      category: "femme", price: 109, oldPrice: 139, shape: "skirt", colors: ["#c48c22"] },
  { id: 8,  name: "Veste en jean brut",         category: "femme", price: 129, shape: "jacket",  colors: ["#5e7696", "#3a4a62"] },
  { id: 9,  name: "T-shirt coton bio",          category: "femme", price: 39,  shape: "tshirt",  colors: ["#f5efe4", "#2a2621", "#a8b99a"] },
  { id: 10, name: "Short tailleur",             category: "femme", price: 85,  shape: "shorts",  colors: ["#1f1b17", "#c9ae85"] },
  // Homme
  { id: 11, name: "Chemise oxford",             category: "homme", price: 95,  shape: "tshirt",  colors: ["#d9c9a8", "#8a9bb0", "#f5efe4"], isNew: true },
  { id: 12, name: "Trench coat classique",      category: "homme", price: 229, shape: "trench",  colors: ["#b89a68", "#2a2621"], isNew: true },
  { id: 13, name: "Pull col rond en laine",     category: "homme", price: 125, shape: "sweater", colors: ["#2d2a22", "#7a2e3b", "#2f4468"] },
  { id: 14, name: "Pantalon chino",             category: "homme", price: 95,  shape: "pants",   colors: ["#8a5a3c", "#2d2a22", "#c9ae85"] },
  { id: 15, name: "T-shirt coton bio",          category: "homme", price: 39,  shape: "tshirt",  colors: ["#f5efe4", "#2a2621", "#2f4468"] },
  { id: 16, name: "Veste en laine chevrons",    category: "homme", price: 259, oldPrice: 319, shape: "jacket", colors: ["#5a4e3a"] },
  { id: 17, name: "Sweat à capuche chiné",      category: "homme", price: 89,  shape: "hoodie",  colors: ["#9a9ca3", "#2a2621"] },
  { id: 18, name: "Jean droit indigo",          category: "homme", price: 119, shape: "pants",   colors: ["#3d5273"] },
  { id: 19, name: "Short en lin",               category: "homme", price: 65,  shape: "shorts",  colors: ["#d9c9a8", "#2a2621"] },
  // Enfant
  { id: 20, name: "T-shirt enfant",             category: "enfant", price: 24, shape: "tshirt",  colors: ["#f0cd4f", "#d4584a", "#8dbbe0"] },
  { id: 21, name: "Sweat enfant",               category: "enfant", price: 45, oldPrice: 59, shape: "hoodie", colors: ["#8dbbe0", "#f0b6c6"] },
  { id: 22, name: "Robe enfant à volants",      category: "enfant", price: 55, shape: "dress",   colors: ["#f0b6c6", "#efe4d0"], isNew: true },
  { id: 23, name: "Pantalon enfant en velours", category: "enfant", price: 48, shape: "pants",   colors: ["#6b8a4f", "#8a5a3c"] },
  // Chaussures
  { id: 24, name: "Mocassins en cuir",          category: "chaussures", price: 189, shape: "shoe", colors: ["#8a5a3c", "#2a2621"] },
  { id: 25, name: "Baskets en toile",           category: "chaussures", price: 115, shape: "shoe", colors: ["#efe4d0", "#2a2621"], isNew: true },
  { id: 26, name: "Bottines en cuir",           category: "chaussures", price: 229, oldPrice: 279, shape: "shoe", colors: ["#1a1813"] },
  { id: 27, name: "Derbies cuir cognac",        category: "chaussures", price: 199, shape: "shoe", colors: ["#8a5a3c"] },
  // Accessoires
  { id: 28, name: "Écharpe en laine",           category: "accessoires", price: 79,  shape: "scarf",  colors: ["#8a5a3c", "#2a2621"] },
  { id: 29, name: "Casquette en laine",         category: "accessoires", price: 59,  shape: "cap",    colors: ["#1a1813", "#7a6a4f"] },
  { id: 30, name: "Casquette en toile",         category: "accessoires", price: 45,  shape: "cap",    colors: ["#d8c3a0", "#2a2621", "#2f4468"] },
  { id: 31, name: "Bonnet en mérinos",          category: "accessoires", price: 49,  oldPrice: 65, shape: "beanie", colors: ["#8f9096", "#d1a22e", "#7a2e3b"] },
  { id: 32, name: "Étole en cachemire",         category: "accessoires", price: 125, shape: "scarf",  colors: ["#b89a68", "#2a2621", "#b5443c"], isNew: true },
  { id: 33, name: "Sac cabas en cuir",          category: "accessoires", price: 229, shape: "bag",    colors: ["#8a5a3c", "#1a1813"], isNew: true },
  { id: 34, name: "Pochette matelassée",        category: "accessoires", price: 149, shape: "bag",    colors: ["#2a2621", "#efe4d0", "#9c3540"] },
];
// ⬆⬆⬆ Fin de la personnalisation ⬆⬆⬆

const CATEGORY_LABELS = {
  femme: "Femme", homme: "Homme", enfant: "Enfant", chaussures: "Chaussures", accessoires: "Accessoires",
};
// Sélections transversales (duo de cartes)
const SELECTIONS = {
  mailles: ["sweater", "hoodie"],
  manteaux: ["trench", "jacket"],
};
const SIZES = {
  clothing: ["XS", "S", "M", "L", "XL"],
  shoe: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
  one: ["Taille unique"],
};
const ONE_SIZE = ["cap", "beanie", "scarf", "bag"];

const ICON = {
  heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" stroke-linejoin="round"/></svg>',
  x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>',
};

// ---------- Illustrations des vêtements (style packshot) ----------
const SHAPES = {
  tshirt:  { d: "M60 32 L86 20 Q100 44 114 20 L140 32 L172 62 L148 82 L136 72 L136 180 L64 180 L64 72 L52 82 L28 62 Z" },
  hoodie:  { d: "M62 40 L84 26 Q100 50 116 26 L138 40 L178 124 L153 134 L138 102 L138 180 L62 180 L62 102 L47 134 L22 124 Z", extra: '<path d="M84 26 Q100 70 116 26" fill="none"/><path d="M80 136 H120 V162 H80 Z" fill="none"/>' },
  sweater: { d: "M62 40 L86 28 Q100 48 114 28 L138 40 L176 124 L153 134 L138 102 L138 180 L62 180 L62 102 L47 134 L24 124 Z", extra: '<path d="M62 170 H138" fill="none"/><path d="M86 28 Q100 54 114 28" fill="none"/>' },
  jacket:  { d: "M62 38 L86 26 L100 42 L114 26 L138 38 L178 126 L154 136 L138 106 L138 182 L62 182 L62 106 L46 136 L22 126 Z", extra: '<path d="M100 42 V182" fill="none"/><circle cx="100" cy="80" r="1.6"/><circle cx="100" cy="110" r="1.6"/><circle cx="100" cy="140" r="1.6"/>' },
  trench:  { d: "M58 34 L84 22 L100 40 L116 22 L142 34 L182 134 L156 144 L142 106 L142 188 L58 188 L58 106 L44 144 L18 134 Z", extra: '<path d="M100 40 V188" fill="none"/><path d="M58 92 H142" fill="none"/><circle cx="86" cy="80" r="1.8"/><circle cx="86" cy="112" r="1.8"/><circle cx="86" cy="144" r="1.8"/><circle cx="114" cy="80" r="1.8"/><circle cx="114" cy="112" r="1.8"/><circle cx="114" cy="144" r="1.8"/>' },
  pants:   { d: "M60 24 L140 24 L148 184 L108 184 L100 86 L92 184 L52 184 Z", extra: '<path d="M60 42 H140" fill="none"/>' },
  shorts:  { d: "M58 42 H142 L156 146 L108 146 L100 100 L92 146 L44 146 Z", extra: '<path d="M58 58 H142" fill="none"/>' },
  dress:   { d: "M78 20 L122 20 L128 72 L168 184 L32 184 L72 72 Z", extra: '<path d="M72 72 H128" fill="none"/>' },
  skirt:   { d: "M66 42 H134 L174 172 H26 Z", extra: '<path d="M66 58 H134" fill="none"/><path d="M82 58 L72 170 M100 58 V170 M118 58 L128 170" fill="none" opacity="0.6"/>' },
  shoe:    { d: "M22 124 L22 92 Q58 94 76 72 L96 94 Q132 100 170 126 Q186 134 180 150 L22 150 Z", extra: '<path d="M22 150 H180" fill="none"/><path d="M82 90 L96 102 M102 94 L114 104" fill="none" stroke-linecap="round"/>' },
  cap:     { d: "M32 118 Q32 54 100 54 Q168 54 168 118 Z", extra: '<path d="M32 118 L188 126 Q190 140 172 140 L32 132 Z" fill="COLOR"/>' },
  beanie:  { d: "M42 120 Q42 46 100 46 Q158 46 158 120 Z", extra: '<rect x="36" y="118" width="128" height="30" rx="9" fill="COLOR"/><circle cx="100" cy="40" r="10" fill="COLOR"/>' },
  scarf:   { d: "M66 44 Q100 22 134 44 L134 74 Q100 56 66 74 Z", extra: '<path d="M104 64 L134 64 L142 184 L108 184 Z" fill="COLOR"/>' },
  bag:     { d: "M48 82 H152 L162 184 H38 Z", extra: '<path d="M76 82 Q76 38 100 38 Q124 38 124 82" fill="none" stroke="COLOR" stroke-width="5"/><rect x="90" y="128" width="20" height="24" rx="2" fill="rgba(0,0,0,0.12)"/>' },
};

// Photo du produit (images/products/p01.webp…) ; si elle manque, le dessin prend le relais
function art(product, color) {
  return (
    '<img class="art" src="images/products/p' + String(product.id).padStart(2, "0") + '.webp" alt="" ' +
    'width="768" height="960" loading="lazy" decoding="async" ' +
    'data-pid="' + product.id + '" data-color="' + (color || "") + '">'
  );
}
document.addEventListener("error", e => {
  const img = e.target;
  if (img.tagName === "IMG" && img.dataset.pid) img.outerHTML = drawing(findProduct(img.dataset.pid), img.dataset.color);
}, true);

let svgSeq = 0;
function drawing(product, color) {
  const col = color || product.colors[0];
  const shape = SHAPES[product.shape] || SHAPES.tshirt;
  const id = "g" + (++svgSeq);
  const extra = (shape.extra || "").replace(/COLOR/g, col);
  return (
    '<svg class="art" viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      "<defs>" +
        '<linearGradient id="' + id + 'b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3f1ed"/><stop offset="1" stop-color="#e6e2da"/></linearGradient>' +
        '<linearGradient id="' + id + 'f" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="' + mix(col, 255, 0.16) + '"/><stop offset=".5" stop-color="' + col + '"/><stop offset="1" stop-color="' + mix(col, 0, 0.2) + '"/>' +
        "</linearGradient>" +
      "</defs>" +
      '<rect width="200" height="250" fill="url(#' + id + 'b)"/>' +
      '<ellipse cx="100" cy="222" rx="62" ry="6" fill="rgba(12,10,9,0.08)"/>' +
      '<g transform="translate(0 24)" stroke="rgba(12,10,9,0.22)" stroke-width="1.3" stroke-linejoin="round" fill="rgba(12,10,9,0.28)">' +
        '<path d="' + shape.d + '" fill="url(#' + id + 'f)"/>' + extra +
      "</g>" +
    "</svg>"
  );
}

// Mélange une couleur hex avec du blanc (255) ou du noir (0)
function mix(hex, target, k) {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v => Math.round(v + (target - v) * k));
  return "#" + ch.map(v => v.toString(16).padStart(2, "0")).join("");
}

// ---------- Utilitaires ----------
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function esc(text) {
  return String(text).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
const euro = v => v.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
const findProduct = id => PRODUCTS.find(p => p.id === Number(id));
const sizesFor = p => p.shape === "shoe" ? SIZES.shoe : ONE_SIZE.includes(p.shape) ? SIZES.one : SIZES.clothing;
const discount = p => Math.round((1 - p.price / p.oldPrice) * 100);
const waLink = text => "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);

// Points d'accroche pour animations.js (GSAP) ; ne font rien si GSAP est absent
const anim = (name, ...args) => window.maAnim && window.maAnim[name] && window.maAnim[name](...args);

// ---------- Stockage ----------
const CART_KEY = "ma-cart-v3";
const WISH_KEY = "ma-wish-v3";
function load(key) {
  try { const v = JSON.parse(localStorage.getItem(key)); return Array.isArray(v) ? v : []; }
  catch (e) { return []; }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* stockage indisponible */ }
}

let cart = load(CART_KEY).filter(l => findProduct(l.id));   // [{ id, color, size, qty }]
let wishlist = load(WISH_KEY).filter(id => findProduct(id)); // [id]

const state = { category: "tout", sort: "" };
const qv = { product: null, color: null, size: null };

// =========================================================
// Cartes produit
// =========================================================
function cardHTML(p) {
  const liked = wishlist.includes(p.id);
  const badges = [];
  if (p.isNew) badges.push('<span class="badge badge--new">Nouveau</span>');
  if (p.oldPrice) badges.push('<span class="badge badge--sale">−' + discount(p) + " %</span>");
  return (
    '<article class="card">' +
      '<div class="card-media">' +
        art(p) +
        (badges.length ? '<div class="badges">' + badges.join("") + "</div>" : "") +
        '<button type="button" class="wish" data-wish="' + p.id + '" aria-pressed="' + liked + '" aria-label="Ajouter ' + esc(p.name) + ' aux favoris">' + ICON.heart + "</button>" +
        '<div class="card-actions">' +
          '<button type="button" class="btn" data-view="' + p.id + '" aria-label="Ajout rapide : ' + esc(p.name) + '">Ajout rapide</button>' +
        "</div>" +
      "</div>" +
      '<div class="card-body">' +
        '<p class="card-price"><span>' + euro(p.price) + "</span>" +
          (p.oldPrice ? '<span class="old"><span class="sr-only">au lieu de </span>' + euro(p.oldPrice) + "</span>" : "") +
        "</p>" +
        '<h3 class="card-name">' + esc(p.name) + "</h3>" +
        '<p class="card-cat">' + CATEGORY_LABELS[p.category] + "</p>" +
        '<div class="swatches" aria-label="' + p.colors.length + (p.colors.length > 1 ? " couleurs" : " couleur") + '">' +
          p.colors.map(c => '<span class="swatch" style="background:' + c + '"></span>').join("") +
        "</div>" +
      "</div>" +
    "</article>"
  );
}

// ---------- Carrousel des nouveautés ----------
function renderNews() {
  const items = PRODUCTS.filter(p => p.isNew);
  $("#news-track").innerHTML = items.map(p => "<li>" + cardHTML(p) + "</li>").join("");
}

const viewport = $("#news-viewport");
viewport.addEventListener("scroll", () => {
  const max = viewport.scrollWidth - viewport.clientWidth;
  $("#news-progress-bar").style.transform = "scaleX(" + (max > 0 ? viewport.scrollLeft / max : 0) + ")";
}, { passive: true });

// ---------- Collection ----------
const grid = $("#grid");

function visibleProducts() {
  const items = PRODUCTS.filter(p => {
    const c = state.category;
    if (c === "tout") return true;
    if (c === "promos") return Boolean(p.oldPrice);
    if (c === "nouveautes") return Boolean(p.isNew);
    if (SELECTIONS[c]) return SELECTIONS[c].includes(p.shape);
    return p.category === c;
  });
  if (state.sort === "asc") items.sort((a, b) => a.price - b.price);
  if (state.sort === "desc") items.sort((a, b) => b.price - a.price);
  if (state.sort === "name") items.sort((a, b) => a.name.localeCompare(b.name, "fr"));
  return items;
}

function renderProducts() {
  const items = visibleProducts();
  const label = { mailles: " · Mailles", manteaux: " · Manteaux & vestes" }[state.category] || "";
  $("#result-count").textContent = items.length + (items.length > 1 ? " articles" : " article") + label;
  grid.innerHTML = items.length
    ? items.map(cardHTML).join("")
    : '<p class="no-result">Aucun article dans cette catégorie pour le moment.</p>';
  anim("grid", grid);
}

function selectCategory(cat) {
  state.category = cat;
  $$("#filters .chip").forEach(c => c.setAttribute("aria-pressed", String(c.dataset.cat === cat)));
  renderProducts();
}

function syncWishButtons() {
  $$("[data-wish]").forEach(b => b.setAttribute("aria-pressed", String(wishlist.includes(Number(b.dataset.wish)))));
}

// =========================================================
// Panier
// =========================================================
function addToCart(id, color, size) {
  const line = cart.find(l => l.id === id && l.color === color && l.size === size);
  if (line) line.qty += 1;
  else cart.push({ id, color, size, qty: 1 });
  save(CART_KEY, cart);
  renderCart();
  anim("bump", $("#cart-count"));
}

function updateQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  save(CART_KEY, cart);
  renderCart();
}

function renderCart() {
  let subtotal = 0;
  let count = 0;
  $("#cart-list").innerHTML = cart.map((l, i) => {
    const p = findProduct(l.id);
    subtotal += p.price * l.qty;
    count += l.qty;
    return (
      '<li class="drawer-item">' +
        '<div class="drawer-thumb">' + art(p, l.color) + "</div>" +
        '<div class="drawer-info">' +
          '<p class="name">' + esc(p.name) + "</p>" +
          '<p class="meta">Taille ' + esc(l.size) + " · " + euro(p.price) + "</p>" +
          '<div class="qty">' +
            '<button type="button" data-qty="-1" data-i="' + i + '" aria-label="Retirer un ' + esc(p.name) + '">−</button>' +
            '<span aria-label="Quantité">' + l.qty + "</span>" +
            '<button type="button" data-qty="1" data-i="' + i + '" aria-label="Ajouter un ' + esc(p.name) + '">+</button>' +
          "</div>" +
          '<br><button type="button" class="drawer-remove" data-remove="' + i + '">Supprimer</button>' +
        "</div>" +
        '<p class="drawer-line">' + euro(p.price * l.qty) + "</p>" +
      "</li>"
    );
  }).join("");

  $("#cart-empty").hidden = cart.length > 0;
  $("#cart-subtotal").textContent = euro(subtotal);
  $("#cart-shipping").textContent = !cart.length ? "—"
    : subtotal >= SHIPPING_FREE ? "Offerte"
    : "Offerte dès " + euro(SHIPPING_FREE) + " (encore " + euro(SHIPPING_FREE - subtotal) + ")";

  const checkout = $("#checkout");
  if (cart.length) {
    let text = "Bonjour " + SHOP_NAME + ", je souhaite commander :\n\n";
    cart.forEach(l => {
      const p = findProduct(l.id);
      text += "• " + l.qty + " × " + p.name + " (taille " + l.size + ") : " + euro(p.price * l.qty) + "\n";
    });
    text += "\nSous-total : " + euro(subtotal) + "\n\nMerci de me confirmer la disponibilité et la livraison.";
    checkout.href = waLink(text);
    checkout.setAttribute("aria-disabled", "false");
  } else {
    checkout.href = "#";
    checkout.setAttribute("aria-disabled", "true");
  }

  setBadge("#cart-count", count);
  $("#open-cart").setAttribute("aria-label", count ? "Panier, " + count + (count > 1 ? " articles" : " article") : "Panier");
}

// =========================================================
// Favoris
// =========================================================
function toggleWish(id) {
  id = Number(id);
  const on = !wishlist.includes(id);
  wishlist = on ? wishlist.concat(id) : wishlist.filter(x => x !== id);
  save(WISH_KEY, wishlist);
  syncWishButtons();
  renderWishlist();
  if (on) anim("bump", $("#wishlist-count"));
  toast(on ? "Ajouté aux favoris" : "Retiré des favoris");
}

function renderWishlist() {
  $("#wishlist-list").innerHTML = wishlist.map(id => {
    const p = findProduct(id);
    return (
      '<li class="drawer-item">' +
        '<div class="drawer-thumb">' + art(p) + "</div>" +
        '<div class="drawer-info">' +
          '<p class="name">' + esc(p.name) + "</p>" +
          '<p class="meta">' + euro(p.price) + "</p>" +
          '<button type="button" class="drawer-remove" data-view="' + p.id + '">Choisir une taille</button>' +
        "</div>" +
        '<button type="button" class="icon-btn" data-unwish="' + p.id + '" aria-label="Retirer ' + esc(p.name) + ' des favoris">' + ICON.x + "</button>" +
      "</li>"
    );
  }).join("");
  $("#wishlist-empty").hidden = wishlist.length > 0;
  setBadge("#wishlist-count", wishlist.length);
}

function setBadge(sel, n) {
  const el = $(sel);
  el.textContent = n;
  el.hidden = n === 0;
}

// =========================================================
// Calques : menu, recherche, panier, favoris, vue rapide
// =========================================================
const overlay = $("#overlay");
const menuPanel = $("#menu-panel");
const menuBtn = $("#open-menu");
let openLayer = null;
let lastFocus = null;

function focusables(root) {
  return $$('a[href], button:not([disabled]), input, select, [tabindex]:not([tabindex="-1"])', root)
    .filter(el => el.offsetParent !== null || el === document.activeElement);
}

function open(layer, focusEl) {
  // En enchaînant deux calques (vue rapide → panier), on garde l'élément d'origine
  if (openLayer) close(false);
  else lastFocus = document.activeElement;
  openLayer = layer;
  layer.setAttribute("aria-hidden", "false");
  overlay.hidden = layer === quickview || layer === menuPanel; // ces deux-là ont leur propre fond
  document.body.style.overflow = "hidden";
  if (layer === menuPanel) { menuBtn.setAttribute("aria-expanded", "true"); anim("menu", menuPanel); }
  setTimeout(() => (focusEl || focusables(layer)[0] || layer).focus({ preventScroll: true }), 60);
}

function close(restoreFocus = true) {
  if (!openLayer) return;
  if (openLayer === menuPanel) menuBtn.setAttribute("aria-expanded", "false");
  openLayer.setAttribute("aria-hidden", "true");
  openLayer = null;
  overlay.hidden = true;
  document.body.style.overflow = "";
  if (!restoreFocus) return;
  if (canFocus(lastFocus)) lastFocus.focus({ preventScroll: true });
  else $("#open-cart").focus({ preventScroll: true });
}

// Un élément masqué (calque fermé, visibility: hidden) ne doit pas recevoir le focus
function canFocus(el) {
  if (!el || el === document.body || !el.isConnected) return false;
  return el.checkVisibility
    ? el.checkVisibility({ visibilityProperty: true, checkVisibilityCSS: true })
    : el.offsetParent !== null;
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && openLayer) { close(); return; }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); return; }
  if (e.key !== "Tab" || !openLayer) return;
  // Focus piégé dans le calque ouvert
  const items = focusables(openLayer);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

// ---------- Vue rapide ----------
const quickview = $("#quickview");

function openQuickview(id) {
  const p = findProduct(id);
  if (!p) return;
  qv.product = p;
  qv.color = p.colors[0];
  qv.size = sizesFor(p)[0];

  $("#qv-cat").textContent = CATEGORY_LABELS[p.category];
  $("#qv-name").textContent = p.name;
  $("#qv-price").innerHTML = euro(p.price) + (p.oldPrice ? '<span class="old"><span class="sr-only">au lieu de </span>' + euro(p.oldPrice) + "</span>" : "");
  $("#qv-art").innerHTML = art(p, qv.color);
  $("#qv-swatches").innerHTML = p.colors.map((c, i) =>
    '<button type="button" class="qv-swatch" data-color="' + c + '" style="background:' + c + '" aria-pressed="' + (i === 0) + '" aria-label="Couleur ' + (i + 1) + '"></button>'
  ).join("");
  $("#qv-sizes").innerHTML = sizesFor(p).map((s, i) =>
    '<button type="button" class="qv-size" data-size="' + s + '" aria-pressed="' + (i === 0) + '">' + s + "</button>"
  ).join("");
  setWaLink($("#qv-guide"), "Bonjour, j'hésite sur la taille pour : " + p.name + ". Pouvez-vous me conseiller ?");
  syncQvLike();
  open(quickview, $("#qv-add"));
}

function syncQvLike() {
  const on = wishlist.includes(qv.product.id);
  const btn = $("#qv-like");
  btn.setAttribute("aria-pressed", String(on));
  btn.textContent = on ? "Retirer des favoris" : "Ajouter aux favoris";
}

function pick(groupSel, btn) {
  $$(groupSel + " button").forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
}

// ---------- Recherche ----------
const searchInput = $("#search-input");

function openSearch() {
  renderSearch();
  open($("#search-panel"), searchInput);
}

function renderSearch() {
  const q = searchInput.value.trim().toLowerCase();
  const box = $("#search-results");
  if (!q) {
    box.innerHTML = '<p class="no-result" style="padding:24px 0">Tapez pour rechercher parmi ' + PRODUCTS.length + " pièces.</p>";
    return;
  }
  const hits = PRODUCTS.filter(p => (p.name + " " + CATEGORY_LABELS[p.category]).toLowerCase().includes(q)).slice(0, 8);
  box.innerHTML = hits.length
    ? hits.map(p =>
        '<button type="button" class="search-row" data-view="' + p.id + '">' +
          '<span class="thumb">' + art(p) + "</span>" +
          '<span><span class="card-name" style="display:block">' + esc(p.name) + '</span><span class="card-cat">' + CATEGORY_LABELS[p.category] + "</span></span>" +
          "<strong>" + euro(p.price) + "</strong>" +
        "</button>").join("")
    : '<p class="no-result" style="padding:24px 0">Aucun résultat pour « ' + esc(q) + " ».</p>";
}

// ---------- Divers ----------
function toast(message) {
  const t = $("#toast");
  t.textContent = message;
  t.hidden = false;
  requestAnimationFrame(() => t.classList.add("is-on"));
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => {
    t.classList.remove("is-on");
    setTimeout(() => { t.hidden = true; }, 300);
  }, 2200);
}

function setWaLink(a, text) {
  a.href = waLink(text);
  a.target = "_blank";
  a.rel = "noopener";
}

// En-tête : transparent sur le hero, opaque ensuite
const masthead = $("#masthead");
const hero = $(".hero");
function updateMasthead() {
  const limit = hero.offsetHeight - masthead.offsetHeight - 10;
  masthead.classList.toggle("is-solid", window.scrollY > limit);
}
window.addEventListener("scroll", updateMasthead, { passive: true });
window.addEventListener("resize", updateMasthead);

// =========================================================
// Événements
// =========================================================
document.addEventListener("click", e => {
  const t = e.target;

  const wish = t.closest("[data-wish]");
  if (wish) { toggleWish(wish.dataset.wish); return; }

  const view = t.closest("[data-view]");
  if (view) { e.preventDefault(); openQuickview(view.dataset.view); return; }

  const unwish = t.closest("[data-unwish]");
  if (unwish) { toggleWish(unwish.dataset.unwish); return; }

  const qty = t.closest("[data-qty]");
  if (qty) { updateQty(Number(qty.dataset.i), Number(qty.dataset.qty)); return; }

  const remove = t.closest("[data-remove]");
  if (remove) { cart.splice(Number(remove.dataset.remove), 1); save(CART_KEY, cart); renderCart(); return; }

  const cat = t.closest("[data-cat], [data-goto]");
  if (cat) {
    if (openLayer) close(false);
    selectCategory(cat.dataset.cat || cat.dataset.goto);
    return; // le lien #collection fait défiler jusqu'à la grille
  }

  if (t.closest("[data-close]")) close();
});

$("#sort").addEventListener("change", e => { state.sort = e.target.value; renderProducts(); });

menuBtn.addEventListener("click", () => open(menuPanel));
$("#open-cart").addEventListener("click", () => open($("#cart-drawer")));
$("#open-wishlist").addEventListener("click", () => open($("#wishlist-drawer")));
$("#open-search").addEventListener("click", openSearch);
$("#menu-search").addEventListener("click", openSearch);
overlay.addEventListener("click", () => close());
quickview.addEventListener("click", e => { if (e.target === quickview) close(); });
searchInput.addEventListener("input", renderSearch);

$("#clear-cart").addEventListener("click", () => { cart = []; save(CART_KEY, cart); renderCart(); });
$("#checkout").addEventListener("click", e => {
  if ($("#checkout").getAttribute("aria-disabled") === "true") e.preventDefault();
});

// Vue rapide
$("#qv-swatches").addEventListener("click", e => {
  const b = e.target.closest("[data-color]");
  if (!b) return;
  qv.color = b.dataset.color;
  pick("#qv-swatches", b);
  $("#qv-art").innerHTML = art(qv.product, qv.color);
});
$("#qv-sizes").addEventListener("click", e => {
  const b = e.target.closest("[data-size]");
  if (!b) return;
  qv.size = b.dataset.size;
  pick("#qv-sizes", b);
});
$("#qv-add").addEventListener("click", () => {
  addToCart(qv.product.id, qv.color, qv.size);
  toast("Ajouté au panier");
  open($("#cart-drawer"));
});
$("#qv-like").addEventListener("click", () => { toggleWish(qv.product.id); syncQvLike(); });

// Newsletter (démo : rien n'est envoyé)
$("#newsletter-form").addEventListener("submit", e => {
  e.preventDefault();
  const input = $("#news-email");
  const note = $("#newsletter-note");
  if (!input.checkValidity()) {
    note.textContent = "Merci d'indiquer une adresse e-mail valide.";
    input.setAttribute("aria-invalid", "true");
    input.focus();
    return;
  }
  input.removeAttribute("aria-invalid");
  note.textContent = "Merci ! Vous faites maintenant partie du cercle.";
  input.value = "";
});

// =========================================================
// Démarrage
// =========================================================
$("#year").textContent = new Date().getFullYear();
setWaLink($("#footer-wa"), "Bonjour " + SHOP_NAME + " !");
setWaLink($("#menu-wa"), "Bonjour " + SHOP_NAME + " !");
setWaLink($("#footer-size"), "Bonjour, pouvez-vous me conseiller sur une taille ?");

renderNews();
renderProducts();
renderCart();
renderWishlist();
updateMasthead();
