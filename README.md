# Vendor Rowe Demo Site

This Astro demo was built from the Ordinis Digital Services local-business template and customized into a boutique vendor marketplace concept for Florence, South Carolina.

## Pages

- `/`
- `/about-vendor-rowe`
- `/vendors`
- `/become-a-vendor`
- `/visit-us`

## Core files to edit

- `src/config/business.ts`
  Business name, location, hours, phone, email, map embed, SEO title suffix
- `src/config/navigation.ts`
  Header navigation labels and routes
- `src/config/site.ts`
  Homepage structure, page metadata, CTA copy, about copy, vendor messaging
- `src/config/theme.ts`
  Seasonal theme system, active season, seasonal banners, hero images, promotion section
- `src/content/services/index.ts`
  Marketplace category cards
- `src/content/vendors/index.ts`
  Vendor booth listing data
- `src/content/testimonials/index.ts`
  Shopper and vendor testimonials
- `src/content/gallery/index.ts`
  Marketplace imagery

## Seasonal theme switching

Seasonal retheming is controlled in `src/config/theme.ts`.

To switch themes:

1. Change `activeSeason` to one of:
   - `spring`
   - `summer`
   - `fall`
   - `winter`
   - `christmas`
   - `halloween`
2. Update that season's:
   - `primaryColor`
   - `accentColor`
   - `surfaceColor`
   - `banner`
   - `heroImages`
   - `promotion`

No layout code changes are required for seasonal swaps.

## Build

```bash
npm install
npm run dev
npm run build
```
