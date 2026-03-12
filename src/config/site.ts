import type { CTA, SectionKey } from "../types/content";

const exploreVendors: CTA = {
  label: "Explore Vendors",
  href: "/vendors",
  variant: "primary",
};

const becomeVendor: CTA = {
  label: "Become a Vendor",
  href: "/become-a-vendor",
  variant: "secondary",
};

const visitMarket: CTA = {
  label: "Visit Vendor Rowe",
  href: "/visit-us",
  variant: "ghost",
};

export const site = {
  verticalLabel: "Boutique Vendor Marketplace",
  deploymentTargets: ["Cloudflare Pages", "Netlify", "Vercel"],
  home: {
    sectionOrder: [
      "hero",
      "seasonalPromo",
      "story",
      "services",
      "gallery",
      "testimonials",
      "cta",
      "location",
    ] as SectionKey[],
    hero: {
      eyebrow: "Curated marketplace in Florence, South Carolina",
      title: "Discover Florence's Boutique Vendor Market",
      description:
        "Antiques, handcrafted goods, vintage treasures, and unique finds from local vendors.",
      actions: [exploreVendors, becomeVendor, visitMarket],
      highlights: [
        { value: "30", label: "Curated vendor booths" },
        { value: "Local", label: "Independent sellers" },
        { value: "Seasonal", label: "Theme-ready market styling" },
      ],
    },
    sectionContent: {
      story: {
        eyebrow: "About Vendor Rowe",
        title: "A Marketplace Built by a Vendor",
        description:
          "Vendor Rowe was founded by a young local entrepreneur who started by selling antiques and vintage goods from a booth in Florence. After seeing the opportunity for a more curated, boutique-style market, he created Vendor Rowe as a welcoming, upscale marketplace where independent sellers could present their work beautifully.",
        secondary:
          "Today Vendor Rowe brings together antiques, handcrafted goods, boutique decor, collectibles, and seasonal finds under one roof.",
        stats: [
          { label: "Vendor Booths", value: "About 30" },
          { label: "Market Feel", value: "Boutique + Curated" },
          { label: "Founded By", value: "A Local Vendor" },
        ],
      },
      services: {
        eyebrow: "Featured Marketplace",
        title: "A thoughtful mix of finds, makers, and collected style",
        description:
          "Vendor Rowe is designed to feel discoverable and refined, with vendors carefully curated to create a boutique shopping experience instead of a cluttered market.",
      },
      gallery: {
        eyebrow: "Inside The Market",
        title: "A boutique atmosphere designed for slow discovery",
        description:
          "Use this image system to rotate seasonal merchandising, booth styling, and market mood without changing layout code.",
      },
      testimonials: {
        eyebrow: "Community Response",
        title: "Loved by shoppers and appealing to independent vendors",
        description:
          "Vendor Rowe is positioned as a premium local marketplace where shoppers can browse with intention and vendors can build a real business presence.",
      },
      cta: {
        eyebrow: "Become A Vendor",
        title: "Turn Your Booth Into a Business",
        description:
          "Vendor Rowe offers booth spaces for local vendors selling antiques, crafts, vintage items, decor, boutique products, and seasonal goods in a more elevated market environment.",
        primaryCta: {
          label: "Apply For a Booth",
          href: "/become-a-vendor",
        },
        secondaryCta: {
          label: "See Vendor Booths",
          href: "/vendors",
        },
        points: [
          "Curated vendor mix",
          "Boutique market presentation",
          "Seasonal merchandising opportunities",
        ],
      },
      location: {
        eyebrow: "Visit",
        title: "Vendor Rowe | Florence, South Carolina",
        description:
          "Plan your visit, browse the market, and discover a rotating mix of antiques, handcrafted goods, vintage decor, and boutique treasures.",
      },
    },
  },
  pages: {
    home: {
      title: "Vendor Rowe",
      description:
        "Vendor Rowe is a boutique vendor market in Florence, South Carolina featuring antiques, handcrafted goods, vintage finds, and curated decor.",
    },
    about: {
      title: "About Vendor Rowe",
      description:
        "Learn how Vendor Rowe was built by a local vendor who wanted a more curated marketplace experience in Florence, South Carolina.",
    },
    vendors: {
      title: "Vendors",
      description:
        "Browse example vendor booths at Vendor Rowe, Florence SC's boutique vendor market.",
    },
    becomeVendor: {
      title: "Become a Vendor",
      description:
        "Apply for a booth at Vendor Rowe and grow your business inside Florence's curated vendor marketplace.",
    },
    visit: {
      title: "Visit Us",
      description:
        "Visit Vendor Rowe in Florence, South Carolina and explore antiques, boutique decor, and handcrafted goods.",
    },
  },
  vendorsPage: {
    eyebrow: "Vendor Directory",
    title: "Curated booths, independent sellers, and ever-changing finds",
    description:
      "Vendor Rowe is home to approximately 30 booths. Inventory shifts often, which keeps the marketplace fresh for returning shoppers.",
  },
  becomeVendorPage: {
    eyebrow: "For Vendors",
    title: "Built for vendors who want a better market environment",
    description:
      "Vendor Rowe is ideal for sellers offering antiques, crafts, vintage items, boutique decor, collectibles, and giftable products in a more polished retail setting.",
    idealVendors: [
      "Antiques and collected vintage",
      "Handmade candles, soaps, and body care",
      "Boutique decor and styling pieces",
      "Seasonal home accents and gifting",
      "Paper goods, art, and local artisan products",
    ],
  },
  visitPage: {
    eyebrow: "Plan Your Visit",
    title: "A destination for thoughtful local shopping",
    description:
      "Vendor Rowe is designed to feel warm, refined, and easy to browse. Stop in to discover new vendors, seasonal collections, and one-of-a-kind finds.",
  },
  about: {
    introTitle: "Founded from the vendor side of the market",
    introBody:
      "Vendor Rowe started with a seller's perspective. The founder had first-hand experience in vendor markets and saw room for a more curated, elevated marketplace experience in Florence.",
    metrics: [
      { label: "Marketplace Type", value: "Boutique Vendor Market" },
      { label: "Location", value: "Florence, South Carolina" },
      { label: "Seller Focus", value: "Independent Vendors" },
    ],
  },
};
