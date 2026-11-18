import fs from "fs/promises";
import path from "path";
import {
  getSaintSummary,
  type ContentLanguage,
  type StoryKind,
  type SaintProfile,
  type CompleteSaint,
} from "./content";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function getContentPath(...segments: string[]): string {
  return path.join(CONTENT_ROOT, ...segments);
}

/**
 * Loads the structured profile for a saint from content/[id]/profile.json.
 * Uses index.json mapping if available, or falls back to standard content path.
 * Server-only function.
 */
export async function getSaintProfile(id: string): Promise<SaintProfile | null> {
  const summary = getSaintSummary(id);
  const rel = summary?.profile ? summary.profile.replace(/^content[\\/]/, "") : `${id}/profile.json`;
  const fullPath = path.join(process.cwd(), "content", rel);

  try {
    const raw = await fs.readFile(/*turbopackIgnore: true*/ fullPath, "utf-8");
    return JSON.parse(raw) as SaintProfile;
  } catch (error) {
    console.error(`[content] Failed to load profile for ${id}:`, error);
    return null;
  }
}

/**
 * Loads the raw markdown story for a saint directly from the content folder.
 * Uses index.json story mapping as the single source of truth.
 * Server-only function.
 */
export async function getSaintStory(
  id: string,
  language: ContentLanguage = "en",
  kind: StoryKind = "shortStory"
): Promise<string | null> {
  const summary = getSaintSummary(id);

  // 1. First priority: mapped file path registered in content/index.json
  const mappedRelPath = summary?.stories?.[language]?.[kind];
  if (mappedRelPath) {
    try {
      const rel = mappedRelPath.replace(/^content[\\/]/, "");
      const fullMappedPath = path.join(process.cwd(), "content", rel);
      return await fs.readFile(/*turbopackIgnore: true*/ fullMappedPath, "utf-8");
    } catch {
      // Continue to candidate paths if mapped file failed
    }
  }

  // 2. Direct filesystem resolution in content folder
  const candidates = [
    path.join(process.cwd(), "content", id, language, `${kind}.md`),
    path.join(
      process.cwd(),
      "content",
      id,
      language,
      kind === "longStory" ? "LongStory.md" : "ShortStory.md"
    ),
  ];

  for (const filePath of candidates) {
    try {
      const content = await fs.readFile(/*turbopackIgnore: true*/ filePath, "utf-8");
      return content;
    } catch {
      // Continue to next candidate
    }
  }

  return null;
}

/**
 * Loads the complete saint bundle (profile + all stories in all languages).
 * Fetches all markdown files from the content folder mapped in index.json.
 * Server-only function.
 */
export async function getCompleteSaint(id: string): Promise<CompleteSaint | null> {
  const profile = await getSaintProfile(id);
  if (!profile) return null;

  const summary = getSaintSummary(id);
  const languages: ContentLanguage[] = summary?.languages || ["en", "ml", "hi"];
  const stories: CompleteSaint["stories"] = {};

  for (const lang of languages) {
    const [shortStory, longStory] = await Promise.all([
      getSaintStory(id, lang, "shortStory"),
      getSaintStory(id, lang, "longStory"),
    ]);

    stories[lang] = {
      ...(shortStory ? { shortStory } : {}),
      ...(longStory ? { longStory } : {}),
    };
  }

  return {
    profile,
    stories,
  };
}
