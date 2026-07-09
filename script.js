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

  let band = Math.round(inputBand);
  let bust = Math.round(inputBust);

  if (inputBand >= 65 && inputBand <= 67) band = 68;

  band = Math.round(band * 0.39);
  bust = Math.round(bust * 0.39);

  if (Number.isNaN(band) || band > 65 || band < 20 || Number.isNaN(bust) || bust > 70 || bust < 23 || bust < band) {
    return { error: "Проверьте измерения: похоже, одно из значений введено некорректно." };
  }

  const cups = ["AA", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S"];
  const resultBandInches = band % 2 === 1 ? band + 1 : band;
  const cupIndex = band % 2 === 0 ? bust - resultBandInches : bust - band;
  const bandMap = {
    28: "60",
    30: "65",
    32: "70",
    34: "75",
    36: "80",
    38: "85",
    40: "90",
    42: "95",
    44: "100",
    46: "105",
    48: "110",
    50: "115",
    52: "120",
    54: "125",
    56: "130",
    58: "135",
    60: "140",
    62: "145"
  };

  if (cupIndex < 0 || cupIndex >= cups.length) {
    return { error: "Размер получился вне стандартной сетки. Лучше прийти на очный подбор." };
  }

  const euBand = bandMap[resultBandInches] || String(resultBandInches);

  return {
    size: `${euBand}${cups[cupIndex]}`,
    note: "Это ориентир для старта. У разных брендов посадка может отличаться, поэтому финальный размер лучше подтвердить на примерке."
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
