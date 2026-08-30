import { parseCollections } from "../types";

export const collections = parseCollections([
  {
    slug: "new-hire-welcome",
    name: "New Hire Welcome",
    description: "Everything a first-day send needs to feel human.",
    cover: "/placeholder-collection-1.svg",
    productSlugs: ["aurora-smart-mug", "heirloom-notebook", "linen-commuter-tote"],
  },
  {
    slug: "executive-thanks",
    name: "Executive Thanks",
    description: "Considered luxury for the people who matter most.",
    cover: "/placeholder-collection-2.svg",
    productSlugs: ["champagne-gift-box", "terra-diffuser-set"],
  },
  {
    slug: "wellbeing-month",
    name: "Wellbeing Month",
    description: "Calm, screen-free moments for team recharge.",
    cover: "/placeholder-collection-3.svg",
    productSlugs: ["terra-diffuser-set", "bloom-tea-collection", "zero-waste-desk-kit"],
  },
  {
    slug: "earth-day",
    name: "Earth Day",
    description: "Plastic-free, carbon-neutral sends.",
    cover: "/placeholder-collection-4.svg",
    productSlugs: ["zero-waste-desk-kit", "bloom-tea-collection"],
  },
]);

export const collectionBySlug = (slug: string) =>
  collections.find((c) => c.slug === slug);
