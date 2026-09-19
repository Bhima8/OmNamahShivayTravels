/**
 * ============================================================
 *  main.js — Om Namah Shivay Travels
 * ============================================================
 *  Boots every page: injects header/footer/floating buttons,
 *  sets SEO tags, and wires up shared UI behavior (mobile menu,
 *  sticky header shadow, scroll-reveal, back-to-top button).
 *
 *  Each page calls `initPage({ activePageId, seo })` once, then
 *  runs its own page-specific rendering from pages.js.
 * ============================================================
 */

function initPage({ activePageId, seo } = {}) {
  renderHeader(activePageId);
  renderFooter();
  renderFloatingActions();
  setSEO(seo || {});

  initMobileMenu();
  initNavDropdowns();
  initStickyHeaderShadow();
  initScrollReveal();
  initBackToTop();
  wireImageFallbacks(document);
}

/* ------------------------------------------------------------------
 *  MOBILE MENU
 * ---------------------------------------------------------------- */
function initMobileMenu() {
  const btn = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("mainNav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    btn.classList.toggle("is-active", isOpen);
    btn.setAttribute("aria-expanded", String(isOpen));
    btn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-open", isOpen);
  });

  nav.addEventListener("click", (e) => {
    if (e.target.matches(".nav-link")) {
      nav.classList.remove("is-open");
      btn.classList.remove("is-active");
      btn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      btn.classList.remove("is-active");
      btn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
      btn.focus();
    }
  });
}

/* ------------------------------------------------------------------
 *  NAV DROPDOWNS ("Travel Stories" grouping Photos / Videos / Blogs)
 * ---------------------------------------------------------------- */
function initNavDropdowns() {
  const dropdowns = document.querySelectorAll(".has-dropdown");
  if (!dropdowns.length) return;

  function closeAll(except) {
    dropdowns.forEach((d) => {
      if (d === except) return;
      d.classList.remove("is-open");
      const toggle = d.querySelector(".dropdown-toggle");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  }

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      closeAll(dropdown);
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".has-dropdown")) closeAll();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
}

/* ------------------------------------------------------------------
 *  STICKY HEADER SHADOW
 * ---------------------------------------------------------------- */
function initStickyHeaderShadow() {
  const header = document.getElementById("siteHeaderEl");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ------------------------------------------------------------------
 *  SCROLL REVEAL (lightweight, respects reduced motion)
 *  Watches for [data-reveal] elements even when they're added to the
 *  page LATER (e.g. tour/blog detail content rendered by pages.js
 *  after this runs) so nothing gets stuck permanently invisible.
 * ---------------------------------------------------------------- */
function initScrollReveal() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const supportsObserver = "IntersectionObserver" in window;

  let observer = null;
  if (!prefersReduced && supportsObserver) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
  }

  function observeNewItems(scope = document) {
    scope.querySelectorAll("[data-reveal]:not(.is-revealed)").forEach((el) => {
      if (prefersReduced || !supportsObserver) {
        el.classList.add("is-revealed");
      } else {
        observer.observe(el);
      }
    });
  }

  observeNewItems();

  // Pick up [data-reveal] elements injected later (tour details, blog
  // details, filtered grids, etc.) without every page having to call
  // this again manually.
  if ("MutationObserver" in window) {
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.matches && node.matches("[data-reveal]")) observeNewItems(node.parentNode || document);
          if (node.querySelectorAll) observeNewItems(node);
        });
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }
}

/* ------------------------------------------------------------------
 *  BACK TO TOP
 * ---------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = "backToTop";
  btn.className = "back-to-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.innerHTML = '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';
  document.body.appendChild(btn);

  const toggle = () => btn.classList.toggle("is-visible", window.scrollY > 500);
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ------------------------------------------------------------------
 *  ANIMATED STAT COUNTERS (used on the home page)
 * ---------------------------------------------------------------- */
function animateStatCounters(container) {
  const nodes = container.querySelectorAll("[data-count-to]");
  if (!nodes.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  nodes.forEach((node) => {
    const target = Number(node.dataset.countTo);
    const suffix = node.dataset.suffix || "";

    if (prefersReduced) {
      node.textContent = target + suffix;
      return;
    }

    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}
