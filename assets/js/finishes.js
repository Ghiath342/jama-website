/* ==========================================================================
   JAMA — Façade finishes catalogue (finishes.html)
   Data for every finish (EN + AR names) and the gallery / viewer logic.
   Images live in assets/img/finishes/ (cropped from the supplier catalogue).
   To add a finish: add [image-file, English name, Arabic name] to a series.
   ========================================================================== */
(function () {
  "use strict";

  const SERIES = [
    { id: "block", code: "BL", en: "Block Pattern", ar: "نقشة البلوك",
      den: "Large blocks with a fine stone texture.", dar: "بلوكات كبيرة بملمس حجري ناعم.",
      items: [
        ["p8-01", "Dark Grey", "رمادي داكن"],
        ["p8-02", "Desert Sand", "رملي صحراوي"],
        ["p8-03", "Deep Blue", "أزرق داكن"],
        ["p8-04", "Angel White", "أبيض ناصع"],
        ["p8-05", "Dusty Rose", "وردي ترابي"],
        ["p8-06", "Light Brown Sand", "بني رملي فاتح"],
        ["p8-07", "Light Grey", "رمادي فاتح"],
        ["p8-08", "Antique Grey", "رمادي عتيق"],
        ["p8-09", "Beige", "بيج"],
      ] },
    { id: "brick", code: "BR", en: "Classic Brick", ar: "الطوب الكلاسيكي",
      den: "Traditional brick courses, from soft whites to deep reds.", dar: "صفوف طوب تقليدية، من الأبيض الهادئ حتى الأحمر العميق.",
      items: [
        ["p9-01", "Grey Brick, White Joints", "طوب رمادي بفواصل بيضاء"],
        ["p9-02", "Desert Sand · 6 Courses", "رملي صحراوي · ٦ صفوف"],
        ["p9-03", "Brick Red · 7 Courses", "أحمر طوبي · ٧ صفوف"],
        ["p9-04", "Dark Grey · 6 Courses", "رمادي داكن · ٦ صفوف"],
        ["p9-05", "Antique Grey · 6 Courses", "رمادي عتيق · ٦ صفوف"],
        ["p9-06", "Light Brown Strip Stone", "حجر شريطي بني فاتح"],
        ["p9-07", "Angel White · 6 Courses", "أبيض ناصع · ٦ صفوف"],
        ["p9-08", "Deep Blue · 7 Courses", "أزرق داكن · ٧ صفوف"],
        ["p9-09", "Three-Tone Brick", "طوب بثلاثة ألوان"],
        ["p9-10", "Light Brown Sand · 7 Courses", "بني رملي فاتح · ٧ صفوف"],
        ["p9-11", "Textured Red · 6 Courses", "أحمر محبّب · ٦ صفوف"],
      ] },
    { id: "wave", code: "CR", en: "Corrugated", ar: "المموّج",
      den: "Fine horizontal ribs for a clean, contemporary façade.", dar: "خطوط أفقية ناعمة لواجهة عصرية ونظيفة.",
      items: [
        ["p10-01", "Dark Grey", "رمادي داكن"],
        ["p10-02", "Light Grey", "رمادي فاتح"],
        ["p10-03", "Beige", "بيج"],
        ["p10-04", "Gloss White", "أبيض لامع"],
        ["p10-05", "Dusty Rose", "وردي ترابي"],
        ["p10-06", "Angel White", "أبيض ناصع"],
        ["p10-07", "Brick Red", "أحمر طوبي"],
        ["p10-08", "Deep Blue", "أزرق داكن"],
        ["p10-09", "Light Brown Sand", "بني رملي فاتح"],
        ["p10-10", "Textured Red", "أحمر محبّب"],
      ] },
    { id: "duo", code: "TT", en: "Two-Tone Brick", ar: "طوب بلونين",
      den: "A second rolled-on colour gives every brick natural depth.", dar: "لون ثانٍ يمنح كل طوبة عمقاً طبيعياً.",
      items: [
        ["p11-01", "Light Brown with Orange-Red", "بني فاتح مع أحمر برتقالي"],
        ["p11-02", "Antique Grey with White", "رمادي عتيق مع أبيض"],
        ["p11-03", "White with Orange-Red", "أبيض مع أحمر برتقالي"],
        ["p11-04", "White with Antique Grey", "أبيض مع رمادي عتيق"],
        ["p11-05", "Strip Stone with Khaki", "حجر شريطي مع كاكي"],
        ["p11-06", "White with Dark Grey", "أبيض مع رمادي داكن"],
        ["p11-07", "White with Textured Red", "أبيض مع أحمر محبّب"],
        ["p11-08", "Light Brown with Khaki", "بني فاتح مع كاكي"],
        ["p11-09", "Antique Grey with Orange-Red", "رمادي عتيق مع أحمر برتقالي"],
      ] },
    { id: "stone", code: "SM", en: "Stone & Marble", ar: "حجر ورخام",
      den: "Natural stone walls and marble looks, without the weight.", dar: "مظهر الحجر الطبيعي والرخام، من دون وزنه.",
      items: [
        ["p12-01", "Beige Stacked Stone", "حجر مرصوص بيج"],
        ["p12-02", "Rustic Cultural Stone", "حجر ثقافي ريفي"],
        ["p12-03", "Grey Stacked Stone", "حجر مرصوص رمادي"],
        ["p12-04", "Three-Tone Bluestone", "حجر أزرق بثلاثة ألوان"],
        ["p12-05", "Camouflage Green", "أخضر مموّه"],
        ["p12-06", "Jade White Marble", "رخام أبيض يشمي"],
        ["p12-07", "Black & White Speckle", "رخام منقّط أبيض وأسود"],
        ["p12-08", "Jazz White Marble", "رخام أبيض جاز"],
        ["p12-09", "Aurora Marble", "رخام أورورا"],
        ["p12-10", "Granite", "غرانيت"],
      ] },
    { id: "coat", code: "TC", en: "Textured Coating", ar: "الطلاء المحبّب",
      den: "Soft textured finishes in solid colours and grooves.", dar: "أسطح محبّبة بألوان موحّدة وأخاديد.",
      items: [
        ["p13-01", "Antique Grey", "رمادي عتيق"],
        ["p13-02", "Desert Camouflage", "تمويه صحراوي"],
        ["p13-03", "Ivory White", "أبيض عاجي"],
        ["p13-04", "Angel White", "أبيض ناصع"],
        ["p13-05", "Deep Blue", "أزرق داكن"],
        ["p13-06", "Brick Red, Angled Groove", "أحمر طوبي بأخدود مائل"],
        ["p13-07", "Light Brown, Straight Groove", "بني فاتح بأخدود مستقيم"],
        ["p13-08", "Army Green", "أخضر عسكري"],
        ["p13-09", "Dusty Rose", "وردي ترابي"],
        ["p13-10", "Beige", "بيج"],
      ] },
    { id: "wood", code: "WD", en: "Wood Grain", ar: "عروق الخشب",
      den: "Warm timber looks with straight or angled grooves.", dar: "مظهر خشبي دافئ بأخاديد مستقيمة أو مائلة.",
      items: [
        ["p14-01", "Golden Teak, Straight Groove", "ساج ذهبي بأخدود مستقيم"],
        ["p14-02", "Red Pine, Angled Groove", "صنوبر أحمر بأخدود مائل"],
        ["p14-03", "Knotty Pine, Angled Groove", "صنوبر معقود بأخدود مائل"],
        ["p14-04", "Mountain Pine, Flat", "صنوبر جبلي أملس"],
        ["p14-05", "White Wood Grain", "أبيض بعروق خشب"],
        ["p14-06", "Knotty Pine, Straight Groove", "صنوبر معقود بأخدود مستقيم"],
        ["p14-07", "Light Wenge, Angled Groove", "وينجي فاتح بأخدود مائل"],
        ["p14-08", "Dark Wenge, Angled Groove", "وينجي داكن بأخدود مائل"],
        ["p14-09", "Brown Oak, Straight Groove", "بلوط بني بأخدود مستقيم"],
        ["p14-10", "Ivory Wood Grain", "عاجي بعروق خشب"],
      ] },
    { id: "flat", code: "FL", en: "Flat Panel", ar: "اللوح الأملس",
      den: "Minimal flat surfaces for a sleek, modern finish.", dar: "أسطح ملساء بسيطة لمظهر حديث وأنيق.",
      items: [
        ["p15-01", "Dusty Rose", "وردي ترابي"],
        ["p15-02", "Deep Blue", "أزرق داكن"],
        ["p15-03", "Ivory White", "أبيض عاجي"],
        ["p15-04", "Desert Sand", "رملي صحراوي"],
        ["p15-05", "Army Green, Straight Groove", "أخضر عسكري بأخدود مستقيم"],
        ["p15-06", "Gloss White, Angled Groove", "أبيض لامع بأخدود مائل"],
        ["p15-07", "Antique Grey, Angled Groove", "رمادي عتيق بأخدود مائل"],
        ["p15-08", "Light Brown, Straight Groove", "بني فاتح بأخدود مستقيم"],
      ] },
    { id: "core", code: "IB", en: "Insulated Boards", ar: "ألواح معزولة", product: true,
      den: "Finished panels with a 3 cm or 5 cm polystyrene insulation core.", dar: "ألواح مشطّبة بقلب عازل من البوليسترين بسماكة ٣ أو ٥ سم.",
      items: [
        ["p16-01", "3 cm · Brick Red Brick", "٣ سم · طوب أحمر"],
        ["p16-02", "3 cm · Dusty Rose Block", "٣ سم · بلوك وردي ترابي"],
        ["p16-03", "3 cm · Antique Grey Block", "٣ سم · بلوك رمادي عتيق"],
        ["p16-04", "5 cm · Wood Grain Flat", "٥ سم · خشبي أملس"],
        ["p16-05", "5 cm · Light Grey Block", "٥ سم · بلوك رمادي فاتح"],
        ["p16-06", "5 cm · Ivory Flat", "٥ سم · عاجي أملس"],
        ["p16-07", "5 cm · White Block", "٥ سم · بلوك أبيض"],
        ["p16-08", "5 cm · Beige Stacked Stone", "٥ سم · حجر مرصوص بيج"],
      ] },
  ];

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const html = document.documentElement;
  const isAr = () => html.getAttribute("lang") === "ar";
  const T = (en, ar) => (isAr() ? ar : en);
  const imgSrc = (f) => "assets/img/finishes/" + f + ".jpg";
  const num = (n) => String(n).padStart(2, "0");

  // flat list (used by the viewer for prev / next)
  const ALL = [];
  SERIES.forEach((s) => s.items.forEach((it, i) => ALL.push({ s, file: it[0], en: it[1], ar: it[2], code: s.code + "-" + num(i + 1) })));

  const tabsEl = $("#fin-tabs");
  const listEl = $("#fin-list");
  if (!tabsEl || !listEl) return;
  let active = "all";

  function renderTabs() {
    const tab = (id, label, count) =>
      `<button type="button" class="fin-tab${active === id ? " active" : ""}" data-series="${id}" aria-pressed="${active === id}">${label}<span>${count}</span></button>`;
    tabsEl.innerHTML = tab("all", T("All finishes", "كل الأنواع"), ALL.length) +
      SERIES.map((s) => tab(s.id, T(s.en, s.ar), s.items.length)).join("");
  }

  function renderList() {
    listEl.innerHTML = SERIES.map((s, si) => `
      <section class="fin-series" id="${s.id}" data-series="${s.id}"${active !== "all" && active !== s.id ? " hidden" : ""}>
        <header class="fin-series__head">
          <span class="fin-series__num">${num(si + 1)}</span>
          <div>
            <h2>${T(s.en, s.ar)}</h2>
            <p>${T(s.den, s.dar)}</p>
          </div>
          <span class="fin-series__count">${s.items.length} ${T("finishes", "أنواع")}</span>
        </header>
        <div class="fin-grid${s.product ? " fin-grid--product" : ""}">
          ${s.items.map((it, i) => {
            const idx = ALL.findIndex((a) => a.file === it[0]);
            return `
            <button type="button" class="fin-card" data-idx="${idx}">
              <span class="fin-card__img"><img src="${imgSrc(it[0])}" alt="${T(it[1], it[2])}" loading="lazy" /></span>
              <span class="fin-card__meta">
                <span class="fin-card__code">${s.code}-${num(i + 1)}</span>
                <span class="fin-card__name">${T(it[1], it[2])}</span>
              </span>
              <span class="fin-card__zoom" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4M11 8v6M8 11h6"/></svg></span>
            </button>`;
          }).join("")}
        </div>
      </section>`).join("");
  }

  function render() { renderTabs(); renderList(); }

  function select(id, scroll) {
    active = SERIES.some((s) => s.id === id) ? id : "all";
    render();
    if (scroll) {
      const top = $(".fin-browse").getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  tabsEl.addEventListener("click", (e) => {
    const b = e.target.closest(".fin-tab");
    if (!b) return;
    select(b.dataset.series, true);
    history.replaceState(null, "", active === "all" ? location.pathname : "#" + active);
  });

  /* ---- Viewer (lightbox) ------------------------------------------------- */
  const viewer = $("#fin-viewer");
  let cur = 0;
  function show(i) {
    cur = (i + ALL.length) % ALL.length;
    const f = ALL[cur];
    $(".fin-viewer__img img", viewer).src = imgSrc(f.file);
    $(".fin-viewer__img img", viewer).alt = T(f.en, f.ar);
    $(".fin-viewer__img", viewer).classList.toggle("product", !!f.s.product);
    $(".fin-viewer__series", viewer).textContent = T(f.s.en, f.s.ar);
    $(".fin-viewer__name", viewer).textContent = T(f.en, f.ar);
    $(".fin-viewer__alt", viewer).textContent = isAr() ? f.en : f.ar;
    $(".fin-viewer__code", viewer).textContent = f.code;
    $(".fin-viewer__cta", viewer).href = "index.html?finish=" + encodeURIComponent(f.code + " — " + f.en) + "#contact";
  }
  function open(i) { show(i); viewer.classList.add("open"); document.body.style.overflow = "hidden"; $(".fin-viewer__close", viewer).focus(); }
  function close() { viewer.classList.remove("open"); document.body.style.overflow = ""; }

  listEl.addEventListener("click", (e) => {
    const c = e.target.closest(".fin-card");
    if (c) open(+c.dataset.idx);
  });
  if (viewer) {
    $(".fin-viewer__close", viewer).addEventListener("click", close);
    $(".fin-viewer__backdrop", viewer).addEventListener("click", close);
    $(".fin-viewer__prev", viewer).addEventListener("click", () => show(cur - 1));
    $(".fin-viewer__next", viewer).addEventListener("click", () => show(cur + 1));
    document.addEventListener("keydown", (e) => {
      if (!viewer.classList.contains("open")) return;
      if (e.key === "Escape") close();
      const fwd = isAr() ? "ArrowLeft" : "ArrowRight", back = isAr() ? "ArrowRight" : "ArrowLeft";
      if (e.key === fwd) show(cur + 1);
      if (e.key === back) show(cur - 1);
    });
  }

  // re-render in the new language; keep the open viewer in sync
  window.addEventListener("jama:lang", () => { render(); if (viewer && viewer.classList.contains("open")) show(cur); });

  select((location.hash || "").slice(1), false);
  if (location.hash && active !== "all") setTimeout(() => select(active, true), 300);
})();
