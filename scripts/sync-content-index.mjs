import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const contentDir = path.join(projectRoot, "content");
const indexFile = path.join(contentDir, "index.json");

/**
 * Synchronizes content/index.json as the master registry manifest.
 *
 * Architecture Rule:
 * Stories are NEVER inlined or typed in index.json.
 * index.json maps saint metadata (from profile.json) and registers the exact file paths
 * to the markdown chronicles (shortStory.md, longStory.md) across all supported languages.
 */
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

      // Detect language subdirectories (e.g. en, hi, ml), excluding special folders like 'images'
      const subEntries = await fs.readdir(saintPath, { withFileTypes: true });
      const langDirs = subEntries
        .filter((e) => e.isDirectory() && e.name !== "images")
        .map((e) => e.name)
        .sort();

      // Detect saint images directory and resolve valid image files
      const imagesPath = path.join(saintPath, "images");
      let imagesList = [];
      let hasImagesDir = false;

      try {
        const imgStat = await fs.stat(imagesPath);
        if (imgStat.isDirectory()) {
          hasImagesDir = true;
          const imgFiles = await fs.readdir(imagesPath);
          const validExts = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg", ".avif"]);
          imagesList = imgFiles
            .filter((file) => validExts.has(path.extname(file).toLowerCase()))
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
            .map((file) => `/api/content/${dirName}/images/${file}`);
        }
      } catch {
        // No images directory present
      }

      const storiesPaths = {};

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
      }

      // Clean translations without any inlined story arrays
      const cleanTranslations = {};
      if (profile.translations) {
        for (const [langCode, trans] of Object.entries(profile.translations)) {
          const { story: _omittedStory, ...restOfTranslation } = trans;
          cleanTranslations[langCode] = restOfTranslation;
        }
      }

      // Push clean registry entry mapping the story files
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
        translations: cleanTranslations,
        path: `content/${dirName}`,
        profile: `content/${dirName}/profile.json`,
        imagesDir: hasImagesDir ? `content/${dirName}/images` : undefined,
        images: imagesList,
        languages: langDirs,
        stories: storiesPaths,
      });

      console.log(`✓ Processed ${dirName} (${langDirs.join(", ")} | ${imagesList.length} images)`);
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
  console.log(`\n🎉 Successfully synced content/index.json with ${items.length} saints (stories mapped from content files).`);
}

syncIndex().catch((err) => {
  console.error("Error syncing index:", err);
  process.exit(1);
});
