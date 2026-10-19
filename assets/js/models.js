/* ==========================================================================
   JAMA — Models catalogue (models.html + the home page "Models" section)
   --------------------------------------------------------------------------
   Area and FOB price come from JAMA_PRICING by floor count, unless a model
   sets its own. FOB = ex-factory price: no tax, shipping or customs clearance.
     code   : catalogue number shown on the card ("001")
     floors : 1 or 2
     name   : short description of the house { en, ar }
     area   : optional — own area in m² (overrides the floor default)
     rate   : optional — own price per m² in $ (overrides the floor default)
     video  : optional — plays first in the details window
     photos : optional — extra pictures for the details window (layouts, interiors…)
     special: true → "Special" filter, no fixed price ("Request a price from JAMA")
   Models with a video are listed first; the home page shows the first six.
   ========================================================================== */
const JAMA_PRICING = {
  1: { area: 140, rate: 236 }, // one floor:  140 m² × $236 = $33,040
  2: { area: 280, rate: 270 }, // two floors: 280 m² × $270 = $75,600
};

const JAMA_MODELS = [
  { code: "001", img: "assets/img/models/m01.jpg", floors: 1, video: "assets/video/model-001.mp4", photos: ["assets/img/models/m01-layout.jpg"], name: { en: "Single-Storey Twin-Gable House", ar: "منزل طابق واحد بواجهتين مثلثتين" } },
  { code: "002", img: "assets/img/models/m02.jpg", floors: 2, area: 180, rate: 236, video: "assets/video/model-002.mp4", name: { en: "Two Floors Modern Luxury Villa", ar: "فيلا فاخرة عصرية بطابقين" } },
  { code: "003", img: "assets/img/models/m19.jpg", floors: 2, video: "assets/video/model-003.mp4", name: { en: "Two Floors Modern Villa", ar: "فيلا عصرية بطابقين" } },
  { code: "004", img: "assets/img/models/m20.jpg", floors: 2, video: "assets/video/model-004.mp4", name: { en: "Two Floors Modern Villa", ar: "فيلا عصرية بطابقين" } },
  { code: "005", img: "assets/img/models/m21.jpg", floors: 2, video: "assets/video/model-005.mp4", name: { en: "Two Floors Modern Villa", ar: "فيلا عصرية بطابقين" } },
  { code: "006", img: "assets/img/models/m16.jpg", floors: 2, name: { en: "Cream Villa with Terraces", ar: "فيلا كريمية بتراسات" } },
  { code: "007", img: "assets/img/models/m04.jpg", floors: 2, name: { en: "Two-Tone Family House with Porch", ar: "منزل عائلي بلونين مع مدخل مسقوف" } },
  { code: "008", img: "assets/img/models/m05.jpg", floors: 2, name: { en: "Red House with Wooden Balcony", ar: "منزل أحمر بشرفة خشبية" } },
  { code: "009", img: "assets/img/models/m06.jpg", floors: 2, name: { en: "Stone-Base House with Balcony", ar: "منزل بقاعدة حجرية وشرفة" } },
  { code: "010", img: "assets/img/models/m07.jpg", floors: 1, name: { en: "Wood-Look Single-Storey Cabin", ar: "كابينة طابق واحد بمظهر خشبي" } },
  { code: "011", img: "assets/img/models/m08.jpg", floors: 1, name: { en: "Compact White Units", ar: "وحدات بيضاء مدمجة" } },
  { code: "012", img: "assets/img/models/m09.jpg", floors: 2, name: { en: "Villa with Arched Windows", ar: "فيلا بنوافذ مقوّسة" } },
  { code: "013", img: "assets/img/models/m10.jpg", floors: 2, name: { en: "Coral House with Long Balcony", ar: "منزل مرجاني بشرفة طويلة" } },
  { code: "014", img: "assets/img/models/m11.jpg", floors: 1, name: { en: "Yellow Bungalow with Front Porch", ar: "بنغل أصفر بشرفة أمامية" } },
  { code: "015", img: "assets/img/models/m12.jpg", floors: 2, name: { en: "White Villa on Stone Base", ar: "فيلا بيضاء على قاعدة حجرية" } },
  { code: "016", img: "assets/img/models/m13.jpg", floors: 1, name: { en: "Red-Roof Cottage with Arches", ar: "كوخ بسقف أحمر وأقواس" } },
  { code: "017", img: "assets/img/models/m14.jpg", floors: 1, name: { en: "Stone & Wood House with Dormers", ar: "منزل حجري وخشبي بنوافذ سقفية" } },
  { code: "018", img: "assets/img/models/m15.jpg", floors: 2, name: { en: "Orange Villa with Bay Windows", ar: "فيلا برتقالية بنوافذ بارزة" } },
  { code: "019", img: "assets/img/models/m03.jpg", floors: 2, name: { en: "White Cottage with Green Roof", ar: "كوخ أبيض بسقف أخضر" } },
  { code: "020", img: "assets/img/models/m17.jpg", floors: 2, name: { en: "Red-Roof Villa with Balcony", ar: "فيلا بسقف أحمر وشرفة" } },
  { code: "021", img: "assets/img/models/m18.jpg", floors: 2, name: { en: "Narrow Villa with Stone Base", ar: "فيلا ضيقة بقاعدة حجرية" } },
];

(function () {
  "use strict";
  const esc = (v) => String(v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // both languages are rendered; CSS shows the one matching <html lang>
  const both = (en, ar) => `<span class="t-en">${esc(en)}</span><span class="t-ar">${esc(ar)}</span>`;
  const usd = (n) => "$" + n.toLocaleString("en-US");
  const FOB_TAG = `<span class="mdl-fob">${both("FOB", "FOB (أرض المعمل)")}</span>`;
  const ICON_AREA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3z"/><path d="M3 9h18M9 21V9"/></svg>';
  const ICON_FLOORS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M5 15h14"/></svg>';
  const ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  const onHomePage = !!document.querySelector("#contact form");
  // houses with a video first, otherwise in code order (sort is stable)
  const ORDERED = JAMA_MODELS.slice().sort((a, b) => (b.video ? 1 : 0) - (a.video ? 1 : 0));

  // area, rate and total for a model (own values win over the floor default)
  const priceOf = (m) => {
    const d = JAMA_PRICING[m.floors];
    const area = m.area || d.area, rate = m.rate || d.rate;
    return { area, rate, total: area * rate };
  };
  const floorsLabel = (m) => (m.floors === 1 ? both("One floor", "طابق واحد") : both("Two floors", "طابقان"));
  const requestHref = (m) => (onHomePage ? "#contact" : "index.html?model=" + m.code + "#contact");

  function card(m, onHome) {
    const p = priceOf(m);
    const price = m.special
      ? `<div class="mdl-price mdl-price--quote"><b>${both("Request a price from JAMA", "اطلب السعر من جاما")}</b></div>`
      : `<div class="mdl-price">
            <span class="mdl-label">${both("Price", "السعر")}</span>
            <b dir="ltr">${usd(p.total)}</b>
            ${FOB_TAG}
          </div>
          <div class="mdl-rate" dir="ltr">${p.area} m² × ${usd(p.rate)} / m²</div>`;
    return `
      <article class="model-card mdl-card reveal" data-cat="${m.floors === 1 ? "one-floor" : "two-floors"}${m.special ? " special" : ""}"${onHome ? "" : ` id="model-${m.code}"`}>
        <button type="button" class="model-card__img mdl-open" data-details="${m.code}" aria-label="${esc(m.name.en)} — details">
          <img src="${esc(m.img)}" loading="lazy" alt="${esc(m.name.en)}" />
          <span class="model-card__tag mdl-code" dir="ltr">${m.code}</span>
          ${m.video ? `<span class="mdl-video-tag">${ICON_PLAY}${both("Video", "فيديو")}</span>` : ""}
        </button>
        <div class="model-card__body">
          <h3>${both(m.name.en, m.name.ar)}</h3>
          <ul class="model-specs">
            <li>${ICON_FLOORS}${floorsLabel(m)}</li>
            ${m.special ? "" : `<li>${ICON_AREA}<span dir="ltr">${p.area} m²</span></li>`}
          </ul>
          ${price}
          <div class="model-card__actions">
            <button type="button" class="btn btn--navy btn--sm" data-details="${m.code}">${both("Details", "التفاصيل")}</button>
            <a href="${requestHref(m)}" class="btn btn--primary btn--sm" data-model="${m.code}">${m.special ? both("Request Price", "اطلب السعر") : both("Request", "اطلب")}</a>
          </div>
        </div>
      </article>`;
  }

  // home page: the first six (video houses lead)
  const homeGrid = document.querySelector("#models .model-grid");
  if (homeGrid) homeGrid.insertAdjacentHTML("beforeend", ORDERED.slice(0, 6).map((m) => card(m, true)).join(""));

  // models page: every model
  const pageGrid = document.getElementById("all-models");
  if (pageGrid) pageGrid.innerHTML = ORDERED.map((m) => card(m, false)).join("");

  /* ---- Details window: video or photo + a table of the house's details --- */
  const modal = document.createElement("div");
  modal.className = "mdl-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.innerHTML = '<div class="mdl-modal__backdrop"></div><div class="mdl-modal__panel"></div>';
  document.body.appendChild(modal);
  const panel = modal.querySelector(".mdl-modal__panel");

  function row(en, ar, value) {
    return `<tr><th>${both(en, ar)}</th><td>${value}</td></tr>`;
  }

  function openDetails(code) {
    const m = JAMA_MODELS.find((x) => x.code === code);
    if (!m) return;
    const p = priceOf(m);
    // video first (if any), then the main photo, then any extra photos
    const items = [];
    if (m.video) items.push({ video: m.video, poster: m.img });
    [m.img].concat(m.photos || []).forEach((src) => items.push({ img: src }));
    const thumbs = items.length < 2 ? "" : `<div class="mdl-thumbs">${items.map((it, i) => `
          <button type="button" class="mdl-thumb${i === 0 ? " active" : ""}" data-media="${i}" aria-label="${it.video ? "Video" : "Photo " + i}">
            <img src="${esc(it.poster || it.img)}" alt="" />${it.video ? `<span class="mdl-thumb__play">${ICON_PLAY}</span>` : ""}
          </button>`).join("")}</div>`;
    const rows = [
      row("Model code", "رمز النموذج", `<span dir="ltr">${m.code}</span>`),
      row("Type", "النوع", floorsLabel(m)),
      m.special ? "" : row("Area", "المساحة", `<span dir="ltr">${p.area} m²</span>`),
      m.special ? "" : row("Price per m²", "السعر للمتر المربع", `<span dir="ltr">${usd(p.rate)}</span>`),
      row("Total price", "السعر الإجمالي", m.special
        ? both("Request a price from JAMA", "اطلب السعر من جاما")
        : `<b dir="ltr">${usd(p.total)}</b> ${FOB_TAG}`),
    ].join("");
    panel.innerHTML = `
      <button type="button" class="mdl-modal__close" aria-label="Close">✕</button>
      <div class="mdl-modal__media"><div class="mdl-stage"></div>${thumbs}</div>
      <div class="mdl-modal__body">
        <span class="mdl-modal__code" dir="ltr">${m.code}</span>
        <h3>${both(m.name.en, m.name.ar)}</h3>
        <table class="mdl-table"><tbody>${rows}</tbody></table>
        <div class="mdl-modal__actions">
          <a href="${requestHref(m)}" class="btn btn--primary" data-model="${m.code}">${m.special ? both("Request Price", "اطلب السعر") : both("Request This Model", "اطلب هذا النموذج")}</a>
        </div>
      </div>`;
    showMedia(items, 0, m);
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    panel.querySelector(".mdl-modal__close").focus();
    if (!onHomePage) history.replaceState(null, "", "#model-" + m.code);
  }

  // show one item (video or photo) in the big stage and mark its thumbnail
  let current = null;
  function showMedia(items, i, m) {
    if (m) current = { items, m };
    const it = current.items[i];
    const stage = panel.querySelector(".mdl-stage");
    stage.innerHTML = it.video
      ? `<video src="${esc(it.video)}" poster="${esc(it.poster)}" controls autoplay muted loop playsinline preload="metadata"></video>`
      : `<img src="${esc(it.img)}" alt="${esc(current.m.name.en)}" />`;
    panel.querySelectorAll(".mdl-thumb").forEach((b, j) => b.classList.toggle("active", j === i));
  }

  function closeDetails() {
    if (!modal.classList.contains("open")) return;
    const v = panel.querySelector("video");
    if (v) v.pause();
    modal.classList.remove("open");
    document.body.style.overflow = "";
    if (!onHomePage && location.hash.startsWith("#model-")) history.replaceState(null, "", location.pathname);
  }

  document.addEventListener("click", (e) => {
    const opener = e.target.closest("[data-details]");
    if (opener) { e.preventDefault(); openDetails(opener.dataset.details); return; }
    const thumb = e.target.closest(".mdl-thumb");
    if (thumb && current) { showMedia(current.items, +thumb.dataset.media); return; }
    if (e.target.closest(".mdl-modal__close") || e.target.classList.contains("mdl-modal__backdrop")) closeDetails();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDetails(); });

  // models.html#model-002 opens that house's details
  const hash = (location.hash.match(/^#model-(\d{3})$/) || [])[1];
  if (hash) openDetails(hash);

  // contact form: list the catalogue in "Preferred model"
  const sel = document.getElementById("contact-model");
  if (sel) {
    Array.from(sel.options).slice(1).forEach((o) => o.remove());
    JAMA_MODELS.forEach((m) => sel.add(new Option(m.code + " — " + m.name.en, m.code + " — " + m.name.en)));
  }

  /* ---- Fill the inquiry form for a chosen model ------------------------- */
  function fillContact(code) {
    const m = JAMA_MODELS.find((x) => x.code === code);
    const form = document.querySelector("#contact form");
    if (!m || !form) return false;
    const ar = document.documentElement.getAttribute("lang") === "ar";
    const p = priceOf(m);
    const field = (name) => form.querySelector(`[name="${name}"]`);
    const label = m.code + " — " + m.name.en;
    if (sel) sel.value = label;
    const type = field("Project type");
    const res = type && type.querySelector('[data-i18n="opt.res"]');
    if (res) res.selected = true;
    const area = field("Approx. area (m2)");
    const budget = field("Budget range");
    if (area) area.value = m.special ? "" : p.area;
    if (budget) budget.value = m.special ? "" : usd(p.total) + (ar ? " FOB (أرض المعمل)" : " FOB");
    const floors = m.floors === 1 ? (ar ? "طابق واحد" : "one floor") : (ar ? "طابقان" : "two floors");
    const msg = field("Message");
    if (msg) {
      msg.value = m.special
        ? (ar ? `أرغب بمعرفة سعر النموذج ${m.code} — ${m.name.ar} (${floors}).`
              : `I'd like a price for model ${label} (${floors}).`)
        : (ar ? `أنا مهتم بالنموذج ${m.code} — ${m.name.ar} (${floors}، ${p.area} م²، ${usd(p.total)} FOB (أرض المعمل)).`
              : `I'm interested in model ${label} (${floors}, ${p.area} m², ${usd(p.total)} FOB).`);
    }
    return true;
  }

  // home page request buttons: fill the form in place and scroll to it
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-model]");
    if (!a || !onHomePage) return;
    if (!fillContact(a.dataset.model)) return;
    e.preventDefault();
    closeDetails();
    // vertical scroll only (scrollIntoView can also shift the page sideways in RTL)
    window.scrollTo({ top: document.getElementById("contact").getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
  });

  // arriving from the models page (index.html?model=001#contact)
  let fromUrl = null;
  try { fromUrl = new URLSearchParams(location.search).get("model"); } catch (e) {}
  if (fromUrl) {
    // after the language engine has applied the saved language
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => fillContact(fromUrl));
    else fillContact(fromUrl);
  }

  document.querySelectorAll("[data-models-count]").forEach((el) => { el.textContent = JAMA_MODELS.length; });
})();
