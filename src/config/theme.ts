import siteTheme from "../content/siteTheme.json";

const seasonalThemes = {
  default: {
    label: "Default",
    primaryColor: "#70523d",
    accentColor: "#8a9a7b",
    surfaceColor: "#f8f1e7",
    banner: {
      eyebrow: "Curated Vendor Market",
      text: "Warm displays, rotating vendors, and collected finds set the tone year-round.",
    },
    heroImages: [
      "/images/market-interior.svg",
      "/images/vendor-booth.svg",
      "/images/antique-vignette.svg",
    ],
    promotion: {
      eyebrow: "Template Feature",
      title: "A grounded boutique look that works in every season.",
      description:
        "Leave the theme on default for an evergreen Vendor Rowe presentation with no seasonal styling applied.",
      cta: {
        label: "Explore Vendors",
        href: "/vendors",
      },
    },
  },
  spring: {
    label: "Spring",
    primaryColor: "#2f7a4b",
    accentColor: "#4ade80",
    surfaceColor: "#ecfdf3",
    banner: {
      eyebrow: "Spring Artisan Market",
      text: "Fresh displays, botanical accents, and new vendor arrivals are featured this season.",
    },
    heroImages: [
      "/images/market-spring.svg",
      "/images/vendor-booth.svg",
      "/images/handmade-display.svg",
    ],
    promotion: {
      eyebrow: "Spring Feature",
      title: "A softer season for artisan goods and collected charm.",
      description:
        "Rotate in spring displays, seasonal makers, and garden-inspired decor without changing any page layout code.",
      cta: {
        label: "Plan A Visit",
        href: "/visit-us",
      },
    },
  },
  fall: {
    label: "Fall",
    primaryColor: "#7c2d12",
    accentColor: "#ea580c",
    surfaceColor: "#fff7ed",
    banner: {
      eyebrow: "Fall Market",
      text: "Layered textures, harvest color, and collectible finds set the mood this season.",
    },
    heroImages: [
      "/images/market-fall.svg",
      "/images/vendor-booth.svg",
      "/images/antique-vignette.svg",
    ],
    promotion: {
      eyebrow: "Seasonal Feature",
      title: "Fall styling makes Vendor Rowe feel especially discoverable.",
      description:
        "Use the seasonal promo block for themed vendor weekends, featured collections, or fall shopping events.",
      cta: {
        label: "View Seasonal Finds",
        href: "/vendors",
      },
    },
  },
  christmas: {
    label: "Christmas",
    primaryColor: "#14532d",
    accentColor: "#dc2626",
    surfaceColor: "#fef2f2",
    banner: {
      eyebrow: "Holiday Vendor Market",
      text: "Giftable finds, festive decor, and seasonal booth styling make the market feel special.",
    },
    heroImages: [
      "/images/market-christmas.svg",
      "/images/handmade-display.svg",
      "/images/market-interior.svg",
    ],
    promotion: {
      eyebrow: "Holiday Feature",
      title: "Seasonal gifting and boutique holiday merchandising without a redesign.",
      description:
        "Switch to the Christmas theme to promote gift shopping, holiday weekends, and festive vendor events.",
      cta: {
        label: "Become A Holiday Vendor",
        href: "/become-a-vendor",
      },
    },
  },
  valentine: {
    label: "Valentine",
    primaryColor: "#881337",
    accentColor: "#ec4899",
    surfaceColor: "#fff1f2",
    banner: {
      eyebrow: "Valentine Boutique",
      text: "Romantic merchandising, giftable details, and boutique styling bring a softer seasonal mood.",
    },
    heroImages: [
      "/images/handmade-display.svg",
      "/images/market-interior.svg",
      "/images/market-spring.svg",
    ],
    promotion: {
      eyebrow: "Valentine Feature",
      title: "A gift-forward theme for February events and boutique weekends.",
      description:
        "Use the Valentine theme to spotlight date-night gifting, floral color, and curated limited-run vendor events.",
      cta: {
        label: "Plan A Boutique Visit",
        href: "/visit-us",
      },
    },
  },
} as const;

export type SeasonKey = keyof typeof seasonalThemes;

const fallbackSeason: SeasonKey = "default";
const configuredTheme = siteTheme.theme;
const isSeasonKey = (value: string): value is SeasonKey =>
  Object.prototype.hasOwnProperty.call(seasonalThemes, value);

export const activeSeason: SeasonKey = isSeasonKey(configuredTheme) ? configuredTheme : fallbackSeason;
const currentSeason = seasonalThemes[activeSeason];

export const theme = {
  logo: "/images/vendor-rowe-logo.svg",
  fontHeading: "'Cormorant Garamond', Georgia, serif",
  fontBody: "'Manrope', 'Segoe UI', sans-serif",
  neutralPalette: {
    cream: "#f8f1e7",
    wood: "#70523d",
    sage: "#8a9a7b",
    charcoal: "#2b2926",
  },
  seasonalThemes,
  activeSeason,
  currentSeason,
  primaryColor: currentSeason.primaryColor,
  accentColor: currentSeason.accentColor,
  surfaceColor: currentSeason.surfaceColor,
};
