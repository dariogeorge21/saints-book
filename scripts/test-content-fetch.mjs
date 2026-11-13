import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const contentDir = path.join(projectRoot, "content");
const indexPath = path.join(contentDir, "index.json");

async function verifyContent() {
  console.log("=== Verifying SaintsBook Content Architecture ===\n");

  // 1. Read index.json
  const rawIndex = await fs.readFile(indexPath, "utf-8");
  const index = JSON.parse(rawIndex);

  console.log(`✓ Master Index: Version ${index.version}`);
  console.log(`✓ Supported Languages: ${index.supportedLanguages.join(", ")}`);
  console.log(`✓ Total Indexed Saints: ${index.totalItems}`);

  // 2. Verify each saint's files exist and are populated
  for (const item of index.items) {
    console.log(`\nVerifying [${item.id}]: "${item.name}"`);

    // Check profile.json
    const profilePath = path.join(projectRoot, item.profile);
    const profileRaw = await fs.readFile(profilePath, "utf-8");
    const profile = JSON.parse(profileRaw);
    console.log(`  ✓ Profile loaded (${profile.name}, feast: ${profile.feastDate})`);

    // Check stories
    for (const [lang, stories] of Object.entries(item.stories)) {
      if (stories.shortStory) {
        const p = path.join(projectRoot, stories.shortStory);
        const text = await fs.readFile(p, "utf-8");
        console.log(`  ✓ ${lang}/shortStory.md (${text.length} chars)`);
      }
      if (stories.longStory) {
        const p = path.join(projectRoot, stories.longStory);
        const text = await fs.readFile(p, "utf-8");
        console.log(`  ✓ ${lang}/longStory.md (${text.length} chars)`);
      }
    }
  }

  // 3. Verify _template exists
  const templatePath = path.join(contentDir, "_template", "profile.json");
  const templateRaw = await fs.readFile(templatePath, "utf-8");
  const template = JSON.parse(templateRaw);
  console.log(`\n✓ Starter _template verified (${template.name})`);

  console.log("\n🎉 All content files, indexes, profiles, and stories verified successfully!");
}

verifyContent().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
