const CART_STORAGE_KEY = "jh_reservation_cart";

const ENTREMET_PRICES = {
  4: 23.2,
  6: 34.8,
  8: 46.4,
};

const DESSERT_IMAGES = {
  individuel: {
    "octobre rose": "./asset/img/dessert ind/octobre_rose.webp",
    "le macaron poire / verveine": "./asset/img/dessert ind/macaron-poire-verveine.webp",
    "le caramel / chocolat": "./asset/img/dessert ind/caramel-chocolat-ind.webp",
    "le sarrazin/ pollen sarthois/ agrumes":
      "./asset/img/dessert ind/sarrazin-pollen-Sarthois agrumes.webp",
    mojito: "./asset/img/dessert ind/Mojito.webp",
    "la cacahuète": "./asset/img/dessert ind/cacahuete.webp",
    "le gour'mans": "./asset/img/dessert ind/Le Gour'Mans.webp",
    "citron/olive/aneth": "./asset/img/dessert ind/0lh0y85f.png",
    "le grain de vanille": "./asset/img/dessert ind/vanille.webp",
    flan: "./asset/img/dessert ind/flan.webp",
  },
  entremet: {
    "caramel / chocolat": "./asset/img/dessert à partager/Caramel_chocolat.avif",
    "citron / noisettes": "./asset/img/dessert à partager/citron-noisettes.webp",
  },
};

const INDIVIDUAL_PRICES = {
  "octobre rose": 5.9,
  "le macaron poire / verveine": 6.1,
  "le caramel / chocolat": 5.9,
  "le sarrazin/ pollen sarthois/ agrumes": 5.9,
  mojito: 5.9,
  "la cacahuète": 6.3,
  "le gour'mans": 5.9,
  "citron/olive/aneth": 5.9,
  "le grain de vanille": 5.9,
  flan: 5.9,
};

function formatEuro(amount) {
  if (amount == null || Number.isNaN(amount)) return null;
  return `${amount.toFixed(2).replace(".", ",")} €`;
}

function getUnitPrice(item) {
  if (item.type === "entremet") {
    const format = Number(item.format);
    return ENTREMET_PRICES[format] ?? null;
  }

  const key = item.name.toLowerCase().trim();
  return INDIVIDUAL_PRICES[key] ?? null;
}

function getLineTotal(item) {
  const unit = getUnitPrice(item);
  if (unit == null) return null;
  return unit * item.quantity;
}

function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const line = getLineTotal(item);
    return line == null ? sum : sum + line;
  }, 0);
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartBadge();
  renderCartItems();
}

function cartItemKey(item) {
  return `${item.type}|${item.name}|${item.format || ""}`;
}

function getItemImage(item) {
  if (item.image) return item.image;
  const map = DESSERT_IMAGES[item.type];
  if (!map) return null;
  return map[item.name.toLowerCase().trim()] ?? null;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(text) {
  return escapeHtml(text).replace(/'/g, "&#39;");
}

function addToCart(name, type, format = null, quantity = 1, image = null) {
  const cart = getCart();
  const key = cartItemKey({ name, type, format });
  const existing = cart.find((item) => cartItemKey(item) === key);
  const resolvedImage = image || DESSERT_IMAGES[type]?.[name.toLowerCase().trim()] || null;

  if (existing) {
    existing.quantity += quantity;
    if (resolvedImage && !existing.image) existing.image = resolvedImage;
  } else {
    const entry = { name, type, format, quantity };
    if (resolvedImage) entry.image = resolvedImage;
    cart.push(entry);
  }

  saveCart(cart);
  showCartToast(name);
}

function updateQuantity(key, delta) {
  const cart = getCart();
  const item = cart.find((entry) => cartItemKey(entry) === key);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    saveCart(cart.filter((entry) => cartItemKey(entry) !== key));
    return;
  }

  saveCart(cart);
}

function removeFromCart(key) {
  saveCart(getCart().filter((entry) => cartItemKey(entry) !== key));
}

function clearCart() {
  saveCart([]);
}

function formatCartLine(item) {
  const unit = getUnitPrice(item);
  const lineTotal = getLineTotal(item);
  const priceInfo =
    unit != null && lineTotal != null
      ? ` — ${formatEuro(unit)} / u × ${item.quantity} = ${formatEuro(lineTotal)}`
      : "";

  if (item.type === "entremet") {
    return `- ${item.name} (${item.format} parts) × ${item.quantity}${priceInfo}`;
  }
  return `- ${item.name} × ${item.quantity}${priceInfo}`;
}

function formatPickupDate(iso) {
  if (!iso) return "";
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function buildOrderMessage(notes) {
  const cart = getCart();
  const lines = cart.map(formatCartLine).join("\n");
  const total = getCartTotal();
  let message = `Commande :\n${lines}`;

  if (total > 0) {
    message += `\n\nTotal indicatif : ${formatEuro(total)}`;
    message +=
      "\nRèglement lors du retrait en boutique (aucun paiement en ligne).";
  }

  if (notes) {
    message += `\n\nNotes : ${notes}`;
  }

  return message;
}

function showCartToast(name) {
  const toast = document.getElementById("cart-toast");
  if (!toast) return;
  toast.textContent = `${name} ajouté à votre panier`;
  toast.classList.add("visible");
  window.clearTimeout(showCartToast._timer);
  showCartToast._timer = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2200);
}

function updateCartBadge() {
  const badge = document.querySelector(".cart-badge");
  if (!badge) return;
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = String(count);
  badge.hidden = count === 0;
}

function renderCartItems() {
  const list = document.getElementById("cart-items-list");
  const empty = document.getElementById("cart-empty-msg");
  const formSection = document.getElementById("cart-form-section");
  const submitBtn = document.querySelector("#cart-checkout-form .cart-submit-btn");
  const totalsEl = document.getElementById("cart-totals");
  if (!list) return;

  const cart = getCart();
  list.innerHTML = "";

  if (cart.length === 0) {
    if (empty) empty.hidden = false;
    if (formSection) formSection.hidden = true;
    if (submitBtn) submitBtn.disabled = true;
    if (totalsEl) totalsEl.hidden = true;
    return;
  }

  if (empty) empty.hidden = true;
  if (formSection) formSection.hidden = false;
  if (submitBtn) submitBtn.disabled = false;
  if (totalsEl) totalsEl.hidden = false;

  let hasUnknownPrice = false;

  cart.forEach((item) => {
    const key = cartItemKey(item);
    const li = document.createElement("li");
    li.className = "cart-item";

    const label =
      item.type === "entremet"
        ? `${item.name} (${item.format} parts)`
        : item.name;

    const unit = getUnitPrice(item);
    const lineTotal = getLineTotal(item);
    let priceHtml = "";
    if (unit != null && lineTotal != null) {
      priceHtml = `<span class="cart-item-price">${formatEuro(unit)} / u · ${formatEuro(lineTotal)}</span>`;
    } else {
      hasUnknownPrice = true;
      priceHtml = `<span class="cart-item-price cart-item-price--unknown">Prix confirmé en boutique</span>`;
    }

    const imageSrc = getItemImage(item);
    const thumbHtml = imageSrc
      ? `<img class="cart-item-thumb" src="${escapeAttr(imageSrc)}" alt="" loading="lazy" width="52" height="52">`
      : `<span class="cart-item-thumb cart-item-thumb--placeholder" aria-hidden="true"></span>`;

    li.innerHTML = `
      ${thumbHtml}
      <div class="cart-item-main">
        <span class="cart-item-label">${escapeHtml(label)}</span>
        ${priceHtml}
      </div>
      <div class="cart-item-qty">
        <button type="button" data-cart-action="minus" data-cart-key="${key}" aria-label="Diminuer">−</button>
        <span>${item.quantity}</span>
        <button type="button" data-cart-action="plus" data-cart-key="${key}" aria-label="Augmenter">+</button>
      </div>
      <button type="button" class="cart-item-remove" data-cart-action="remove" data-cart-key="${key}" aria-label="Retirer">×</button>
    `;
    list.appendChild(li);
  });

  if (totalsEl) {
    const total = getCartTotal();
    totalsEl.innerHTML = `
      <p class="cart-total-line"><strong>Total indicatif :</strong> ${
        total > 0 ? formatEuro(total) : "—"
      }</p>
      ${
        hasUnknownPrice
          ? "<p class=\"cart-total-note\">Certains articles seront confirmés en boutique.</p>"
          : ""
      }
      <p class="cart-payment-note">Le règlement s'effectuera lors du retrait en boutique. <span class="cart-payment-note--no-online">Aucun paiement en ligne.</span></p>
    `;
  }
}

function hideCartOrderSuccess() {
  const success = document.getElementById("cart-success-section");
  if (!success) return;
  success.hidden = true;
  const panel = document.querySelector(".cart-panel--checkout");
  if (!panel) return;
  panel.querySelector("h1")?.removeAttribute("hidden");
  panel.querySelector(".cart-checkout-recap-title")?.removeAttribute("hidden");
  document.getElementById("cart-empty-msg")?.removeAttribute("hidden");
  document.getElementById("cart-items-list")?.removeAttribute("hidden");
  document.getElementById("cart-totals")?.removeAttribute("hidden");
  document.getElementById("cart-form-section")?.removeAttribute("hidden");
}

function showCartOrderSuccess() {
  const success = document.getElementById("cart-success-section");
  if (!success) return;
  const panel = document.querySelector(".cart-panel--checkout");
  if (panel) {
    panel.querySelector("h1") && (panel.querySelector("h1").hidden = true);
    const recap = panel.querySelector(".cart-checkout-recap-title");
    if (recap) recap.hidden = true;
  }
  document.getElementById("cart-empty-msg") && (document.getElementById("cart-empty-msg").hidden = true);
  document.getElementById("cart-items-list") && (document.getElementById("cart-items-list").hidden = true);
  document.getElementById("cart-totals") && (document.getElementById("cart-totals").hidden = true);
  document.getElementById("cart-form-section") && (document.getElementById("cart-form-section").hidden = true);
  success.hidden = false;
}

function toggleCartPanel(forceOpen) {
  const panel = document.getElementById("cart-panel-overlay");
  if (!panel) return;
  const shouldOpen =
    typeof forceOpen === "boolean" ? forceOpen : !panel.classList.contains("active");
  panel.classList.toggle("active", shouldOpen);
  document.body.classList.toggle("cart-panel-open", shouldOpen);
  if (!shouldOpen) hideCartOrderSuccess();
  if (shouldOpen) {
    hideCartOrderSuccess();
    renderCartItems();
  }
}

function initCheckoutDateField() {
  const dateInput = document.getElementById("cart-date");
  if (!dateInput) return;

  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);

  dateInput.addEventListener("input", function () {
    const selectedDate = new Date(this.value);
    const day = selectedDate.getUTCDay();
    if (day === 0 || day === 1) {
      this.value = "";
      alert("Veuillez choisir un jour du mardi au samedi.");
    }
  });
}

function sendCartOrder(event) {
  event.preventDefault();

  if (getCart().length === 0) {
    alert("Votre commande est vide.");
    return;
  }

  const name = document.getElementById("cart-name").value;
  const email = document.getElementById("cart-email").value;
  const telephone = document.getElementById("cart-telephone").value;
  const date = document.getElementById("cart-date").value;
  const notes = document.getElementById("cart-notes").value;

  const params = {
    name,
    sujet: "Réservation de desserts",
    email,
    reply_to: email,
    telephone,
    date: formatPickupDate(date),
    message: buildOrderMessage(notes),
  };

  if (typeof emailjs === "undefined") {
    alert("Le service d'envoi est indisponible. Merci de nous contacter par téléphone.");
    return;
  }

  emailjs
    .send("service_85xjoav", "template_ap4z49a", params)
    .then(() => {
      clearCart();
      showCartOrderSuccess();
      window.setTimeout(() => toggleCartPanel(false), 5000);
    })
    .catch(() => {
      alert("Une erreur s'est produite, veuillez réessayer.");
    });
}

function injectCartUi() {
  if (document.getElementById("cart-panel-overlay")) return;

  const social = document.querySelector(".reseau-sociaux");
  if (social) {
    const cartBtn = document.createElement("button");
    cartBtn.type = "button";
    cartBtn.className = "cart-header-btn";
    cartBtn.setAttribute("aria-label", "Voir ma commande");
    cartBtn.innerHTML =
      '<i class="fa-solid fa-basket-shopping"></i><span class="cart-badge" hidden>0</span>';
    cartBtn.addEventListener("click", () => toggleCartPanel(true));
    social.prepend(cartBtn);
  }

  const root = document.createElement("div");
  root.innerHTML = `
    <div id="cart-toast" class="cart-toast" aria-live="polite"></div>
    <div id="cart-panel-overlay" class="cart-panel-overlay">
      <div class="cart-panel cart-panel--checkout popup-content">
        <button type="button" class="cart-close" data-cart-close="panel" aria-label="Fermer">×</button>
        <h1>Réservation</h1>
        <p class="cart-checkout-recap-title">Votre commande</p>
        <p id="cart-empty-msg" class="cart-empty">Votre commande est vide. Ajoutez des desserts depuis la carte.</p>
        <ul id="cart-items-list" class="cart-items"></ul>
        <div id="cart-totals" class="cart-totals" hidden></div>
        <div id="cart-success-section" class="cart-success-section" hidden>
          <h2>Merci pour votre demande</h2>
          <p>Votre réservation a bien été envoyée à la boutique. Nous vous confirmons la disponibilité de vos desserts par email ou téléphone très prochainement.</p>
          <p class="cart-success-note">Aucun paiement en ligne : le règlement s'effectuera lors de votre retrait en boutique.</p>
        </div>
        <div id="cart-form-section" class="cart-form-section" hidden>
          <form id="cart-checkout-form">
            <label for="cart-name">Nom & prénom <small>*</small></label>
            <input type="text" id="cart-name" name="firstname" required placeholder="Votre nom et prénom">
            <label for="cart-email">Email <small>*</small></label>
            <input type="email" id="cart-email" name="email" required placeholder="Votre email">
            <label for="cart-telephone">Téléphone <small>*</small></label>
            <input type="tel" id="cart-telephone" name="telephone" required placeholder="Téléphone">
            <label for="cart-date">Date de retrait de la commande<small>*</small></label>
            <input type="date" id="cart-date" name="date" required>
            <label for="cart-notes">Message</label>
            <textarea id="cart-notes" name="message" rows="4" placeholder="Demande particulière : anniversaire, message sur le dessert, etc. (optionnel)"></textarea>
            <div>
              <input type="checkbox" id="cart-consent" name="o107_Consentement" required>
              <label for="cart-consent">
                <small>J'accepte que mes données soient utilisées pour traiter ma demande. J'ai lu et j'accepte la <a href="./politique.html">Politique de confidentialité</a>.</small>
              </label>
            </div>
            <input type="submit" class="cart-submit-btn" value="Envoyer" disabled>
          </form>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(root);

  document
    .getElementById("cart-checkout-form")
    ?.addEventListener("submit", sendCartOrder);

  document.querySelectorAll("[data-cart-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.getAttribute("data-cart-close") === "panel") toggleCartPanel(false);
    });
  });

  document.getElementById("cart-items-list")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cart-action]");
    if (!button) return;
    const key = button.getAttribute("data-cart-key");
    const action = button.getAttribute("data-cart-action");
    if (action === "plus") updateQuantity(key, 1);
    if (action === "minus") updateQuantity(key, -1);
    if (action === "remove") removeFromCart(key);
  });

  initCheckoutDateField();
  updateCartBadge();
  renderCartItems();
}

function getCardImage(card) {
  const img =
    card.querySelector(".share-dessert-media > img") ||
    card.querySelector(".dessert-media > img") ||
    card.querySelector(":scope > img");
  return img?.getAttribute("src") || null;
}

function readQuantityFromCard(card) {
  const qtyInput = card.querySelector(".cart-qty-input");
  let quantity = parseInt(qtyInput?.value || "1", 10);
  if (!Number.isFinite(quantity) || quantity < 1) quantity = 1;
  if (quantity > 99) quantity = 99;
  if (qtyInput) qtyInput.value = String(quantity);
  return quantity;
}

function bindAddToCartButtons() {
  document.querySelector(".containerPhotos")?.addEventListener("click", (event) => {
    const button = event.target.closest(".btn-add-cart");
    if (!button) return;
    const card = button.closest(".containerPhotosTitle");
    if (!card) return;
    const title = card.querySelector(":scope > p:not(.dessert-price)");
    if (!title) return;
    addToCart(
      title.textContent.trim(),
      "individuel",
      null,
      readQuantityFromCard(card),
      getCardImage(card)
    );
  });

  document.querySelector(".containerPhotosShareDesserts")?.addEventListener("click", (event) => {
    const button = event.target.closest(".btn-add-cart");
    if (!button) return;
    const card = button.closest(".containerPhotosShareDessertsTitle");
    if (!card) return;
    const title = card.querySelector("h2");
    const formatSelect = card.querySelector(".cart-format-select");
    if (!title || !formatSelect) return;
    addToCart(
      title.textContent.trim(),
      "entremet",
      formatSelect.value,
      readQuantityFromCard(card),
      getCardImage(card)
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  injectCartUi();
  bindAddToCartButtons();
});
