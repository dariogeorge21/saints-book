import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const contentDir = path.join(projectRoot, "content");
const indexFile = path.join(contentDir, "index.json");

/**
 * Extracts clean narrative paragraphs from markdown, filtering out headings (#, ##).
 */
function extractParagraphsFromMarkdown(markdown) {
  if (!markdown) return [];
  // Strip markdown headings (# ...)
  const lines = markdown
    .split(/\r?\n/)
    .filter((line) => !line.trim().startsWith("#"))
    .join("\n");

  return lines
    .split(/\n\s*\n/)
    .map((block) => block.trim().replace(/\s+/g, " "))
    .filter((block) => block.length > 0);
}

async function syncIndex() {
  console.log("🔍 Scanning content directory at:", contentDir);

  const entries = await fs.readdir(contentDir, { withFileTypes: true });
  const saintDirs = entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => entry.name)
    .sort();

  const items = [];

  for (const dirName of saintDirs) {
    const saintPath = path.join(contentDir, dirName);
    const profilePath = path.join(saintPath, "profile.json");

    try {
      const profileRaw = await fs.readFile(profilePath, "utf-8");
      const profile = JSON.parse(profileRaw);

      // Detect languages and story files
      const subEntries = await fs.readdir(saintPath, { withFileTypes: true });
      const langDirs = subEntries
        .filter((e) => e.isDirectory())
        .map((e) => e.name)
        .sort();

      const storiesPaths = {};
      const parsedStories = {};

      for (const lang of langDirs) {
        const langPath = path.join(saintPath, lang);
        const files = await fs.readdir(langPath);

        const shortStoryFile = files.find(
          (f) => f.toLowerCase() === "shortstory.md"
        );
        const longStoryFile = files.find(
          (f) => f.toLowerCase() === "longstory.md"
        );

        storiesPaths[lang] = {
          ...(shortStoryFile
            ? { shortStory: `content/${dirName}/${lang}/${shortStoryFile}` }
            : {}),
          ...(longStoryFile
            ? { longStory: `content/${dirName}/${lang}/${longStoryFile}` }
            : {}),
        };

        if (longStoryFile) {
          const longStoryRaw = await fs.readFile(
            path.join(langPath, longStoryFile),
            "utf-8"
          );
          parsedStories[lang] = extractParagraphsFromMarkdown(longStoryRaw);
        }
      }

      // Merge translations with parsed stories
      const mergedTranslations = { ...profile.translations };
      if (mergedTranslations.ml) {
        mergedTranslations.ml = {
          ...mergedTranslations.ml,
          story: parsedStories.ml || mergedTranslations.ml.story || [],
        };
      }
      if (mergedTranslations.hi) {
        mergedTranslations.hi = {
          ...mergedTranslations.hi,
          story: parsedStories.hi || mergedTranslations.hi.story || [],
        };
      }

      items.push({
        id: profile.id || dirName,
        name: profile.name,
        latinName: profile.latinName || "",
        epithet: profile.epithet,
        dateOfBirth: profile.dateOfBirth || "",
        beatifiedDate: profile.beatifiedDate || "",
        canonisedDate: profile.canonisedDate || "",
        feastDate: profile.feastDate,
        feastMonth: profile.feastMonth,
        era: profile.era,
        location: profile.location,
        patronage: profile.patronage || [],
        attributes: profile.attributes || "",
        quote: profile.quote || "",
        story: parsedStories.en || [],
        translations: mergedTranslations,
        path: `content/${dirName}`,
        profile: `content/${dirName}/profile.json`,
        languages: langDirs,
        stories: storiesPaths,
      });

      console.log(`✓ Processed ${dirName} (${langDirs.join(", ")})`);
    } catch (err) {
      console.warn(`⚠️ Skipping ${dirName}: missing or invalid profile.json (${err.message})`);
    }
  }

  const indexData = {
    $schema: "./index.schema.json",
    version: "1.0.0",
    title: "SaintsBook Content Index",
    description: "Primary registry and content manifest for Christian saints chronicles",
    defaultLanguage: "en",
    supportedLanguages: ["en", "ml", "hi"],
    totalItems: items.length,
    items,
  };

  await fs.writeFile(indexFile, JSON.stringify(indexData, null, 2) + "\n", "utf-8");
  console.log(`\n🎉 Successfully synced content/index.json with ${items.length} saints.`);
}

syncIndex().catch((err) => {
  console.error("Error syncing index:", err);
  process.exit(1);
});
