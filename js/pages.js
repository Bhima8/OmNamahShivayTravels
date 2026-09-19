/**
 * ============================================================
 *  pages.js — Om Namah Shivay Travels
 * ============================================================
 *  Page-specific logic. Each function below is called from the
 *  matching HTML page's small bootstrap script, after initPage()
 *  has injected the shared header/footer.
 * ============================================================
 */

/* ==================================================================
 *  HOME PAGE
 * ================================================================== */
function initHomePage() {
  // Featured tours
  const featuredEl = document.getElementById("featuredTours");
  if (featuredEl) {
    const featured = TOURS.filter((t) => t.featured);
    featuredEl.innerHTML = featured.length
      ? featured.map(renderTourCard).join("")
      : emptyState("New featured tours are coming soon. Please check back shortly.");
    wireImageFallbacks(featuredEl);
  }

  // Trust stats
  const statsEl = document.getElementById("trustStats");
  if (statsEl) {
    statsEl.innerHTML = SITE_CONFIG.stats
      .map(
        (s) => `
        <div class="stat-item" data-reveal>
          <p class="stat-value"><span data-count-to="${s.value}" data-suffix="${s.suffix}">0</span></p>
          <p class="stat-label">${escapeHtml(s.label)}</p>
        </div>`
      )
      .join("");
    animateStatCounters(statsEl);
  }

  // Reviews
  const reviewsEl = document.getElementById("homeReviews");
  if (reviewsEl) {
    reviewsEl.innerHTML = REVIEWS.length
      ? REVIEWS.map(renderReviewCard).join("")
      : emptyState("Traveler reviews will appear here soon.");
    wireImageFallbacks(reviewsEl);
  }

  // Gallery preview (first 6 photos)
  const galleryPreviewEl = document.getElementById("galleryPreview");
  if (galleryPreviewEl) {
    const preview = GALLERY.slice(0, 6);
    galleryPreviewEl.innerHTML = preview.length
      ? preview.map((p, i) => renderGalleryCard(p, i)).join("")
      : emptyState("Gallery photos are coming soon.");
    wireImageFallbacks(galleryPreviewEl);
    initLightbox(galleryPreviewEl, GALLERY.slice(0, 6));
  }

  // WhatsApp CTA buttons on this page
  document.querySelectorAll("[data-whatsapp-cta]").forEach((btn) => {
    btn.href = buildWhatsAppUrl();
  });
}

/* ==================================================================
 *  TOURS LISTING PAGE
 * ================================================================== */
function initToursPage() {
  const grid = document.getElementById("toursGrid");
  const searchInput = document.getElementById("tourSearch");
  const categorySelect = document.getElementById("tourCategoryFilter");
  const durationSelect = document.getElementById("tourDurationFilter");
  if (!grid) return;

  // Populate category filter
  const categories = [...new Set(TOURS.map((t) => t.category))];
  categorySelect.innerHTML =
    `<option value="">All Categories</option>` +
    categories.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("");

  // Populate duration filter (bucket by number of days)
  const durationBuckets = ["1-2 Days", "3-5 Days", "6+ Days"];
  durationSelect.innerHTML =
    `<option value="">Any Duration</option>` +
    durationBuckets.map((d) => `<option value="${d}">${d}</option>`).join("");

  const initialCategory = getQueryParam("category") || "";
  if (initialCategory) categorySelect.value = initialCategory;

  function matchesDurationBucket(tour, bucket) {
    if (!bucket) return true;
    const days = parseInt(tour.duration, 10) || 0;
    if (bucket === "1-2 Days") return days >= 1 && days <= 2;
    if (bucket === "3-5 Days") return days >= 3 && days <= 5;
    if (bucket === "6+ Days") return days >= 6;
    return true;
  }

  function render() {
    const query = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;
    const duration = durationSelect.value;

    const filtered = TOURS.filter((t) => {
      const matchesQuery =
        !query ||
        t.title.toLowerCase().includes(query) ||
        t.location.toLowerCase().includes(query);
      const matchesCategory = !category || t.category === category;
      return matchesQuery && matchesCategory && matchesDurationBucket(t, duration);
    });

    grid.innerHTML = filtered.length
      ? filtered.map(renderTourCard).join("")
      : emptyState("No tours match your search. Try a different keyword or filter.");
    wireImageFallbacks(grid);

    const resultsCount = document.getElementById("toursResultsCount");
    if (resultsCount) {
      resultsCount.textContent = `${filtered.length} tour${filtered.length === 1 ? "" : "s"} found`;
    }
  }

  [searchInput, categorySelect, durationSelect].forEach((input) =>
    input.addEventListener("input", render)
  );

  render();
}

/* ==================================================================
 *  TOUR DETAILS PAGE
 * ================================================================== */
function initTourDetailsPage() {
  const container = document.getElementById("tourDetailsContent");
  if (!container) return;

  const id = getQueryParam("id");
  const tour = TOURS.find((t) => t.id === id);

  if (!tour) {
    container.innerHTML = `
      <div class="empty-state not-found">
        <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
        <h1>Tour Not Found</h1>
        <p>The tour you're looking for may have been renamed or removed.</p>
        <a href="${withBase("pages/tours.html")}" class="btn btn-primary">Browse All Tours</a>
      </div>
    `;
    setSEO({ title: "Tour Not Found" });
    return;
  }

  const waMsg = `Hello, I would like to enquire about the "${tour.title}" (${tour.duration}).`;

  container.innerHTML = `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="${withBase("index.html")}">Home</a> <span>/</span>
      <a href="${withBase("pages/tours.html")}">Tours</a> <span>/</span>
      <span aria-current="page">${escapeHtml(tour.title)}</span>
    </nav>

    <div class="tour-details-grid">
      <div class="tour-details-media">
        <img src="${withBase(tour.image)}" alt="${escapeHtml(tour.title)}" data-fallback="${escapeHtml(tour.title)}">
      </div>
      <div class="tour-details-info">
        <span class="badge">${escapeHtml(tour.category)}</span>
        <h1>${escapeHtml(tour.title)}</h1>
        <p class="card-meta">
          <span><i class="fa-regular fa-clock" aria-hidden="true"></i> ${escapeHtml(tour.duration)}</span>
          <span><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${escapeHtml(tour.location)}</span>
        </p>
        <p class="tour-price">${escapeHtml(tour.price)}</p>
        <p class="tour-description">${escapeHtml(tour.description)}</p>
        <div class="card-actions">
          <a href="${buildWhatsAppUrl(waMsg)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i><span>Enquire on WhatsApp</span>
          </a>
          <a href="${withBase("pages/contact.html")}?tour=${encodeURIComponent(tour.title)}" class="btn btn-outline">Contact Us</a>
        </div>
      </div>
    </div>

    <section class="itinerary-section" data-reveal>
      <h2>Itinerary</h2>
      <ol class="itinerary-list">
        ${tour.itinerary.map((day) => `<li>${escapeHtml(day)}</li>`).join("")}
      </ol>
    </section>
  `;

  wireImageFallbacks(container);
  setSEO({ title: tour.title, description: tour.shortDescription, image: tour.image });
}

/* ==================================================================
 *  BLOGS LISTING PAGE
 * ================================================================== */
function initBlogsPage() {
  const grid = document.getElementById("blogsGrid");
  const searchInput = document.getElementById("blogSearch");
  const categorySelect = document.getElementById("blogCategoryFilter");
  if (!grid) return;

  const published = BLOGS.filter((b) => b.published);
  const categories = [...new Set(published.map((b) => b.category))];
  categorySelect.innerHTML =
    `<option value="">All Categories</option>` +
    categories.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("");

  function render() {
    const query = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;

    const filtered = published.filter((b) => {
      const matchesQuery = !query || b.title.toLowerCase().includes(query) || b.excerpt.toLowerCase().includes(query);
      const matchesCategory = !category || b.category === category;
      return matchesQuery && matchesCategory;
    });

    grid.innerHTML = filtered.length
      ? filtered.map(renderBlogCard).join("")
      : emptyState("No travel stories match your search yet.");
    wireImageFallbacks(grid);
  }

  [searchInput, categorySelect].forEach((input) => input.addEventListener("input", render));
  render();
}

/* ==================================================================
 *  BLOG DETAILS PAGE
 * ================================================================== */
function initBlogDetailsPage() {
  const container = document.getElementById("blogDetailsContent");
  if (!container) return;

  const slug = getQueryParam("slug");
  const blog = BLOGS.find((b) => b.slug === slug && b.published);

  if (!blog) {
    container.innerHTML = `
      <div class="empty-state not-found">
        <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
        <h1>Story Not Found</h1>
        <p>This travel story may have been moved or unpublished.</p>
        <a href="${withBase("pages/blogs.html")}" class="btn btn-primary">Browse All Stories</a>
      </div>
    `;
    setSEO({ title: "Story Not Found" });
    return;
  }

  // Paragraphs are split on blank lines for readability; content is our own copy.
  const paragraphs = blog.content
    .split(/\n\n+/)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("");

  container.innerHTML = `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="${withBase("index.html")}">Home</a> <span>/</span>
      <a href="${withBase("pages/blogs.html")}">Travel Stories</a> <span>/</span>
      <span aria-current="page">${escapeHtml(blog.title)}</span>
    </nav>

    <article class="blog-details">
      <span class="badge">${escapeHtml(blog.category)}</span>
      <h1>${escapeHtml(blog.title)}</h1>
      <p class="blog-meta">By ${escapeHtml(blog.author)} &middot; ${formatDate(blog.date)}</p>
      <img src="${withBase(blog.image)}" alt="${escapeHtml(blog.title)}" class="blog-hero-image" data-fallback="${escapeHtml(blog.title)}">
      <div class="blog-content">${paragraphs}</div>
      <div class="blog-tags">
        ${blog.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
      </div>
    </article>
  `;

  wireImageFallbacks(container);
  setSEO({ title: blog.title, description: blog.excerpt, image: blog.image });
}

/* ==================================================================
 *  GALLERY PAGE
 * ================================================================== */
function initGalleryPage() {
  const grid = document.getElementById("galleryGrid");
  const categoryFilters = document.getElementById("galleryFilters");
  if (!grid) return;

  const categories = ["All", ...new Set(GALLERY.map((p) => p.category))];
  categoryFilters.innerHTML = categories
    .map(
      (c, i) =>
        `<button type="button" class="filter-chip${i === 0 ? " is-active" : ""}" data-category="${escapeHtml(c)}">${escapeHtml(c)}</button>`
    )
    .join("");

  let currentList = GALLERY;

  function render(list) {
    currentList = list;
    grid.innerHTML = list.length
      ? list.map((p, i) => renderGalleryCard(p, i)).join("")
      : emptyState("No photos in this category yet.");
    wireImageFallbacks(grid);
    initLightbox(grid, currentList);
  }

  categoryFilters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-chip");
    if (!btn) return;
    categoryFilters.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("is-active"));
    btn.classList.add("is-active");
    const category = btn.dataset.category;
    render(category === "All" ? GALLERY : GALLERY.filter((p) => p.category === category));
  });

  render(GALLERY);
}

/* ------------------------------------------------------------------
 *  LIGHTBOX (shared by home preview + gallery page)
 * ---------------------------------------------------------------- */
function initLightbox(gridEl, list) {
  let modal = document.getElementById("lightboxModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "lightboxModal";
    modal.className = "lightbox";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Photo viewer");
    modal.hidden = true;
    modal.innerHTML = `
      <button type="button" class="lightbox-close" aria-label="Close photo viewer"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
      <button type="button" class="lightbox-prev" aria-label="Previous photo"><i class="fa-solid fa-chevron-left" aria-hidden="true"></i></button>
      <figure>
        <img id="lightboxImage" src="" alt="">
        <figcaption id="lightboxCaption"></figcaption>
      </figure>
      <button type="button" class="lightbox-next" aria-label="Next photo"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button>
    `;
    document.body.appendChild(modal);
  }

  let activeIndex = 0;
  const imgEl = modal.querySelector("#lightboxImage");
  const captionEl = modal.querySelector("#lightboxCaption");

  function open(index) {
    activeIndex = index;
    show();
    modal.hidden = false;
    document.body.classList.add("lightbox-open");
    modal.querySelector(".lightbox-close").focus();
  }

  function show() {
    const item = list[activeIndex];
    if (!item) return;
    imgEl.src = withBase(item.image);
    imgEl.alt = item.alt;
    captionEl.textContent = item.title;
  }

  function close() {
    modal.hidden = true;
    document.body.classList.remove("lightbox-open");
  }

  function next() {
    activeIndex = (activeIndex + 1) % list.length;
    show();
  }

  function prev() {
    activeIndex = (activeIndex - 1 + list.length) % list.length;
    show();
  }

  gridEl.querySelectorAll(".gallery-item").forEach((btn) => {
    btn.addEventListener("click", () => open(Number(btn.dataset.index)));
  });

  modal.querySelector(".lightbox-close").addEventListener("click", close);
  modal.querySelector(".lightbox-next").addEventListener("click", next);
  modal.querySelector(".lightbox-prev").addEventListener("click", prev);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
}

/* ==================================================================
 *  VIDEOS PAGE
 * ================================================================== */
function initVideosPage() {
  const grid = document.getElementById("videosGrid");
  if (!grid) return;

  grid.innerHTML = VIDEOS.length
    ? VIDEOS.map(renderVideoCard).join("")
    : emptyState("Videos are coming soon.");
  wireImageFallbacks(grid);
}

/* ==================================================================
 *  CONTACT PAGE
 * ================================================================== */
function initContactPage() {
  renderContactInfo();

  const form = document.getElementById("contactForm");
  if (!form) return;

  const prefilledTour = getQueryParam("tour");
  const tourInput = form.querySelector("#contactTour");
  if (prefilledTour && tourInput) tourInput.value = prefilledTour;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleContactSubmit(form);
  });
}

function renderContactInfo() {
  const el = document.getElementById("contactInfo");
  if (!el) return;

  const rows = [];
  if (SITE_CONFIG.contact.phoneDisplay) {
    rows.push(`<a href="${buildTelUrl(SITE_CONFIG.contact.phoneNumber)}"><i class="fa-solid fa-phone icon-spiritual" aria-hidden="true"></i><span>${escapeHtml(SITE_CONFIG.contact.phoneDisplay)}</span></a>`);
  }
  if (SITE_CONFIG.contact.phoneDisplaySecondary) {
    rows.push(`<a href="${buildTelUrl(SITE_CONFIG.contact.phoneNumberSecondary)}"><i class="fa-solid fa-phone icon-spiritual" aria-hidden="true"></i><span>${escapeHtml(SITE_CONFIG.contact.phoneDisplaySecondary)}</span></a>`);
  }
  if (SITE_CONFIG.contact.email) {
    rows.push(`<a href="mailto:${escapeHtml(SITE_CONFIG.contact.email)}"><i class="fa-solid fa-envelope icon-spiritual" aria-hidden="true"></i><span>${escapeHtml(SITE_CONFIG.contact.email)}</span></a>`);
  }
  rows.push(`<a href="${buildWhatsAppUrl()}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp icon-spiritual" aria-hidden="true"></i><span>Chat on WhatsApp</span></a>`);
  if (SITE_CONFIG.contact.address) {
    rows.push(`<span class="contact-address"><i class="fa-solid fa-location-dot icon-spiritual" aria-hidden="true"></i><span>${escapeHtml(SITE_CONFIG.contact.address)}</span></span>`);
  }
  if (SITE_CONFIG.contact.workingHours) {
    rows.push(`<span><i class="fa-solid fa-clock icon-spiritual" aria-hidden="true"></i><span>${escapeHtml(SITE_CONFIG.contact.workingHours)}</span></span>`);
  }

  el.innerHTML = rows.map((r) => `<li>${r}</li>`).join("");

  const mapEl = document.getElementById("contactMap");
  if (mapEl && SITE_CONFIG.contact.mapEmbedUrl) {
    mapEl.innerHTML = `<iframe src="${escapeHtml(SITE_CONFIG.contact.mapEmbedUrl)}" title="Map to ${escapeHtml(SITE_CONFIG.business.name)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  }
}

/** Shared validators */
const Validators = {
  required(value) {
    return value.trim().length > 0;
  },
  mobile(value) {
    return /^[6-9]\d{9}$/.test(value.trim());
  },
  email(value) {
    if (!value.trim()) return true; // optional in some forms
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }
};

function setFieldError(field, message) {
  const errorEl = field.closest(".form-field")?.querySelector(".field-error");
  field.setAttribute("aria-invalid", message ? "true" : "false");
  if (errorEl) errorEl.textContent = message || "";
}

function handleContactSubmit(form) {
  const name = form.querySelector("#contactName");
  const mobile = form.querySelector("#contactMobile");
  const email = form.querySelector("#contactEmail");
  const tour = form.querySelector("#contactTour");
  const date = form.querySelector("#contactDate");
  const travelers = form.querySelector("#contactTravelers");
  const message = form.querySelector("#contactMessage");

  let valid = true;

  if (!Validators.required(name.value)) {
    setFieldError(name, "Please enter your name.");
    valid = false;
  } else setFieldError(name, "");

  if (!Validators.mobile(mobile.value)) {
    setFieldError(mobile, "Enter a valid 10-digit Indian mobile number.");
    valid = false;
  } else setFieldError(mobile, "");

  if (!Validators.email(email.value)) {
    setFieldError(email, "Enter a valid email address, or leave this blank.");
    valid = false;
  } else setFieldError(email, "");

  if (!valid) {
    showNotification("Please fix the highlighted fields before submitting.", "error");
    return;
  }

  const lines = [
    `Hello ${SITE_CONFIG.business.name}, I would like to enquire about a tour.`,
    `Name: ${name.value.trim()}`,
    `Mobile: ${mobile.value.trim()}`
  ];
  if (email.value.trim()) lines.push(`Email: ${email.value.trim()}`);
  if (tour.value.trim()) lines.push(`Preferred Tour: ${tour.value.trim()}`);
  if (date.value) lines.push(`Travel Date: ${date.value}`);
  if (travelers.value) lines.push(`Number of Travelers: ${travelers.value}`);
  if (message.value.trim()) lines.push(`Message: ${message.value.trim()}`);

  showNotification("Thanks! Opening WhatsApp to send your enquiry...", "success");

  setTimeout(() => {
    window.open(buildWhatsAppUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  }, 600);

  form.reset();
}

/* ==================================================================
 *  HIRE US PAGE
 * ================================================================== */
function initHireUsPage() {
  const form = document.getElementById("hireForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleHireSubmit(form);
  });
}

function handleHireSubmit(form) {
  const name = form.querySelector("#hireName");
  const mobile = form.querySelector("#hireMobile");
  const service = form.querySelector("#hireService");
  const date = form.querySelector("#hireDate");
  const pickup = form.querySelector("#hirePickup");
  const destination = form.querySelector("#hireDestination");
  const people = form.querySelector("#hirePeople");
  const vehicle = form.querySelector("#hireVehicle");
  const notes = form.querySelector("#hireNotes");

  let valid = true;

  if (!Validators.required(name.value)) {
    setFieldError(name, "Please enter your name.");
    valid = false;
  } else setFieldError(name, "");

  if (!Validators.mobile(mobile.value)) {
    setFieldError(mobile, "Enter a valid 10-digit Indian mobile number.");
    valid = false;
  } else setFieldError(mobile, "");

  if (!Validators.required(service.value)) {
    setFieldError(service, "Please select a service.");
    valid = false;
  } else setFieldError(service, "");

  if (!valid) {
    showNotification("Please fix the highlighted fields before submitting.", "error");
    return;
  }

  const lines = [
    `Hello ${SITE_CONFIG.business.name}, I would like to hire your services.`,
    `Name: ${name.value.trim()}`,
    `Mobile: ${mobile.value.trim()}`,
    `Service Required: ${service.value.trim()}`
  ];
  if (date.value) lines.push(`Travel Date: ${date.value}`);
  if (pickup.value.trim()) lines.push(`Pickup Location: ${pickup.value.trim()}`);
  if (destination.value.trim()) lines.push(`Destination: ${destination.value.trim()}`);
  if (people.value) lines.push(`Number of People: ${people.value}`);
  if (vehicle.value.trim()) lines.push(`Vehicle Preference: ${vehicle.value.trim()}`);
  if (notes.value.trim()) lines.push(`Additional Requirements: ${notes.value.trim()}`);

  showNotification("Thanks! Opening WhatsApp to send your request...", "success");

  setTimeout(() => {
    window.open(buildWhatsAppUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  }, 600);

  form.reset();
}
