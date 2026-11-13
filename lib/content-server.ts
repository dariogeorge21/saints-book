import fs from "fs/promises";
import path from "path";
import {
  getSaintSummary,
  type ContentLanguage,
  type StoryKind,
  type SaintProfile,
  type CompleteSaint,
} from "./content";

function getProjectPath(...segments: string[]): string {
  return path.join(process.cwd(), ...segments);
}

/**
 * Loads the structured profile for a saint from content/[id]/profile.json.
 * Server-only function.
 */
export async function getSaintProfile(id: string): Promise<SaintProfile | null> {
  const summary = getSaintSummary(id);
  const relPath = summary?.profile || path.join("content", id, "profile.json");
  const fullPath = getProjectPath(relPath);

  try {
    const raw = await fs.readFile(fullPath, "utf-8");
    return JSON.parse(raw) as SaintProfile;
  } catch (error) {
    console.error(`[content] Failed to load profile for ${id}:`, error);
    return null;
  }
}

/**
 * Loads the raw markdown story for a saint.
 * Server-only function.
 */
export async function getSaintStory(
  id: string,
  language: ContentLanguage = "en",
  kind: StoryKind = "shortStory"
): Promise<string | null> {
  const candidates = [
    getProjectPath("content", id, language, `${kind}.md`),
    getProjectPath(
      "content",
      id,
      language,
      kind === "longStory" ? "LongStory.md" : "ShortStory.md"
    ),
  ];

  for (const filePath of candidates) {
    try {
      const content = await fs.readFile(filePath, "utf-8");
      return content;
    } catch {
      // Continue to next candidate
    }
  }

  return null;
}

/**
 * Loads the complete saint bundle (profile + all stories in all languages).
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
