const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const form = document.querySelector(".booking-form");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "не указано";
    const phone = data.get("phone") || "не указано";
    const request = data.get("request") || "подбор белья";
    const message = data.get("message") || "без комментария";
    const text = `Здравствуйте! Меня зовут ${name}. Хочу записаться на подбор в Aquamuse.%0AТелефон: ${phone}%0AЗапрос: ${request}%0AКомментарий: ${message}`;
    window.location.href = `https://wa.me/?text=${text}`;
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

  const band = Math.round(inputBand / 5) * 5 - 5;
  const difference = Math.round(inputBust - band);

  if (Number.isNaN(band) || band < 60 || band > 120 || difference < 8 || difference > 36) {
    return { error: "Проверьте измерения: похоже, одно из значений введено некорректно." };
  }

  const cups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"];
  const cupIndex = Math.round((difference - 10) / 2);

  if (cupIndex < 0 || cupIndex >= cups.length) {
    return { error: "Размер получился вне стандартной сетки. Лучше прийти на очный подбор." };
  }

  const mainSize = `${band}${cups[cupIndex]}`;
  const sisterSize = cupIndex > 0 && band > 60 ? `${band - 5}${cups[cupIndex - 1]}` : "";

  return {
    size: mainSize,
    note: sisterSize
      ? `По этой таблице основной ориентир - ${mainSize}. Также можно примерить соседний размер ${sisterSize}. Финальную посадку лучше подтвердить на примерке.`
      : `По этой таблице основной ориентир - ${mainSize}. Финальную посадку лучше подтвердить на примерке.`
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
