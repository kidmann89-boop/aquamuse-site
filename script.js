const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
const whatsappMessage = "Здравствуйте! Хочу записаться на подбор белья в Aquamuse.";
const whatsappUrl = `https://wa.me/996550333087?text=${encodeURIComponent(whatsappMessage)}`;
const instagramUrl = "https://www.instagram.com/aquamuse.kg?igsh=Z3l3c3MxdXA5Ynk5";
const CATALOG_SYNC_URL =
  "https://admin.aquamuse.store/api/catalog-sync";
const CART_STORAGE_KEY = "aquamuseCart";
const HOME_CATALOG_MEDIA = {
  "AQ1": "assets/catalog-ambra-model.jpg",
  "AQ2": "assets/catalog-ambra-nude-model.jpg",
  "AQ3": "assets/catalog-ambra-smooth-model.jpg",
  "AQ4": "assets/catalog-ambra-lace-model.jpg",
  "AQ5": "assets/catalog-melle-lace-soft-model.jpg",
  "AQ6": "assets/catalog-melle-lace-underwire-model.jpg",
  "AQ7": "assets/catalog-melle-floral-lace-model.jpg",
  "AQ8": "assets/catalog-sermija-dots-black-model.jpg",
  "AQ9": "assets/catalog-sermija-ribbed-nude-model.jpg",
  "AQ10": "assets/catalog-melle-floral-white-model.jpg",
  "AQ11": "assets/catalog-melle-mesh-black-model.jpg",
  "AQ12": "assets/catalog-melle-mesh-nude-model.jpg",
  "AQ13": "assets/catalog-melle-smooth-nude-model.jpg",
  "AQ14": "assets/catalog-melle-ribbed-nude-model.jpg",
  "AQ15": "assets/catalog-melle-lace-taupe-model.jpg",
  "AQ16": "assets/catalog-sermija-dots-high-black-model.jpg",
  "AQ17": "assets/catalog-melle-lace-blush-panties-front.jpg",
  "AQ18": "assets/catalog-melle-lace-blush-high-panties-front.jpg",
  "AQ19": "assets/catalog-melle-lace-blush-bikini-panties-front.jpg",
  "AQ20": "assets/catalog-melle-lace-blush-classic-panties-front.jpg",
  "AQ21": "assets/catalog-melle-lace-blush-mesh-panties-front.jpg",
  "AQ23": "assets/catalog-melle-dots-black-bikini-panties-front.jpg",
  "AQ24": "assets/catalog-melle-dots-black-thong-panties-front.jpg",
  "AQ25": "assets/catalog-melle-floral-blush-thong-panties-front.jpg",
  "AQ26": "assets/catalog-melle-floral-white-thong-panties-front.jpg",
  "AQ27": "assets/catalog-melle-floral-blue-bikini-panties-front.jpg",
  "AQ28": "assets/catalog-melle-floral-black-bikini-panties-front.jpg",
  "AQ29": "assets/catalog-melle-lace-black-nude-bra-model-front.jpg",
  "AQ30": "assets/catalog-melle-lace-white-bra-model-front.jpg",
  "AQ31": "assets/catalog-melle-lace-ivory-bra-model-front.jpg",
  "AQ32": "assets/catalog-melle-lace-white-longline-bra-model-front.jpg",
  "AQ33": "assets/catalog-melle-lace-black-longline-bra-model-front.jpg",
  "AQ34": "assets/catalog-melle-black-beige-embroidered-bra-model-front.jpg",
  "AQ35": "assets/catalog-melle-black-beige-satin-bra-model-front.jpg",
  "AQ36": "assets/catalog-melle-black-bronze-leaf-bra-model-front.jpg",
  "AQ37": "assets/catalog-melle-black-geometric-bra-model-front.jpg",
  "AQ38": "assets/catalog-melle-black-beige-beaded-bra-model-front.jpg",
  "AQ39": "assets/catalog-melle-rose-embroidered-bra-model-front.jpg",
  "AQ40": "assets/catalog-melle-white-lace-panties-set.jpg",
  "AQ41": "assets/catalog-melle-black-lace-panties-set.jpg",
  "AQ42": "assets/catalog-melle-black-beige-high-panties-set.jpg",
  "AQ43": "assets/catalog-melle-white-high-lace-panties-set.jpg",
  "AQ44": "assets/catalog-melle-white-bikini-lace-panties-set.jpg",
  "AQ45": "assets/catalog-melle-white-high-mesh-lace-panties-set.jpg",
  "AQ46": "assets/catalog-melle-black-beige-mesh-lace-panties-set.jpg",
  "AQ47": "assets/catalog-melle-white-low-lace-panties-set.jpg",
  "AQ48": "assets/catalog-melle-white-classic-lace-panties-set.jpg",
  "AQ49": "assets/catalog-melle-black-low-lace-panties-set.jpg",
  "AQ50": "assets/catalog-melle-black-high-lace-panties-set.jpg",
  "AQ51": "assets/catalog-melle-black-high-lace-panties-alt-set.jpg",
  "AQ52": "assets/catalog-melle-black-classic-lace-panties-set.jpg",
  "AQ53": "assets/catalog-melle-blush-lace-panties-model-front.jpg"
};
let catalogSyncPayloadPromise = null;

const readCartItems = () => {
  try {
    const items = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    return Array.isArray(items) ? items : [];
  } catch (error) {
    return [];
  }
};

const writeCartItems = (items) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

const updateCartIndicators = () => {
  const count = readCartItems().length;
  document.querySelectorAll("[data-cart-count]").forEach((element) => {
    element.textContent = String(count);
  });
  document.querySelectorAll(".header-cart").forEach((element) => {
    element.classList.toggle("has-items", count > 0);
  });
};

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".header-cta").forEach((link) => {
  link.href = whatsappUrl;
  link.textContent = "Записаться на индивидуальный подбор";

  if (!link.nextElementSibling?.classList.contains("header-social")) {
    const instagram = document.createElement("a");
    instagram.className = "header-social";
    instagram.href = instagramUrl;
    instagram.target = "_blank";
    instagram.rel = "noopener";
    instagram.setAttribute("aria-label", "Instagram Aquamuse");
    instagram.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="3" y="3" width="18" height="18" rx="5"></rect>
        <circle cx="12" cy="12" r="4"></circle>
        <circle cx="17.5" cy="6.5" r="1.2"></circle>
      </svg>
    `;
    link.insertAdjacentElement("afterend", instagram);
  }
});

document.querySelectorAll(".header-social").forEach((social) => {
  if (social.nextElementSibling?.classList.contains("header-cart")) {
    return;
  }

  const cart = document.createElement("a");
  const count = document.createElement("span");
  cart.className = "header-cart";
  cart.href = "korzina.html";
  cart.setAttribute("aria-label", "\u041a\u043e\u0440\u0437\u0438\u043d\u0430");
  cart.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6 8h12l-1 11H7L6 8Z"></path>
      <path d="M9 8a3 3 0 0 1 6 0"></path>
    </svg>
  `;
  count.className = "header-cart-count";
  count.dataset.cartCount = "";
  count.textContent = "0";
  cart.appendChild(count);
  social.insertAdjacentElement("afterend", cart);
});

updateCartIndicators();

const stickyWhatsapp = document.createElement("a");
stickyWhatsapp.className = "sticky-whatsapp";
stickyWhatsapp.href = whatsappUrl;
stickyWhatsapp.textContent = "Записаться в WhatsApp";
document.body.appendChild(stickyWhatsapp);

const requestCatalogPayload = (sourceUrl) => new Promise((resolve, reject) => {
  const callbackName = `aquamuseCatalogSync${Date.now()}${Math.random().toString(36).slice(2)}`;
  const script = document.createElement("script");
  const url = new URL(sourceUrl);
  let timeoutId = 0;

  const cleanup = () => {
    delete window[callbackName];
    script.remove();
    window.clearTimeout(timeoutId);
  };

  window[callbackName] = (payload) => {
    cleanup();
    resolve(payload);
  };

  timeoutId = window.setTimeout(() => {
    cleanup();
    reject(new Error("Catalog sync timed out"));
  }, 60000);

  url.searchParams.set("tqx", `out:json;responseHandler:${callbackName}`);
  url.searchParams.set("_", Date.now().toString());
  script.async = true;
  script.src = url.toString();
  script.onerror = () => {
    cleanup();
    reject(new Error("Catalog sync script failed"));
  };
  document.head.appendChild(script);
});

const getCatalogSyncPayload = () => {
  if (!catalogSyncPayloadPromise) {
    catalogSyncPayloadPromise = requestCatalogPayload(CATALOG_SYNC_URL);
  }

  return catalogSyncPayloadPromise;
};

const getCatalogCellValue = (cell) => {
  if (!cell || cell.v === null || cell.v === undefined) {
    return "";
  }

  return String(cell.f || cell.v).trim();
};

const getCatalogColumnLabel = (value) => String(value || "")
  .trim()
  .toLowerCase()
  .replace(/\s+/g, "_");

const findCatalogColumnIndex = (columns, labels, fallbackIndex = -1) => {
  const normalizedLabels = labels.map(getCatalogColumnLabel);
  const index = columns.findIndex((column) => (
    normalizedLabels.includes(getCatalogColumnLabel(column.label))
    || normalizedLabels.includes(getCatalogColumnLabel(column.id))
  ));
  return index >= 0 ? index : fallbackIndex;
};

const parseDiscountPercent = (value) => {
  const text = String(value ?? "")
    .trim()
    .replace(",", ".")
    .replace("%", "");
  const number = Number.parseFloat(text);

  if (!Number.isFinite(number) || number <= 0) {
    return 0;
  }

  const percent = number > 0 && number <= 1 ? number * 100 : number;
  return Math.min(Math.round(percent), 95);
};

const normalizeCatalogProductCode = (value) => {
  const match = String(value || "").trim().toUpperCase().match(/^(AQ\d+)/);
  return match ? match[1] : "";
};

const getCatalogDiscountMap = (payload) => {
  const rows = payload?.table?.rows || [];
  const columns = payload?.table?.cols || [];
  const productCodeIndex = findCatalogColumnIndex(columns, ["product_id"], 0);
  const stockIndex = findCatalogColumnIndex(columns, ["остаток", "ostatok", "stock", "qty", "quantity"], -1);
  const discountIndex = findCatalogColumnIndex(columns, ["skidki", "skidka", "discount", "sale", "скидки", "скидка"], -1);
  const jsonIndex = findCatalogColumnIndex(columns, ["_json", "json"], -1);
  const discounts = new Map();

  if (discountIndex < 0 && jsonIndex < 0) {
    return discounts;
  }

  rows.forEach((row) => {
    const cells = row.c || [];
    const productCode = normalizeCatalogProductCode(getCatalogCellValue(cells[productCodeIndex]));

    if (!productCode || (stockIndex >= 0 && Number.parseFloat(String(getCatalogCellValue(cells[stockIndex])).replace(",", ".")) <= 0)) {
      return;
    }

    let jsonDiscount = 0;

    if (jsonIndex >= 0) {
      try {
        const syncedJson = JSON.parse(getCatalogCellValue(cells[jsonIndex]) || "{}");
        jsonDiscount = parseDiscountPercent(syncedJson.skidki || syncedJson["скидки"] || syncedJson.discount || syncedJson.sale);
      } catch (error) {
        jsonDiscount = 0;
      }
    }

    const discount = Math.max(parseDiscountPercent(getCatalogCellValue(cells[discountIndex])), jsonDiscount);

    if (discount > 0) {
      discounts.set(productCode, Math.max(discounts.get(productCode) || 0, discount));
    }
  });

  return discounts;
};

const getCatalogDiscountCodes = (payload) => {
  return new Set(getCatalogDiscountMap(payload).keys());
};

const parseMarkedValue = (value) => {
  if (value === true) {
    return true;
  }
  if (value === false || value === null || value === undefined || value === 0) {
    return false;
  }
  const text = String(value).trim().toLowerCase();
  return text !== "" && !["0", "false", "no", "net", "\u043d\u0435\u0442"].includes(text);
};

const getCatalogNewArrivalMap = (payload) => {
  const rows = payload?.table?.rows || [];
  const columns = payload?.table?.cols || [];
  const productCodeIndex = findCatalogColumnIndex(columns, ["product_id"], 0);
  const stockIndex = findCatalogColumnIndex(columns, ["остаток", "ostatok", "stock", "qty", "quantity"], -1);
  const newArrivalIndex = findCatalogColumnIndex(columns, [
    "novoe_postuplenie",
    "new_arrival",
    "new",
    "новое_поступление",
    "новинка"
  ], -1);
  const jsonIndex = findCatalogColumnIndex(columns, ["_json", "json"], -1);
  const arrivals = new Map();

  if (newArrivalIndex < 0 && jsonIndex < 0) {
    return arrivals;
  }

  rows.forEach((row) => {
    const cells = row.c || [];
    const productCode = normalizeCatalogProductCode(getCatalogCellValue(cells[productCodeIndex]));

    if (!productCode || (stockIndex >= 0 && Number.parseFloat(String(getCatalogCellValue(cells[stockIndex])).replace(",", ".")) <= 0)) {
      return;
    }

    let jsonMarked = false;

    if (jsonIndex >= 0) {
      try {
        const syncedJson = JSON.parse(getCatalogCellValue(cells[jsonIndex]) || "{}");
        jsonMarked = parseMarkedValue(
          syncedJson.novoe_postuplenie
          || syncedJson.new_arrival
          || syncedJson["новое_поступление"]
        );
      } catch (error) {
        jsonMarked = false;
      }
    }

    if (parseMarkedValue(getCatalogCellValue(cells[newArrivalIndex])) || jsonMarked) {
      arrivals.set(productCode, true);
    }
  });

  return arrivals;
};

const getCatalogNewArrivalCodes = (payload) => {
  return new Set(getCatalogNewArrivalMap(payload).keys());
};

const getCatalogNewArrivalCount = (payload) => {
  const rows = payload?.table?.rows || [];
  const columns = payload?.table?.cols || [];
  const stockIndex = findCatalogColumnIndex(columns, ["остаток", "ostatok", "stock", "qty", "quantity"], -1);
  const newArrivalIndex = findCatalogColumnIndex(columns, [
    "novoe_postuplenie",
    "new_arrival",
    "new",
    "новое_поступление",
    "новинка"
  ], -1);
  const jsonIndex = findCatalogColumnIndex(columns, ["_json", "json"], -1);
  let count = 0;

  rows.forEach((row) => {
    const cells = row.c || [];

    if (stockIndex >= 0 && Number.parseFloat(String(getCatalogCellValue(cells[stockIndex])).replace(",", ".")) <= 0) {
      return;
    }

    let jsonMarked = false;

    if (jsonIndex >= 0) {
      try {
        const syncedJson = JSON.parse(getCatalogCellValue(cells[jsonIndex]) || "{}");
        jsonMarked = parseMarkedValue(syncedJson.novoe_postuplenie || syncedJson.new_arrival || syncedJson["новое_поступление"]);
      } catch (error) {
        jsonMarked = false;
      }
    }

    if (parseMarkedValue(getCatalogCellValue(cells[newArrivalIndex])) || jsonMarked) {
      count += 1;
    }
  });

  return count;
};

const parseCatalogJsonCell = (cell) => {
  try {
    return JSON.parse(getCatalogCellValue(cell) || "{}");
  } catch (error) {
    return {};
  }
};

const getCatalogPriceNumbers = (value) => {
  return (String(value || "").match(/(?:\d[\d\s]*\d|\d)(?:[.,]\d+)?/g) || [])
    .map((item) => Number.parseInt(item.replace(/[^\d]/g, ""), 10))
    .filter((number) => Number.isFinite(number) && number > 0);
};

const formatCatalogSomPrice = (value) => {
  return `${Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} \u0441\u043e\u043c`;
};

const buildCatalogPriceRange = (prices) => {
  const uniquePrices = [...new Set(prices.filter(Boolean))].sort((a, b) => a - b);

  if (!uniquePrices.length) {
    return "";
  }

  if (uniquePrices.length === 1) {
    return formatCatalogSomPrice(uniquePrices[0]);
  }

  return `${formatCatalogSomPrice(uniquePrices[0])} - ${formatCatalogSomPrice(uniquePrices[uniquePrices.length - 1])}`;
};

const getHomeFeaturedProducts = (payload) => {
  const rows = payload?.table?.rows || [];
  const columns = payload?.table?.cols || [];
  const productCodeIndex = findCatalogColumnIndex(columns, ["product_id"], 0);
  const brandIndex = findCatalogColumnIndex(columns, ["brend", "brand", "\u0431\u0440\u0435\u043d\u0434"], -1);
  const titleIndex = findCatalogColumnIndex(columns, ["name", "\u043d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435"], -1);
  const priceIndex = findCatalogColumnIndex(columns, ["price", "\u0446\u0435\u043d\u0430", "cena_craft", "price_craft"], -1);
  const discountIndex = findCatalogColumnIndex(columns, ["skidki", "skidka", "discount", "sale", "\u0441\u043a\u0438\u0434\u043a\u0438", "\u0441\u043a\u0438\u0434\u043a\u0430"], -1);
  const newArrivalIndex = findCatalogColumnIndex(columns, [
    "novoe_postuplenie",
    "new_arrival",
    "new",
    "\u043d\u043e\u0432\u043e\u0435_\u043f\u043e\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u0435",
    "\u043d\u043e\u0432\u0438\u043d\u043a\u0430"
  ], -1);
  const stockIndex = findCatalogColumnIndex(columns, ["\u043e\u0441\u0442\u0430\u0442\u043e\u043a", "ostatok", "stock", "qty", "quantity"], -1);
  const jsonIndex = findCatalogColumnIndex(columns, ["_json", "json"], -1);
  const products = new Map();

  rows.forEach((row) => {
    const cells = row.c || [];
    const syncedJson = jsonIndex >= 0 ? parseCatalogJsonCell(cells[jsonIndex]) : {};
    const productCode = normalizeCatalogProductCode(
      syncedJson.product_id
      || syncedJson.row_product_id
      || getCatalogCellValue(cells[productCodeIndex])
    );

    if (!productCode) {
      return;
    }

    const stock = stockIndex >= 0
      ? Number.parseFloat(String(getCatalogCellValue(cells[stockIndex])).replace(",", "."))
      : Number.parseFloat(String(syncedJson.stock || 1).replace(",", "."));

    if (Number.isFinite(stock) && stock <= 0) {
      return;
    }

    const discount = Math.max(
      parseDiscountPercent(getCatalogCellValue(cells[discountIndex])),
      parseDiscountPercent(syncedJson.skidki || syncedJson.discount || syncedJson.sale)
    );
    const isNewArrival = parseMarkedValue(getCatalogCellValue(cells[newArrivalIndex]))
      || parseMarkedValue(syncedJson.novoe_postuplenie || syncedJson.new_arrival);
    const priceText = syncedJson.price || getCatalogCellValue(cells[priceIndex]);
    const priceNumbers = getCatalogPriceNumbers(priceText);
    const currentPrices = discount
      ? priceNumbers.map((price) => Math.round(price * (100 - discount) / 100))
      : priceNumbers;
    const existing = products.get(productCode) || {
      productCode,
      brand: "",
      title: "",
      priceNumbers: [],
      currentPriceNumbers: [],
      discountPercent: 0,
      isNewArrival: false
    };

    products.set(productCode, {
      ...existing,
      brand: existing.brand || syncedJson.brend || getCatalogCellValue(cells[brandIndex]),
      title: existing.title || syncedJson.name || getCatalogCellValue(cells[titleIndex]) || productCode,
      priceNumbers: [...existing.priceNumbers, ...priceNumbers],
      currentPriceNumbers: [...existing.currentPriceNumbers, ...currentPrices],
      discountPercent: Math.max(existing.discountPercent, discount),
      isNewArrival: existing.isNewArrival || isNewArrival
    });
  });

  return [...products.values()]
    .map((product) => ({
      ...product,
      price: buildCatalogPriceRange(product.currentPriceNumbers) || buildCatalogPriceRange(product.priceNumbers)
    }))
    .filter((product) => product.discountPercent > 0 || product.isNewArrival);
};

const loadCatalogMediaMap = async () => {
  return new Map(Object.entries(HOME_CATALOG_MEDIA).map(([productCode, src]) => [
    normalizeCatalogProductCode(productCode),
    { src, alt: productCode }
  ]));
};

const chooseHomeFeaturedProducts = (products) => {
  const discounts = products.filter((product) => product.discountPercent > 0);
  const arrivals = products.filter((product) => product.isNewArrival);
  const selected = [];
  const usedCodes = new Set();

  for (let index = 0; selected.length < 5 && (index < discounts.length || index < arrivals.length); index += 1) {
    [discounts[index], arrivals[index]].forEach((product) => {
      if (product && selected.length < 5 && !usedCodes.has(product.productCode)) {
        selected.push(product);
        usedCodes.add(product.productCode);
      }
    });
  }

  return selected;
};

const initHomeFeaturedCatalog = () => {
  const section = document.querySelector("[data-home-featured]");
  const grid = document.querySelector("[data-home-featured-grid]");
  const discountLink = document.querySelector("[data-home-featured-discounts]");
  const newLink = document.querySelector("[data-home-featured-new]");

  if (!section || !grid) {
    return;
  }

  Promise.all([
    getCatalogSyncPayload(),
    loadCatalogMediaMap().catch(() => new Map())
  ])
    .then(([catalogPayload, mediaMap]) => {
      const products = getHomeFeaturedProducts(catalogPayload);
      const hasDiscounts = products.some((product) => product.discountPercent > 0);
      const hasNewArrivals = products.some((product) => product.isNewArrival);
      const featuredProducts = chooseHomeFeaturedProducts(products);

      if (!featuredProducts.length) {
        section.hidden = true;
        return;
      }

      if (discountLink) {
        discountLink.hidden = !hasDiscounts;
      }
      if (newLink) {
        newLink.hidden = !hasNewArrivals;
      }

      grid.textContent = "";
      featuredProducts.forEach((product) => {
        const media = mediaMap.get(product.productCode) || {};
        const card = document.createElement("a");
        const imageWrap = document.createElement("span");
        const image = document.createElement("img");
        const body = document.createElement("span");
        const brand = document.createElement("span");
        const title = document.createElement("span");
        const price = document.createElement("span");

        card.className = "home-featured-card";
        const targetCategory = product.discountPercent > 0 ? "discounts" : "new";
        card.href = `catalog.html?category=${targetCategory}&product=${encodeURIComponent(product.productCode)}#catalog-list`;
        imageWrap.className = "home-featured-card-media";
        body.className = "home-featured-card-body";
        brand.className = "home-featured-card-brand";
        title.className = "home-featured-card-title";
        price.className = "home-featured-card-price";

        if (product.discountPercent > 0) {
          imageWrap.dataset.discountLabel = `-${product.discountPercent}%`;
        }
        if (product.isNewArrival) {
          imageWrap.dataset.newArrivalLabel = "NEW";
        }

        image.src = media.src || "assets/aquamuse-model-beige-set.jpg";
        image.alt = media.alt || product.title;
        brand.textContent = product.brand || "\u00a0";
        title.textContent = product.title;
        price.textContent = product.price || "\u0426\u0435\u043d\u0430 \u0443\u0442\u043e\u0447\u043d\u044f\u0435\u0442\u0441\u044f";

        imageWrap.appendChild(image);
        body.append(brand, title, price);
        card.append(imageWrap, body);
        grid.appendChild(card);
      });

      section.hidden = false;
    })
    .catch((error) => {
      console.warn("Home featured catalog unavailable", error);
    });
};

const createAnnouncementItem = ({ href, label }) => {
  const link = document.createElement("a");
  const labelText = document.createElement("span");

  link.className = "discount-alert-item";
  link.href = href;
  labelText.textContent = label;
  link.append(labelText);

  return link;
};

const initDiscountAlert = () => {
  const header = document.querySelector(".site-header");

  if (!header) {
    return;
  }

  const alert = document.createElement("div");
  const track = document.createElement("div");
  alert.className = "discount-alert";
  track.className = "discount-alert-track";
  alert.hidden = true;
  alert.appendChild(track);
  header.insertAdjacentElement("beforebegin", alert);

  getCatalogSyncPayload()
    .then((catalogPayload) => {
      const discountCodes = getCatalogDiscountCodes(catalogPayload);
      const newArrivalCodes = getCatalogNewArrivalCodes(catalogPayload);
      const discountCount = discountCodes.size;
      const newArrivalCount = getCatalogNewArrivalCount(catalogPayload);
      const items = [];

      if (discountCount) {
        items.push({
          href: "catalog.html?category=discounts#catalog-list",
          label: "Товары со скидками"
        });
      }

      if (newArrivalCount) {
        items.push({
          href: "catalog.html?category=new#catalog-list",
          label: "Новое поступление"
        });
      }

      if (!items.length) {
        return;
      }

      track.textContent = "";

      if (items.length > 1) {
        alert.classList.add("is-marquee");
        Array.from({ length: 8 }).forEach(() => {
          items.forEach((item) => track.appendChild(createAnnouncementItem(item)));
        });
      } else {
        alert.classList.remove("is-marquee");
        track.appendChild(createAnnouncementItem(items[0]));
      }

      alert.hidden = false;
      document.body.classList.add("has-discount-alert");
    })
    .catch((error) => {
      console.warn("Discount alert unavailable", error);
    });
};

initDiscountAlert();
initHomeFeaturedCatalog();

const initCartPage = () => {
  const page = document.querySelector("[data-cart-page]");
  const list = document.querySelector("[data-cart-list]");
  const empty = document.querySelector("[data-cart-empty]");
  const summary = document.querySelector("[data-cart-summary]");
  const clearButton = document.querySelector("[data-cart-clear]");
  const whatsappButton = document.querySelector("[data-cart-whatsapp]");

  if (!page || !list || !empty) {
    return;
  }

  const getCartItemPriceRange = (item) => {
    const numbers = String(item.price || "")
      .match(/(?:\d[\d\s]*\d|\d)(?:[.,]\d+)?/g) || [];
    const values = numbers
      .map((value) => Number.parseInt(value.replace(/[^\d]/g, ""), 10))
      .filter((value) => Number.isFinite(value) && value > 0);

    if (!values.length) {
      return { min: 0, max: 0 };
    }

    return {
      min: Math.min(...values),
      max: Math.max(...values)
    };
  };

  const formatCartMoney = (value) => {
    return `${Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} \u0441\u043e\u043c`;
  };

  const getCartSummary = (items) => {
    const totals = items.reduce((result, item) => {
      const price = getCartItemPriceRange(item);
      return {
        min: result.min + price.min,
        max: result.max + price.max
      };
    }, { min: 0, max: 0 });
    const totalText = totals.min
      ? totals.min === totals.max
        ? formatCartMoney(totals.min)
        : `${formatCartMoney(totals.min).replace(/\s+\S+$/, "")} - ${formatCartMoney(totals.max)}`
      : "\u0441\u0443\u043c\u043c\u0430 \u0443\u0442\u043e\u0447\u043d\u044f\u0435\u0442\u0441\u044f";

    return {
      count: items.length,
      totalText,
      text: `\u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e ${items.length} \u0442\u043e\u0432\u0430\u0440\u043e\u0432 \u043d\u0430 \u0441\u0443\u043c\u043c\u0443 ${totalText}.`
    };
  };

  const renderCart = () => {
    const items = readCartItems();
    const cartSummary = getCartSummary(items);
    list.textContent = "";
    empty.hidden = items.length > 0;
    if (summary) {
      summary.hidden = items.length === 0;
      summary.textContent = cartSummary.text;
    }
    if (clearButton) {
      clearButton.hidden = items.length === 0;
    }
    if (whatsappButton) {
      whatsappButton.hidden = items.length === 0;
      if (items.length) {
        const lines = items.map((item, index) => {
          const sizeText = item.size ? `, \u0440\u0430\u0437\u043c\u0435\u0440 "${item.size}"` : "";
          const priceText = item.price ? `, \u043f\u043e \u0446\u0435\u043d\u0435 "${item.price}"` : "";
          const discountText = item.discountPercent ? `, \u0441\u043a\u0438\u0434\u043a\u0430 -${item.discountPercent}%` : "";
          return `${index + 1}. "${item.title || "\u0422\u043e\u0432\u0430\u0440"}"${sizeText}${priceText}${discountText}`;
        });
        const text = `\u042f \u0431\u044b \u0445\u043e\u0442\u0435\u043b\u0430 \u0437\u0430\u043a\u0430\u0437\u0430\u0442\u044c:\n${lines.join("\n")}\n\n\u0418\u0442\u043e\u0433: ${cartSummary.text}`;
        whatsappButton.href = `https://wa.me/996550333087?text=${encodeURIComponent(text)}`;
      }
    }

    items.forEach((item, index) => {
      const card = document.createElement("article");
      const title = document.createElement("h2");
      const titleLink = document.createElement("button");
      const details = document.createElement("dl");
      const remove = document.createElement("button");
      card.className = "cart-item";
      titleLink.textContent = item.title || "\u0422\u043e\u0432\u0430\u0440";
      titleLink.type = "button";
      titleLink.dataset.cartProductCode = item.productCode || "";
      titleLink.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("aquamuse:open-product", {
          detail: { productCode: item.productCode || "" }
        }));
      });
      title.appendChild(titleLink);

      [
        ["\u0420\u0430\u0437\u043c\u0435\u0440", item.size || "\u043d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d"],
        ["\u0426\u0435\u043d\u0430", item.price || "\u0443\u0442\u043e\u0447\u043d\u044f\u0435\u0442\u0441\u044f"],
        ["\u0421\u043a\u0438\u0434\u043a\u0430", item.discountPercent ? `-${item.discountPercent}%` : "\u043d\u0435\u0442"]
      ].forEach(([label, value]) => {
        const row = document.createElement("div");
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        dt.textContent = label;
        dd.textContent = value;
        row.append(dt, dd);
        details.appendChild(row);
      });

      remove.className = "button secondary cart-remove";
      remove.type = "button";
      remove.textContent = "\u0423\u0434\u0430\u043b\u0438\u0442\u044c";
      remove.addEventListener("click", () => {
        const nextItems = readCartItems();
        nextItems.splice(index, 1);
        writeCartItems(nextItems);
        updateCartIndicators();
        renderCart();
      });

      card.append(title, details, remove);
      list.appendChild(card);
    });
  };

  clearButton?.addEventListener("click", () => {
    writeCartItems([]);
    updateCartIndicators();
    renderCart();
  });

  renderCart();
};

initCartPage();

const form = document.querySelector(".booking-form");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "не указано";
    const phone = data.get("phone") || "не указано";
    const request = data.get("request") || "подбор белья";
    const message = data.get("message") || "без комментария";
    const text = `Здравствуйте! Меня зовут ${name}. Хочу записаться на подбор в Aquamuse.\nТелефон: ${phone}\nЗапрос: ${request}\nКомментарий: ${message}`;
    window.location.href = `https://wa.me/996550333087?text=${encodeURIComponent(text)}`;
  });
}

const sizeCalculator = document.querySelector("[data-size-calculator]");

function getRecommendedBand(inputBand) {
  const adjustment = inputBand <= 80 ? 5 : 7;
  const adjustedBand = inputBand - adjustment;

  return {
    adjustment,
    adjustedBand,
    band: Math.floor(adjustedBand / 5) * 5
  };
}

function getUkBand(euBand) {
  return Math.round(euBand / 2.5 + 4);
}

function getCupByStep(step, cups) {
  if (step < 1 || step > cups.length) {
    return "";
  }

  return cups[step - 1];
}

function calculateBraSize(bandCm, bustCm) {
  const inputBand = Number(bandCm);
  const inputBust = Number(bustCm);

  if (!Number.isFinite(inputBand) || !Number.isFinite(inputBust)) {
    return { error: "Введите оба измерения в сантиметрах." };
  }

  if (inputBand < 65 || inputBand > 160) {
    return { error: "Обхват под грудью должен быть от 65 до 160 см." };
  }

  if (inputBust <= inputBand) {
    return { error: "Обхват по груди должен быть больше обхвата под грудью." };
  }

  const { band } = getRecommendedBand(inputBand);
  const difference = inputBust - inputBand;

  if (Number.isNaN(band) || band < 55 || band > 120 || difference < 2 || difference > 40) {
    return { error: "Проверьте измерения: похоже, одно из значений введено некорректно." };
  }

  const euCups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U"];
  const ukCups = ["A", "B", "C", "D", "DD", "E", "F", "FF", "G", "GG", "H", "HH", "J", "JJ", "K", "KK", "L", "LL"];
  const euCupStep = Math.round(difference / 2);
  const ukCupStep = Math.round(difference / 2.54);
  const euCup = getCupByStep(euCupStep, euCups);
  const ukCup = getCupByStep(ukCupStep, ukCups);

  if (!euCup || !ukCup) {
    return { error: "Размер получился вне стандартной сетки. Лучше прийти на очный подбор." };
  }

  const euSize = `${band}${euCup}`;
  const ukSize = `${getUkBand(band)}${ukCup}`;
  const alternativeBand = band + 5;
  const alternativeEuCup = getCupByStep(euCupStep - 1, euCups);
  const alternativeUkCup = getCupByStep(ukCupStep - 1, ukCups);
  const alternative = alternativeEuCup && alternativeUkCup
    ? `EU ${alternativeBand}${alternativeEuCup} / UK ${getUkBand(alternativeBand)}${alternativeUkCup}`
    : "";

  return {
    size: `EU ${euSize} / UK ${ukSize}`,
    euSize,
    note: "Это стартовая точка для примерки. Финальную посадку лучше подтвердить на примерке.",
    alternative
  };
}

if (sizeCalculator) {
  const result = sizeCalculator.querySelector("[data-size-result]");
  const note = sizeCalculator.querySelector("[data-size-note]");
  const alternative = sizeCalculator.querySelector("[data-size-alternative]");
  const catalogLink = sizeCalculator.querySelector("[data-size-catalog-link]");

  sizeCalculator.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(sizeCalculator);
    const calculated = calculateBraSize(data.get("band"), data.get("bust"));

    if (calculated.error) {
      result.textContent = "-";
      note.textContent = calculated.error;
      if (alternative) {
        alternative.textContent = "";
        alternative.hidden = true;
      }
      if (catalogLink) {
        catalogLink.hidden = true;
      }
      return;
    }

    result.textContent = calculated.size;
    note.textContent = calculated.note;
    if (alternative) {
      alternative.textContent = calculated.alternative
        ? `Альтернативный размер, если хотите немного свободнее: ${calculated.alternative}`
        : "";
      alternative.hidden = !calculated.alternative;
    }
    if (catalogLink) {
      catalogLink.href = `catalog.html?category=byustgaltery&size=${encodeURIComponent(calculated.euSize)}#catalog-list`;
      catalogLink.hidden = false;
    }
  });
}

const productModal = document.querySelector("[data-product-modal]");

if (productModal) {
  const catalogProducts = {
    "ambra-black": {
      title: "Бюстгальтер классический push-up",
      sku: "Артикул: AQ1",
      brand: "AMBRA",
      line: "NUANCES D'AUTUNNO",
      price: "12 000 сом",
      color: "Черный",
      sizes: ["70/B", "70/C"],
      fit: "Формованная чашка, аккуратная поддержка, гладкая линия под одеждой.",
      note: "Точную посадку лучше подтвердить на примерке: у разных брендов один и тот же размер может ощущаться по-разному.",
      whatsappText: "Здравствуйте! Хочу забронировать примерку модели AMBRA 0876 OIL.",
      images: [
        { src: "assets/catalog-ambra-model.jpg", alt: "Черный комплект Ambra на модели" },
        { src: "assets/catalog-ambra-set.jpg", alt: "Черный комплект Ambra на белом фоне" },
        { src: "assets/catalog-ambra-close.jpg", alt: "Крупный план черного бюстгальтера Ambra" },
        { src: "assets/catalog-ambra-back.jpg", alt: "Спинка черного бюстгальтера Ambra" }
      ]
    },
    "ambra-nude": {
      title: "Бежевый комплект с мягкой чашкой",
      sku: "Артикул: AQ2",
      brand: "Aquamuse selection",
      line: "уточняется",
      price: "Цена уточняется",
      color: "Бежевый",
      sizes: [],
      sizeText: "размеры уточняются",
      fit: "Мягкая кружевная чашка без лишнего объема, деликатная линия под одеждой и комфортная посадка на каждый день.",
      note: "Цена и размерная сетка будут добавлены после сверки наличия. Уже можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие и размеры бежевого комплекта с мягкой чашкой.",
      images: [
        { src: "assets/catalog-ambra-nude-model.jpg", alt: "Бежевый комплект с мягкой чашкой на модели" },
        { src: "assets/catalog-ambra-nude-set.jpg", alt: "Бежевый комплект белья на белом фоне" },
        { src: "assets/catalog-ambra-nude-close.jpg", alt: "Крупный план бежевого бюстгальтера с мягкой чашкой" },
        { src: "assets/catalog-ambra-nude-back.jpg", alt: "Спинка бежевого бюстгальтера на модели" }
      ]
    },
    "ambra-smooth": {
      title: "Бежевый комплект с гладкой чашкой",
      sku: "Артикул: AQ3",
      brand: "Aquamuse selection",
      line: "уточняется",
      price: "Цена уточняется",
      color: "Бежевый",
      sizes: [],
      sizeText: "размеры уточняются",
      fit: "Гладкая чашка дает спокойную линию под одеждой, мягко собирает силуэт и подходит как базовый вариант на каждый день.",
      note: "Цена и размерная сетка будут добавлены после сверки наличия. Уже можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие и размеры бежевого комплекта с гладкой чашкой.",
      images: [
        { src: "assets/catalog-ambra-smooth-model.jpg", alt: "Бежевый комплект с гладкой чашкой на модели" },
        { src: "assets/catalog-ambra-smooth-set.jpg", alt: "Бежевый комплект с гладкой чашкой на белом фоне" },
        { src: "assets/catalog-ambra-smooth-side.jpg", alt: "Боковой ракурс бежевого комплекта с гладкой чашкой" },
        { src: "assets/catalog-ambra-smooth-back.jpg", alt: "Спинка бежевого комплекта с гладкой чашкой на модели" }
      ]
    },
    "ambra-lace": {
      title: "Бежевый комплект с кружевной чашкой",
      sku: "Артикул: AQ4",
      brand: "Aquamuse selection",
      line: "уточняется",
      price: "Цена уточняется",
      color: "Бежевый",
      sizes: [],
      sizeText: "размеры уточняются",
      fit: "Кружевная чашка с мягкой поддержкой красиво оформляет грудь, а высокий пояс трусов делает комплект более собранным и женственным.",
      note: "Цена и размерная сетка будут добавлены после сверки наличия. Уже можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие и размеры бежевого комплекта с кружевной чашкой.",
      images: [
        { src: "assets/catalog-ambra-lace-model.jpg", alt: "Бежевый кружевной комплект на модели" },
        { src: "assets/catalog-ambra-lace-close.jpg", alt: "Крупный план бежевого кружевного бюстгальтера" },
        { src: "assets/catalog-ambra-lace-side.jpg", alt: "Боковой ракурс бежевого кружевного комплекта" },
        { src: "assets/catalog-ambra-lace-back.jpg", alt: "Спинка бежевого кружевного бюстгальтера на модели" }
      ]
    },
    "melle-lace-soft": {
      title: "Бежевый комплект с мягкой кружевной чашкой",
      sku: "Артикул: AQ5",
      brand: "Melle",
      line: "Aquamuse selection",
      price: "Цена уточняется",
      color: "Бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Мягкая чашка без жесткого объема, кружевная зона у декольте и комфортный широкий пояс для спокойной посадки на каждый день.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие бежевого комплекта с мягкой кружевной чашкой AQ5.",
      images: [
        { src: "assets/catalog-melle-lace-soft-model.jpg", alt: "Бежевый комплект с мягкой кружевной чашкой на модели" },
        { src: "assets/catalog-melle-lace-soft-set.jpg", alt: "Бежевый комплект с мягкой кружевной чашкой на белом фоне" },
        { src: "assets/catalog-melle-lace-soft-side.jpg", alt: "Боковой ракурс бежевого комплекта с мягкой кружевной чашкой" },
        { src: "assets/catalog-melle-lace-soft-back.jpg", alt: "Спинка бежевого комплекта с мягкой кружевной чашкой на модели" }
      ]
    },
    "melle-lace-underwire": {
      title: "Бежевый комплект с кружевной чашкой",
      sku: "Артикул: AQ6",
      brand: "Melle",
      line: "Aquamuse selection",
      price: "Цена уточняется",
      color: "Бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Кружевная чашка на косточках, мягкая поддержка и деликатная линия декольте для женственной посадки без лишнего объема.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие бежевого комплекта с кружевной чашкой AQ6.",
      images: [
        { src: "assets/catalog-melle-lace-underwire-model.jpg", alt: "Бежевый комплект с кружевной чашкой на модели" },
        { src: "assets/catalog-melle-lace-underwire-set.jpg", alt: "Бежевый комплект с кружевной чашкой на белом фоне" },
        { src: "assets/catalog-melle-lace-underwire-close.jpg", alt: "Крупный план бежевого бюстгальтера с кружевной чашкой" },
        { src: "assets/catalog-melle-lace-underwire-back.jpg", alt: "Спинка бежевого комплекта с кружевной чашкой на модели" }
      ]
    },
    "melle-floral-lace": {
      title: "Бежевый комплект с цветочным кружевом",
      sku: "Артикул: AQ7",
      brand: "Melle",
      line: "Aquamuse selection",
      price: "Цена уточняется",
      color: "Бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Кружевная чашка с выразительным цветочным рисунком, мягкая поддержка и аккуратная посадка без лишнего объема.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие бежевого комплекта с цветочным кружевом AQ7.",
      images: [
        { src: "assets/catalog-melle-floral-lace-model.jpg", alt: "Бежевый комплект с цветочным кружевом на модели" },
        { src: "assets/catalog-melle-floral-lace-set.jpg", alt: "Бежевый комплект с цветочным кружевом на белом фоне" },
        { src: "assets/catalog-melle-floral-lace-close.jpg", alt: "Крупный план бежевого бюстгальтера с цветочным кружевом" },
        { src: "assets/catalog-melle-floral-lace-back.jpg", alt: "Спинка бежевого комплекта с цветочным кружевом на модели" }
      ]
    },
    "sermija-dots-black": {
      title: "Черный комплект в сетку в горошек",
      sku: "Артикул: AQ8",
      brand: "Sermija",
      line: "Aquamuse selection",
      price: "Цена уточняется",
      color: "Черный",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Прозрачная сетка в мелкий горошек, мягкая чашка на косточках и графичные перемычки у декольте для выразительной, но легкой посадки.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черного комплекта в сетку в горошек AQ8.",
      images: [
        { src: "assets/catalog-sermija-dots-black-model.jpg", alt: "Черный комплект в сетку в горошек на модели спереди" },
        { src: "assets/catalog-sermija-dots-black-set.jpg", alt: "Черный комплект в сетку в горошек на белом фоне" },
        { src: "assets/catalog-sermija-dots-black-back.jpg", alt: "Черный комплект в сетку в горошек на модели со спины" },
        { src: "assets/catalog-sermija-dots-black-side.jpg", alt: "Черный комплект в сетку в горошек на модели в движении" }
      ]
    },
    "sermija-ribbed-nude": {
      title: "Бежевый комплект в тонкую полоску",
      sku: "Артикул: AQ9",
      brand: "Sermija",
      line: "Aquamuse selection",
      price: "Цена уточняется",
      color: "Бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Формованная чашка с гладкой поддержкой, деликатная вертикальная фактура и комфортная посадка для базовых образов.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие бежевого комплекта в тонкую полоску AQ9.",
      images: [
        { src: "assets/catalog-sermija-ribbed-nude-model.jpg", alt: "Бежевый комплект в тонкую полоску на модели спереди" },
        { src: "assets/catalog-sermija-ribbed-nude-set.jpg", alt: "Бежевый комплект в тонкую полоску на белом фоне" },
        { src: "assets/catalog-sermija-ribbed-nude-close.jpg", alt: "Крупный план бежевого бюстгальтера в тонкую полоску" },
        { src: "assets/catalog-sermija-ribbed-nude-back.jpg", alt: "Спинка бежевого комплекта в тонкую полоску на модели" }
      ]
    },
    "melle-floral-white": {
      title: "Белый комплект с цветочным кружевом",
      sku: "Артикул: AQ10",
      brand: "Melle",
      line: "Aquamuse selection",
      price: "Цена уточняется",
      color: "Белый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Цветочное кружево на чашке, мягкая поддержка на косточках и аккуратная белая база для светлой одежды.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие белого комплекта с цветочным кружевом AQ10.",
      images: [
        { src: "assets/catalog-melle-floral-white-model.jpg", alt: "Белый комплект с цветочным кружевом на модели спереди" },
        { src: "assets/catalog-melle-floral-white-set.jpg", alt: "Белый комплект с цветочным кружевом на белом фоне" },
        { src: "assets/catalog-melle-floral-white-close.jpg", alt: "Крупный план белого бюстгальтера с цветочным кружевом" },
        { src: "assets/catalog-melle-floral-white-back.jpg", alt: "Спинка белого комплекта с цветочным кружевом на модели" }
      ]
    },
    "melle-mesh-black": {
      title: "Черный комплект с прозрачной сеткой",
      sku: "Артикул: AQ11",
      brand: "Melle",
      line: "Aquamuse selection",
      price: "Цена уточняется",
      color: "Черный",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Прозрачная сетка, мягкая чашка на косточках и широкая посадка трусов для выразительного комплекта с хорошей поддержкой.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черного комплекта с прозрачной сеткой AQ11.",
      images: [
        { src: "assets/catalog-melle-mesh-black-model.jpg", alt: "Черный комплект с прозрачной сеткой на модели спереди" },
        { src: "assets/catalog-melle-mesh-black-set.jpg", alt: "Черный комплект с прозрачной сеткой на белом фоне" },
        { src: "assets/catalog-melle-mesh-black-close.jpg", alt: "Крупный план черного бюстгальтера с прозрачной сеткой" },
        { src: "assets/catalog-melle-mesh-black-back.jpg", alt: "Спинка черного комплекта с прозрачной сеткой на модели" }
      ]
    },
    "melle-mesh-nude": {
      title: "Бежевый комплект с мягкой сеткой",
      sku: "Артикул: AQ12",
      brand: "Melle",
      line: "Aquamuse selection",
      price: "Цена уточняется",
      color: "Бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Мягкая сетчатая чашка, легкая бежевая фактура и аккуратная конструкция для спокойной поддержки каждый день.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие бежевого комплекта с мягкой сеткой AQ12.",
      images: [
        { src: "assets/catalog-melle-mesh-nude-model.jpg", alt: "Бежевый комплект с мягкой сеткой на модели спереди" },
        { src: "assets/catalog-melle-mesh-nude-set.jpg", alt: "Бежевый комплект с мягкой сеткой на белом фоне" },
        { src: "assets/catalog-melle-mesh-nude-close.jpg", alt: "Крупный план бежевого бюстгальтера с мягкой сеткой" },
        { src: "assets/catalog-melle-mesh-nude-back.jpg", alt: "Спинка бежевого комплекта с мягкой сеткой на модели" }
      ]
    },
    "melle-smooth-nude": {
      title: "Бежевый гладкий бюстгальтер",
      sku: "Артикул: AQ13",
      brand: "Melle",
      line: "Aquamuse selection",
      price: "Цена уточняется",
      color: "Бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Гладкая формованная чашка, тонкие бретели и возможность перекрестной посадки для открытой спины.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие бежевого гладкого бюстгальтера AQ13.",
      images: [
        { src: "assets/catalog-melle-smooth-nude-model.jpg", alt: "Бежевый гладкий бюстгальтер на модели спереди" },
        { src: "assets/catalog-melle-smooth-nude-close.jpg", alt: "Крупный план бежевого гладкого бюстгальтера" },
        { src: "assets/catalog-melle-smooth-nude-back.jpg", alt: "Спинка бежевого гладкого бюстгальтера на модели" },
        { src: "assets/catalog-melle-smooth-nude-crossback.jpg", alt: "Бежевый гладкий бюстгальтер с перекрестными бретелями" }
      ]
    },
    "melle-ribbed-nude": {
      title: "Бежевый бюстгальтер в тонкую полоску",
      sku: "Артикул: AQ14",
      brand: "Melle",
      line: "Aquamuse selection",
      price: "Цена уточняется",
      color: "Бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Мягкая чашка с вертикальной фактурой, прозрачные вставки у декольте и спокойная поддержка для повседневной посадки.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие бежевого бюстгальтера в тонкую полоску AQ14.",
      images: [
        { src: "assets/catalog-melle-ribbed-nude-model.jpg", alt: "Бежевый бюстгальтер в тонкую полоску на модели спереди" },
        { src: "assets/catalog-melle-ribbed-nude-close.jpg", alt: "Крупный план бежевого бюстгальтера в тонкую полоску" },
        { src: "assets/catalog-melle-ribbed-nude-side.jpg", alt: "Бежевый бюстгальтер в тонкую полоску на модели сбоку" },
        { src: "assets/catalog-melle-ribbed-nude-back.jpg", alt: "Спинка бежевого бюстгальтера в тонкую полоску" }
      ]
    },
    "melle-lace-taupe": {
      title: "Комплект тауп с кружевом",
      sku: "Артикул: AQ15",
      brand: "Melle",
      line: "Aquamuse selection",
      price: "Цена уточняется",
      color: "Тауп",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Гладкая чашка, кружевная деталь по поясу и мягкий оттенок тауп для базового комплекта с декоративным акцентом.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие комплекта тауп с кружевом AQ15.",
      images: [
        { src: "assets/catalog-melle-lace-taupe-model.jpg", alt: "Комплект тауп с кружевом на модели спереди" },
        { src: "assets/catalog-melle-lace-taupe-set.jpg", alt: "Комплект тауп с кружевом на белом фоне" },
        { src: "assets/catalog-melle-lace-taupe-close.jpg", alt: "Крупный план бюстгальтера тауп с кружевом" },
        { src: "assets/catalog-melle-lace-taupe-back.jpg", alt: "Спинка комплекта тауп с кружевом на модели" }
      ]
    },
    "sermija-dots-high-black": {
      title: "Черный комплект в горошек с высокой посадкой",
      sku: "Артикул: AQ16",
      brand: "Sermija",
      line: "Aquamuse selection",
      price: "Цена уточняется",
      color: "Черный",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Прозрачная сетка в горошек, графичные перемычки на бюстгальтере и трусы с высокой посадкой.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черного комплекта в горошек с высокой посадкой AQ16.",
      images: [
        { src: "assets/catalog-sermija-dots-high-black-model.jpg", alt: "Черный комплект в горошек с высокой посадкой на модели спереди" },
        { src: "assets/catalog-sermija-dots-high-black-set.jpg", alt: "Черный комплект в горошек с высокой посадкой на белом фоне" },
        { src: "assets/catalog-sermija-dots-high-black-close.jpg", alt: "Крупный план черного бюстгальтера в горошек" },
        { src: "assets/catalog-sermija-dots-high-black-back.jpg", alt: "Спинка черного комплекта в горошек с высокой посадкой" }
      ]
    },
    "melle-lace-blush-panties": {
      title: "Розовые кружевные трусы",
      sku: "Артикул: AQ17",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Розовый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Кружевная посадка с мягким краем, полупрозрачная спинка и аккуратная передняя деталь для легкого комплекта.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие розовых кружевных трусов AQ17.",
      images: [
        { src: "assets/catalog-melle-lace-blush-panties-front.jpg", alt: "Розовые кружевные трусы спереди" },
        { src: "assets/catalog-melle-lace-blush-panties-back.jpg", alt: "Розовые кружевные трусы со спины" },
        { src: "assets/catalog-melle-lace-blush-panties-close.jpg", alt: "Крупный план кружева розовых трусов" }
      ]
    },
    "melle-lace-blush-high-panties": {
      title: "Розовые трусы с высокой посадкой",
      sku: "Артикул: AQ18",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Розовый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Высокая мягкая посадка, гладкая передняя деталь и кружевные вставки по бокам и спинке.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие розовых трусов с высокой посадкой AQ18.",
      images: [
        { src: "assets/catalog-melle-lace-blush-high-panties-front.jpg", alt: "Розовые трусы с высокой посадкой спереди" },
        { src: "assets/catalog-melle-lace-blush-high-panties-back.jpg", alt: "Розовые трусы с высокой посадкой со спины" },
        { src: "assets/catalog-melle-lace-blush-high-panties-close.jpg", alt: "Крупный план кружевной вставки розовых трусов" }
      ]
    },
    "melle-lace-blush-bikini-panties": {
      title: "Розовые кружевные трусы бикини",
      sku: "Артикул: AQ19",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Розовый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Средняя посадка, мягкая гладкая вставка спереди и широкое кружево по бокам и спинке.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие розовых кружевных трусов бикини AQ19.",
      images: [
        { src: "assets/catalog-melle-lace-blush-bikini-panties-front.jpg", alt: "Розовые кружевные трусы бикини спереди" },
        { src: "assets/catalog-melle-lace-blush-bikini-panties-back.jpg", alt: "Розовые кружевные трусы бикини со спины" }
      ]
    },
    "melle-lace-blush-classic-panties": {
      title: "Розовые кружевные трусы с гладкой вставкой",
      sku: "Артикул: AQ20",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Розовый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Средняя посадка, гладкая передняя вставка и мягкие кружевные детали по бокам и спинке.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие розовых кружевных трусов с гладкой вставкой AQ20.",
      images: [
        { src: "assets/catalog-melle-lace-blush-classic-panties-front.jpg", alt: "Розовые кружевные трусы с гладкой вставкой спереди" },
        { src: "assets/catalog-melle-lace-blush-classic-panties-back.jpg", alt: "Розовые кружевные трусы с гладкой вставкой со спины" }
      ]
    },
    "melle-lace-blush-mesh-panties": {
      title: "Розовые трусы с кружевным поясом",
      sku: "Артикул: AQ21",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Розовый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Средняя посадка, гладкая передняя вставка, мягкая сетка и широкий кружевной пояс по бокам и спинке.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие розовых трусов с кружевным поясом AQ21.",
      images: [
        { src: "assets/catalog-melle-lace-blush-mesh-panties-front.jpg", alt: "Розовые трусы с кружевным поясом спереди" },
        { src: "assets/catalog-melle-lace-blush-mesh-panties-back.jpg", alt: "Розовые трусы с кружевным поясом со спины" },
        { src: "assets/catalog-melle-lace-blush-mesh-panties-close.jpg", alt: "Крупный план кружева розовых трусов с кружевным поясом" }
      ]
    },
    "melle-dots-black-bikini-panties": {
      title: "Черные трусы бикини в горошек",
      sku: "Артикул: AQ23",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Черный",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Средняя посадка, прозрачная сетка в мелкий горошек и графичные линии по передней части.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черных трусов бикини в горошек AQ23.",
      images: [
        { src: "assets/catalog-melle-dots-black-bikini-panties-front.jpg", alt: "Черные трусы бикини в горошек спереди" },
        { src: "assets/catalog-melle-dots-black-bikini-panties-back.jpg", alt: "Черные трусы бикини в горошек со спины" }
      ]
    },
    "melle-dots-black-thong-panties": {
      title: "Черные трусы стринг в горошек",
      sku: "Артикул: AQ24",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Черный",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Низкая посадка, прозрачная сетка в мелкий горошек, тонкие боковые линии и минимальная спинка.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черных трусов стринг в горошек AQ24.",
      images: [
        { src: "assets/catalog-melle-dots-black-thong-panties-front.jpg", alt: "Черные трусы стринг в горошек спереди" },
        { src: "assets/catalog-melle-dots-black-thong-panties-back.jpg", alt: "Черные трусы стринг в горошек со спины" }
      ]
    },
    "melle-floral-blush-thong-panties": {
      title: "Бежевые кружевные трусы стринг",
      sku: "Артикул: AQ25",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Низкая посадка, цветочное кружево и декоративные перемычки со спины с небольшим металлическим кольцом.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие бежевых кружевных трусов стринг AQ25.",
      images: [
        { src: "assets/catalog-melle-floral-blush-thong-panties-front.jpg", alt: "Бежевые кружевные трусы стринг спереди" },
        { src: "assets/catalog-melle-floral-blush-thong-panties-back.jpg", alt: "Бежевые кружевные трусы стринг со спины" },
        { src: "assets/catalog-melle-floral-blush-thong-panties-close.jpg", alt: "Крупный план бежевых кружевных трусов стринг" }
      ]
    },
    "melle-floral-white-thong-panties": {
      title: "Белые кружевные трусы стринг",
      sku: "Артикул: AQ26",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Белый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Низкая посадка, цветочное кружево по линии пояса и декоративные перемычки со спины с небольшим металлическим кольцом.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие белых кружевных трусов стринг AQ26.",
      images: [
        { src: "assets/catalog-melle-floral-white-thong-panties-front.jpg", alt: "Белые кружевные трусы стринг спереди" },
        { src: "assets/catalog-melle-floral-white-thong-panties-back.jpg", alt: "Белые кружевные трусы стринг со спины" },
        { src: "assets/catalog-melle-floral-white-thong-panties-front-close.jpg", alt: "Крупный план белых кружевных трусов стринг спереди" },
        { src: "assets/catalog-melle-floral-white-thong-panties-back-close.jpg", alt: "Крупный план декоративных перемычек белых трусов стринг" }
      ]
    },
    "melle-floral-blue-bikini-panties": {
      title: "Синие трусы бикини с цветочным узором",
      sku: "Артикул: AQ27",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Синий",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Средняя посадка, мягкая прозрачная сетка с крупным цветочным узором и аккуратные плоские края.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие синих трусов бикини с цветочным узором AQ27.",
      images: [
        { src: "assets/catalog-melle-floral-blue-bikini-panties-front.jpg", alt: "Синие трусы бикини с цветочным узором спереди" },
        { src: "assets/catalog-melle-floral-blue-bikini-panties-back.jpg", alt: "Синие трусы бикини с цветочным узором со спины" }
      ]
    },
    "melle-floral-black-bikini-panties": {
      title: "Черные трусы бикини с цветочным узором",
      sku: "Артикул: AQ28",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Черный",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Средняя посадка, мягкая полупрозрачная сетка с крупным цветочным узором и гладкая передняя вставка.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черных трусов бикини с цветочным узором AQ28.",
      images: [
        { src: "assets/catalog-melle-floral-black-bikini-panties-front.jpg", alt: "Черные трусы бикини с цветочным узором спереди" },
        { src: "assets/catalog-melle-floral-black-bikini-panties-back.jpg", alt: "Черные трусы бикини с цветочным узором со спины" },
        { src: "assets/catalog-melle-floral-black-bikini-panties-model-back.jpg", alt: "Черные трусы бикини с цветочным узором на модели со спины" }
      ]
    },
    "melle-lace-black-nude-bra": {
      title: "Черный кружевной бюстгальтер с бежевой основой",
      sku: "Артикул: AQ29",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "byustgaltery",
      price: "Цена уточняется",
      color: "Черный / бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Мягкая кружевная чашка на косточках, широкие кружевные бретели и выразительная линия декольте.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черного кружевного бюстгальтера с бежевой основой AQ29.",
      images: [
        { src: "assets/catalog-melle-lace-black-nude-bra-model-front.jpg", alt: "Черный кружевной бюстгальтер с бежевой основой на модели спереди" },
        { src: "assets/catalog-melle-lace-black-nude-bra-set.jpg", alt: "Черный кружевной бюстгальтер с бежевой основой в комплекте" },
        { src: "assets/catalog-melle-lace-black-nude-bra-model-side.jpg", alt: "Черный кружевной бюстгальтер с бежевой основой на модели сбоку" },
        { src: "assets/catalog-melle-lace-black-nude-bra-model-back.jpg", alt: "Черный кружевной бюстгальтер с бежевой основой на модели со спины" }
      ]
    },
    "melle-lace-white-bra": {
      title: "Белый кружевной бюстгальтер с бежевой основой",
      sku: "Артикул: AQ30",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "byustgaltery",
      price: "Цена уточняется",
      color: "Белый / бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Кружевная чашка на косточках, декоративная верхняя линия и широкие бретели с кружевной отделкой.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие белого кружевного бюстгальтера с бежевой основой AQ30.",
      images: [
        { src: "assets/catalog-melle-lace-white-bra-model-front.jpg", alt: "Белый кружевной бюстгальтер с бежевой основой на модели спереди" },
        { src: "assets/catalog-melle-lace-white-bra-set.jpg", alt: "Белый кружевной бюстгальтер с бежевой основой в комплекте" },
        { src: "assets/catalog-melle-lace-white-bra-model-side.jpg", alt: "Белый кружевной бюстгальтер с бежевой основой на модели сбоку" },
        { src: "assets/catalog-melle-lace-white-bra-model-back.jpg", alt: "Белый кружевной бюстгальтер с бежевой основой на модели со спины" }
      ]
    },
    "melle-lace-ivory-bra": {
      title: "Белый кружевной бюстгальтер с мягкой чашкой",
      sku: "Артикул: AQ31",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "byustgaltery",
      price: "Цена уточняется",
      color: "Белый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Мягкая чашка на косточках, прозрачная верхняя вставка, кружевной пояс и деликатная поддержка по бокам.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие белого кружевного бюстгальтера с мягкой чашкой AQ31.",
      images: [
        { src: "assets/catalog-melle-lace-ivory-bra-model-front.jpg", alt: "Белый кружевной бюстгальтер с мягкой чашкой на модели спереди" },
        { src: "assets/catalog-melle-lace-ivory-bra-set.jpg", alt: "Белый кружевной бюстгальтер с мягкой чашкой в комплекте" },
        { src: "assets/catalog-melle-lace-ivory-bra-model-side.jpg", alt: "Белый кружевной бюстгальтер с мягкой чашкой на модели сбоку" },
        { src: "assets/catalog-melle-lace-ivory-bra-model-back.jpg", alt: "Белый кружевной бюстгальтер с мягкой чашкой на модели со спины" }
      ]
    },
    "melle-lace-white-longline-bra": {
      title: "Белый кружевной бюстгальтер с удлиненным поясом",
      sku: "Артикул: AQ32",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "byustgaltery",
      price: "Цена уточняется",
      color: "Белый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Чашка на косточках, прозрачная верхняя вставка и удлиненный кружевной пояс для более выразительной посадки.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие белого кружевного бюстгальтера с удлиненным поясом AQ32.",
      images: [
        { src: "assets/catalog-melle-lace-white-longline-bra-model-front.jpg", alt: "Белый кружевной бюстгальтер с удлиненным поясом на модели спереди" },
        { src: "assets/catalog-melle-lace-white-longline-bra-set.jpg", alt: "Белый кружевной бюстгальтер с удлиненным поясом в комплекте" },
        { src: "assets/catalog-melle-lace-white-longline-bra-model-side.jpg", alt: "Белый кружевной бюстгальтер с удлиненным поясом на модели сбоку" },
        { src: "assets/catalog-melle-lace-white-longline-bra-model-back.jpg", alt: "Белый кружевной бюстгальтер с удлиненным поясом на модели со спины" }
      ]
    },
    "melle-lace-black-longline-bra": {
      title: "Черный кружевной бюстгальтер с удлиненным поясом",
      sku: "Артикул: AQ33",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "byustgaltery",
      price: "Цена уточняется",
      color: "Черный",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Чашка на косточках, прозрачная верхняя вставка и удлиненный кружевной пояс с выразительным нижним краем.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черного кружевного бюстгальтера с удлиненным поясом AQ33.",
      images: [
        { src: "assets/catalog-melle-lace-black-longline-bra-model-front.jpg", alt: "Черный кружевной бюстгальтер с удлиненным поясом на модели спереди" },
        { src: "assets/catalog-melle-lace-black-longline-bra-set.jpg", alt: "Черный кружевной бюстгальтер с удлиненным поясом в комплекте" },
        { src: "assets/catalog-melle-lace-black-longline-bra-model-side.jpg", alt: "Черный кружевной бюстгальтер с удлиненным поясом на модели сбоку" },
        { src: "assets/catalog-melle-lace-black-longline-bra-model-back.jpg", alt: "Черный кружевной бюстгальтер с удлиненным поясом на модели со спины" }
      ]
    },
    "melle-black-beige-embroidered-bra": {
      title: "Черно-бежевый бюстгальтер с вышивкой",
      sku: "Артикул: AQ34",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "byustgaltery",
      price: "Цена уточняется",
      color: "Черный / бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Формованная чашка на косточках, контрастная вышивка и плотные черные детали по поясу и бретелям.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черно-бежевого бюстгальтера с вышивкой AQ34.",
      images: [
        { src: "assets/catalog-melle-black-beige-embroidered-bra-model-front.jpg", alt: "Черно-бежевый бюстгальтер с вышивкой на модели спереди" },
        { src: "assets/catalog-melle-black-beige-embroidered-bra-set.jpg", alt: "Черно-бежевый бюстгальтер с вышивкой в комплекте" },
        { src: "assets/catalog-melle-black-beige-embroidered-bra-model-side.jpg", alt: "Черно-бежевый бюстгальтер с вышивкой на модели сбоку" },
        { src: "assets/catalog-melle-black-beige-embroidered-bra-model-back.jpg", alt: "Черно-бежевый бюстгальтер с вышивкой на модели со спины" }
      ]
    },
    "melle-black-beige-satin-bra": {
      title: "Черно-бежевый бюстгальтер с сатиновыми деталями",
      sku: "Артикул: AQ35",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "byustgaltery",
      price: "Цена уточняется",
      color: "Черный / бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Формованная чашка на косточках, сатиновые черные детали и декоративная вышивка по верхней линии.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черно-бежевого бюстгальтера с сатиновыми деталями AQ35.",
      images: [
        { src: "assets/catalog-melle-black-beige-satin-bra-model-front.jpg", alt: "Черно-бежевый бюстгальтер с сатиновыми деталями на модели спереди" },
        { src: "assets/catalog-melle-black-beige-satin-bra-set.jpg", alt: "Черно-бежевый бюстгальтер с сатиновыми деталями в комплекте" },
        { src: "assets/catalog-melle-black-beige-satin-bra-model-side.jpg", alt: "Черно-бежевый бюстгальтер с сатиновыми деталями на модели сбоку" },
        { src: "assets/catalog-melle-black-beige-satin-bra-model-back.jpg", alt: "Черно-бежевый бюстгальтер с сатиновыми деталями на модели со спины" }
      ]
    },
    "melle-black-bronze-leaf-bra": {
      title: "Черно-бронзовый бюстгальтер с кружевом",
      sku: "Артикул: AQ36",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "byustgaltery",
      price: "Цена уточняется",
      color: "Черный / бронзовый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Чашка на косточках, контрастное кружево с листовым узором и плотный пояс с декоративной центральной деталью.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черно-бронзового бюстгальтера с кружевом AQ36.",
      images: [
        { src: "assets/catalog-melle-black-bronze-leaf-bra-model-front.jpg", alt: "Черно-бронзовый бюстгальтер с кружевом на модели спереди" },
        { src: "assets/catalog-melle-black-bronze-leaf-bra-set.jpg", alt: "Черно-бронзовый бюстгальтер с кружевом в комплекте" },
        { src: "assets/catalog-melle-black-bronze-leaf-bra-model-side.jpg", alt: "Черно-бронзовый бюстгальтер с кружевом на модели сбоку" }
      ]
    },
    "melle-black-geometric-bra": {
      title: "Черный бюстгальтер с геометрической сеткой",
      sku: "Артикул: AQ37",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "byustgaltery",
      price: "Цена уточняется",
      color: "Черный",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Чашка на косточках, плотная черная основа и прозрачные геометрические вставки по бокам.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черного бюстгальтера с геометрической сеткой AQ37.",
      images: [
        { src: "assets/catalog-melle-black-geometric-bra-model-front.jpg", alt: "Черный бюстгальтер с геометрической сеткой на модели спереди" },
        { src: "assets/catalog-melle-black-geometric-bra-set.jpg", alt: "Черный бюстгальтер с геометрической сеткой в комплекте" },
        { src: "assets/catalog-melle-black-geometric-bra-model-side.jpg", alt: "Черный бюстгальтер с геометрической сеткой на модели сбоку" },
        { src: "assets/catalog-melle-black-geometric-bra-model-back.jpg", alt: "Черный бюстгальтер с геометрической сеткой на модели со спины" }
      ]
    },
    "melle-black-beige-beaded-bra": {
      title: "Черно-бежевый бюстгальтер с вышивкой и подвеской",
      sku: "Артикул: AQ38",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "byustgaltery",
      price: "Цена уточняется",
      color: "Черный / бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Чашка на косточках, бежевая сетка с черной вышивкой и декоративная подвеска по центру.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черно-бежевого бюстгальтера с вышивкой и подвеской AQ38.",
      images: [
        { src: "assets/catalog-melle-black-beige-beaded-bra-model-front.jpg", alt: "Черно-бежевый бюстгальтер с вышивкой и подвеской на модели спереди" },
        { src: "assets/catalog-melle-black-beige-beaded-bra-set.jpg", alt: "Черно-бежевый бюстгальтер с вышивкой и подвеской в комплекте" },
        { src: "assets/catalog-melle-black-beige-beaded-bra-model-side.jpg", alt: "Черно-бежевый бюстгальтер с вышивкой и подвеской на модели сбоку" },
        { src: "assets/catalog-melle-black-beige-beaded-bra-model-back.jpg", alt: "Черно-бежевый бюстгальтер с вышивкой и подвеской на модели со спины" }
      ]
    },
    "melle-rose-embroidered-bra": {
      title: "Розовый бюстгальтер с прозрачной вышивкой",
      sku: "Артикул: AQ39",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "byustgaltery",
      price: "Цена уточняется",
      color: "Розовый / пудровый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Чашка на косточках, прозрачная сетка с вышивкой и мягкая пудровая отделка.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие розового бюстгальтера с прозрачной вышивкой AQ39.",
      images: [
        { src: "assets/catalog-melle-rose-embroidered-bra-model-front.jpg", alt: "Розовый бюстгальтер с прозрачной вышивкой на модели спереди" },
        { src: "assets/catalog-melle-rose-embroidered-bra-set.jpg", alt: "Розовый бюстгальтер с прозрачной вышивкой в комплекте" },
        { src: "assets/catalog-melle-rose-embroidered-bra-model-side.jpg", alt: "Розовый бюстгальтер с прозрачной вышивкой на модели сбоку" },
        { src: "assets/catalog-melle-rose-embroidered-bra-model-back.jpg", alt: "Розовый бюстгальтер с прозрачной вышивкой на модели со спины" }
      ]
    },
    "melle-white-lace-panties": {
      title: "Белые кружевные трусы",
      sku: "Артикул: AQ40",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Белый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Кружевные панели, прозрачная сетка и мягкая посадка.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие белых кружевных трусов AQ40.",
      images: [
        { src: "assets/catalog-melle-white-lace-panties-set.jpg", alt: "Белые кружевные трусы без модели" },
        { src: "assets/catalog-melle-white-lace-panties-model-front.jpg", alt: "Белые кружевные трусы на модели спереди" },
        { src: "assets/catalog-melle-white-lace-panties-model-back.jpg", alt: "Белые кружевные трусы на модели со спины" }
      ]
    },
    "melle-black-lace-panties": {
      title: "Черно-бежевые кружевные трусы",
      sku: "Артикул: AQ41",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Черно-бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Кружевная передняя часть, прозрачная сетка и комфортная посадка.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черно-бежевых кружевных трусов AQ41.",
      images: [
        { src: "assets/catalog-melle-black-lace-panties-set.jpg", alt: "Черно-бежевые кружевные трусы без модели" },
        { src: "assets/catalog-melle-black-lace-panties-model-front.jpg", alt: "Черно-бежевые кружевные трусы на модели спереди" },
        { src: "assets/catalog-melle-black-lace-panties-model-back.jpg", alt: "Черно-бежевые кружевные трусы на модели со спины" }
      ]
    },
    "melle-black-beige-high-panties": {
      title: "Черно-бежевые трусы с высокой посадкой",
      sku: "Артикул: AQ42",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Черно-бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Высокая посадка, контрастные черные панели и декоративное кружево.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черно-бежевых трусов с высокой посадкой AQ42.",
      images: [
        { src: "assets/catalog-melle-black-beige-high-panties-set.jpg", alt: "Черно-бежевые трусы с высокой посадкой без модели" },
        { src: "assets/catalog-melle-black-beige-high-panties-model-front.jpg", alt: "Черно-бежевые трусы с высокой посадкой на модели спереди" },
        { src: "assets/catalog-melle-black-beige-high-panties-model-back.jpg", alt: "Черно-бежевые трусы с высокой посадкой на модели со спины" }
      ]
    },
    "melle-white-high-lace-panties": {
      title: "Белые кружевные трусы с высокой посадкой",
      sku: "Артикул: AQ43",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Белый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Высокая посадка, мягкая сетка и кружевная отделка по бедру.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие белых кружевных трусов с высокой посадкой AQ43.",
      images: [
        { src: "assets/catalog-melle-white-high-lace-panties-set.jpg", alt: "Белые кружевные трусы с высокой посадкой без модели" },
        { src: "assets/catalog-melle-white-high-lace-panties-model-front.jpg", alt: "Белые кружевные трусы с высокой посадкой на модели спереди" },
        { src: "assets/catalog-melle-white-high-lace-panties-model-back.jpg", alt: "Белые кружевные трусы с высокой посадкой на модели со спины" }
      ]
    },
    "melle-white-bikini-lace-panties": {
      title: "Белые кружевные трусы бикини",
      sku: "Артикул: AQ44",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Белый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Средняя посадка, прозрачная сетка и кружевные боковые панели.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие белых кружевных трусов бикини AQ44.",
      images: [
        { src: "assets/catalog-melle-white-bikini-lace-panties-set.jpg", alt: "Белые кружевные трусы бикини без модели" },
        { src: "assets/catalog-melle-white-bikini-lace-panties-model-front.jpg", alt: "Белые кружевные трусы бикини на модели спереди" },
        { src: "assets/catalog-melle-white-bikini-lace-panties-model-back.jpg", alt: "Белые кружевные трусы бикини на модели со спины" }
      ]
    },
    "melle-white-high-mesh-lace-panties": {
      title: "Белые высокие кружевные трусы",
      sku: "Артикул: AQ45",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Белый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Высокая посадка, мягкая сетка и широкая кружевная отделка.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие белых высоких кружевных трусов AQ45.",
      images: [
        { src: "assets/catalog-melle-white-high-mesh-lace-panties-set.jpg", alt: "Белые высокие кружевные трусы без модели" },
        { src: "assets/catalog-melle-white-high-mesh-lace-panties-model-front.jpg", alt: "Белые высокие кружевные трусы на модели спереди" },
        { src: "assets/catalog-melle-white-high-mesh-lace-panties-model-back.jpg", alt: "Белые высокие кружевные трусы на модели со спины" }
      ]
    },
    "melle-black-beige-mesh-lace-panties": {
      title: "Черно-бежевые кружевные трусы",
      sku: "Артикул: AQ46",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Черно-бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Прозрачная сетка, черное кружево и декоративные перемычки спереди.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черно-бежевых кружевных трусов AQ46.",
      images: [
        { src: "assets/catalog-melle-black-beige-mesh-lace-panties-set.jpg", alt: "Черно-бежевые кружевные трусы без модели" },
        { src: "assets/catalog-melle-black-beige-mesh-lace-panties-model-front.jpg", alt: "Черно-бежевые кружевные трусы на модели спереди" },
        { src: "assets/catalog-melle-black-beige-mesh-lace-panties-model-back.jpg", alt: "Черно-бежевые кружевные трусы на модели со спины" }
      ]
    },
    "melle-white-low-lace-panties": {
      title: "Белые кружевные трусы",
      sku: "Артикул: AQ47",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Белый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Кружевные панели, прозрачная сетка и классическая посадка.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие белых кружевных трусов AQ47.",
      images: [
        { src: "assets/catalog-melle-white-low-lace-panties-set.jpg", alt: "Белые кружевные трусы без модели" },
        { src: "assets/catalog-melle-white-low-lace-panties-model-front.jpg", alt: "Белые кружевные трусы на модели спереди" },
        { src: "assets/catalog-melle-white-low-lace-panties-model-back.jpg", alt: "Белые кружевные трусы на модели со спины" }
      ]
    },
    "melle-white-classic-lace-panties": {
      title: "Белые кружевные трусы",
      sku: "Артикул: AQ48",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Белый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Классическая посадка, прозрачная сетка и кружевная отделка по бокам.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие белых кружевных трусов AQ48.",
      images: [
        { src: "assets/catalog-melle-white-classic-lace-panties-set.jpg", alt: "Белые кружевные трусы без модели" },
        { src: "assets/catalog-melle-white-classic-lace-panties-model-front.jpg", alt: "Белые кружевные трусы на модели спереди" },
        { src: "assets/catalog-melle-white-classic-lace-panties-model-back.jpg", alt: "Белые кружевные трусы на модели со спины" }
      ]
    },
    "melle-black-low-lace-panties": {
      title: "Черные кружевные трусы",
      sku: "Артикул: AQ49",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Черно-бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Классическая посадка, прозрачная сетка и черное кружево.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черных кружевных трусов AQ49.",
      images: [
        { src: "assets/catalog-melle-black-low-lace-panties-set.jpg", alt: "Черные кружевные трусы без модели" },
        { src: "assets/catalog-melle-black-low-lace-panties-model-front.jpg", alt: "Черные кружевные трусы на модели спереди" },
        { src: "assets/catalog-melle-black-low-lace-panties-model-back.jpg", alt: "Черные кружевные трусы на модели со спины" }
      ]
    },
    "melle-black-high-lace-panties": {
      title: "Черные высокие кружевные трусы",
      sku: "Артикул: AQ50",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Черно-бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Высокая посадка, прозрачная сетка и выразительное черное кружево.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черных высоких кружевных трусов AQ50.",
      images: [
        { src: "assets/catalog-melle-black-high-lace-panties-set.jpg", alt: "Черные высокие кружевные трусы без модели" },
        { src: "assets/catalog-melle-black-high-lace-panties-model-front.jpg", alt: "Черные высокие кружевные трусы на модели спереди" },
        { src: "assets/catalog-melle-black-high-lace-panties-model-back.jpg", alt: "Черные высокие кружевные трусы на модели со спины" }
      ]
    },
    "melle-black-high-lace-panties-alt": {
      title: "Черные высокие кружевные трусы",
      sku: "Артикул: AQ51",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Черно-бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Высокая посадка, прозрачная сетка и черное кружево.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черных высоких кружевных трусов AQ51.",
      images: [
        { src: "assets/catalog-melle-black-high-lace-panties-alt-set.jpg", alt: "Черные высокие кружевные трусы без модели" },
        { src: "assets/catalog-melle-black-high-lace-panties-alt-model-front.jpg", alt: "Черные высокие кружевные трусы на модели спереди" },
        { src: "assets/catalog-melle-black-high-lace-panties-alt-model-back.jpg", alt: "Черные высокие кружевные трусы на модели со спины" }
      ]
    },
    "melle-black-classic-lace-panties": {
      title: "Черные кружевные трусы",
      sku: "Артикул: AQ52",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Черно-бежевый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Классическая посадка, прозрачная сетка и черное кружево по бокам.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие черных кружевных трусов AQ52.",
      images: [
        { src: "assets/catalog-melle-black-classic-lace-panties-set.jpg", alt: "Черные кружевные трусы без модели" },
        { src: "assets/catalog-melle-black-classic-lace-panties-model-front.jpg", alt: "Черные кружевные трусы на модели спереди" },
        { src: "assets/catalog-melle-black-classic-lace-panties-model-back.jpg", alt: "Черные кружевные трусы на модели со спины" }
      ]
    },
    "melle-blush-lace-panties": {
      title: "Пудровые кружевные трусы",
      sku: "Артикул: AQ53",
      brand: "Melle",
      line: "Aquamuse selection",
      category: "trusy",
      price: "Цена уточняется",
      color: "Пудровый",
      sizes: [],
      sizeText: "уточнить наличие",
      fit: "Классическая посадка, мягкая сетка и кружевная отделка.",
      note: "Цена и размерная сетка подтянутся после синхронизации с таблицей. Если модель понравилась, можно написать нам и уточнить примерку.",
      whatsappText: "Здравствуйте! Хочу уточнить наличие пудровых кружевных трусов AQ53.",
      images: [
        { src: "assets/catalog-melle-blush-lace-panties-model-front.jpg", alt: "Пудровые кружевные трусы на модели спереди" },
        { src: "assets/catalog-melle-blush-lace-panties-model-back.jpg", alt: "Пудровые кружевные трусы на модели со спины" },
        { src: "assets/catalog-melle-blush-lace-panties-close.jpg", alt: "Крупный план пудровых кружевных трусов" }
      ]
    }
  };
  let productOpeners = document.querySelectorAll("[data-product-open]");
  const catalogFilterButtons = document.querySelectorAll("[data-catalog-filter]");
  const catalogSizeSearch = document.querySelector("[data-catalog-size-search]");
  const catalogSizeInput = document.querySelector("[data-catalog-size-input]");
  const productClose = productModal.querySelector(".product-modal-close");
  const productGalleryMain = productModal.querySelector("[data-product-zoom]");
  const productMainImage = productModal.querySelector("[data-product-main-image]");
  const productThumbsContainer = productModal.querySelector("[data-product-thumbs]");
  const productSku = productModal.querySelector("[data-product-sku]");
  const productTitle = productModal.querySelector("[data-product-title]");
  const productBrand = productModal.querySelector("[data-product-brand]");
  const productKit = productModal.querySelector("[data-product-kit]");
  const productKitList = productModal.querySelector("[data-product-kit-list]");
  const productPrice = productModal.querySelector("[data-product-price]");
  const productColor = productModal.querySelector("[data-product-color]");
  const productSizes = productModal.querySelector("[data-product-sizes]");
  const productFit = productModal.querySelector("[data-product-fit]");
  const productWhatsapp = productModal.querySelector("[data-product-whatsapp]");
  const productCart = productModal.querySelector("[data-product-cart]");
  const productNote = productModal.querySelector("[data-product-note]");
  let lastFocusedElement = null;
  let currentProduct = null;
  let currentSelectedSize = "";
  const catalogQuery = new URLSearchParams(window.location.search);
  const requestedCatalogCategory = catalogQuery.get("category") || "all";
  const requestedCatalogSize = catalogQuery.get("size") || "";
  const normalizeCatalogSearchSize = (value) => String(value || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/\//g, "");
  let activeCatalogFilter = ["all", "byustgaltery", "trusy", "discounts", "new"].includes(requestedCatalogCategory)
    ? requestedCatalogCategory
    : "all";
  let activeCatalogSize = normalizeCatalogSearchSize(requestedCatalogSize);
  let requestedProductCode = "";
  const catalogGrid = document.querySelector(".catalog-product-grid");
  const catalogSizeNotice = document.createElement("div");
  const catalogSizeNoticeText = document.createElement("span");
  const catalogSizeReset = document.createElement("button");
  catalogSizeNotice.className = "catalog-size-filter";
  catalogSizeNotice.hidden = true;
  catalogSizeReset.type = "button";
  catalogSizeReset.textContent = "Сбросить";
  catalogSizeNotice.append(catalogSizeNoticeText, catalogSizeReset);

  if (catalogGrid) {
    catalogGrid.insertAdjacentElement("beforebegin", catalogSizeNotice);
  }

  if (catalogSizeInput && activeCatalogSize) {
    catalogSizeInput.value = activeCatalogSize;
  }

  const productHasCatalogSize = (product, size) => {
    if (!size) {
      return true;
    }

    const normalizedSize = normalizeSizeKey(size);
    return product?.sizes?.some((item) => normalizeSizeKey(item) === normalizedSize);
  };

  const syncCatalogFilterButtons = () => {
    catalogFilterButtons.forEach((item) => {
      const isActive = (item.dataset.catalogFilter || "all") === activeCatalogFilter;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
  };

  const bindCatalogProductOpener = (opener) => {
    if (!opener || opener.dataset.productBound === "1") {
      return;
    }

    opener.dataset.productBound = "1";
    opener.addEventListener("click", openProductModal);
  };

  const refreshProductOpeners = () => {
    productOpeners = document.querySelectorAll("[data-product-open]");
  };

  const inferCatalogCategory = (product) => {
    const text = `${product?.title || ""} ${product?.brand || ""}`.toLowerCase();
    return /\u0442\u0440\u0443\u0441|slip|brief|bikini/.test(text) ? "trusy" : "byustgaltery";
  };

  const createDynamicCatalogProduct = (productCode, syncedProduct) => {
    if (!catalogGrid || findProductByCode(productCode)) {
      return null;
    }

    const productId = `dynamic-${productCode.toLowerCase()}`;
    const images = syncedProduct.images?.length
      ? syncedProduct.images
      : [{ src: HOME_CATALOG_MEDIA[productCode] || "assets/logo-aquamuse.svg", alt: syncedProduct.title || productCode }];

    catalogProducts[productId] = {
      productCode,
      sku: `Артикул: ${productCode}`,
      title: syncedProduct.title || productCode,
      brand: syncedProduct.brand || "",
      line: "",
      price: syncedProduct.price || "",
      color: "",
      sizes: syncedProduct.sizes || [],
      sizePrices: syncedProduct.sizePrices || {},
      sizeDiscounts: syncedProduct.sizeDiscounts || {},
      newArrivalSizes: syncedProduct.newArrivalSizes || {},
      kitProductIds: syncedProduct.kitProductIds || [],
      kitProductId: syncedProduct.kitProductIds?.[0] || "",
      discountPercent: syncedProduct.discountPercent || 0,
      isNewArrival: Boolean(syncedProduct.isNewArrival),
      sizeText: syncedProduct.sizes?.length ? "" : "уточнить наличие",
      fit: "",
      note: "",
      whatsappText: "",
      images
    };

    const product = catalogProducts[productId];
    const card = document.createElement("button");
    card.className = "catalog-product-card";
    card.type = "button";
    card.dataset.productOpen = productId;
    card.dataset.productCode = productCode;
    card.dataset.productCategory = inferCatalogCategory(product);
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-controls", "product-modal");
    card.innerHTML = `
      <span class="catalog-product-media" aria-hidden="true">
        <img class="catalog-product-photo catalog-product-photo-primary" src="" alt="">
        <img class="catalog-product-photo catalog-product-photo-hover" src="" alt="">
      </span>
      <span class="catalog-product-brand"></span>
      <span class="catalog-product-title"></span>
      <span class="catalog-product-price"></span>
      <span class="catalog-product-sizes" aria-label="Размеры в наличии"></span>
    `;

    const primary = card.querySelector(".catalog-product-photo-primary");
    const hover = card.querySelector(".catalog-product-photo-hover");
    if (primary) primary.src = images[0]?.src || "";
    if (hover) hover.src = images[1]?.src || images[0]?.src || "";
    catalogGrid.appendChild(card);
    refreshProductOpeners();
    bindCatalogProductOpener(card);
    return card;
  };

  const applyCatalogFilter = () => {
    let visibleCount = 0;

    productOpeners.forEach((opener) => {
      const product = catalogProducts[opener.dataset.productOpen];
      const category = opener.dataset.productCategory || "byustgaltery";
      const matchesDiscount = activeCatalogFilter !== "discounts" || (product?.discountPercent || 0) > 0;
      const matchesNewArrival = activeCatalogFilter !== "new" || Boolean(product?.isNewArrival);
      const matchesCategory = activeCatalogFilter === "all" || activeCatalogFilter === "discounts" || activeCatalogFilter === "new" || category === activeCatalogFilter;
      const matchesSize = productHasCatalogSize(product, activeCatalogSize);
      const isVisible = Boolean(product) && matchesCategory && matchesSize && matchesDiscount && matchesNewArrival;
      opener.hidden = !isVisible;

      if (isVisible) {
        visibleCount += 1;
      }
    });

    catalogSizeNotice.hidden = !activeCatalogSize && activeCatalogFilter !== "discounts" && activeCatalogFilter !== "new";
    catalogSizeNoticeText.textContent = activeCatalogFilter === "discounts"
      ? visibleCount
        ? `Показаны товары со скидкой${activeCatalogSize ? ` и размером ${activeCatalogSize}` : ""}.`
        : `Сейчас нет товаров со скидкой${activeCatalogSize ? ` и размером ${activeCatalogSize}` : ""}.`
      : activeCatalogFilter === "new"
        ? visibleCount
        ? `Показаны товары из нового поступления${activeCatalogSize ? ` и размером ${activeCatalogSize}` : ""}.`
        : `Сейчас нет товаров из нового поступления${activeCatalogSize ? ` и размером ${activeCatalogSize}` : ""}.`
      : activeCatalogSize
        ? visibleCount
        ? `Показаны товары с размером ${activeCatalogSize}.`
        : `Сейчас нет товаров с размером ${activeCatalogSize} в выбранной категории.`
        : "";
  };

  catalogSizeReset.addEventListener("click", () => {
    activeCatalogSize = "";
    activeCatalogFilter = "all";
    if (catalogSizeInput) {
      catalogSizeInput.value = "";
    }
    syncCatalogFilterButtons();
    applyCatalogFilter();
    window.history.replaceState(null, "", `${window.location.pathname}#catalog-list`);
  });

  if (catalogSizeSearch) {
    catalogSizeSearch.addEventListener("submit", (event) => {
      event.preventDefault();
      const nextSize = normalizeCatalogSearchSize(catalogSizeInput?.value || "");

      if (!nextSize) {
        return;
      }

      activeCatalogSize = nextSize;
      applyCatalogFilter();
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?category=${encodeURIComponent(activeCatalogFilter)}&size=${encodeURIComponent(activeCatalogSize)}#catalog-list`
      );
    });
  }

  catalogFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCatalogFilter = button.dataset.catalogFilter || "all";
      syncCatalogFilterButtons();
      applyCatalogFilter();
      window.history.replaceState(
        null,
        "",
        activeCatalogFilter === "all" && !activeCatalogSize
          ? `${window.location.pathname}#catalog-list`
          : `${window.location.pathname}?category=${encodeURIComponent(activeCatalogFilter)}${activeCatalogSize ? `&size=${encodeURIComponent(activeCatalogSize)}` : ""}#catalog-list`
      );
    });
  });

  syncCatalogFilterButtons();

  const stopProductZoom = () => {
    if (productGalleryMain) {
      productGalleryMain.classList.remove("is-zooming");
    }
  };

  const moveProductZoom = (event) => {
    if (!productGalleryMain || !productMainImage || window.matchMedia("(max-width: 980px)").matches) {
      stopProductZoom();
      return;
    }

    const rect = productGalleryMain.getBoundingClientRect();
    const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height);
    const xPercent = rect.width ? (x / rect.width) * 100 : 50;
    const yPercent = rect.height ? (y / rect.height) * 100 : 50;

    productGalleryMain.style.setProperty("--zoom-x", `${xPercent}%`);
    productGalleryMain.style.setProperty("--zoom-y", `${yPercent}%`);
    productGalleryMain.classList.add("is-zooming");
  };

  if (productGalleryMain && productMainImage) {
    productGalleryMain.addEventListener("mousemove", moveProductZoom);
    productGalleryMain.addEventListener("mouseenter", moveProductZoom);
    productGalleryMain.addEventListener("mouseleave", stopProductZoom);
    productGalleryMain.addEventListener("touchstart", stopProductZoom, { passive: true });
  }

  const setText = (element, value) => {
    if (element) {
      element.textContent = value;
    }
  };

  const parseCellValue = (cell) => {
    if (!cell || cell.v === null || cell.v === undefined) {
      return "";
    }

    return String(cell.f || cell.v).trim();
  };

  const normalizeCatalogColumnLabel = (value) => String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");

  const findCatalogColumn = (columns, labels, fallbackIndex) => {
    const normalizedLabels = labels.map(normalizeCatalogColumnLabel);
    const index = columns.findIndex((column) => {
      return normalizedLabels.includes(normalizeCatalogColumnLabel(column.label))
        || normalizedLabels.includes(normalizeCatalogColumnLabel(column.id));
    });
    return index >= 0 ? index : fallbackIndex;
  };

  const normalizeSizeKey = (value) => String(value || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/\//g, "");

  const normalizePriceText = (value) => {
    const text = String(value || "").trim();

    if (!text) {
      return "";
    }

    const cleanNumber = text.replace(/^(\d+)(?:[.,]0+)?$/, "$1");
    const spacedNumber = cleanNumber.replace(/^(\d{4,})$/, (match) => match.replace(/\B(?=(\d{3})+(?!\d))/g, " "));

    return /сом/i.test(spacedNumber) ? spacedNumber : `${spacedNumber} сом`;
  };

  const normalizeProductCode = (value) => {
    const match = String(value || "").trim().toUpperCase().match(/AQ\d+/);
    return match ? match[0] : "";
  };

  requestedProductCode = normalizeProductCode(catalogQuery.get("product") || "");

  const parseProductCodes = (value) => {
    if (Array.isArray(value)) {
      return [...new Set(value.flatMap(parseProductCodes))];
    }

    return [...new Set(String(value || "")
      .toUpperCase()
      .match(/AQ\d+(?:\.\d+)?/g) || [])]
      .map(normalizeProductCode)
      .filter(Boolean);
  };

  const extractSizeFromText = (value) => {
    const match = String(value || "").toUpperCase().match(/\b(\d{2,3}\s*[A-ZА-Я]{1,2}|XXXL|XXL|XL|XS|S|M|L)\b/);
    return match ? match[1].replace(/\s+/g, "") : "";
  };

  const stripSizeFromProductTitle = (value) => String(value || "")
    .replace(/\s+(?:\d{2,3}\s*[A-ZА-Я]{1,2}|\d{2,3}\s*\(\s*EU\s*\)|XXXL|XXL|XL|XS|S|M|L)\s*$/i, "")
    .trim();

  const parseStockCount = (value) => {
    const text = String(value || "").replace(",", ".");
    const count = Number.parseFloat(text);
    return Number.isFinite(count) ? count : 0;
  };

  const getPriceNumber = (value) => {
    const number = Number.parseInt(String(value || "").replace(/[^\d]/g, ""), 10);
    return Number.isFinite(number) ? number : 0;
  };

  const getPriceNumbers = (value) => {
    const matches = String(value || "").match(/(?:\d[\d\s]*\d|\d)(?:[.,]\d+)?/g) || [];
    return matches
      .map((item) => Number.parseInt(item.replace(/[^\d]/g, ""), 10))
      .filter((number) => Number.isFinite(number) && number > 0);
  };

  const formatSomPrice = (value) => `${Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сом`;

  const getSizeDiscountPercent = (product, size = "") => {
    const sizeDiscounts = product?.sizeDiscounts || {};
    const sizeKey = normalizeSizeKey(size);

    if (sizeKey && sizeDiscounts[sizeKey]) {
      return sizeDiscounts[sizeKey];
    }

    if (!Object.keys(sizeDiscounts).length) {
      return product?.discountPercent || 0;
    }

    return 0;
  };

  const getDisplayDiscountPercent = (product) => {
    const sizeDiscounts = product?.sizeDiscounts || {};
    const discountedValues = Object.values(sizeDiscounts).filter(Boolean);

    if (!discountedValues.length) {
      return product?.discountPercent || 0;
    }

    const sizes = product?.sizes || [];
    const allSizesDiscounted = sizes.length
      && sizes.every((size) => sizeDiscounts[normalizeSizeKey(size)] > 0);
    const uniqueDiscounts = [...new Set(discountedValues)];

    return allSizesDiscounted && uniqueDiscounts.length === 1 ? uniqueDiscounts[0] : 0;
  };

  const getDiscountedPriceText = (product, priceText = product?.price, selectedSize = "") => {
    const discount = selectedSize
      ? getSizeDiscountPercent(product, selectedSize)
      : getDisplayDiscountPercent(product);
    const prices = getPriceNumbers(priceText);

    if (!discount || !prices.length) {
      return "";
    }

    const discountedPrices = prices.map((price) => price * (100 - discount) / 100);
    const uniquePrices = [...new Set(discountedPrices.map((price) => Math.round(price)))].sort((a, b) => a - b);

    return uniquePrices.length === 1
      ? formatSomPrice(uniquePrices[0])
      : `${formatSomPrice(uniquePrices[0]).replace(/\s*сом$/i, "")} - ${formatSomPrice(uniquePrices[uniquePrices.length - 1])}`;
  };

  const getEffectivePriceRangeText = (product, priceText = product?.price) => {
    const sizeDiscounts = product?.sizeDiscounts || {};
    const sizePrices = product?.sizePrices || {};
    const sizes = product?.sizes || [];

    if (!sizes.length || !Object.keys(sizeDiscounts).length) {
      return "";
    }

    const values = sizes
      .map((size) => {
        const price = getPriceNumber(sizePrices[normalizeSizeKey(size)]);
        const discount = getSizeDiscountPercent(product, size);

        if (!price) {
          return 0;
        }

        return Math.round(discount ? price * (100 - discount) / 100 : price);
      })
      .filter(Boolean);

    const uniqueValues = [...new Set(values)].sort((a, b) => a - b);

    if (uniqueValues.length < 2) {
      return "";
    }

    const currentValues = getPriceNumbers(priceText).map((price) => Math.round(price)).sort((a, b) => a - b);
    const isSameRange = currentValues.length
      && uniqueValues[0] === currentValues[0]
      && uniqueValues[uniqueValues.length - 1] === currentValues[currentValues.length - 1];

    return isSameRange
      ? ""
      : `${formatSomPrice(uniqueValues[0]).replace(/\s+\S+$/, "")} - ${formatSomPrice(uniqueValues[uniqueValues.length - 1])}`;
  };

  const renderProductPrice = (element, product, priceText = product?.price, selectedSize = "") => {
    if (!element) {
      return;
    }

    const discountedPrice = getDiscountedPriceText(product, priceText, selectedSize);
    const effectivePriceRange = selectedSize ? "" : getEffectivePriceRangeText(product, priceText);
    element.textContent = "";

    if (!discountedPrice) {
      element.textContent = effectivePriceRange || priceText || "";
      element.classList.remove("has-discount-price");
      return;
    }

    element.classList.add("has-discount-price");
    const oldPrice = document.createElement("span");
    const newPrice = document.createElement("strong");
    oldPrice.className = "old-price";
    newPrice.className = "new-price";
    oldPrice.textContent = priceText;
    newPrice.textContent = discountedPrice;
    element.append(oldPrice, newPrice);
  };

  const buildPriceRange = (prices) => {
    const values = [...new Set(prices.map(getPriceNumber).filter(Boolean))].sort((a, b) => a - b);

    if (!values.length) {
      return "";
    }

    const format = (value) => normalizePriceText(String(value));
    return values.length === 1 ? format(values[0]) : `${format(values[0]).replace(/\s*сом$/i, "")} - ${format(values[values.length - 1])}`;
  };

  const parseSizeWithPrice = (value) => {
    const text = String(value || "").trim();
    const match = text.match(/^(.+?)\s*[:=]\s*(.+)$/);

    if (!match) {
      return { size: text, price: "" };
    }

    return {
      size: match[1].trim(),
      price: normalizePriceText(match[2])
    };
  };

  const addSizePrice = (map, size, price) => {
    const key = normalizeSizeKey(size);
    const normalizedPrice = normalizePriceText(price);

    if (key && normalizedPrice) {
      map[key] = normalizedPrice;
    }
  };

  const parseSizePriceMap = (source) => {
    const result = {};

    if (!source) {
      return result;
    }

    if (Array.isArray(source)) {
      source.forEach((item) => {
        if (typeof item === "string") {
          const parsed = parseSizeWithPrice(item);
          addSizePrice(result, parsed.size, parsed.price);
          return;
        }

        if (item && typeof item === "object") {
          const size = item.size || item.razmer || item["размер"];
          const price = item.price || item.cena || item["цена"];
          addSizePrice(result, size, price);
        }
      });

      return result;
    }

    if (typeof source === "object") {
      Object.entries(source).forEach(([size, price]) => {
        addSizePrice(result, size, price);
      });
    }

    return result;
  };

  const addSizeDiscount = (map, size, discount) => {
    const key = normalizeSizeKey(size);
    const percent = parseDiscountPercent(discount);

    if (key && percent > 0) {
      map[key] = Math.max(map[key] || 0, percent);
    }
  };

  const parseSizeDiscountMap = (source) => {
    const result = {};

    if (!source) {
      return result;
    }

    if (Array.isArray(source)) {
      source.forEach((item) => {
        if (item && typeof item === "object") {
          const size = item.size || item.razmer || item["размер"];
          const discount = item.skidki || item.skidka || item.discount || item.sale || item["скидки"] || item["скидка"];
          addSizeDiscount(result, size, discount);
        }
      });

      return result;
    }

    if (typeof source === "object") {
      Object.entries(source).forEach(([size, discount]) => {
        addSizeDiscount(result, size, discount);
      });
    }

    return result;
  };

  const addSizeMark = (map, size, marked = true) => {
    const key = normalizeSizeKey(size);

    if (key && parseMarkedValue(marked)) {
      map[key] = true;
    }
  };

  const parseSizeMarkMap = (source) => {
    const result = {};

    if (!source) {
      return result;
    }

    if (Array.isArray(source)) {
      source.forEach((item) => {
        if (typeof item === "string") {
          addSizeMark(result, item, true);
          return;
        }

        if (item && typeof item === "object") {
          addSizeMark(result, item.size || item.razmer || item["размер"], item.new_arrival || item.novoe_postuplenie || item.marked || true);
        }
      });

      return result;
    }

    if (typeof source === "object") {
      Object.entries(source).forEach(([size, marked]) => {
        addSizeMark(result, size, marked);
      });
    }

    return result;
  };

  const parseCatalogImages = (source) => {
    if (!Array.isArray(source)) {
      return [];
    }

    return source
      .map((item) => {
        if (typeof item === "string") {
          return { src: item, alt: "" };
        }

        if (!item || typeof item !== "object") {
          return null;
        }

        return {
          src: item.src || item.url || "",
          alt: item.alt || item.title || ""
        };
      })
      .filter((image) => image?.src);
  };

  const getSizeNewArrival = (product, size = "") => {
    const sizeKey = normalizeSizeKey(size);
    return Boolean(sizeKey && product?.newArrivalSizes?.[sizeKey]);
  };

  const getSyncedJson = (value) => {
    if (!value) {
      return {};
    }

    try {
      return JSON.parse(value);
    } catch (error) {
      return {};
    }
  };

  const setProductPriceForSize = (product, size) => {
    if (!productPrice) {
      return;
    }

    const selectedPrice = product.sizePrices?.[normalizeSizeKey(size)];
    renderProductPrice(productPrice, product, selectedPrice || "Цена уточняется", size);
  };

  const getProductOrderPriceText = (product, selectedSize = "") => {
    const selectedPrice = selectedSize && product.sizePrices?.[normalizeSizeKey(selectedSize)]
      ? product.sizePrices[normalizeSizeKey(selectedSize)]
      : "";
    if (selectedSize && !selectedPrice) {
      return "";
    }

    const basePrice = selectedPrice || product.price || "";
    const discountedPrice = getDiscountedPriceText(product, basePrice, selectedSize);
    const effectivePriceRange = selectedSize ? "" : getEffectivePriceRangeText(product, basePrice);

    return discountedPrice || effectivePriceRange || basePrice;
  };

  const updateProductWhatsapp = (product, selectedSize = "") => {
    if (!productWhatsapp) {
      return;
    }

    const sizeText = selectedSize ? ', \u0440\u0430\u0437\u043c\u0435\u0440 "' + selectedSize + '"' : "";
    const price = getProductOrderPriceText(product, selectedSize);
    const priceText = price ? ', \u043f\u043e \u0446\u0435\u043d\u0435 "' + price + '"' : "";
    const text = '\u042f \u0431\u044b \u0445\u043e\u0442\u0435\u043b\u0430 \u0437\u0430\u043a\u0430\u0437\u0430\u0442\u044c "' + product.title + '"' + sizeText + priceText + '.';

    productWhatsapp.href = 'https://wa.me/996550333087?text=' + encodeURIComponent(text);
  };

  const renderSizeBadges = (container, sizes, fallbackText = "уточнить", options = {}) => {
    if (!container) {
      return;
    }

    container.textContent = "";

    if (!sizes.length) {
      const fallback = document.createElement("span");
      fallback.textContent = fallbackText;
      container.appendChild(fallback);
      return;
    }

    sizes.forEach((size) => {
      const badge = document.createElement(options.interactive ? "button" : "span");
      const discountPercent = options.getDiscountPercent?.(size) || 0;
      const isNewArrivalSize = Boolean(options.isNewArrivalSize?.(size));
      badge.textContent = size;

      if (discountPercent > 0) {
        badge.classList.add("is-discount-size");
        badge.dataset.discountLabel = `-${discountPercent}%`;
        badge.setAttribute("aria-label", `${size}, скидка ${discountPercent}%`);
      }

      if (isNewArrivalSize) {
        badge.classList.add("is-new-arrival-size");
        badge.dataset.newArrivalLabel = "new";
        badge.setAttribute("aria-label", `${size}, новое поступление${discountPercent > 0 ? `, скидка ${discountPercent}%` : ""}`);
      }

      if (options.interactive) {
        badge.type = "button";
        badge.dataset.productSize = size;
        badge.setAttribute("aria-pressed", "false");
        badge.addEventListener("click", () => {
          container.querySelectorAll("[data-product-size]").forEach((item) => {
            item.classList.toggle("is-active", item === badge);
            item.setAttribute("aria-pressed", String(item === badge));
          });
          options.onSelect?.(size);
        });
      }

      container.appendChild(badge);
    });
  };

  const buildProductMessage = (product) => {
    const sizes = product.sizes.length ? ` Размеры в наличии: ${product.sizes.join(", ")}.` : "";
    return `Здравствуйте! Хочу уточнить наличие ${product.title}.${sizes}`;
  };

  const parseCatalogSyncPayload = (payload) => {
    const rows = payload.table?.rows || [];
    const columns = payload.table?.cols || [];
    const columnCount = columns.length || (rows[0]?.c || []).length;
    const hasNewCatalogShape = columnCount >= 9;
    const productCodeIndex = findCatalogColumn(columns, ["product_id"], 0);
    const kitProductIndex = findCatalogColumn(columns, ["komplekt_id", "kit_id", "related_product_id", "related_product", "set_product_id"], -1);
    const brandIndex = findCatalogColumn(columns, ["brend", "brand", "бренд"], -1);
    const articleIndex = findCatalogColumn(columns, ["article", "artikul", "артикул", "_source_artikul", "source_artikul"], -1);
    const titleIndex = findCatalogColumn(columns, ["name", "наименование"], hasNewCatalogShape ? 2 : 2);
    const sizesIndex = findCatalogColumn(columns, ["available_sizes", "sizes", "размеры"], hasNewCatalogShape ? 3 : -1);
    const priceIndex = findCatalogColumn(columns, ["цена_craft", "cena_craft", "price_craft", "craft_price", "цена craft", "cena craft", "price", "цена"], hasNewCatalogShape ? 4 : 4);
    const discountIndex = findCatalogColumn(columns, ["skidki", "skidka", "discount", "sale", "скидки", "скидка"], -1);
    const newArrivalIndex = findCatalogColumn(columns, ["novoe_postuplenie", "new_arrival", "new", "новое_поступление", "новинка"], -1);
    const stockIndex = findCatalogColumn(columns, ["остаток", "ostatok", "stock", "qty", "quantity"], -1);
    const jsonIndex = findCatalogColumn(columns, ["_json", "json"], hasNewCatalogShape ? 6 : -1);

    return rows.reduce((result, row) => {
      const cells = row.c || [];
      const rawProductCode = parseCellValue(cells[productCodeIndex]).toUpperCase();
      const productCode = normalizeProductCode(rawProductCode);

      if (!productCode) {
        return result;
      }

      if (stockIndex >= 0 && parseStockCount(parseCellValue(cells[stockIndex])) <= 0) {
        return result;
      }

      const rawTitle = parseCellValue(cells[titleIndex]);
      const syncedJson = jsonIndex >= 0 ? getSyncedJson(parseCellValue(cells[jsonIndex])) : {};
      const title = stripSizeFromProductTitle(syncedJson.name || syncedJson.title || rawTitle);
      const brand = brandIndex >= 0
        ? parseCellValue(cells[brandIndex])
        : (syncedJson.brend || syncedJson.brand || "");
      const article = articleIndex >= 0
        ? parseCellValue(cells[articleIndex])
        : (syncedJson.article || syncedJson.row_product_id || rawProductCode);
      const kitProductIds = parseProductCodes(parseCellValue(cells[kitProductIndex]));
      if (!kitProductIds.length) {
        kitProductIds.push(...parseProductCodes(
          syncedJson.related_product_ids
          || syncedJson.related_product_id
          || syncedJson.komplekt_ids
          || syncedJson.komplekt_id
          || syncedJson.kit_id
          || syncedJson.set_product_id
        ));
      }
      const sizesFromCell = parseCellValue(cells[sizesIndex])
        .split(",")
        .map((size) => parseSizeWithPrice(size.trim()).size)
        .filter(Boolean);
      const sizesFromJson = Array.isArray(syncedJson.available_sizes)
        ? syncedJson.available_sizes
          .map((item) => (typeof item === "string" ? parseSizeWithPrice(item).size : item?.size || item?.razmer || item?.["размер"]))
          .filter(Boolean)
        : [];
      const sizes = sizesFromJson.length ? sizesFromJson : sizesFromCell;
      const price = parseCellValue(cells[priceIndex]);
      const discountPercent = Math.max(
        parseDiscountPercent(parseCellValue(cells[discountIndex])),
        parseDiscountPercent(syncedJson.skidki || syncedJson["скидки"] || syncedJson.discount || syncedJson.sale)
      );
      const isNewArrival = parseMarkedValue(parseCellValue(cells[newArrivalIndex]))
        || parseMarkedValue(
          syncedJson.novoe_postuplenie
          || syncedJson.new_arrival
          || syncedJson["новое_поступление"]
        );
      const sizePrices = {
        ...parseSizePriceMap(syncedJson.size_prices),
        ...parseSizePriceMap(syncedJson.prices_by_size),
        ...parseSizePriceMap(syncedJson.price_by_size),
        ...parseSizePriceMap(syncedJson.sizePrices),
        ...parseSizePriceMap(syncedJson.variants),
        ...parseSizePriceMap(syncedJson.available_sizes)
      };
      const rowSize = extractSizeFromText(rawTitle) || (sizes.length === 1 ? sizes[0] : "");
      const sizeDiscounts = {
        ...parseSizeDiscountMap(syncedJson.size_discounts),
        ...parseSizeDiscountMap(syncedJson.discounts_by_size),
        ...parseSizeDiscountMap(syncedJson.discount_by_size),
        ...parseSizeDiscountMap(syncedJson.sizeDiscounts)
      };
      const newArrivalSizes = {
        ...parseSizeMarkMap(syncedJson.new_arrival_sizes),
        ...parseSizeMarkMap(syncedJson.newArrivalSizes)
      };
      const images = parseCatalogImages(syncedJson.images || syncedJson.product_images || syncedJson.photos);

      if (rowSize && price) {
        addSizePrice(sizePrices, rowSize, price);
      }

      if (rowSize && discountPercent > 0) {
        addSizeDiscount(sizeDiscounts, rowSize, discountPercent);
      }

      if (rowSize && isNewArrival) {
        addSizeMark(newArrivalSizes, rowSize, true);
      }

      columns.forEach((column, columnIndex) => {
        const label = normalizeCatalogColumnLabel(column.label);
        const rawValue = parseCellValue(cells[columnIndex]);
        let sizeLabel = "";

        if (/^(price_|цена_|cena_|size_price_|razmer_)/.test(label)) {
          sizeLabel = label
            .replace(/^(price_|цена_|cena_|size_price_|razmer_)/, "")
            .replace(/_/g, "");
        } else if (/(_price|_цена|_cena)$/.test(label)) {
          sizeLabel = label
            .replace(/(_price|_цена|_cena)$/, "")
            .replace(/_/g, "");
        } else if (/^(\d{2,3}[a-z]{1,2}|xs|s|m|l|xl|xxl|xxxl)$/.test(label)) {
          sizeLabel = label;
        }

        if (sizeLabel && rawValue) {
          addSizePrice(sizePrices, sizeLabel, rawValue);
        }
      });

      const existing = result[productCode] || {
        article: "",
        brand: "",
        title: "",
        sizes: [],
        price: "",
        sizePrices: {},
        sizeDiscounts: {},
        newArrivalSizes: {},
        kitProductIds: [],
        discountPercent: 0,
        isNewArrival: false
      };
      const nextSizePrices = { ...existing.sizePrices, ...sizePrices };
      const nextSizeDiscounts = { ...existing.sizeDiscounts, ...sizeDiscounts };
      const nextNewArrivalSizes = { ...existing.newArrivalSizes, ...newArrivalSizes };
      const nextSizes = [...existing.sizes];

      sizes.forEach((size) => {
        if (!nextSizes.some((item) => normalizeSizeKey(item) === normalizeSizeKey(size))) {
          nextSizes.push(size);
        }
      });

      if (rowSize && !nextSizes.some((item) => normalizeSizeKey(item) === normalizeSizeKey(rowSize))) {
        nextSizes.push(rowSize);
      }

      result[productCode] = {
        article: existing.article || article || rawProductCode,
        brand: existing.brand || brand,
        title: existing.title || title,
        sizes: nextSizes,
        price: buildPriceRange(Object.values(nextSizePrices)) || existing.price || price,
        sizePrices: nextSizePrices,
        sizeDiscounts: nextSizeDiscounts,
        newArrivalSizes: nextNewArrivalSizes,
        images: existing.images?.length ? existing.images : images,
        kitProductIds: existing.kitProductIds?.length ? existing.kitProductIds : kitProductIds,
        discountPercent: Math.max(existing.discountPercent || 0, ...Object.values(nextSizeDiscounts), discountPercent),
        isNewArrival: existing.isNewArrival || isNewArrival || Object.keys(nextNewArrivalSizes).length > 0
      };

      return result;
    }, {});
  };

  const parseCatalogSyncResponse = (text) => {
    const match = text.match(/setResponse\(([\s\S]+)\);?$/);

    if (!match) {
      return {};
    }

    return parseCatalogSyncPayload(JSON.parse(match[1]));
  };

  const applyCatalogSync = (catalogSync) => {
    Object.entries(catalogSync).forEach(([productCode, syncedProduct]) => {
      if (!findProductByCode(productCode)) {
        createDynamicCatalogProduct(productCode, syncedProduct);
      }
    });

    Object.entries(catalogSync).forEach(([productCode, syncedProduct]) => {
      const product = findProductByCode(productCode);

      if (!product) {
        return;
      }

      product.productCode = productCode;
      product.sku = syncedProduct.article ? `\u0410\u0440\u0442\u0438\u043a\u0443\u043b: ${syncedProduct.article}` : product.sku;
      product.brand = Object.prototype.hasOwnProperty.call(syncedProduct, "brand")
        ? syncedProduct.brand
        : product.brand;
      product.title = syncedProduct.title || product.title;
      product.price = syncedProduct.price || product.price;
      product.sizes = syncedProduct.sizes;
      product.sizePrices = syncedProduct.sizePrices || {};
      product.sizeDiscounts = syncedProduct.sizeDiscounts || {};
      product.newArrivalSizes = syncedProduct.newArrivalSizes || {};
      if (syncedProduct.images?.length) {
        product.images = syncedProduct.images;
      }
      product.kitProductIds = syncedProduct.kitProductIds || [];
      product.kitProductId = product.kitProductIds[0] || "";
      product.discountPercent = syncedProduct.discountPercent || 0;
      product.isNewArrival = Boolean(syncedProduct.isNewArrival);
      product.sizeText = product.sizes.length ? "" : "\u0443\u0442\u043e\u0447\u043d\u0438\u0442\u044c \u043d\u0430\u043b\u0438\u0447\u0438\u0435";
      product.whatsappText = buildProductMessage(product);
    });

    productOpeners.forEach((opener, index) => {
      const productId = opener.dataset.productOpen;
      const productCode = (opener.dataset.productCode || `AQ${index + 1}`).toUpperCase();
      const product = catalogProducts[productId];
      const syncedProduct = catalogSync[productCode];

      if (!product) {
        return;
      }

      if (!syncedProduct) {
        delete catalogProducts[productId];
        opener.hidden = true;
        return;
      }

      product.productCode = productCode;
      product.sku = syncedProduct.article ? `Артикул: ${syncedProduct.article}` : product.sku;
      product.brand = Object.prototype.hasOwnProperty.call(syncedProduct, "brand")
        ? syncedProduct.brand
        : product.brand;
      product.title = syncedProduct.title || product.title;
      product.price = syncedProduct.price || product.price;
      product.sizes = syncedProduct.sizes;
      product.sizePrices = syncedProduct.sizePrices || {};
      product.sizeDiscounts = syncedProduct.sizeDiscounts || {};
      product.newArrivalSizes = syncedProduct.newArrivalSizes || {};
      if (syncedProduct.images?.length) {
        product.images = syncedProduct.images;
      }
      product.kitProductIds = syncedProduct.kitProductIds || [];
      product.kitProductId = product.kitProductIds[0] || "";
      product.discountPercent = syncedProduct.discountPercent || 0;
      product.isNewArrival = Boolean(syncedProduct.isNewArrival);
      product.sizeText = product.sizes.length ? "" : "уточнить наличие";
      product.whatsappText = buildProductMessage(product);

      setText(opener.querySelector(".catalog-product-title"), product.title);
      setText(opener.querySelector(".catalog-product-brand"), product.brand);
      const productMedia = opener.querySelector(".catalog-product-media");
      const primaryImage = opener.querySelector(".catalog-product-photo-primary");
      const hoverImage = opener.querySelector(".catalog-product-photo-hover");
      if (primaryImage && product.images?.[0]) {
        primaryImage.src = product.images[0].src;
      }
      if (hoverImage && product.images?.length) {
        hoverImage.src = (product.images[1] || product.images[0]).src;
      }
      opener.classList.toggle("has-discount", product.discountPercent > 0);
      opener.classList.toggle("has-new-arrival", product.isNewArrival);
      if (product.discountPercent > 0) {
        opener.dataset.discountLabel = `-${product.discountPercent}%`;
        if (productMedia) {
          productMedia.dataset.discountLabel = `-${product.discountPercent}%`;
        }
      } else {
        delete opener.dataset.discountLabel;
        if (productMedia) {
          delete productMedia.dataset.discountLabel;
        }
      }
      if (productMedia) {
        if (product.isNewArrival) {
          productMedia.dataset.newArrivalLabel = "NEW";
        } else {
          delete productMedia.dataset.newArrivalLabel;
        }
      }
      renderProductPrice(opener.querySelector(".catalog-product-price"), product);
      renderSizeBadges(opener.querySelector(".catalog-product-sizes"), product.sizes, product.sizeText, {
        getDiscountPercent: (size) => getSizeDiscountPercent(product, size),
        isNewArrivalSize: (size) => getSizeNewArrival(product, size)
      });
    });

    const hasDiscounts = Object.values(catalogProducts).some((product) => (product.discountPercent || 0) > 0);
    const hasNewArrivals = Object.values(catalogProducts).some((product) => product.isNewArrival);
    catalogFilterButtons.forEach((button) => {
      if ((button.dataset.catalogFilter || "") === "discounts") {
        button.hidden = !hasDiscounts;
      }
      if ((button.dataset.catalogFilter || "") === "new") {
        button.hidden = !hasNewArrivals;
      }
    });

    if (!productModal.hidden && currentProduct) {
      renderProduct(currentProduct);
    }
  };

  const loadCatalogSync = async () => {
    try {
      const catalogPayload = await getCatalogSyncPayload();
      const catalogSync = parseCatalogSyncPayload(catalogPayload);
      applyCatalogSync(catalogSync);
    } catch (error) {
      console.warn("Catalog sync unavailable", error);
    } finally {
      applyCatalogFilter();
      openRequestedCatalogProduct();
    }
  };

  const findProductByCode = (productCode) => {
    const normalizedCode = normalizeProductCode(productCode);

    if (!normalizedCode) {
      return null;
    }

    return Object.values(catalogProducts).find((product) => normalizeProductCode(product.productCode || product.sku || "") === normalizedCode) || null;
  };

  const renderProductKit = (product) => {
    if (!productKit || !productKitList) {
      return;
    }

    productKitList.textContent = "";
    const relatedProducts = (product.kitProductIds?.length ? product.kitProductIds : [product.kitProductId])
      .map(findProductByCode)
      .filter((relatedProduct, index, list) => relatedProduct && relatedProduct !== product && list.indexOf(relatedProduct) === index);

    if (!relatedProducts.length) {
      productKit.hidden = true;
      return;
    }

    productKit.hidden = false;

    relatedProducts.forEach((relatedProduct) => {
      const image = relatedProduct.images?.[0];
      const button = document.createElement("button");
      const thumb = document.createElement("img");
      const title = document.createElement("span");

      button.className = "product-kit-card";
      button.type = "button";
      title.textContent = relatedProduct.title || "";

      if (image) {
        thumb.src = image.src;
        thumb.alt = image.alt || "";
      }

      button.append(thumb, title);
      button.addEventListener("click", () => {
        renderProduct(relatedProduct);
        button.focus();
      });
      productKitList.appendChild(button);
    });
  };

  const renderProductSizes = (product) => {
    if (!productSizes) {
      return;
    }

    renderSizeBadges(productSizes, product.sizes, product.sizeText || "уточнить", {
      interactive: true,
      getDiscountPercent: (size) => getSizeDiscountPercent(product, size),
      isNewArrivalSize: (size) => getSizeNewArrival(product, size),
      onSelect: (size) => {
        currentSelectedSize = size;
        setProductPriceForSize(product, size);
        updateProductWhatsapp(product, size);
      }
    });
  };

  const setActiveThumb = (button) => {
    if (!productThumbsContainer) {
      return;
    }

    productThumbsContainer.querySelectorAll("[data-product-thumb]").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });
  };

  const renderProductThumbs = (product) => {
    if (!productThumbsContainer || !productMainImage) {
      return;
    }

    productThumbsContainer.textContent = "";

    product.images.forEach((image, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.productThumb = "";
      button.dataset.src = image.src;
      button.dataset.alt = image.alt;
      if (index === 0) {
        button.classList.add("is-active");
      }

      const img = document.createElement("img");
      img.src = image.src;
      img.alt = "";
      button.appendChild(img);

      button.addEventListener("click", () => {
        productMainImage.src = image.src;
        productMainImage.alt = image.alt;
        stopProductZoom();
        setActiveThumb(button);
      });

      productThumbsContainer.appendChild(button);
    });
  };

  const renderProduct = (product) => {
    if (!product) {
      return;
    }

    currentProduct = product;
    currentSelectedSize = "";

    if (productMainImage && product.images[0]) {
      productMainImage.src = product.images[0].src;
      productMainImage.alt = product.images[0].alt;
      stopProductZoom();
    }

    setText(productSku, product.sku);
    setText(productTitle, product.title);
    setText(productBrand, product.brand);
    renderProductKit(product);
    renderProductPrice(productPrice, product);
    setText(productColor, product.color);
    setText(productFit, product.fit);
    setText(productNote, product.note);
    renderProductSizes(product);
    renderProductThumbs(product);
    updateProductWhatsapp(product);
  };

  const closeProductModal = () => {
    productModal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  const openProductModal = (event) => {
    const productId = event.currentTarget.dataset.productOpen;
    const product = catalogProducts[productId] || catalogProducts["ambra-black"];

    renderProduct(product);
    lastFocusedElement = event.currentTarget;
    productModal.hidden = false;
    document.body.classList.add("modal-open");
    if (productClose) {
      productClose.focus();
    }
  };

  const openProductByCode = (productCode) => {
    const product = findProductByCode(productCode);

    if (!product) {
      return;
    }

    renderProduct(product);
    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    productModal.hidden = false;
    document.body.classList.add("modal-open");
    if (productClose) {
      productClose.focus();
    }
  };

  const addCurrentProductToCart = () => {
    if (!currentProduct) {
      return;
    }

    const discountPercent = currentSelectedSize
      ? getSizeDiscountPercent(currentProduct, currentSelectedSize)
      : (getDisplayDiscountPercent(currentProduct) || currentProduct.discountPercent || 0);
    const item = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      productCode: normalizeProductCode(currentProduct.productCode || currentProduct.sku || ""),
      title: currentProduct.title || "",
      size: currentSelectedSize,
      price: getProductOrderPriceText(currentProduct, currentSelectedSize),
      discountPercent
    };
    const items = readCartItems();
    items.push(item);
    writeCartItems(items);
    updateCartIndicators();
    window.location.href = "korzina.html";
  };

  const openRequestedCatalogProduct = (options = {}) => {
    if (!requestedProductCode) {
      return;
    }

    const opener = [...productOpeners].find((item) => {
      return normalizeProductCode(item.dataset.productCode || "") === requestedProductCode && !item.hidden;
    });

    if (!opener) {
      return;
    }

    if (!options.keepPending) {
      requestedProductCode = "";
    }
    openProductModal({ currentTarget: opener });
  };

  productOpeners.forEach(bindCatalogProductOpener);

  productCart?.addEventListener("click", addCurrentProductToCart);
  document.addEventListener("aquamuse:open-product", (event) => {
    openProductByCode(event.detail?.productCode || "");
  });

  openRequestedCatalogProduct({ keepPending: true });
  loadCatalogSync();

  productModal.addEventListener("click", (event) => {
    if (event.target.closest("[data-product-close]")) {
      closeProductModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !productModal.hidden) {
      closeProductModal();
    }
  });
}
