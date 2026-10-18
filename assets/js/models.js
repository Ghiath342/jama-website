/* ==========================================================================
   JAMA — Models catalogue (models.html + the home page "Models" section)
   --------------------------------------------------------------------------
   Two building options; area and FOB price come from PRICING by floor count.
   FOB = ex-factory price: no tax, shipping or customs clearance.
     code   : catalogue number shown on the card ("001")
     floors : 1 or 2
     name   : short description of the picture { en, ar }
     special: true → "Special" filter, no fixed price ("Request a price from JAMA")
     home   : true → also shown in the home page "Models" section
   ========================================================================== */
const JAMA_PRICING = {
  1: { area: 140, rate: 236 }, // one floor:  140 m² × $236 = $33,040
  2: { area: 280, rate: 270 }, // two floors: 280 m² × $270 = $75,600
};

const JAMA_MODELS = [
  { code: "001", img: "assets/img/models/m01.jpg", floors: 1, home: true, name: { en: "Single-Storey Twin-Gable House", ar: "منزل طابق واحد بواجهتين مثلثتين" } },
  { code: "002", img: "assets/img/models/m02.jpg", floors: 2, home: true, special: true, name: { en: "Glass A-Frame Villa with Terrace", ar: "فيلا زجاجية بسقف مثلث وتراس" } },
  { code: "003", img: "assets/img/models/m03.jpg", floors: 2, home: true, name: { en: "White Cottage with Green Roof", ar: "كوخ أبيض بسقف أخضر" } },
  { code: "004", img: "assets/img/models/m04.jpg", floors: 2, home: true, name: { en: "Two-Tone Family House with Porch", ar: "منزل عائلي بلونين مع مدخل مسقوف" } },
  { code: "005", img: "assets/img/models/m05.jpg", floors: 2, home: true, name: { en: "Red House with Wooden Balcony", ar: "منزل أحمر بشرفة خشبية" } },
  { code: "006", img: "assets/img/models/m06.jpg", floors: 2, name: { en: "Stone-Base House with Balcony", ar: "منزل بقاعدة حجرية وشرفة" } },
  { code: "007", img: "assets/img/models/m07.jpg", floors: 1, name: { en: "Wood-Look Single-Storey Cabin", ar: "كابينة طابق واحد بمظهر خشبي" } },
  { code: "008", img: "assets/img/models/m08.jpg", floors: 1, name: { en: "Compact White Units", ar: "وحدات بيضاء مدمجة" } },
  { code: "009", img: "assets/img/models/m09.jpg", floors: 2, name: { en: "Villa with Arched Windows", ar: "فيلا بنوافذ مقوّسة" } },
  { code: "010", img: "assets/img/models/m10.jpg", floors: 2, name: { en: "Coral House with Long Balcony", ar: "منزل مرجاني بشرفة طويلة" } },
  { code: "011", img: "assets/img/models/m11.jpg", floors: 1, name: { en: "Yellow Bungalow with Front Porch", ar: "بنغل أصفر بشرفة أمامية" } },
  { code: "012", img: "assets/img/models/m12.jpg", floors: 2, name: { en: "White Villa on Stone Base", ar: "فيلا بيضاء على قاعدة حجرية" } },
  { code: "013", img: "assets/img/models/m13.jpg", floors: 1, name: { en: "Red-Roof Cottage with Arches", ar: "كوخ بسقف أحمر وأقواس" } },
  { code: "014", img: "assets/img/models/m14.jpg", floors: 1, name: { en: "Stone & Wood House with Dormers", ar: "منزل حجري وخشبي بنوافذ سقفية" } },
  { code: "015", img: "assets/img/models/m15.jpg", floors: 2, name: { en: "Orange Villa with Bay Windows", ar: "فيلا برتقالية بنوافذ بارزة" } },
  { code: "016", img: "assets/img/models/m16.jpg", floors: 2, name: { en: "Cream Villa with Terraces", ar: "فيلا كريمية بتراسات" } },
  { code: "017", img: "assets/img/models/m17.jpg", floors: 2, name: { en: "Red-Roof Villa with Balcony", ar: "فيلا بسقف أحمر وشرفة" } },
  { code: "018", img: "assets/img/models/m18.jpg", floors: 2, name: { en: "Narrow Villa with Stone Base", ar: "فيلا ضيقة بقاعدة حجرية" } },
  /* earlier models */
  { code: "019", img: "assets/img/cabin.jpg", floors: 1, special: true, name: { en: "A-Frame Wooden Cabin", ar: "كابينة خشبية بسقف مثلث" } },
  { code: "020", img: "assets/img/villa-night.jpg", floors: 2, special: true, name: { en: "Flat-Roof Villa with Pool", ar: "فيلا بسطح مستوٍ ومسبح" } },
  { code: "021", img: "assets/img/villa-classic-day.jpg", floors: 2, name: { en: "Classic Columned Villa", ar: "فيلا كلاسيكية بأعمدة" } },
  { code: "022", img: "assets/img/villa-stone-pool.jpg", floors: 2, special: true, name: { en: "Stone Villa with Pool", ar: "فيلا حجرية مع مسبح" } },
  { code: "023", img: "assets/img/villa-night2.jpg", floors: 2, special: true, name: { en: "Classic Villa at Night", ar: "فيلا كلاسيكية ليلاً" } },
  { code: "024", img: "assets/img/house-modern.jpg", floors: 2, special: true, name: { en: "Modern Two-Storey House", ar: "منزل حديث بطابقين" } },
];

(function () {
  "use strict";
  const esc = (v) => String(v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // both languages are rendered; CSS shows the one matching <html lang>
  const both = (en, ar) => `<span class="t-en">${esc(en)}</span><span class="t-ar">${esc(ar)}</span>`;
  const usd = (n) => "$" + n.toLocaleString("en-US");
  const ICON_AREA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3z"/><path d="M3 9h18M9 21V9"/></svg>';
  const ICON_FLOORS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M5 15h14"/></svg>';

  function card(m, onHome) {
    const p = JAMA_PRICING[m.floors];
    const floors = m.floors === 1 ? both("One floor", "طابق واحد") : both("Two floors", "طابقان");
    const request = (onHome ? "" : "index.html") + "?model=" + encodeURIComponent(m.code + " — " + m.name.en) + "#contact";
    const price = m.special
      ? `<div class="mdl-price mdl-price--quote"><b>${both("Request a price from JAMA", "اطلب السعر من جاما")}</b></div>`
      : `<div class="mdl-price">
            <span class="mdl-label">${both("Price", "السعر")}</span>
            <b dir="ltr">${usd(p.area * p.rate)}</b>
            <span class="mdl-fob" title="FOB — ex-factory price, excluding tax, shipping and customs">FOB</span>
          </div>
          <div class="mdl-rate" dir="ltr">${p.area} m² × ${usd(p.rate)} / m²</div>`;
    return `
      <article class="model-card mdl-card reveal" data-cat="${m.floors === 1 ? "one-floor" : "two-floors"}${m.special ? " special" : ""}"${onHome ? "" : ` id="model-${m.code}"`}>
        <a class="model-card__img" href="${esc(m.img)}" data-zoom>
          <img src="${esc(m.img)}" loading="lazy" alt="${esc(m.name.en)}" />
          <span class="model-card__tag mdl-code" dir="ltr">${m.code}</span>
        </a>
        <div class="model-card__body">
          <h3>${both(m.name.en, m.name.ar)}</h3>
          <ul class="model-specs">
            <li>${ICON_FLOORS}${floors}</li>
            ${m.special ? "" : `<li>${ICON_AREA}<span dir="ltr">${p.area} m²</span></li>`}
          </ul>
          ${price}
          <div class="model-card__actions">
            <a href="${request}" class="btn btn--primary btn--sm">${m.special ? both("Request Price", "اطلب السعر") : both("Request This Model", "اطلب هذا النموذج")}</a>
          </div>
        </div>
      </article>`;
  }

  // home page: selected models first, before the custom-design card
  const homeGrid = document.querySelector("#models .model-grid");
  if (homeGrid) homeGrid.insertAdjacentHTML("afterbegin", JAMA_MODELS.filter((m) => m.home).map((m) => card(m, true)).join(""));

  // models page: every model
  const pageGrid = document.getElementById("all-models");
  if (pageGrid) pageGrid.innerHTML = JAMA_MODELS.map((m) => card(m, false)).join("");

  // contact form: list the catalogue in "Preferred model"
  const sel = document.getElementById("contact-model");
  if (sel) {
    Array.from(sel.options).slice(1).forEach((o) => o.remove());
    JAMA_MODELS.forEach((m) => sel.add(new Option(m.code + " — " + m.name.en, m.code + " — " + m.name.en)));
  }

  document.querySelectorAll("[data-models-count]").forEach((el) => { el.textContent = JAMA_MODELS.length; });
})();
