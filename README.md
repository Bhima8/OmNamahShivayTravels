# Om Namah Shivay Travels — Website

A static HTML / CSS / vanilla JavaScript website for Om Namah Shivay Travels. No backend, no build tools, no frameworks — everything runs directly in the browser and is ready for GitHub Pages.

## How the project fits together

```
om-namah-shivay-travels/
├── index.html            ← Home page
├── .nojekyll              ← Tells GitHub Pages to skip Jekyll processing
├── css/
│   ├── style.css          ← All design tokens + component styles
│   └── responsive.css      ← Mobile/tablet breakpoint overrides
├── js/
│   ├── config.js           ← Business details (EDIT THIS FIRST)
│   ├── data.js              ← Tours, blogs, gallery, videos, reviews
│   ├── components.js         ← Reusable render functions (header, footer, cards…)
│   ├── main.js                ← Shared page behavior (menu, scroll reveal, back-to-top)
│   └── pages.js                ← Page-specific logic (search, filters, forms, lightbox)
├── images/                      ← Replace placeholder images here
├── pages/                        ← All inner pages
└── assets/icons/                  ← Reserved for any custom icon files
```

Every page loads the same five JS files in the same order, then a tiny inline script that tells it which page it is. Because `js/config.js` and `js/data.js` are loaded first, you only ever need to edit those two files for day-to-day updates.

## 1. How to add a new HTML page

1. Copy an existing simple page, e.g. `pages/about.html`, into `pages/your-new-page.html`.
2. Keep the `<div id="site-header"></div>`, `<main id="page-content">…</main>`, `<div id="site-footer"></div>` and `<div id="floating-actions"></div>` placeholders.
3. Keep the `<script>const BASE_PATH = "../";</script>` line (pages inside `/pages/` always use `"../"`; only `index.html` at the root uses `""`).
4. Keep the five `<script src="../js/....js" defer></script>` tags, in order.
5. In the final inline `<script>`, call `initPage({ activePageId: "...", seo: {...} })` and then any page-specific function you need from `pages.js`.
6. If you want it in the main menu, add it to the `navigation` array in `js/config.js`.

## 2. How the shared header and footer work

You never write header/footer HTML by hand. Every page has:

```html
<div id="site-header"></div>
...
<div id="site-footer"></div>
<div id="floating-actions"></div>
```

`js/main.js`'s `initPage()` calls `renderHeader()`, `renderFooter()` and `renderFloatingActions()` from `js/components.js`, which fill these placeholders using `SITE_CONFIG` and `SITE_DATA`. Edit the header/footer markup in **one place** — `js/components.js` — and every page updates.

## 3. How to add a new tour

Open `js/data.js`, find the `TOURS` array, copy one tour object, paste it as a new entry, and edit the fields:

```javascript
{
  id: "tour-008",                 // must be unique
  title: "Your Tour Name",
  shortDescription: "One sentence used on cards.",
  description: "Longer paragraph shown on the tour details page.",
  image: "images/tours/your-image.jpg",
  duration: "4 Days / 3 Nights",
  location: "Destination Name",
  price: "Contact for pricing",
  category: "Pilgrimage",         // used by the category filter
  featured: false,                 // true = shows on the home page
  itinerary: [
    "Day 1: ...",
    "Day 2: ..."
  ]
}
```

It will automatically appear on the Tours page, and on the Home page if `featured: true`.

## 4. How to add a new blog / travel story

In `js/data.js`, copy an object in the `BLOGS` array:

```javascript
{
  id: "blog-005",
  title: "Your Blog Title",
  slug: "your-blog-title",        // used in the URL, must be unique, no spaces
  excerpt: "One or two sentences shown on the card.",
  content: "Full article text. Separate paragraphs with a blank line.",
  image: "images/blogs/your-image.jpg",
  author: "Om Namah Shivay Travels Team",
  date: "2026-09-01",             // YYYY-MM-DD
  category: "Travel Tips",
  tags: ["Tag One", "Tag Two"],
  published: true                  // set false to hide without deleting
}
```

It appears automatically at `pages/blogs.html` and its own page at `pages/blog-details.html?slug=your-blog-title`.

## 5. How to add a new photo

Add an image file to `images/gallery/`, then add an entry to the `GALLERY` array in `js/data.js`:

```javascript
{ image: "images/gallery/gallery-09.jpg", title: "Photo Title", category: "Nature", alt: "Descriptive alt text" }
```

## 6. How to add a new video

Add an entry to the `VIDEOS` array in `js/data.js`. Use the full YouTube watch URL:

```javascript
{
  url: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  title: "Video Title",
  thumbnail: "images/videos/your-thumbnail.jpg",
  description: "One sentence about the video.",
  category: "Pilgrimage"
}
```

Videos open on YouTube in a new tab when clicked (they do not autoplay embedded on the page).

## 7. How to add a new review

Add an entry to the `REVIEWS` array in `js/data.js`:

```javascript
{ name: "Traveler Name", location: "City", rating: 5, text: "Their feedback.", photo: "images/reviews/reviewer-05.jpg" }
```

If you don't have a photo yet, point `photo` at any existing placeholder image — a graceful fallback avatar will show automatically if the image is missing.

## 8. How to update phone, WhatsApp, email and social links

Open `js/config.js` and edit the `contact`, `whatsapp` and `socialLinks` sections:

- `contact.phoneDisplay` — what visitors see (e.g. `+91 88885 12366`)
- `contact.phoneNumber` — digits only with country code, used for `tel:` links (e.g. `918888512366`)
- `whatsapp.number` — digits only with country code, **no `+`, spaces or dashes** (e.g. `918888512366`)
- `socialLinks.instagram`, `.facebook`, `.youtube`, etc. — leave any of these as `""` and that icon disappears automatically from the header/footer.

## 9. How to update the logo and images

- The logo is `images/logo/logo.svg` — a custom Om-symbol mark built for this site (no external/copyrighted logo was used). Replace this file with your own logo whenever you have one; keep the filename the same, or update `business.logo` in `js/config.js` to point at a new filename.
- Every other image referenced in `js/data.js` and the HTML pages is currently a **placeholder path** (e.g. `images/tours/jyotirlinga.jpg`). These files don't exist yet — see the "Replacing placeholder images" section below.
- If any image fails to load, the site automatically shows an on-brand placeholder graphic instead of a broken image icon, so nothing looks broken while you're adding real photos.

## 10. How to deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `om-namah-shivay-travels`).
2. Push this entire folder's contents to the repository's `main` branch.
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
5. Save. GitHub will publish the site at `https://your-username.github.io/om-namah-shivay-travels/`.
6. Update `seo.siteUrl` in `js/config.js` and the `<link rel="canonical">` / `og:url` tags to match your real URL.

## 11. How to connect a custom domain later

1. In your domain's DNS settings, add a `CNAME` record pointing your subdomain (e.g. `www.omnamahshivaytravels.com`) to `your-username.github.io`.
   - For a root/apex domain, add the GitHub Pages `A` records instead (see GitHub's official Pages documentation for the current IP addresses).
2. In the repository, go to **Settings → Pages → Custom domain**, enter your domain, and save. This creates a `CNAME` file in your repository automatically.
3. Wait for DNS to propagate (can take up to 24-48 hours), then enable **Enforce HTTPS** in the same settings panel once it becomes available.

## 12. How to test links before deployment

- Open `index.html` directly in a browser, or serve the folder locally (e.g. `npx serve .` or the VS Code "Live Server" extension) and click through every navigation link, footer link, and card link.
- Check that every page's WhatsApp button and floating WhatsApp/Call buttons open with the correct number.
- Test the Contact and Hire Us forms: submit with empty required fields (should show inline errors) and with a valid mobile number (should open WhatsApp with a pre-filled message).
- Resize the browser window (or use responsive/device mode) to check mobile, tablet and desktop layouts.
- Try an invalid tour link like `pages/tour-details.html?id=does-not-exist` and an invalid blog link like `pages/blog-details.html?slug=does-not-exist` — both should show a friendly "not found" message instead of a blank page.

---

## Replacing placeholder images

All image paths in `js/data.js` and the HTML files point at files that don't exist in this project yet (this keeps the download small and avoids using anyone else's copyrighted photos). To finish the site:

1. Source your own photos (temple visits, your buses/cars, past tour groups, mountain and coastal scenery) or properly licensed stock photos.
2. Save them into the matching folder under `images/` using the filenames already referenced in `js/data.js` and the HTML pages — or use your own filenames and update the paths in those files to match.
3. Recommended sizes: hero images ~1920×1080px, tour/blog card images ~1200×900px, gallery images ~1000×1000px, review photos ~200×200px. Compress images (e.g. with Squoosh or TinyPNG) before uploading so pages load quickly.
4. The logo at `images/logo/logo.svg` is ready to use as-is, or replace it with your own artwork.

## Testing checklist before going live

- [ ] Updated `contact`, `whatsapp`, `socialLinks` and `seo` values in `js/config.js`
- [ ] Replaced placeholder images with real photos
- [ ] Replaced `YOUR_VIDEO_ID` placeholders in `js/data.js` with real YouTube video IDs
- [ ] Replaced the Google Maps embed URL in `js/config.js` with your exact location
- [ ] Clicked through every page, every nav link and every footer link
- [ ] Tested the Contact and Hire Us forms on both desktop and mobile
- [ ] Tested the mobile hamburger menu and floating WhatsApp/Call buttons
- [ ] Verified tour and blog "not found" states work correctly
- [ ] Ran a quick Lighthouse / accessibility check in Chrome DevTools
- [ ] Confirmed the site loads correctly after publishing to GitHub Pages
