/**
 * ============================================================
 *  SITE_DATA — Om Namah Shivay Travels
 * ============================================================
 *  All content that changes often lives here: tours, blogs,
 *  gallery photos, videos and traveler reviews.
 *
 *  To add a new tour, blog, photo, video or review — copy an
 *  existing object in the matching array below, paste it as a
 *  new entry, and edit the values. Give every new item a unique
 *  "id" (or "slug" for blogs).
 * ============================================================
 */

// ---------------------------------------------------------
// TOURS
// ---------------------------------------------------------
const TOURS = [
  {
    id: "tour-001",
    title: "Jyotirlinga Pilgrimage Tour",
    shortDescription: "A peaceful, well-organised darshan of the sacred Jyotirlingas.",
    description: "Travel to the most sacred abodes of Lord Shiva on a carefully planned pilgrimage. We take care of travel, stay and darshan queues so you can focus on the experience — comfortable coaches, clean accommodation and an experienced tour manager throughout.",
    image: "images/tours/jyotirlinga.jpg",
    duration: "5 Days / 4 Nights",
    location: "Multiple Jyotirlinga Destinations",
    price: "Contact for pricing",
    category: "Pilgrimage",
    featured: true,
    itinerary: [
      "Day 1: Departure from Solapur, overnight travel",
      "Day 2: Arrival and darshan at first Jyotirlinga temple",
      "Day 3: Travel to second temple, local sightseeing",
      "Day 4: Darshan, evening aarti, spiritual discourse",
      "Day 5: Final darshan and return journey"
    ]
  },
  {
    id: "tour-002",
    title: "Kedarnath & Badrinath Tour",
    shortDescription: "A guided Himalayan yatra to two of the holiest Char Dham shrines.",
    description: "An organised yatra covering Kedarnath and Badrinath, including help with registration, trek or pony arrangements, and comfortable stays along the route. Designed for both first-time pilgrims and seasoned travelers.",
    image: "images/tours/kedarnath-badrinath.jpg",
    duration: "8 Days / 7 Nights",
    location: "Uttarakhand, Himalayas",
    price: "Contact for pricing",
    category: "Pilgrimage",
    featured: true,
    itinerary: [
      "Day 1: Departure and travel toward Haridwar/Rishikesh",
      "Day 2: Travel to Guptkashi / Sonprayag region",
      "Day 3: Trek or pony ride to Kedarnath, darshan",
      "Day 4: Descend, rest and travel toward Badrinath",
      "Day 5: Arrival at Badrinath, evening aarti",
      "Day 6: Badrinath darshan, visit Mana village",
      "Day 7: Begin return journey",
      "Day 8: Arrival back home"
    ]
  },
  {
    id: "tour-003",
    title: "Family Holiday Tour",
    shortDescription: "A relaxed, comfortable getaway designed for families and kids.",
    description: "A holiday package built around comfort and flexibility — family-friendly stays, easy sightseeing pace, and free time built into every day so everyone from grandparents to children enjoys the trip.",
    image: "images/tours/family-holiday.jpg",
    duration: "4 Days / 3 Nights",
    location: "Customisable Destination",
    price: "Contact for pricing",
    category: "Family",
    featured: true,
    itinerary: [
      "Day 1: Arrival and leisurely check-in",
      "Day 2: Local sightseeing at a relaxed pace",
      "Day 3: Free day / optional activities",
      "Day 4: Final sightseeing and return",
      "There is no such any restriction of days, you can extend your holiday as per your convenience."
    ]
  },
  {
    id: "tour-004",
    title: "Himalayan Nature Tour",
    shortDescription: "Mountains, valleys and rivers — a slower, nature-first journey.",
    description: "Escape to the hills on a nature-focused itinerary with scenic drives, riverside stays and gentle walks through valleys and pine forests. A good fit for travelers who want quiet over crowds.",
    image: "images/tours/himalayan-nature.jpg",
    duration: "6 Days / 5 Nights",
    location: "Himalayan Foothills",
    price: "Contact for pricing",
    category: "Nature",
    featured: false,
    itinerary: [
      "Day 1: Arrival, acclimatisation",
      "Day 2: Scenic valley drive and short walk",
      "Day 3: Riverside stay, local village visit",
      "Day 4: Nature trail and viewpoint visit",
      "Day 5: Leisure day / optional adventure activity",
      "Day 6: Return journey"
    ]
  },
  {
    id: "tour-005",
    title: "Weekend Temple Tour",
    shortDescription: "A short, refreshing weekend darshan trip close to home.",
    description: "Perfect for a quick spiritual recharge — visit nearby temples over a weekend with comfortable travel and a well-planned schedule that avoids rushing.",
    image: "images/tours/weekend-temple.jpg",
    duration: "2 Days / 1 Night",
    location: "Regional Temple Circuit",
    price: "Contact for pricing",
    category: "Pilgrimage",
    featured: false,
    itinerary: [
      "Day 1: Departure, temple darshan, evening aarti",
      "Day 2: Morning darshan and return",
      "Optional extended visit to nearby temples if desired"
    ]
  },
  {
    id: "tour-006",
    title: "Ganpatipule Konkan Tour",
    shortDescription: "Beaches, coconut groves and the seaside Ganpati temple.",
    description: "Explore the Konkan coastline with a visit to the famous Ganpatipule temple, quiet beaches and fresh coastal food, wrapped into an easy-going short holiday.",
    image: "images/tours/ganpatipule.jpg",
    duration: "3 Days / 2 Nights",
    location: "Ganpatipule, Konkan Coast",
    price: "Contact for pricing",
    category: "Nature",
    featured: true,
    itinerary: [
      "Day 1: Arrival, beach visit, temple darshan",
      "Day 2: Konkan sightseeing, local sightseeing",
      "Day 3: Leisure morning and return journey"
    ]
  },
  {
    id: "tour-007",
    title: "Custom Group Tour",
    shortDescription: "Tell us where you want to go — we plan the rest.",
    description: "For societies, offices, colleges and larger friend groups. Share your preferred destination, dates and budget, and we design a complete itinerary with transport, stay and sightseeing around your group's needs.",
    image: "images/tours/custom-group.jpg",
    duration: "Flexible",
    location: "Your Choice of Destination",
    price: "Contact for pricing",
    category: "Custom",
    featured: false,
    itinerary: [
      "Fully customised as per your group's requirements"
    ]
  }
];

// ---------------------------------------------------------
// BLOGS / TRAVEL STORIES
// ---------------------------------------------------------
const BLOGS = [
  {
    id: "blog-001",
    title: "Best Time to Visit Kedarnath: A Complete Guide",
    slug: "best-time-to-visit-kedarnath",
    excerpt: "Planning a Kedarnath yatra? Here is what to know about weather, crowds and travel windows before you book.",
    content: "Kedarnath temple typically opens in late April or early May and closes around late October or early November for winter, when the deity is moved to Ukhimath. The months of May-June and September-October are generally considered the most comfortable for travel, with cooler weather and clearer trekking conditions than the peak monsoon months. July and August bring heavy rain and a higher risk of landslides along the route, so many experienced travelers prefer to avoid this window. Whichever month you choose, carry warm layers, comfortable trekking footwear, and keep your itinerary flexible in case of weather delays. Our team tracks the latest shrine board announcements each season and adjusts group departures accordingly, so travelers get the safest and most comfortable experience possible.",
    image: "images/blogs/kedarnath-guide.jpg",
    author: "Om Namah Shivay Travels Team",
    date: "2026-03-10",
    category: "Pilgrimage Tips",
    tags: ["Kedarnath", "Char Dham", "Travel Tips"],
    published: true
  },
  {
    id: "blog-002",
    title: "A First-Timer's Guide to the Jyotirlinga Yatra",
    slug: "first-timers-guide-jyotirlinga-yatra",
    excerpt: "New to pilgrimage travel? Here is a simple guide to help you prepare for your first Jyotirlinga darshan.",
    content: "Visiting the twelve Jyotirlingas is a journey many devotees dream of completing at least once. If it is your first pilgrimage tour, a little preparation goes a long way: pack light, comfortable clothing suited for temple visits, carry any required medication, and be ready for early mornings around aarti timings. Group tours make the experience easier because transport, temple entry and accommodation are already arranged, letting you focus on the darshan itself rather than logistics. We recommend starting with a shorter circuit if you are unsure how you'll adapt to travel, then planning the fuller yatra once you're comfortable with the pace.",
    image: "images/blogs/jyotirlinga-guide.jpg",
    author: "Om Namah Shivay Travels Team",
    date: "2026-02-18",
    category: "Pilgrimage Tips",
    tags: ["Jyotirlinga", "Beginner Guide"],
    published: true
  },
  {
    id: "blog-003",
    title: "5 Reasons Konkan Is Perfect for a Short Family Trip",
    slug: "konkan-short-family-trip",
    excerpt: "Beaches, temples and coconut groves — why the Konkan coast makes an easy weekend escape.",
    content: "The Konkan coastline offers a rare mix of spirituality and relaxation in one short trip. The Ganpatipule temple sits right by the sea, so a morning darshan can be followed by an afternoon on the beach. Roads along the coast are scenic, food is fresh and seafood-forward, and the pace of travel is gentle enough for children and grandparents alike. Because the distances between stops are short, a 3-day itinerary rarely feels rushed, which is part of why it remains one of our most requested short family packages.",
    image: "images/blogs/konkan-family.jpg",
    author: "Om Namah Shivay Travels Team",
    date: "2026-01-22",
    category: "Family Travel",
    tags: ["Konkan", "Ganpatipule", "Family Trips"],
    published: true
  },
  {
    id: "blog-005",
    title: "Tuljapur – Solapur Siddheshwar – Akkalkot – Gangapur Circuit",
    slug: "tuljapur-solapur-akkalkot-gangapur-circuit",
    excerpt: "A compact darshan circuit covering Tulja Bhavani, Siddheshwar, Swami Samarth's Akkalkot and Gangapur — all within easy reach of Solapur.",
    content: "This circuit is one of the most popular short pilgrimages we plan for travelers based in and around Solapur, because it links four significant shrines without long travel days in between. The route begins at Tuljapur, home to the Tulja Bhavani temple, one of Maharashtra's revered Shakti Peethas. From there, travelers move to Solapur city itself for darshan at the Siddheshwar temple, well known for its Nagnath Maha Yatra and lake-side setting. The journey continues to Akkalkot, associated with Swami Samarth, a major stop for devotees seeking blessings at Vatvriksha Swami Samarth Maharaj Math. The circuit closes at Gangapur, an important Dattatreya pilgrimage site on the banks of the Bhima river. Because each stop is a manageable drive from the last, this circuit works well as a 2-3 day trip, and we can extend it into a longer tour if you'd like to add nearby temples along the way.",
    image: "images/blogs/tuljapur-akkalkot-gangapur.jpg",
    author: "Om Namah Shivay Travels Team",
    date: "2026-08-12",
    category: "Pilgrimage Circuits",
    tags: ["Tuljapur", "Akkalkot", "Gangapur", "Solapur"],
    published: true
  },
  {
    id: "blog-006",
    title: "Solapur – Tirupati – Kolhapur: A Two-Temple Pilgrimage Trip",
    slug: "solapur-tirupati-kolhapur-pilgrimage",
    excerpt: "Combine a Tirupati Balaji darshan with a visit to the Mahalakshmi temple in Kolhapur on one well-paced circuit from Solapur.",
    content: "This route pairs two of South and West India's most visited shrines into one organised trip. Starting from Solapur, the journey heads toward Tirupati for darshan at the Sri Venkateswara Temple — one of the most visited pilgrimage sites in the world, so we plan travel and stay with extra buffer time around darshan queues. From Tirupati, the circuit turns toward Kolhapur for a visit to the Mahalakshmi Temple, one of the Shakti Peethas and a significant stop for devotees travelling through western Maharashtra. Because of the distance involved, this circuit typically runs longer than our regional trips, and we build in rest stops so the travel itself doesn't feel rushed. It's a good fit for families and groups who want to combine two major darshans into a single, well-organised journey rather than two separate short trips.",
    image: "images/blogs/solapur-tirupati-kolhapur.jpg",
    author: "Om Namah Shivay Travels Team",
    date: "2026-07-25",
    category: "Pilgrimage Circuits",
    tags: ["Tirupati", "Kolhapur", "Solapur", "Temple Tours"],
    published: true
  },
  {
    id: "blog-007",
    title: "Solapur – Vijapura – Gangapur: Heritage Meets Pilgrimage",
    slug: "solapur-vijapura-gangapur-route",
    excerpt: "A route that blends the historic monuments of Vijapura with the Dattatreya shrine at Gangapur, ideal for travelers who enjoy both history and darshan.",
    content: "Not every trip has to be pilgrimage-only, and this route is a favourite for travelers who want a bit of both. Leaving Solapur, the journey first heads to Vijapura (Bijapur), known for its striking Adil Shahi-era monuments, including the Gol Gumbaz with its famous whispering gallery. From there, the route turns toward Gangapur, a well-known Dattatreya pilgrimage site on the Bhima river, for a peaceful darshan before heading back. Because this circuit mixes sightseeing with spiritual stops, we usually build a slightly more relaxed schedule into the itinerary, with time set aside at Vijapura's monuments rather than rushing straight through. It works well as a weekend trip for small groups and families who want variety without a very long journey.",
    image: "images/blogs/solapur-vijapura-gangapur.jpg",
    author: "Om Namah Shivay Travels Team",
    date: "2026-06-30",
    category: "Pilgrimage Circuits",
    tags: ["Vijapura", "Gangapur", "Solapur", "Heritage"],
    published: true
  },
  {
    id: "blog-004",
    title: "Packing Checklist for a Himalayan Nature Trip",
    slug: "packing-checklist-himalayan-nature-trip",
    excerpt: "A practical packing list for travelers heading into the Himalayan foothills.",
    content: "Mountain weather changes quickly, so layering is the key idea behind packing for any Himalayan nature trip. Carry a light thermal layer, a fleece or sweater, and a windproof jacket, along with sturdy closed shoes for uneven trails. A reusable water bottle, a basic first-aid kit, sunscreen and a torch are all worth the small amount of extra luggage space. If you're prone to motion sickness on winding mountain roads, keep medication handy for the drive. Beyond gear, the most useful thing to pack is a flexible mindset — mountain itineraries sometimes shift with the weather, and that's part of the experience.",
    image: "images/blogs/himalaya-packing.jpg",
    author: "Om Namah Shivay Travels Team",
    date: "2025-12-05",
    category: "Travel Tips",
    tags: ["Himalaya", "Packing", "Nature Travel"],
    published: true
  },
  {
    id: "blog-005",
    title: "Tuljapur, Solapur Siddheshwar, Akkalkot & Gangapur: A Regional Darshan Circuit",
    slug: "tuljapur-siddheshwar-akkalkot-gangapur-circuit",
    excerpt: "A compact multi-temple circuit covering Tulja Bhavani, Solapur's Siddheshwar temple, Akkalkot and Gangapur — ideal for a short weekend darshan.",
    content: "This is one of our most requested short circuits for travelers based around Solapur, and it's easy to see why — four significant shrines within a comfortable driving distance of each other. The circuit typically begins at Tuljapur, home to the Tulja Bhavani temple, one of Maharashtra's revered Shakti Peethas and the family deity for many households in the region. From there, the route continues into Solapur city itself for darshan at the Siddheshwar temple, built around a scenic lake and known for its distinctive architecture and the annual Yatra held in its honour.\n\nFrom Solapur, the road heads toward Akkalkot, home to the samadhi and math of Swami Samarth, a widely revered saint whose devotees travel from across Maharashtra and Karnataka. The final stop, Gangapur, sits on the banks of the Bhima river and is considered a major Dattatreya pilgrimage centre, drawing pilgrims for its association with Shri Narasimha Saraswati.\n\nBecause the four stops are reasonably close together, this circuit works well as a 2 to 3 day trip, with comfortable stays arranged along the way and enough time built in at each temple to avoid feeling rushed. It's a good option for families who want a meaningful pilgrimage without a long travel commitment.",
    image: "images/blogs/tuljapur-akkalkot-gangapur.jpg",
    author: "Om Namah Shivay Travels Team",
    date: "2026-08-20",
    category: "Pilgrimage Circuits",
    tags: ["Tuljapur", "Siddheshwar", "Akkalkot", "Gangapur", "Solapur"],
    published: true
  },
  {
    id: "blog-006",
    title: "Solapur to Tirupati and Kolhapur: A South Indian Darshan Route",
    slug: "solapur-tirupati-kolhapur-circuit",
    excerpt: "Combining Lord Venkateswara's hill shrine at Tirupati with the Mahalaxmi temple at Kolhapur on one well-planned journey.",
    content: "This circuit brings together two of South and West India's most visited pilgrimage destinations. The journey from Solapur toward Tirupati covers a fair distance, so we plan it with an overnight halt to keep the travel comfortable rather than rushed. At Tirupati, the focus is entirely on darshan at the Sri Venkateswara temple atop Tirumala hill — we help with the practicalities of the queue system and timings so travelers can focus on the experience itself.\n\nOn the return leg, the route passes through Kolhapur, home to the Mahalaxmi (Ambabai) temple, another of Maharashtra's significant Shakti Peethas. Kolhapur is also known for its distinct local cuisine and handicrafts, which many travelers enjoy exploring in the time between temple visits.\n\nGiven the distances involved, we usually plan this as a 5 to 6 day tour, with sleeper coach or a mix of coach and rail travel depending on group size and preference. It suits travelers who want to cover two major, geographically distant shrines in a single well-organised trip rather than two separate journeys.",
    image: "images/blogs/tirupati-kolhapur.jpg",
    author: "Om Namah Shivay Travels Team",
    date: "2026-08-05",
    category: "Pilgrimage Circuits",
    tags: ["Tirupati", "Kolhapur", "Mahalaxmi Temple", "Solapur"],
    published: true
  },
  {
    id: "blog-007",
    title: "Solapur, Vijapura & Gangapur: Heritage and Darshan Together",
    slug: "solapur-vijapura-gangapur-circuit",
    excerpt: "A shorter circuit that pairs the historic monuments of Vijapura with darshan at the Dattatreya shrine in Gangapur.",
    content: "Not every trip needs to be purely a pilgrimage — this circuit is built for travelers who'd like to combine darshan with a bit of history along the way. From Solapur, the route first heads to Vijapura (Bijapur), just across the border in Karnataka, known for landmark Deccan-era monuments including the Gol Gumbaz, one of the largest domes in the world, along with several other forts and mausoleums worth a half-day of exploring.\n\nFrom Vijapura, the journey continues to Gangapur on the banks of the Bhima river, a major Dattatreya pilgrimage centre associated with Shri Narasimha Saraswati. Many of our travelers on this route describe it as a good balance — a morning spent appreciating architecture and history, followed by a peaceful evening aarti at the temple.\n\nWe typically plan this as a 2 to 3 day trip, with a comfortable overnight stay and enough flexibility in the schedule to linger at whichever stop interests your group the most.",
    image: "images/blogs/vijapura-gangapur.jpg",
    author: "Om Namah Shivay Travels Team",
    date: "2026-07-18",
    category: "Pilgrimage Circuits",
    tags: ["Vijapura", "Bijapur", "Gangapur", "Heritage Travel"],
    published: true
  }
];

// ---------------------------------------------------------
// GALLERY PHOTOS
// ---------------------------------------------------------
const GALLERY = [
  { image: "images/gallery/gallery-01.jpg", title: "Sunrise Over the Himalayas", category: "Nature", alt: "Sunrise light over Himalayan mountain peaks" },
  { image: "images/gallery/gallery-02.jpg", title: "Temple Darshan Queue", category: "Pilgrimage", alt: "Devotees waiting in line for temple darshan" },
  { image: "images/gallery/gallery-03.jpg", title: "Mountain River Crossing", category: "Nature", alt: "Clear mountain river running through a valley" },
  { image: "images/gallery/gallery-04.jpg", title: "Evening Aarti", category: "Pilgrimage", alt: "Evening aarti ceremony with lamps" },
  { image: "images/gallery/gallery-05.jpg", title: "Konkan Coastline", category: "Beach", alt: "Palm-lined beach along the Konkan coast" },
  { image: "images/gallery/gallery-06.jpg", title: "Family on a Group Tour", category: "Family", alt: "Family group posing during a holiday tour" },
  { image: "images/gallery/gallery-07.jpg", title: "Mountain Pass Road", category: "Nature", alt: "Winding mountain road through pine forest" },
  { image: "images/gallery/gallery-08.jpg", title: "Temple Architecture", category: "Pilgrimage", alt: "Detailed stone carving on temple exterior" }
];

// ---------------------------------------------------------
// VIDEOS
// ---------------------------------------------------------
const VIDEOS = [
  {
    // Replace YOUR_VIDEO_ID with the real YouTube video ID
    // (the part after "v=" in a YouTube URL), e.g. "abc123XYZ".
    url: "https://www.youtube.com/watch?v=M5a0exMPtdk",
    title: "Jyotirlinga Yatra Highlights",
    thumbnail: "images/videos/video-01.jpg",
    description: "A short recap of our recent Jyotirlinga pilgrimage group tour.",
    category: "Pilgrimage"
  },
  {
    url: "https://www.youtube.com/watch?v=nFrCCphWLO0",
    title: "Kedarnath Yatra Journey",
    thumbnail: "images/videos/video-02.jpg",
    description: "Following our travelers along the Kedarnath route.",
    category: "Pilgrimage"
  },
  {
    url: "https://www.youtube.com/watch?v=SyZ4wkWyVxU",
    title: "Himalayan Nature Escape",
    thumbnail: "images/videos/video-03.jpg",
    description: "Valleys, rivers and quiet mountain trails from our nature tour.",
    category: "Nature"
  }
];

// ---------------------------------------------------------
// REVIEWS
// ---------------------------------------------------------
const REVIEWS = [
  {
    name: "Sunita Deshmukh",
    location: "Solapur",
    rating: 5,
    text: "Our Jyotirlinga tour was extremely well organised. The team handled every detail so our family could focus on the darshan without any stress.",
    photo: "images/reviews/reviewer-01.jpg"
  },
  {
    name: "Ravindra Patil",
    location: "Pune",
    rating: 5,
    text: "Kedarnath-Badrinath yatra with this team was smooth from start to finish. Good communication throughout and comfortable stays along the route.",
    photo: "images/reviews/reviewer-02.jpg"
  },
  {
    name: "Ganesh Kulkarni",
    location: "Solapur",
    rating: 4,
    text: "Took our family to Ganpatipule with them — relaxed pace, great for kids and elders both. Would book again for our next trip.",
    photo: "images/reviews/reviewer-03.jpg"
  },
  {
    name: "Priya Joshi",
    location: "Hyderabad",
    rating: 5,
    text: "Booked a custom group tour for our office. Transparent pricing and quick replies on WhatsApp made planning very easy.",
    photo: "images/reviews/reviewer-04.jpg"
  }
];
