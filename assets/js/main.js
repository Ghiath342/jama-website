/* ==========================================================================
   JAMA — Interactions (progressive enhancement, no dependencies)
   ========================================================================== */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const body = document.body;

  /* ---- Sticky header on scroll ------------------------------------------ */
  const header = $(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile fullscreen menu ------------------------------------------- */
  const toggle = $(".nav-toggle");
  const closeMenu = () => { body.classList.remove("menu-open"); toggle.setAttribute("aria-expanded", "false"); };
  toggle.addEventListener("click", () => {
    const open = body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$(".nav a").forEach((a) => a.addEventListener("click", closeMenu));
  const backdrop = $(".nav-backdrop");
  if (backdrop) backdrop.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  /* ---- Reveal on scroll -------------------------------------------------- */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" })
    : null;
  // duplicate each marquee row once so the horizontal auto-scroll loops seamlessly
  $$(".marquee-track").forEach((track) => {
    Array.from(track.children).forEach((tile) => track.appendChild(tile.cloneNode(true)));
  });
  const observeReveals = () => $$(".reveal:not(.in)").forEach((el) => io ? io.observe(el) : el.classList.add("in"));
  observeReveals();

  /* ---- Model filtering --------------------------------------------------- */
  const filterBtns = $$(".filter-btn");
  const cards = $$(".model-card");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.getAttribute("data-filter");
      cards.forEach((card) => {
        const cats = (card.getAttribute("data-cat") || "").split(" ");
        card.classList.toggle("hide", f !== "all" && !cats.includes(f));
      });
    });
  });

  /* ---- FAQ accordion ----------------------------------------------------- */
  $$(".faq-item").forEach((item) => {
    const q = $(".faq-q", item);
    const a = $(".faq-a", item);
    q.addEventListener("click", () => {
      const open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", String(open));
      a.style.maxHeight = open ? a.scrollHeight + "px" : null;
    });
  });
  window.addEventListener("resize", () => {
    $$(".faq-item.open .faq-a").forEach((a) => (a.style.maxHeight = a.scrollHeight + "px"));
  });

  /* ---- Forms: spam guard + success message ------------------------------ */
  $$("form[data-jama-form]").forEach((form) => {
    const success = $(".form-success", form);
    const submitBtn = $('button[type="submit"]', form);
    const showSuccess = () => {
      form.querySelectorAll("input, select, textarea, button").forEach((el) => {
        if (!el.classList.contains("form-keep")) el.setAttribute("disabled", "");
      });
      if (success) {
        success.classList.add("show");
        success.setAttribute("role", "status");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const hp = $(".honeypot input", form);      // bots fill the hidden field
      if (hp && hp.value) return;
      if (!form.checkValidity()) { form.reportValidity(); return; }

      // No email endpoint configured -> just confirm (fallback)
      if (!form.action || !/formsubmit\.co/.test(form.action)) { showSuccess(); return; }

      if (submitBtn) submitBtn.setAttribute("disabled", "");
      try {
        await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        showSuccess();
      } catch (err) {
        if (submitBtn) submitBtn.removeAttribute("disabled");
        alert("Sorry — your message couldn't be sent. Please email contact@jamasyr.info or reach us on WhatsApp.");
      }
    });
  });

  /* ---- Model detail modal ------------------------------------------------ */
  const modal = $("#model-modal");
  const modalContent = $("#modal-content");
  const openModal = (card) => {
    const media = card.querySelector(".model-card__img > img, .model-card__img > svg");
    const mediaHTML = media ? media.outerHTML : "";
    const d = card.dataset;
    const lang = document.documentElement.getAttribute("lang");
    const L = (en, ar) => (lang === "ar" ? ar : en);
    modalContent.innerHTML = `
      <div class="modal__hero">${mediaHTML}
        <button class="modal__close" aria-label="${L("Close", "إغلاق")}" id="modal-close">✕</button>
      </div>
      <div class="modal__body">
        <span class="eyebrow">${d.type}</span>
        <h2>${d.name}</h2>
        <p style="color:var(--muted);margin-top:12px">${d.desc}</p>
        <dl class="spec-table">
          <div><dt>${L("Total area", "المساحة الكلية")}</dt><dd>${d.area}</dd></div>
          <div><dt>${L("Intended use", "الاستخدام")}</dt><dd>${d.use}</dd></div>
          <div><dt>${L("Bedrooms", "غرف النوم")}</dt><dd>${d.bed}</dd></div>
          <div><dt>${L("Bathrooms", "الحمّامات")}</dt><dd>${d.bath}</dd></div>
        </dl>
        <h4>${L("Includes & options", "يشمل وخيارات")}</h4>
        <div class="pill-row">
          <span class="pill">${L("Living area", "منطقة معيشة")}</span>
          <span class="pill">${L("Kitchen configuration", "تجهيز مطبخ")}</span>
          <span class="pill">${L("Optional terrace", "تراس اختياري")}</span>
          <span class="pill">${L("Exterior finishes", "تشطيبات خارجية")}</span>
          <span class="pill">${L("Interior packages", "حزم داخلية")}</span>
          <span class="pill">${L("Insulation package", "حزمة عزل")}</span>
        </div>
        <h4>${L("Possible applications", "استخدامات ممكنة")}</h4>
        <p style="color:var(--muted)">${d.use} — ${L("residential, hospitality, workspace and more, depending on configuration.", "سكني، ضيافة، مساحة عمل والمزيد، بحسب التجهيز.")}</p>
        <h4>${L("Delivery & installation", "التوصيل والتركيب")}</h4>
        <p style="color:var(--muted)">${L("Prepared in a controlled environment, transported to your approved site, and professionally assembled. Requirements vary by location and specifications.", "تُجهَّز في بيئة مضبوطة، وتُنقَل إلى موقعك المعتمد، وتُجمَّع باحتراف. تختلف المتطلبات حسب الموقع والمواصفات.")}</p>
        <p class="model-card__price" style="margin-top:18px">${L("Price available upon request", "السعر عند الطلب")}</p>
      </div>
      <div class="modal__cta">
        <a href="#contact" class="btn btn--primary" id="modal-request">${L("Request This Model", "اطلب هذا النموذج")}</a>
        <a href="https://wa.me/000000000000" target="_blank" rel="noopener" class="btn btn--ghost">WhatsApp</a>
      </div>`;
    modal.classList.add("open");
    body.style.overflow = "hidden";
    $("#modal-close").addEventListener("click", closeModal);
    $("#modal-request").addEventListener("click", closeModal);
  };
  const closeModal = () => { modal.classList.remove("open"); body.style.overflow = ""; };
  $$(".js-view-model").forEach((btn) =>
    btn.addEventListener("click", (e) => { e.preventDefault(); openModal(btn.closest(".model-card")); })
  );
  if (modal) {
    $(".modal__backdrop", modal).addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
  }

  /* ---- Pre-fill contact "preferred model" when Request Price clicked ----- */
  $$(".js-request-price").forEach((btn) =>
    btn.addEventListener("click", () => {
      const card = btn.closest(".model-card");
      const sel = $("#contact-model");
      if (sel && card) {
        const name = card.dataset.name;
        Array.from(sel.options).forEach((o) => { if (o.textContent.trim() === name) sel.value = o.value; });
      }
    })
  );

  /* ---- Cookie banner ----------------------------------------------------- */
  const cookie = $("#cookie");
  try {
    if (cookie && !localStorage.getItem("jama-cookie")) setTimeout(() => cookie.classList.add("show"), 1200);
  } catch (e) {}
  const dismissCookie = (v) => { try { localStorage.setItem("jama-cookie", v); } catch (e) {} cookie && cookie.classList.remove("show"); };
  $("#cookie-accept") && $("#cookie-accept").addEventListener("click", () => dismissCookie("all"));
  $("#cookie-essential") && $("#cookie-essential").addEventListener("click", () => dismissCookie("essential"));

  /* ---- Re-observe reveals after language switch (layout may shift) ------- */
  window.addEventListener("jama:lang", () => {
    $$(".faq-item.open .faq-a").forEach((a) => (a.style.maxHeight = a.scrollHeight + "px"));
  });

  /* ---- Process timeline: hover fills the rail + circles up to the step --- */
  (function () {
    const track = $(".timeline-track");
    if (!track) return;
    const steps = $$(".tl-step", track);
    const fill = $(".tl-rail__fill", track);
    const n = steps.length;
    const setTo = (idx) => {
      steps.forEach((s, j) => {
        s.classList.toggle("active", j <= idx);
        s.classList.toggle("current", j === idx);
      });
      if (fill) fill.style.width = (n > 1 ? (idx / (n - 1)) * 100 : 0) + "%";
    };
    const clear = () => {
      steps.forEach((s) => s.classList.remove("active", "current"));
      if (fill) fill.style.width = "0%";
    };
    steps.forEach((step, i) => {
      step.addEventListener("mouseenter", () => setTo(i));
      step.addEventListener("touchstart", () => setTo(i), { passive: true });
    });
    track.addEventListener("mouseleave", clear);
  })();

  /* ---- "Inside a JAMA Home" tabs ----------------------------------------- */
  $$(".in-tabs").forEach((bar) => {
    const section = bar.closest("section");
    const tabs = $$(".in-tab", bar);
    tabs.forEach((tab) => tab.addEventListener("click", () => {
      tabs.forEach((t) => { const on = t === tab; t.classList.toggle("active", on); t.setAttribute("aria-selected", String(on)); });
      $$(".in-panel", section).forEach((p) => {
        const on = p.dataset.panel === tab.dataset.tab;
        p.classList.toggle("active", on);
        p.hidden = !on;
      });
      const r = tab.getBoundingClientRect(), br = bar.getBoundingClientRect();
      bar.scrollBy({ left: r.left + r.width / 2 - (br.left + br.width / 2), behavior: "smooth" });
    }));
  });

  /* ---- Lightbox for [data-zoom] images ----------------------------------- */
  (function () {
    const links = $$("a[data-zoom]");
    if (!links.length) return;
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.innerHTML = '<button type="button" class="lightbox__close" aria-label="Close">✕</button><img alt="" />';
    body.appendChild(lb);
    const img = $("img", lb);
    const close = () => { lb.classList.remove("open"); body.style.overflow = ""; };
    links.forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault();
      img.src = a.getAttribute("href");
      img.alt = ($("img", a) || {}).alt || "";
      lb.classList.add("open");
      body.style.overflow = "hidden";
    }));
    lb.addEventListener("click", close);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && lb.classList.contains("open")) close(); });
  })();

  /* ---- Contact: pre-fill the message when coming from a chosen finish ---- */
  /* (models fill the whole form themselves — see models.js) */
  (function () {
    let finish = null;
    try { finish = new URLSearchParams(location.search).get("finish"); } catch (e) {}
    const msg = $('#contact textarea[name="Message"]');
    if (!finish || !msg) return;
    // runs after the language engine has applied the saved language
    document.addEventListener("DOMContentLoaded", () => {
      const ar = document.documentElement.getAttribute("lang") === "ar";
      msg.value = (ar ? "أنا مهتم بلوح الكسوة: " : "I'm interested in the façade finish: ") + finish;
    });
  })();

  /* ---- Footer year ------------------------------------------------------- */
  const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();
})();
