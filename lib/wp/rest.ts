import { collections, collectionBySlug } from "./fixtures/collections";
import { integrations } from "./fixtures/integrations";
import { caseStudies, guides, blogPosts } from "./fixtures/posts";
import { caseStudySchema, guideSchema, wpPostSchema, type CaseStudy, type Collection, type Guide, type Integration, type WpPost } from "./types";

/**
 * WordPress / headless content access. Today reads schema-accurate fixtures;
 * Phase 5 swaps to live `wp-json` (same shape, same zod validation).
 */

export async function getBlogPosts(): Promise<WpPost[]> {
  return blogPosts;
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return caseStudies;
}

export async function getGuides(): Promise<Guide[]> {
  return guides;
}

export async function getIntegrations(): Promise<Integration[]> {
  return integrations;
}

export async function getCollections(): Promise<Collection[]> {
  return collections;
}

export async function getCollection(slug: string): Promise<Collection | null> {
  return collectionBySlug(slug) ?? null;
}

export { caseStudySchema, guideSchema, wpPostSchema };
