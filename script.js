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

  const band = Math.round(inputBand / 5) * 5;
  const difference = Math.round(inputBust - inputBand);

  if (Number.isNaN(band) || band < 65 || band > 120 || difference < 10 || difference > 36) {
    return { error: "Проверьте измерения: похоже, одно из значений введено некорректно." };
  }

  const cups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"];
  const cupIndex = Math.max(0, Math.round((difference - 12) / 2));

  if (cupIndex < 0 || cupIndex >= cups.length) {
    return { error: "Размер получился вне стандартной сетки. Лучше прийти на очный подбор." };
  }

  const mainSize = `${band}${cups[cupIndex]}`;
  const sisterDown = cupIndex + 1 < cups.length && band > 65 ? `${band - 5}${cups[cupIndex + 1]}` : "";
  const sisterUp = cupIndex > 0 && band < 120 ? `${band + 5}${cups[cupIndex - 1]}` : "";
  const sisterText = [sisterDown, sisterUp].filter(Boolean).join(" или ");

  return {
    size: mainSize,
    note: sisterText
      ? `Стартовая точка для примерки - ${mainSize}. Также можно проверить соседний размер ${sisterText}. Финальную посадку лучше подтвердить на примерке.`
      : `Стартовая точка для примерки - ${mainSize}. Финальную посадку лучше подтвердить на примерке.`
  };
}

if (sizeCalculator) {
  const result = sizeCalculator.querySelector("[data-size-result]");
  const note = sizeCalculator.querySelector("[data-size-note]");

  sizeCalculator.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(sizeCalculator);
    const calculated = calculateBraSize(data.get("band"), data.get("bust"));

    if (calculated.error) {
      result.textContent = "-";
      note.textContent = calculated.error;
      return;
    }

    result.textContent = calculated.size;
    note.textContent = calculated.note;
  });
}
