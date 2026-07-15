const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
const whatsappMessage = "Здравствуйте! Хочу записаться на подбор белья в Aquamuse.";
const whatsappUrl = `https://wa.me/996550333087?text=${encodeURIComponent(whatsappMessage)}`;
const instagramUrl = "https://www.instagram.com/aquamuse.kg?igsh=Z3l3c3MxdXA5Ynk5";

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".header-cta").forEach((link) => {
  link.href = whatsappUrl;
  link.textContent = "WhatsApp";

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

const stickyWhatsapp = document.createElement("a");
stickyWhatsapp.className = "sticky-whatsapp";
stickyWhatsapp.href = whatsappUrl;
stickyWhatsapp.textContent = "Записаться в WhatsApp";
document.body.appendChild(stickyWhatsapp);

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
      catalogLink.hidden = false;
    }
  });
}

const productModal = document.querySelector("[data-product-modal]");

if (productModal) {
  const CATALOG_SYNC_URL =
    "https://docs.google.com/spreadsheets/d/1tk1WPZJyUoIs9BAT9C2L0RVOTQG5qnchltnhEfK1wo8/gviz/tq?tqx=out:json&sheet=%D0%A1%D0%B0%D0%B9%D1%82%20%E2%80%94%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3";
  const catalogProducts = {
    "ambra-black": {
      title: "Бюстгальтер классический push-up",
      sku: "Артикул: 0876 OIL",
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
      sku: "Артикул: уточняется",
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
      sku: "Артикул: уточняется",
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
      sku: "Артикул: уточняется",
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
    }
  };
  const productOpeners = document.querySelectorAll("[data-product-open]");
  const productClose = productModal.querySelector(".product-modal-close");
  const productMainImage = productModal.querySelector("[data-product-main-image]");
  const productThumbsContainer = productModal.querySelector("[data-product-thumbs]");
  const productSku = productModal.querySelector("[data-product-sku]");
  const productTitle = productModal.querySelector("[data-product-title]");
  const productBrand = productModal.querySelector("[data-product-brand]");
  const productLine = productModal.querySelector("[data-product-line]");
  const productPrice = productModal.querySelector("[data-product-price]");
  const productColor = productModal.querySelector("[data-product-color]");
  const productSizes = productModal.querySelector("[data-product-sizes]");
  const productFit = productModal.querySelector("[data-product-fit]");
  const productWhatsapp = productModal.querySelector("[data-product-whatsapp]");
  const productNote = productModal.querySelector("[data-product-note]");
  let lastFocusedElement = null;

  const setText = (element, value) => {
    if (element) {
      element.textContent = value;
    }
  };

  const parseCellValue = (cell) => {
    if (!cell || cell.v === null || cell.v === undefined) {
      return "";
    }

    return String(cell.v).trim();
  };

  const renderSizeBadges = (container, sizes, fallbackText = "уточнить") => {
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
      const badge = document.createElement("span");
      badge.textContent = size;
      container.appendChild(badge);
    });
  };

  const buildProductMessage = (product) => {
    const sizes = product.sizes.length ? ` Размеры в наличии: ${product.sizes.join(", ")}.` : "";
    return `Здравствуйте! Хочу уточнить наличие ${product.title}.${sizes}`;
  };

  const parseCatalogSyncResponse = (text) => {
    const match = text.match(/setResponse\(([\s\S]+)\);?$/);

    if (!match) {
      return {};
    }

    const payload = JSON.parse(match[1]);
    const rows = payload.table?.rows || [];

    return rows.reduce((result, row) => {
      const cells = row.c || [];
      const productCode = parseCellValue(cells[0]).toUpperCase();

      if (!productCode) {
        return result;
      }

      const title = parseCellValue(cells[2]);
      const sizes = parseCellValue(cells[3])
        .split(",")
        .map((size) => size.trim())
        .filter(Boolean);
      const price = parseCellValue(cells[4]);

      result[productCode] = {
        title,
        sizes,
        price
      };

      return result;
    }, {});
  };

  const applyCatalogSync = (catalogSync) => {
    productOpeners.forEach((opener, index) => {
      const productId = opener.dataset.productOpen;
      const productCode = (opener.dataset.productCode || `AQ${index + 1}`).toUpperCase();
      const product = catalogProducts[productId];
      const syncedProduct = catalogSync[productCode];

      if (!product || !syncedProduct) {
        return;
      }

      product.productCode = productCode;
      product.title = syncedProduct.title || product.title;
      product.price = syncedProduct.price || product.price;
      product.sizes = syncedProduct.sizes;
      product.sizeText = product.sizes.length ? "" : "уточнить наличие";
      product.whatsappText = buildProductMessage(product);

      setText(opener.querySelector(".catalog-product-title"), product.title);
      setText(opener.querySelector(".catalog-product-price"), product.price);
      renderSizeBadges(opener.querySelector(".catalog-product-sizes"), product.sizes, product.sizeText);
    });
  };

  const loadCatalogSync = async () => {
    try {
      const response = await fetch(CATALOG_SYNC_URL, { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`Catalog sync failed: ${response.status}`);
      }

      const catalogSync = parseCatalogSyncResponse(await response.text());
      applyCatalogSync(catalogSync);
    } catch (error) {
      console.warn("Catalog sync unavailable", error);
    }
  };

  const renderProductSizes = (product) => {
    if (!productSizes) {
      return;
    }

    renderSizeBadges(productSizes, product.sizes, product.sizeText || "уточнить");
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
        setActiveThumb(button);
      });

      productThumbsContainer.appendChild(button);
    });
  };

  const renderProduct = (product) => {
    if (!product) {
      return;
    }

    if (productMainImage && product.images[0]) {
      productMainImage.src = product.images[0].src;
      productMainImage.alt = product.images[0].alt;
    }

    setText(productSku, product.sku);
    setText(productTitle, product.title);
    setText(productBrand, product.brand);
    setText(productLine, product.line);
    setText(productPrice, product.price);
    setText(productColor, product.color);
    setText(productFit, product.fit);
    setText(productNote, product.note);
    renderProductSizes(product);
    renderProductThumbs(product);

    if (productWhatsapp) {
      productWhatsapp.href = `https://wa.me/996550333087?text=${encodeURIComponent(product.whatsappText)}`;
    }
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

  loadCatalogSync();

  productOpeners.forEach((opener) => {
    opener.addEventListener("click", openProductModal);
  });

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
