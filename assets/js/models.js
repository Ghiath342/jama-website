/* ==========================================================================
   JAMA — Models catalogue (models.html + the newest models on the home page)
   --------------------------------------------------------------------------
   TO FILL IN A MODEL: edit its entry below.
     name  : { en: "English name", ar: "الاسم بالعربي" }   (empty → "Model 01")
     area  : "120 m²"                                      (empty → "—")
     price : "$25,000"                                     (empty → "On request")
   Prices are FOB (ex-factory): no tax, shipping or customs clearance.
   cat   : filter groups — residential hospitality commercial compact family custom
   home  : true → also shown first in the home page "Models" section
   ========================================================================== */
const JAMA_MODELS = [
  /* ---- New models (fill in name / area / price) ---- */
  { id: "m01", img: "assets/img/models/m01.jpg", home: true, cat: "residential family", name: { en: "", ar: "" }, area: "", price: "" },
  { id: "m02", img: "assets/img/models/m02.jpg", home: true, cat: "residential family", name: { en: "", ar: "" }, area: "", price: "" },
  { id: "m03", img: "assets/img/models/m03.jpg", cat: "residential family", name: { en: "", ar: "" }, area: "", price: "" },
  { id: "m04", img: "assets/img/models/m04.jpg", cat: "residential family", name: { en: "", ar: "" }, area: "", price: "" },
  { id: "m05", img: "assets/img/models/m05.jpg", cat: "residential family", name: { en: "", ar: "" }, area: "", price: "" },
  { id: "m06", img: "assets/img/models/m06.jpg", cat: "residential family", name: { en: "", ar: "" }, area: "", price: "" },
  { id: "m07", img: "assets/img/models/m07.jpg", cat: "residential compact hospitality", name: { en: "", ar: "" }, area: "", price: "" },
  { id: "m08", img: "assets/img/models/m08.jpg", cat: "compact commercial", name: { en: "", ar: "" }, area: "", price: "" },
  { id: "m09", img: "assets/img/models/m09.jpg", cat: "residential family", name: { en: "", ar: "" }, area: "", price: "" },
  { id: "m10", img: "assets/img/models/m10.jpg", cat: "residential family", name: { en: "", ar: "" }, area: "", price: "" },
  { id: "m11", img: "assets/img/models/m11.jpg", cat: "residential family", name: { en: "", ar: "" }, area: "", price: "" },
  { id: "m12", img: "assets/img/models/m12.jpg", cat: "residential family", name: { en: "", ar: "" }, area: "", price: "" },
  { id: "m13", img: "assets/img/models/m13.jpg", cat: "residential hospitality", name: { en: "", ar: "" }, area: "", price: "" },
  { id: "m14", img: "assets/img/models/m14.jpg", cat: "residential family", name: { en: "", ar: "" }, area: "", price: "" },
  { id: "m15", img: "assets/img/models/m15.jpg", cat: "residential family", name: { en: "", ar: "" }, area: "", price: "" },
  { id: "m16", img: "assets/img/models/m16.jpg", cat: "residential family", name: { en: "", ar: "" }, area: "", price: "" },
  { id: "m17", img: "assets/img/models/m17.jpg", cat: "residential family", name: { en: "", ar: "" }, area: "", price: "" },
  { id: "m18", img: "assets/img/models/m18.jpg", cat: "residential family", name: { en: "", ar: "" }, area: "", price: "" },

  /* ---- Existing models (also on the home page as full cards) ---- */
  { id: "one", img: "assets/img/cabin.jpg", cat: "residential hospitality compact custom", name: { en: "JAMA One", ar: "جاما ون" }, type: { en: "Compact studio living", ar: "سكن استوديو مدمج" }, area: "~18 m²", price: "" },
  { id: "nest", img: "assets/img/villa-night.jpg", cat: "residential compact custom", name: { en: "JAMA Nest", ar: "جاما نِست" }, type: { en: "One-bedroom home", ar: "منزل بغرفة نوم واحدة" }, area: "~35 m²", price: "" },
  { id: "family", img: "assets/img/villa-classic-day.jpg", cat: "residential family custom", name: { en: "JAMA Family", ar: "جاما فاميلي" }, type: { en: "Practical family residence", ar: "إقامة عائلية عملية" }, area: "~75 m²", price: "" },
  { id: "vista", img: "assets/img/villa-stone-pool.jpg", cat: "residential hospitality custom", name: { en: "JAMA Vista", ar: "جاما فيستا" }, type: { en: "Panoramic modern cabin", ar: "كابينة حديثة بإطلالة" }, area: "~45 m²", price: "" },
  { id: "courtyard", img: "assets/img/garden-pool.jpg", cat: "residential family custom", name: { en: "JAMA Courtyard", ar: "جاما كورت‑يارد" }, type: { en: "Home around a private courtyard", ar: "منزل حول فناء خاص" }, area: "~90 m²", price: "" },
  { id: "retreat", img: "assets/img/villa-night2.jpg", cat: "hospitality custom", name: { en: "JAMA Retreat", ar: "جاما ريتريت" }, type: { en: "Hospitality & countryside stay", ar: "إقامة ضيافة وريف" }, area: "~30 m²", price: "" },
  { id: "work", img: "assets/img/house-modern.jpg", cat: "commercial custom", name: { en: "JAMA Work", ar: "جاما وورك" }, type: { en: "Office or commercial unit", ar: "وحدة مكتبية أو تجارية" }, area: "~40 m²", price: "" },
];

(function () {
  "use strict";
  const esc = (v) => String(v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // both languages are rendered; CSS shows the one matching <html lang>
  const both = (en, ar) => `<span class="t-en">${esc(en)}</span><span class="t-ar">${esc(ar)}</span>`;
  const isNew = (m) => /^m\d+$/.test(m.id);
  const label = (m) => {
    const n = m.id.replace(/\D/g, "");
    return { en: (m.name && m.name.en) || "Model " + n, ar: (m.name && m.name.ar) || "نموذج " + n };
  };
  const ICON_AREA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3z"/><path d="M3 9h18M9 21V9"/></svg>';

  function card(m, opts) {
    const nm = label(m);
    const request = (opts.home ? "" : "index.html") + "?model=" + encodeURIComponent(nm.en) + "#contact";
    return `
      <article class="model-card mdl-card reveal" data-cat="${esc(m.cat)}"${opts.home ? "" : ` id="model-${m.id}"`}>
        <a class="model-card__img" href="${esc(m.img)}" data-zoom>
          <img src="${esc(m.img)}" loading="lazy" alt="${esc(nm.en)}" />
          ${isNew(m) ? `<span class="model-card__tag">${both("New", "جديد")}</span>` : ""}
        </a>
        <div class="model-card__body">
          <h3>${both(nm.en, nm.ar)}</h3>
          ${m.type ? `<div class="model-card__type">${both(m.type.en, m.type.ar)}</div>` : ""}
          <ul class="model-specs"><li>${ICON_AREA}<span class="mdl-label">${both("Area", "المساحة")}</span><span dir="ltr">${esc(m.area || "—")}</span></li></ul>
          <div class="mdl-price">
            <span class="mdl-label">${both("Price", "السعر")}</span>
            <b>${m.price ? `<span dir="ltr">${esc(m.price)}</span>` : both("On request", "عند الطلب")}</b>
            <span class="mdl-fob" title="FOB — ex-factory price, excluding tax, shipping and customs">FOB</span>
          </div>
          <div class="model-card__actions">
            <a href="${request}" class="btn btn--primary btn--sm">${both("Request Price", "اطلب السعر")}</a>
          </div>
        </div>
      </article>`;
  }

  // home page: newest models go first in the existing Models grid
  const homeGrid = document.querySelector("#models .model-grid");
  if (homeGrid) homeGrid.insertAdjacentHTML("afterbegin", JAMA_MODELS.filter((m) => m.home).map((m) => card(m, { home: true })).join(""));

  // models page: every model
  const pageGrid = document.getElementById("all-models");
  if (pageGrid) pageGrid.innerHTML = JAMA_MODELS.map((m) => card(m, { home: false })).join("");

  document.querySelectorAll("[data-models-count]").forEach((el) => { el.textContent = JAMA_MODELS.length; });
})();
