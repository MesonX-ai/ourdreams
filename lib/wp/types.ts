import { z } from "zod";

/**
 * WordPress / headless content types. Explicit interfaces are the canonical
 * view-model types; zod schemas validate at the data edge. The API and our
 * fixtures supply every field, so schemas stay required.
 */

export type IntegrationCategory = "hris" | "crm" | "messaging" | "calendar" | "payroll" | "other";

export interface WpPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  featuredMedia?: string;
}

export interface CaseStudy extends WpPost {
  company: string;
  industry: string;
  resultMetric: string;
}

export interface Guide extends WpPost {
  readingMinutes: number;
  topic: string;
}

export interface Integration {
  slug: string;
  name: string;
  category: IntegrationCategory;
  blurb: string;
  angle: number;
}

export interface Collection {
  slug: string;
  name: string;
  description: string;
  cover?: string;
  productSlugs: string[];
}

export const wpPostSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string().default(""),
  date: z.string(),
  featuredMedia: z.string().optional(),
});

export const caseStudySchema = wpPostSchema.extend({
  company: z.string(),
  industry: z.string(),
  resultMetric: z.string(),
});

export const guideSchema = wpPostSchema.extend({
  readingMinutes: z.number(),
  topic: z.string(),
});

export const integrationSchema = z.object({
  slug: z.string(),
  name: z.string(),
  category: z.enum(["hris", "crm", "messaging", "calendar", "payroll", "other"]),
  blurb: z.string(),
  angle: z.number(),
});

export const collectionSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  cover: z.string().optional(),
  productSlugs: z.array(z.string()),
});

export const parsePosts = (d: unknown): WpPost[] => z.array(wpPostSchema).parse(d) as WpPost[];
export const parseCaseStudies = (d: unknown): CaseStudy[] => z.array(caseStudySchema).parse(d) as CaseStudy[];
export const parseGuides = (d: unknown): Guide[] => z.array(guideSchema).parse(d) as Guide[];
export const parseIntegrations = (d: unknown): Integration[] => z.array(integrationSchema).parse(d) as Integration[];
export const parseCollections = (d: unknown): Collection[] => z.array(collectionSchema).parse(d) as Collection[];
