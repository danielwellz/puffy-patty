// Puffy Patty front-end: bilingual menu, filters, media-rich modal with kitchen mode.
(() => {
  const translations = {
    en: {
      meta: { hours: "Menu hours: 12:00PM – 11:30PM", currency: "Toman" },
      nav: { home: "Home", menu: "Menu", story: "About", contact: "Contact" },
      hero: {
        eyebrow: "Burgers with a conscience",
        location: "Isfahan — Iran",
        tagline: "Detroit pizzas, loud burgers, hotdogs with attitude.",
        ctaPrimary: "See Menu",
        ctaSecondary: "Instagram",
        cardLabel: "Hot & fresh",
        cardCopy: "Detroit crusts, juicy patties, signature sauces."
      },
      menu: {
        eyebrow: "Menu first",
        title: "Pick your crave",
        copy: "Detroit pizzas, burgers with fries, hotdogs, sauces, drinks. Swipe, search, tap for recipes.",
        kitchen: "Kitchen mode",
        search: "Search menu…",
        empty: "No items match your search.",
        tariff: "Based on approved tariff",
        details: "Details",
        recipe: "Recipe",
        enableKitchen: "Turn on Kitchen mode to view grams.",
        locked: "Recipe is locked. Enable Kitchen Mode.",
        media: "Media",
        next: "Next",
        prev: "Previous",
        close: "Close"
      },
      categories: {
        all: "All",
        detroit: "Detroit Pizzas",
        burgers: "Burgers + Fries",
        hotdogs: "Hotdogs + Fries",
        sauces: "Sauces",
        drinks: "Drinks"
      },
      tags: { spicy: "Spicy", veggie: "Veggie", signature: "Signature" },
      about: {
        eyebrow: "Our story",
        title: "Born in Isfahan, built on heat",
        copy: "Handmade sauces, charred crusts, big flavors. Every item is tuned for crunch, drip, and loud personality.",
        quality: { title: "Quality ingredients", copy: "Halal meats, daily buns, and produce picked for snap and color." },
        sustain: { title: "Sustainability", copy: "Seasonal specials, less waste, local sourcing. Up to 30% less water per patty.", stat: "30% less water" },
        community: { title: "Community", copy: "Training local teams, collaborating with Isfahan makers, sharing heat." },
        sauces: { title: "Signature sauces", copy: "Rashio, Lemon Butter, Parsley, Mushroom, Spicy, Cream — crafted to lift every bite." }
      },
      sustain: {
        eyebrow: "Less footprint, more flavor",
        title: "Sustainability snapshots",
        copy: "We measure impact, choose local, and stay transparent — just like great brands we admire.",
        cards: {
          carbon: { title: "Carbon footprint", copy: "We check emissions per item to keep CO₂e down.", stat: "-18% vs 2022 recipes" },
          water: { title: "Water smarter", copy: "Partner farms use drip irrigation to save thousands of liters.", stat: "Up to 25L saved per burger" },
          local: { title: "Local first", copy: "Most produce is Iranian-grown to cut transport emissions.", stat: "85% sourced locally" }
        }
      },
      contact: {
        eyebrow: "Visit & connect",
        title: "Find Puffy Patty",
        copy: "In Isfahan with grills on. Call, DM, or drop by.",
        address: "Isfahan, Iran — Chahar Bagh (placeholder)",
        phone: "Call: +98 XX XXX XXXX",
        instagram: "Instagram: @PuffyPatty.ir",
        hours: "Hours: 12:00–23:30 daily",
        map: "Map placeholder",
        mapBtn: "Google Maps",
        form: {
          name: "Name",
          namePlaceholder: "Your name",
          email: "Email",
          emailPlaceholder: "you@example.com",
          message: "Message",
          messagePlaceholder: "Tell us what you crave",
          submit: "Send message",
          success: "Thanks! We got your message."
        }
      },
      footer: {
        privacy: "Privacy",
        terms: "Terms",
        note: "Prices may change. © 2024 Puffy Patty. Crafted in Isfahan."
      }
    },
    fa: {
      meta: { hours: "ساعت سرویس: ۱۲:۰۰ تا ۲۳:۳۰", currency: "تومان" },
      nav: { home: "خانه", menu: "منو", story: "درباره", contact: "تماس" },
      hero: {
        eyebrow: "برگر با وجدان",
        location: "اصفهان — ایران",
        tagline: "پیتزا دیترویتی، برگرهای پر سر و صدا، هات‌داگ با حال و هوا.",
        ctaPrimary: "دیدن منو",
        ctaSecondary: "اینستاگرام",
        cardLabel: "داغ و تازه",
        cardCopy: "کِرست دیترویتی، پتی‌های آبدار، سس‌های اختصاصی."
      },
      menu: {
        eyebrow: "منوی اصلی",
        title: "انتخاب خوشمزه‌ات",
        copy: "پیتزاهای دیترویتی، برگر با سیب‌زمینی، هات‌داگ، سس و نوشیدنی. پیمایش، جستجو و دستور پخت.",
        kitchen: "حالت آشپزخانه",
        search: "جستجوی منو…",
        empty: "آیتمی پیدا نشد.",
        tariff: "طبق نرخ مصوب",
        details: "جزئیات",
        recipe: "دستور پخت",
        enableKitchen: "برای دیدن گرم‌ها حالت آشپزخانه را روشن کنید.",
        locked: "دستور پخت قفل است. حالت آشپزخانه را فعال کن.",
        media: "مدیا",
        next: "بعدی",
        prev: "قبلی",
        close: "بستن"
      },
      categories: {
        all: "همه",
        detroit: "پیتزاهای دیترویتی",
        burgers: "برگر + سیب‌زمینی",
        hotdogs: "هات‌داگ + سیب‌زمینی",
        sauces: "سس‌ها",
        drinks: "نوشیدنی‌ها"
      },
      tags: { spicy: "تند", veggie: "گیاهی", signature: "اختصاصی" },
      about: {
        eyebrow: "داستان ما",
        title: "در اصفهان زاده، با حرارت ساخته",
        copy: "سس‌های دست‌ساز، کِرست‌های برشته، طعم‌های جسور. هر آیتم برای تردی و آبداری تنظیم شده.",
        quality: { title: "مواد اولیه باکیفیت", copy: "گوشت حلال، نان روزانه و محصولات تازه و رنگی." },
        sustain: { title: "پایداری", copy: "منوی فصلی، اتلاف کمتر، مواد اولیه محلی. تا ۳۰٪ آب کمتر برای هر پتی.", stat: "۳۰٪ آب کمتر" },
        community: { title: "جامعه", copy: "آموزش تیم محلی، همکاری با سازندگان اصفهان و اشتراک حرارت." },
        sauces: { title: "سس‌های امضایی", copy: "رشیو، کره لیمو، جعفری، قارچ، تند، کرِم — برای جذاب‌تر شدن هر لقمه." }
      },
      sustain: {
        eyebrow: "ردپای کمتر، طعم بیشتر",
        title: "تصاویر پایداری",
        copy: "اثر را می‌سنجیم، محلی می‌خریم و شفاف می‌مانیم.",
        cards: {
          carbon: { title: "ردپای کربن", copy: "انتشار هر آیتم را چک می‌کنیم تا CO₂e پایین بماند.", stat: "۱۸٪ کمتر از دستورهای ۲۰۲۲" },
          water: { title: "آب هوشمند", copy: "مزارع همکار با آبیاری قطره‌ای هزاران لیتر صرفه‌جویی می‌کنند.", stat: "تا ۲۵ لیتر صرفه‌جویی هر برگر" },
          local: { title: "اول محلی", copy: "بیشتر محصولات ایرانی‌اند تا حمل‌ونقل کم شود.", stat: "۸۵٪ مواد اولیه بومی" }
        }
      },
      contact: {
        eyebrow: "ملاقات و ارتباط",
        title: "پافی پتی را پیدا کن",
        copy: "در اصفهانیم با گریل داغ. تماس بگیر یا سر بزن.",
        address: "اصفهان، چهارباغ (قابل ویرایش)",
        phone: "تماس: ۰۹۸ XX XXX XXXX",
        instagram: "اینستاگرام: @PuffyPatty.ir",
        hours: "ساعت: ۱۲:۰۰ تا ۲۳:۳۰ هر روز",
        map: "جای نقشه",
        mapBtn: "گوگل مپ",
        form: {
          name: "نام",
          namePlaceholder: "نام شما",
          email: "ایمیل",
          emailPlaceholder: "you@example.com",
          message: "پیام",
          messagePlaceholder: "به چه هوس داری؟",
          submit: "ارسال پیام",
          success: "پیام دریافت شد! به زودی پاسخ می‌دهیم."
        }
      },
      footer: {
        privacy: "حریم خصوصی",
        terms: "شرایط",
        note: "ممکن است قیمت‌ها تغییر کنند. © ۲۰۲۴ پافی پتی. ساخته شده در اصفهان."
      }
    }
  };

  const CATEGORIES = [
    { key: "all", icon: "•" },
    { key: "detroit", icon: "🍕" },
    { key: "burgers", icon: "🍔" },
    { key: "hotdogs", icon: "🌭" },
    { key: "sauces", icon: "🥫" },
    { key: "drinks", icon: "🥤" }
  ];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const state = {
    lang: localStorage.getItem("puffy-lang") || "en",
    category: "all",
    search: "",
    tags: new Set(),
    kitchen: localStorage.getItem("puffy-kitchen") === "true",
    debounceTimer: null,
    results: [],
    activeIndex: 0
  };

  const qs = (sel) => document.querySelector(sel);
  const qsa = (sel) => document.querySelectorAll(sel);

  const elements = {
    langButtons: () => qsa(".lang-switch button"),
    searchInput: qs("#menu-search"),
    menuGrid: qs("#menu-grid"),
    modalRoot: qs("#modal-root"),
    pillBar: () => qs(".pill-bar"),
    tagFilter: qs("#tag-filter"),
    kitchenToggle: qs("#kitchenToggle"),
    nav: qs(".nav"),
    navToggle: qs(".nav-toggle"),
    contactForm: qs("#contactForm")
  };

  const toPersianDigits = (value) => String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  const formatNumber = (num, lang) => {
    if (typeof num !== "number") return "";
    const locale = lang === "fa" ? "fa-IR" : "en-US";
    const formatted = num.toLocaleString(locale);
    return lang === "fa" ? toPersianDigits(formatted) : formatted;
  };
  const formatPrice = (item, lang) => {
    if (item.price == null) return translations[lang].menu.tariff;
    const digits = formatNumber(item.price, lang);
    const currency = translations[lang].meta.currency;
    return `${digits} ${currency}`;
  };

  const applyTranslations = (lang) => {
    qsa("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      const value = key.split(".").reduce((acc, k) => acc && acc[k], translations[lang]);
      if (value) el.textContent = value;
    });
    qsa("[data-i18n-placeholder]").forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      const value = key.split(".").reduce((acc, k) => acc && acc[k], translations[lang]);
      if (value) el.setAttribute("placeholder", value);
    });
    qsa("[data-number]").forEach((el) => {
      const num = Number(el.dataset.number);
      if (Number.isNaN(num)) return;
      const currencyEl = el.querySelector(".currency");
      const currencyHTML = currencyEl ? currencyEl.outerHTML : "";
      el.innerHTML = `${formatNumber(num, lang)} ${currencyHTML}`;
    });
  };

  const setLanguage = (lang) => {
    const fallback = translations[lang] ? lang : "en";
    state.lang = fallback;
    localStorage.setItem("puffy-lang", fallback);
    document.documentElement.lang = fallback;
    document.documentElement.dir = fallback === "fa" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", fallback === "fa");
    applyTranslations(fallback);
    elements.langButtons().forEach((btn) => btn.classList.toggle("active", btn.dataset.lang === fallback));
    renderCategories();
    renderMenu();
  };

  const renderCategories = () => {
    const bar = elements.pillBar();
    if (!bar) return;
    bar.innerHTML = CATEGORIES.map(
      (cat) =>
        `<button class="pill-btn ${state.category === cat.key ? "active" : ""}" data-category="${cat.key}" role="tab">${cat.icon} ${translations[state.lang].categories[cat.key]}</button>`
    ).join("");
  };

  const buildCard = (item, index) => {
    const name = item.name[state.lang];
    const desc = item.desc[state.lang];
    const price = formatPrice(item, state.lang);
    const tagLabels = translations[state.lang].tags;
    const badgeHTML = item.tags.map((tag) => `<span class="badge ${tag}">${tagLabels[tag] || tag}</span>`).join("");
    const delay = prefersReducedMotion ? 0 : Math.min(index * 40, 300);
    return `<article class="menu-card" data-id="${item.id}" data-index="${index}" tabindex="0" style="transition-delay:${delay}ms" data-observe>
      <div class="media"><img src="${item.image}" alt="${name} placeholder" loading="lazy"></div>
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class="card-meta">
        <div class="badges">${badgeHTML}</div>
        <span class="price">${price}</span>
      </div>
    </article>`;
  };

  const filterMenu = () => {
    const term = state.search.trim().toLowerCase();
    return MENU_DATA.filter((item) => {
      const matchesCategory = state.category === "all" || item.category === state.category;
      if (!matchesCategory) return false;
      const matchesTag = state.tags.size ? item.tags.some((t) => state.tags.has(t)) : true;
      if (!matchesTag) return false;
      if (!term) return true;
      const name = item.name[state.lang].toLowerCase();
      const desc = item.desc[state.lang].toLowerCase();
      return name.includes(term) || desc.includes(term);
    });
  };

  const renderMenu = () => {
    if (!elements.menuGrid) return;
    elements.menuGrid.classList.add("skeleton");
    const items = filterMenu();
    state.results = items;
    const html = items.length
      ? items.map((item, idx) => buildCard(item, idx)).join("")
      : `<p class="lead">${translations[state.lang].menu.empty}</p>`;
    requestAnimationFrame(() => {
      elements.menuGrid.innerHTML = html;
      elements.menuGrid.classList.remove("skeleton");
      observeElements();
    });
  };

  const buildMediaBlock = (item) => {
    const media = item.media || {};
    const img = media.image || item.image;
    const hasVideo = media.video;
    if (hasVideo && !prefersReducedMotion) {
      const poster = media.poster || img;
      return `<video class="viewer-video" src="${media.video}" poster="${poster}" autoplay muted loop playsinline></video>`;
    }
    if (hasVideo && prefersReducedMotion) {
      return `<div class="video-placeholder reduced"><img src="${media.poster || img}" alt="${item.name[state.lang]}"></div>`;
    }
    return `<div class="video-placeholder">
      <div class="noise"></div>
      <div class="loop-dot" aria-hidden="true"></div>
      <img src="${img}" alt="${item.name[state.lang]}">
    </div>`;
  };

  const buildRecipeTable = (item) => {
    if (!item.recipe?.length) return "<p>—</p>";
    const rows = item.recipe
      .map((r) => {
        const qty = state.lang === "fa" ? toPersianDigits(r.qty) : r.qty;
        return `<tr><td>${r.label[state.lang]}</td><td>${qty} ${r.unit}</td></tr>`;
      })
      .join("");
    return `<table><thead><tr><th>${state.lang === "fa" ? "جزء" : "Component"}</th><th>${state.lang === "fa" ? "مقدار" : "Qty"}</th></tr></thead><tbody>${rows}</tbody></table>`;
  };

  const openViewer = (index) => {
    const item = state.results[index];
    if (!item) return;
    state.activeIndex = index;
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");
    backdrop.dataset.index = index;

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <header>
        <div>
          <p class="eyebrow">${translations[state.lang].menu.media}</p>
          <h3 id="modal-title">${item.name[state.lang]}</h3>
          <div class="price">${formatPrice(item, state.lang)}</div>
        </div>
        <div class="viewer-nav">
          <button class="btn ghost small prev-btn" aria-label="${translations[state.lang].menu.prev}">←</button>
          <button class="btn ghost small next-btn" aria-label="${translations[state.lang].menu.next}">→</button>
          <button class="close-btn" aria-label="${translations[state.lang].menu.close}">✕</button>
        </div>
      </header>
      <div class="viewer-media">${buildMediaBlock(item)}</div>
      <div class="tabs">
        <button class="tab-btn active" data-tab="details">${translations[state.lang].menu.details}</button>
        <button class="tab-btn ${state.kitchen ? "" : "disabled"}" data-tab="recipe">${translations[state.lang].menu.recipe}</button>
      </div>
      <div class="tab-panel" data-tab="details">
        <p>${item.desc[state.lang]}</p>
        <h4>${state.lang === "fa" ? "مواد اولیه" : "Ingredients"}</h4>
        <ul>${(item.ingredients[state.lang] || []).map((line) => `<li>${line}</li>`).join("")}</ul>
      </div>
      <div class="tab-panel ${state.kitchen ? "" : "hidden"}" data-tab="recipe">
        ${state.kitchen ? buildRecipeTable(item) : `<p>${translations[state.lang].menu.locked}</p>`}
      </div>
    `;

    const closeModal = () => {
      backdrop.remove();
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", onKeyDown);
      previousActive?.focus();
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "Tab") trapFocus(e, modal);
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };

    const navigate = (delta) => {
      const nextIndex = (state.activeIndex + delta + state.results.length) % state.results.length;
      closeModal();
      requestAnimationFrame(() => openViewer(nextIndex));
    };

    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });
    modal.querySelector(".close-btn").addEventListener("click", closeModal);
    modal.querySelector(".next-btn").addEventListener("click", () => navigate(1));
    modal.querySelector(".prev-btn").addEventListener("click", () => navigate(-1));
    modal.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;
        if (tab === "recipe" && !state.kitchen) return;
        modal.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("active", b === btn));
        modal.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("hidden", panel.dataset.tab !== tab));
      });
    });
    const recipeBtn = modal.querySelector('[data-tab="recipe"]');
    if (!state.kitchen && recipeBtn) recipeBtn.setAttribute("aria-disabled", "true");

    const previousActive = document.activeElement;
    backdrop.appendChild(modal);
    elements.modalRoot.appendChild(backdrop);
    document.body.classList.add("no-scroll");
    modal.querySelector(".close-btn").focus();
    document.addEventListener("keydown", onKeyDown);
  };

  const trapFocus = (event, container) => {
    const focusable = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const focusArray = Array.from(focusable).filter((el) => !el.disabled);
    if (!focusArray.length) return;
    const first = focusArray[0];
    const last = focusArray[focusArray.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      last.focus();
      event.preventDefault();
    } else if (!event.shiftKey && document.activeElement === last) {
      first.focus();
      event.preventDefault();
    }
  };

  const observeElements = () => {
    if (prefersReducedMotion) {
      qsa("[data-observe]").forEach((el) => el.classList.add("in-view"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    qsa("[data-observe]").forEach((el) => observer.observe(el));
  };

  const setupParallax = () => {
    if (prefersReducedMotion) return;
    const layers = qsa(".layer");
    const onScroll = () => {
      const offset = window.scrollY;
      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth || "0.2");
        layer.style.transform = `translateY(${offset * depth * 0.15}px)`;
      });
      requestAnimationFrame(onScroll);
    };
    requestAnimationFrame(onScroll);
  };

  const bindEvents = () => {
    elements.langButtons().forEach((btn) => btn.addEventListener("click", () => setLanguage(btn.dataset.lang)));

    if (elements.kitchenToggle) {
      elements.kitchenToggle.checked = state.kitchen;
      elements.kitchenToggle.addEventListener("change", () => {
        state.kitchen = elements.kitchenToggle.checked;
        localStorage.setItem("puffy-kitchen", state.kitchen);
        renderMenu();
        const openBackdrop = qs(".modal-backdrop");
        if (openBackdrop) {
          openBackdrop.remove();
          document.body.classList.remove("no-scroll");
        }
      });
    }

    if (elements.pillBar()) {
      elements.pillBar().addEventListener("click", (e) => {
        const btn = e.target.closest(".pill-btn");
        if (!btn) return;
        state.category = btn.dataset.category;
        renderCategories();
        renderMenu();
      });
    }

    if (elements.tagFilter) {
      elements.tagFilter.addEventListener("click", (e) => {
        const btn = e.target.closest(".pill-btn");
        if (!btn) return;
        const tag = btn.dataset.tag;
        if (state.tags.has(tag)) state.tags.delete(tag);
        else state.tags.add(tag);
        btn.classList.toggle("active", state.tags.has(tag));
        renderMenu();
      });
    }

    if (elements.searchInput) {
      const handler = (e) => {
        state.search = e.target.value;
        clearTimeout(state.debounceTimer);
        state.debounceTimer = setTimeout(renderMenu, 200);
      };
      elements.searchInput.addEventListener("input", handler);
    }

    if (elements.menuGrid) {
      elements.menuGrid.addEventListener("click", (e) => {
        const card = e.target.closest(".menu-card");
        if (!card) return;
        openViewer(Number(card.dataset.index));
      });
      elements.menuGrid.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          const card = e.target.closest(".menu-card");
          if (!card) return;
          e.preventDefault();
          openViewer(Number(card.dataset.index));
        }
      });
    }

    if (elements.navToggle && elements.nav) {
      elements.navToggle.addEventListener("click", () => {
        const isOpen = elements.nav.classList.toggle("open");
        elements.navToggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("no-scroll", isOpen);
      });
      elements.nav.querySelectorAll("a").forEach((link) =>
        link.addEventListener("click", () => {
          elements.nav.classList.remove("open");
          elements.navToggle.setAttribute("aria-expanded", "false");
          document.body.classList.remove("no-scroll");
        })
      );
    }

    handleForms();
  };

  const handleForms = () => {
    const form = elements.contactForm;
    if (!form) return;
    const feedback = form.querySelector(".form-feedback");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        feedback.textContent = state.lang === "fa" ? "فرم را کامل کنید." : "Please complete the form.";
        return;
      }
      feedback.textContent = translations[state.lang].contact.form.success;
      form.reset();
    });
  };

  // Init
  setLanguage(state.lang);
  observeElements();
  setupParallax();
  bindEvents();
})();
