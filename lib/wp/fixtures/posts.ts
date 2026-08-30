import { parsePosts, parseCaseStudies, parseGuides } from "../types";

export const blogPosts = parsePosts([
  { id: 201, slug: "the-anatomy-of-a-memorable-welcome-gift", title: "The anatomy of a memorable welcome gift", excerpt: "Why the first 30 days set the tone for tenure — and what to put in the box.", date: "2026-07-12", featuredMedia: "/placeholder-post-1.svg" },
  { id: 202, slug: "automating-anniversaries-without-losing-the-human-touch", title: "Automating anniversaries without losing the human touch", excerpt: "A playbook for scale that still feels handwritten.", date: "2026-06-28", featuredMedia: "/placeholder-post-2.svg" },
  { id: 203, slug: "budget-tiers-that-actually-land", title: "Budget tiers that actually land", excerpt: "How to tier sends by relationship, not just org level.", date: "2026-06-04", featuredMedia: "/placeholder-post-3.svg" },
]);

export const caseStudies = parseCaseStudies([
  { id: 301, slug: "northwind-scale", title: "Northwind scaled onboarding to 4,000 hires", excerpt: "A logistics leader turned first-day swag into a retention lever.", company: "Northwind Logistics", industry: "Logistics", resultMetric: "+18% 90-day retention", date: "2026-05-20", featuredMedia: "/placeholder-case-1.svg" },
  { id: 302, slug: "lumen-anniversaries", title: "Lumen automated 12k anniversaries a year", excerpt: "Zero manual sends, 100% on-brand.", company: "Lumen Health", industry: "Healthcare", resultMetric: "12k sends automated", date: "2026-04-15", featuredMedia: "/placeholder-case-2.svg" },
  { id: 303, slug: "atlas-global", title: "Atlas unified gifting across 9 regions", excerpt: "One vendor of record, local fulfilment everywhere.", company: "Atlas Technologies", industry: "Technology", resultMetric: "9 regions, 1 console", date: "2026-03-02", featuredMedia: "/placeholder-case-3.svg" },
]);

export const guides = parseGuides([
  { id: 401, slug: "gifting-policy-template", title: "Build a gifting policy in a afternoon", excerpt: "A copy-paste template for procurement and people teams.", readingMinutes: 7, topic: "Operations", date: "2026-07-01", featuredMedia: "/placeholder-guide-1.svg" },
  { id: 402, slug: "redemption-experience-playbook", title: "Designing a redemption experience people love", excerpt: "The recipient side, step by step.", readingMinutes: 9, topic: "Experience", date: "2026-06-10", featuredMedia: "/placeholder-guide-2.svg" },
]);
