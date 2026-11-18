import indexJson from "../content/index.json";

export type ContentLanguage = "en" | "ml" | "hi";
export type StoryKind = "shortStory" | "longStory";

export interface SaintTranslation {
  name: string;
  epithet: string;
  dateOfBirth?: string;
  beatifiedDate?: string;
  canonisedDate?: string;
  feastDate?: string;
  location?: string;
  patronage?: string[];
  attributes?: string;
  quote?: string;
  story?: string[];
}

export interface Saint {
  id: string;
  name: string;
  latinName?: string;
  epithet: string;
  dateOfBirth: string;
  beatifiedDate: string;
  canonisedDate: string;
  feastDate: string;
  feastMonth: string;
  era: string;
  location: string;
  patronage: string[];
  attributes: string;
  quote: string;
  story?: string[];
  translations?: {
    ml?: SaintTranslation;
    hi?: SaintTranslation;
  };
}

export interface ContentStoryPaths {
  shortStory?: string;
  longStory?: string;
}

export interface ContentSaintItem extends Saint {
  path: string;
  profile: string;
  languages: ContentLanguage[];
  stories: Record<string, ContentStoryPaths>;
}

export interface ContentIndex {
  version: string;
  title: string;
  description: string;
  defaultLanguage: ContentLanguage;
  supportedLanguages: ContentLanguage[];
  totalItems: number;
  items: ContentSaintItem[];
}

export interface SaintProfileTranslation {
  name: string;
  epithet: string;
  dateOfBirth?: string;
  beatifiedDate?: string;
  canonisedDate?: string;
  feastDate?: string;
  location?: string;
  patronage?: string[];
  attributes?: string;
  quote?: string;
}

export interface SaintProfile {
  id: string;
  name: string;
  latinName?: string;
  epithet: string;
  dateOfBirth: string;
  beatifiedDate: string;
  canonisedDate: string;
  feastDate: string;
  feastMonth: string;
  era: string;
  location: string;
  patronage: string[];
  attributes: string;
  quote: string;
  translations?: {
    ml?: SaintProfileTranslation;
    hi?: SaintProfileTranslation;
  };
}

export interface CompleteSaint {
  profile: SaintProfile;
  stories: Record<
    string,
    {
      shortStory?: string;
      longStory?: string;
    }
  >;
}

/**
 * All active saints loaded directly from the content/ directory (via index.json).
 * Safe for use in both Client and Server Components.
 */
export const SAINTS: Saint[] = ((indexJson as unknown as ContentIndex).items || []) as unknown as Saint[];

/**
 * Backward-compatible alias for SAINTS.
 */
export const SAINTS_DATA: Saint[] = SAINTS;

/**
 * Returns all active saints from the content directory.
 */
export function getContentSaints(): Saint[] {
  return SAINTS;
}

/**
 * Look up a saint by id/slug from the content directory.
 */
export function getSaintById(id: string): Saint | undefined {
  return SAINTS.find((s) => s.id === id);
}

/**
 * Returns the entire content index metadata and items list.
 * Safe for both Server and Client environments.
 */
export function getContentIndex(): ContentIndex {
  return indexJson as unknown as ContentIndex;
}

/**
 * Retrieves the index summary for a specific saint by slug / id.
 */
export function getSaintSummary(id: string): ContentSaintItem | undefined {
  const index = getContentIndex();
  return index.items.find((item) => item.id === id);
}

/**
 * Returns all registered saint IDs from content/index.json.
 */
export function getAllSaintIds(): string[] {
  return getContentIndex().items.map((item) => item.id);
}

/**
 * Search content index by name, epithet, patronage, or location.
 */
export function searchContentIndex(query: string): ContentSaintItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return getContentIndex().items;

  return getContentIndex().items.filter((item) => {
    return (
      item.name.toLowerCase().includes(q) ||
      item.epithet.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.patronage.some((p) => p.toLowerCase().includes(q))
    );
  });
}
