export type CTA = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

export type HighlightItem = {
  value: string;
  label: string;
};

export type InfoItem = {
  label: string;
  value: string;
};

export type SectionKey =
  | "hero"
  | "story"
  | "seasonalPromo"
  | "services"
  | "testimonials"
  | "cta"
  | "location"
  | "hours"
  | "gallery"
  | "team";

export type ServiceItem = {
  title: string;
  summary: string;
  description?: string;
  icon?: string;
  tags?: string[];
};

export type TestimonialItem = {
  quote: string;
  author: string;
  role: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image?: string;
};

export type GalleryItem = {
  title: string;
  subtitle?: string;
  image?: string;
};

export type VendorBooth = {
  booth: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  featured?: boolean;
};

export type SeasonalPromotion = {
  eyebrow: string;
  title: string;
  description: string;
  cta: CTA;
};
