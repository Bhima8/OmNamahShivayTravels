/**
 * ============================================================
 *  SITE_CONFIG — Om Namah Shivay Travels
 * ============================================================
 *  This is the SINGLE SOURCE OF TRUTH for business details.
 *  Change your phone number, WhatsApp number, email, address,
 *  working hours, social links, and SEO defaults here and the
 *  entire website updates automatically — no need to touch any
 *  HTML file.
 *
 *  Leave any value as an empty string "" to hide that element
 *  automatically (e.g. a social link you don't have yet).
 * ============================================================
 */

const SITE_CONFIG = {

  // ---------------------------------------------------------
  // BUSINESS IDENTITY
  // ---------------------------------------------------------
  business: {
    name: "Om Namah Shivay Travels",
    shortName: "OM Travels",
    tagline: "Sacred Journeys. Beautiful Memories.",
    foundedYear: 2020, // used to auto-calculate "years of experience"
    logo: "images/logo/logo.svg",
    logoAlt: "Om Namah Shivay Travels logo"
  },

  // ---------------------------------------------------------
  // CONTACT DETAILS
  // ---------------------------------------------------------
  contact: {
    // Shown on screen exactly as written here
    phoneDisplay: "+91 88885 12366",
    // Used to build tel: links — digits only, with country code
    phoneNumber: "918888512366",

    // A second contact number (optional). Leave "" to hide.
    phoneDisplaySecondary: "+91 91729 36445",
    phoneNumberSecondary: "919172936445",

    email: "ganeshpatane9172@gmail.com",

    address: "Hyderabad Road, Boramani, Solapur 413002, Maharashtra, India",

    // Used for the embeddable map. Replace with your exact Google
    // Maps "share" link or embed src whenever you have it.
    mapEmbedUrl: "https://www.google.com/maps?q=Hyderabad+Road,+Boramani,+Solapur+413002&output=embed",
    mapLinkUrl: "https://www.google.com/maps/search/?api=1&query=Hyderabad+Road%2C+Boramani%2C+Solapur+413002",

    workingHours: "Open 24 x 7 — every day, including holidays"
  },

  // ---------------------------------------------------------
  // WHATSAPP
  // ---------------------------------------------------------
  whatsapp: {
    // Digits only, country code, no +, spaces or dashes
    number: "918888512366",
    defaultMessage: "Hello Om Namah Shivay Travels, I would like to enquire about your tours."
  },

  // ---------------------------------------------------------
  // SOCIAL LINKS — leave "" to hide the icon automatically
  // ---------------------------------------------------------
  socialLinks: {
    instagram: "",
    facebook: "",
    youtube: "",
    twitter: "",
    pinterest: ""
  },

  // ---------------------------------------------------------
  // SEO DEFAULTS
  // ---------------------------------------------------------
  seo: {
    siteUrl: "https://your-username.github.io/om-namah-shivay-travels/",
    defaultTitle: "Om Namah Shivay Travels | Pilgrimage & Holiday Tour Packages",
    defaultDescription: "Om Namah Shivay Travels plans peaceful Jyotirlinga pilgrimages, Himalayan yatras and family holiday tours from Solapur. Trusted, comfortable, well-organised journeys.",
    keywords: "Om Namah Shivay Travels, Solapur tours, Jyotirlinga pilgrimage, Kedarnath Badrinath tour, Himalayan tour packages, family holiday packages, tour operator Solapur, pilgrimage tours India",
    ogImage: "images/hero/hero-home.jpg",
    twitterHandle: ""
  },

  // ---------------------------------------------------------
  // ANNOUNCEMENT BAR
  // ---------------------------------------------------------
  announcement: {
    enabled: true,
    text: "Plan your next journey with Om Namah Shivay Travels"
  },

  // ---------------------------------------------------------
  // NAVIGATION
  // ---------------------------------------------------------
  navigation: [
    { label: "Home", href: "index.html", pageId: "home" },
    { label: "About Us", href: "pages/about.html", pageId: "about" },
    { label: "Tours", href: "pages/tours.html", pageId: "tours" },
    {
      label: "Travel Stories",
      href: "pages/blogs.html",
      pageId: "blogs",
      children: [
        { label: "Travel Stories", href: "pages/blogs.html", pageId: "blogs" },
        { label: "Photos", href: "pages/gallery.html", pageId: "gallery" },
        { label: "Videos", href: "pages/videos.html", pageId: "videos" }
      ]
    },
    { label: "Hire Us", href: "pages/hire-us.html", pageId: "hire-us" },
    { label: "Contact", href: "pages/contact.html", pageId: "contact" }
  ],

  // ---------------------------------------------------------
  // TRUST STATISTICS (Home page)
  // ---------------------------------------------------------
  stats: [
    { value: 5, suffix: "+", label: "Years of Experience" },
    { value: 8000, suffix: "+", label: "Happy Travelers" },
    { value: 50, suffix: "+", label: "Destinations Covered" },
    { value: 24, suffix: "/7", label: "Support Availability" }
  ]
};
