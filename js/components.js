/**
 * ============================================================
 *  components.js — Om Namah Shivay Travels
 * ============================================================
 *  Reusable functions that build pieces of the UI: header,
 *  footer, cards, floating buttons, SEO tags, notifications.
 *
 *  Every page defines `const BASE_PATH = "";` (root) or
 *  `const BASE_PATH = "../";` (inside /pages/) BEFORE loading
 *  this file, so links and images resolve correctly no matter
 *  which folder the page lives in.
 * ============================================================
 */

/** Prefix any root-relative path with the page's BASE_PATH. */
function withBase(path) {
  if (!path) return path;
  return `${BASE_PATH}${path}`;
}

/** Build a wa.me URL from a message, using SITE_CONFIG.whatsapp.number. */
function buildWhatsAppUrl(message) {
  const text = message || SITE_CONFIG.whatsapp.defaultMessage;
  return `https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${encodeURIComponent(text)}`;
}

/** Build a tel: URL from a raw phone number string. */
function buildTelUrl(number) {
  return `tel:+${number}`;
}

/** Escape any text before inserting into HTML strings we build. */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

/** Replace a broken image with a graceful on-brand placeholder. */
function handleImgError(imgEl, label) {
  imgEl.onerror = null;
  imgEl.classList.add("img-placeholder");
  const text = String(label || imgEl.alt || "Image coming soon").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  })[char]);
  imgEl.loading = "eager";
  imgEl.src =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
        <rect width="100%" height="100%" fill="#0B1F3A"/>
        <text x="50%" y="50%" fill="#D4AF37" font-family="sans-serif"
          font-size="22" text-anchor="middle" dominant-baseline="middle">${text}</text>
      </svg>
    `);
}

/** Attach the standard onerror fallback to every <img data-fallback> on the page. */
function wireImageFallbacks(scope = document) {
  scope.querySelectorAll("img[data-fallback]").forEach((img) => {
    const applyFallback = () => handleImgError(img, img.dataset.fallback);
    img.addEventListener("error", applyFallback, { once: true });

    // Browsers can leave missing file:// images pending instead of firing error.
    // Resolve those local previews without affecting normal hosted requests.
    if (window.location.protocol === "file:") {
      window.setTimeout(() => {
        if (!img.complete || img.naturalWidth === 0) applyFallback();
      }, 2000);
    }
  });
}

/* ------------------------------------------------------------------
 *  HEADER
 * ---------------------------------------------------------------- */
/** Flatten the navigation config, expanding any dropdown's children into the list (used by the footer). */
function flattenNavigation(items) {
  return items.flatMap((item) => (item.children && item.children.length ? item.children : [item]));
}

/** Build a single <li> for the header nav — a plain link, or a dropdown trigger + submenu. */
function buildNavItemHtml(item, activePageId) {
  if (item.children && item.children.length) {
    const isChildActive = item.children.some((child) => child.pageId === activePageId);
    const submenu = item.children
      .map((child) => {
        const isActive = child.pageId === activePageId;
        return `<li>
          <a href="${withBase(child.href)}" class="dropdown-link${isActive ? " is-active" : ""}"
             ${isActive ? 'aria-current="page"' : ""}>${escapeHtml(child.label)}</a>
        </li>`;
      })
      .join("");

    return `<li class="nav-item has-dropdown${isChildActive ? " is-active" : ""}">
      <span class="nav-link-group">
        <a href="${withBase(item.href)}" class="nav-link${isChildActive ? " is-active" : ""}"
           ${isChildActive ? 'aria-current="page"' : ""}>${escapeHtml(item.label)}</a>
        <button type="button" class="dropdown-toggle" aria-expanded="false" aria-label="Toggle ${escapeHtml(item.label)} submenu">
          <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>
      </span>
      <ul class="dropdown-menu">${submenu}</ul>
    </li>`;
  }

  const isActive = item.pageId === activePageId;
  return `<li class="nav-item">
    <a href="${withBase(item.href)}" class="nav-link${isActive ? " is-active" : ""}"
       ${isActive ? 'aria-current="page"' : ""}>${escapeHtml(item.label)}</a>
  </li>`;
}

function renderHeader(activePageId) {
  const el = document.getElementById("site-header");
  if (!el) return;

  const nav = SITE_CONFIG.navigation.map((item) => buildNavItemHtml(item, activePageId)).join("");

  const announcement = SITE_CONFIG.announcement.enabled
    ? `<div class="announcement-bar" role="note">
        <p>${escapeHtml(SITE_CONFIG.announcement.text)}</p>
      </div>`
    : "";

  el.innerHTML = `
    ${announcement}
    <header class="site-header" id="siteHeaderEl">
      <div class="container header-inner">
        <a href="${withBase("index.html")}" class="brand" aria-label="${escapeHtml(SITE_CONFIG.business.name)} — Home">
          <img src="${withBase(SITE_CONFIG.business.logo)}" alt="${escapeHtml(SITE_CONFIG.business.logoAlt)}" class="brand-logo" width="48" height="48">
          <span class="brand-name">${escapeHtml(SITE_CONFIG.business.name)}</span>
        </a>

        <nav class="main-nav" id="mainNav" aria-label="Primary">
          <ul class="nav-list">${nav}</ul>
        </nav>

        <div class="header-actions">
          <a class="btn btn-whatsapp btn-sm btn-spiritual" id="headerWhatsApp" href="#" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
            <span>Chat on WhatsApp</span>
          </a>
          <button type="button" class="hamburger" id="hamburgerBtn" aria-label="Open menu" aria-expanded="false" aria-controls="mainNav">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  `;

  const waLink = document.getElementById("headerWhatsApp");
  if (waLink) waLink.href = buildWhatsAppUrl();
}

/* ------------------------------------------------------------------
 *  FOOTER
 * ---------------------------------------------------------------- */
function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;

  const quickLinks = flattenNavigation(SITE_CONFIG.navigation)
    .map((item) => `<li><a href="${withBase(item.href)}">${escapeHtml(item.label)}</a></li>`)
    .join("");

  const categories = [...new Set(TOURS.map((t) => t.category))]
    .map((cat) => `<li><a href="${withBase("pages/tours.html")}?category=${encodeURIComponent(cat)}">${escapeHtml(cat)} Tours</a></li>`)
    .join("");

  const phoneRow = SITE_CONFIG.contact.phoneDisplay
    ? `<li><a href="${buildTelUrl(SITE_CONFIG.contact.phoneNumber)}"><i class="fa-solid fa-phone icon-spiritual" aria-hidden="true"></i><span>${escapeHtml(SITE_CONFIG.contact.phoneDisplay)}</span></a></li>`
    : "";

  const emailRow = SITE_CONFIG.contact.email
    ? `<li><a href="mailto:${escapeHtml(SITE_CONFIG.contact.email)}"><i class="fa-solid fa-envelope icon-spiritual" aria-hidden="true"></i><span>${escapeHtml(SITE_CONFIG.contact.email)}</span></a></li>`
    : "";

  const addressRow = SITE_CONFIG.contact.address
    ? `<li><i class="fa-solid fa-location-dot" aria-hidden="true"></i><span>${escapeHtml(SITE_CONFIG.contact.address)}</span></li>`
    : "";

  const hoursRow = SITE_CONFIG.contact.workingHours
    ? `<li><i class="fa-solid fa-clock" aria-hidden="true"></i><span>${escapeHtml(SITE_CONFIG.contact.workingHours)}</span></li>`
    : "";

  el.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-col footer-about">
          <a href="${withBase("index.html")}" class="brand brand-footer">
            <img src="${withBase(SITE_CONFIG.business.logo)}" alt="${escapeHtml(SITE_CONFIG.business.logoAlt)}" width="40" height="40">
            <span class="brand-name">${escapeHtml(SITE_CONFIG.business.name)}</span>
          </a>
          <p>${escapeHtml(SITE_CONFIG.business.tagline)} We plan pilgrimage and holiday tours with honest pricing and careful attention to every traveler.</p>
          <div class="social-links" id="footerSocial"></div>
        </div>

        <div class="footer-col">
          <h3>Quick Links</h3>
          <ul class="footer-list">${quickLinks}</ul>
        </div>

        <div class="footer-col">
          <h3>Tour Categories</h3>
          <ul class="footer-list">${categories}</ul>
        </div>

        <div class="footer-col">
          <h3>Contact Us</h3>
          <ul class="footer-list footer-contact">
            ${phoneRow}${emailRow}${addressRow}${hoursRow}
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container footer-bottom-inner">
          <p>&copy; <span id="currentYear"></span> ${escapeHtml(SITE_CONFIG.business.name)}. All rights reserved.</p>
          <a href="${withBase("pages/privacy-policy.html")}">Privacy Policy</a>
        </div>
      </div>
    </footer>
  `;

  renderSocialLinks(document.getElementById("footerSocial"));
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ------------------------------------------------------------------
 *  SOCIAL LINKS
 * ---------------------------------------------------------------- */
function renderSocialLinks(container) {
  if (!container) return;
  const icons = {
    instagram: "fa-brands fa-instagram",
    facebook: "fa-brands fa-facebook",
    youtube: "fa-brands fa-youtube",
    twitter: "fa-brands fa-x-twitter",
    pinterest: "fa-brands fa-pinterest"
  };

  const links = Object.entries(SITE_CONFIG.socialLinks)
    .filter(([, url]) => Boolean(url))
    .map(([key, url]) => `
      <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" aria-label="${key}">
        <i class="${icons[key] || "fa-solid fa-link"}" aria-hidden="true"></i>
      </a>
    `)
    .join("");

  container.innerHTML = links;
  container.style.display = links ? "" : "none";
}

/* ------------------------------------------------------------------
 *  FLOATING ACTION BUTTONS
 * ---------------------------------------------------------------- */
function renderFloatingActions() {
  const el = document.getElementById("floating-actions");
  if (!el) return;

  el.innerHTML = `
    <div class="floating-actions">
      <svg class="fab-trishul" viewBox="0 0 40 64" aria-hidden="true" focusable="false">
        <path d="M20 6 C20 6 12 12 12 20 C12 25 16 28 20 28 C24 28 28 25 28 20 C28 12 20 6 20 6 Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="20" y1="6" x2="20" y2="60" stroke="currentColor" stroke-width="2.4"/>
        <line x1="8" y1="16" x2="20" y2="6" stroke="currentColor" stroke-width="2"/>
        <line x1="32" y1="16" x2="20" y2="6" stroke="currentColor" stroke-width="2"/>
      </svg>
      <a href="${buildWhatsAppUrl()}" target="_blank" rel="noopener noreferrer"
         class="fab fab-whatsapp" aria-label="Chat with us on WhatsApp" data-tooltip="Chat on WhatsApp">
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
      </a>
      <a href="${buildTelUrl(SITE_CONFIG.contact.phoneNumber)}"
         class="fab fab-call" aria-label="Call ${escapeHtml(SITE_CONFIG.business.name)}" data-tooltip="Call Us">
        <i class="fa-solid fa-phone" aria-hidden="true"></i>
      </a>
    </div>
  `;
}

/* ------------------------------------------------------------------
 *  CARDS
 * ---------------------------------------------------------------- */
function renderTourCard(tour) {
  const waMsg = `Hello, I would like to enquire about the "${tour.title}" (${tour.duration}).`;
  return `
    <article class="card tour-card">
      <a href="${withBase("pages/tour-details.html")}?id=${encodeURIComponent(tour.id)}" class="card-media">
        <img src="${withBase(tour.image)}" alt="${escapeHtml(tour.title)}" loading="lazy" data-fallback="${escapeHtml(tour.title)}">
        <span class="badge">${escapeHtml(tour.category)}</span>
      </a>
      <div class="card-body">
        <h3><a href="${withBase("pages/tour-details.html")}?id=${encodeURIComponent(tour.id)}">${escapeHtml(tour.title)}</a></h3>
        <p class="card-meta">
          <span><i class="fa-regular fa-clock" aria-hidden="true"></i> ${escapeHtml(tour.duration)}</span>
          <span><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${escapeHtml(tour.location)}</span>
        </p>
        <p class="card-text">${escapeHtml(tour.shortDescription)}</p>
        <div class="card-actions">
          <a href="${withBase("pages/tour-details.html")}?id=${encodeURIComponent(tour.id)}" class="btn btn-outline btn-sm">View Details</a>
          <a href="${buildWhatsAppUrl(waMsg)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i><span>Enquire</span>
          </a>
        </div>
      </div>
    </article>
  `;
}

function renderBlogCard(blog) {
  return `
    <article class="card blog-card">
      <a href="${withBase("pages/blog-details.html")}?slug=${encodeURIComponent(blog.slug)}" class="card-media">
        <img src="${withBase(blog.image)}" alt="${escapeHtml(blog.title)}" loading="lazy" data-fallback="${escapeHtml(blog.title)}">
        <span class="badge">${escapeHtml(blog.category)}</span>
      </a>
      <div class="card-body">
        <p class="card-date">${formatDate(blog.date)}</p>
        <h3><a href="${withBase("pages/blog-details.html")}?slug=${encodeURIComponent(blog.slug)}">${escapeHtml(blog.title)}</a></h3>
        <p class="card-text">${escapeHtml(blog.excerpt)}</p>
        <a href="${withBase("pages/blog-details.html")}?slug=${encodeURIComponent(blog.slug)}" class="link-arrow">Read More</a>
      </div>
    </article>
  `;
}

function renderReviewCard(review) {
  const stars = Array.from({ length: 5 }, (_, i) =>
    `<i class="fa-solid fa-star" aria-hidden="true" style="opacity:${i < review.rating ? 1 : 0.25}"></i>`
  ).join("");

  return `
    <article class="card review-card">
      <div class="review-stars" aria-label="${review.rating} out of 5 stars">${stars}</div>
      <p class="review-text">&ldquo;${escapeHtml(review.text)}&rdquo;</p>
      <div class="review-person">
        <img src="${withBase(review.photo)}" alt="${escapeHtml(review.name)}" loading="lazy" data-fallback="${escapeHtml(review.name)}">
        <div>
          <p class="review-name">${escapeHtml(review.name)}</p>
          <p class="review-location">${escapeHtml(review.location)}</p>
        </div>
      </div>
    </article>
  `;
}

function renderGalleryCard(photo, index) {
  return `
    <button type="button" class="gallery-item" data-index="${index}" aria-label="Open photo: ${escapeHtml(photo.title)}">
      <img src="${withBase(photo.image)}" alt="${escapeHtml(photo.alt)}" loading="lazy" data-fallback="${escapeHtml(photo.title)}">
      <span class="gallery-caption">${escapeHtml(photo.title)}</span>
    </button>
  `;
}

function renderVideoCard(video) {
  return `
    <article class="card video-card">
      <div class="card-media">
        <img src="${withBase(video.thumbnail)}" alt="${escapeHtml(video.title)}" loading="lazy" data-fallback="${escapeHtml(video.title)}">
        <span class="badge">${escapeHtml(video.category)}</span>
      </div>
      <div class="card-body">
        <h3>${escapeHtml(video.title)}</h3>
        <p class="card-text">${escapeHtml(video.description)}</p>
        <a href="${escapeHtml(video.url)}" target="_blank" rel="noopener noreferrer" class="link-arrow">
          <i class="fa-solid fa-play" aria-hidden="true"></i> Watch Video
        </a>
      </div>
    </article>
  `;
}

/* ------------------------------------------------------------------
 *  SEO
 * ---------------------------------------------------------------- */
function setSEO({ title, description, image } = {}) {
  const finalTitle = title ? `${title} | ${SITE_CONFIG.business.name}` : SITE_CONFIG.seo.defaultTitle;
  const finalDesc = description || SITE_CONFIG.seo.defaultDescription;
  const finalImage = withBase(image || SITE_CONFIG.seo.ogImage);

  document.title = finalTitle;
  setMeta("description", finalDesc);
  setMeta("keywords", SITE_CONFIG.seo.keywords);
  setMetaProp("og:title", finalTitle);
  setMetaProp("og:description", finalDesc);
  setMetaProp("og:image", finalImage);
  setMetaProp("og:site_name", SITE_CONFIG.business.name);
}

function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setMetaProp(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/* ------------------------------------------------------------------
 *  NOTIFICATIONS
 * ---------------------------------------------------------------- */
function showNotification(message, type = "success") {
  let container = document.getElementById("notificationContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "notificationContainer";
    container.className = "notification-container";
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }

  const note = document.createElement("div");
  note.className = `notification notification-${type}`;
  note.setAttribute("role", "status");
  note.textContent = message;
  container.appendChild(note);

  requestAnimationFrame(() => note.classList.add("is-visible"));

  setTimeout(() => {
    note.classList.remove("is-visible");
    setTimeout(() => note.remove(), 300);
  }, 4000);
}

/* ------------------------------------------------------------------
 *  SMALL UTILITIES
 * ---------------------------------------------------------------- */
function formatDate(isoDate) {
  try {
    return new Date(isoDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return isoDate;
  }
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function emptyState(message, icon = "fa-map-location-dot") {
  return `
    <div class="empty-state">
      <i class="fa-solid ${icon}" aria-hidden="true"></i>
      <p>${escapeHtml(message)}</p>
    </div>
  `;
}
