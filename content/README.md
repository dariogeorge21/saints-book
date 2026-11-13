# SaintsBook Content Directory

This directory houses the structured content archive for SaintsBook. It separates metadata (`profile.json`) from narrative markdown chronicles (`shortStory.md`, `longStory.md`) with multi-language support (`en`, `ml`, `hi`).

---

## Directory Structure

```text
content/
├── index.json               # Master registry of all saints for instant fetching
├── index.schema.json        # JSON Schema for index.json (IDE autocomplete & validation)
├── README.md                # Content organization documentation
│
├── _template/               # Starter template to copy when adding a new saint
│   ├── profile.json         # Saint biographical metadata & translations
│   ├── en/
│   │   ├── shortStory.md    # English summary (1-2 paragraphs)
│   │   └── longStory.md     # English full chronicle with markdown headings
│   ├── ml/
│   │   ├── shortStory.md    # Malayalam summary
│   │   └── longStory.md     # Malayalam full chronicle
│   └── hi/
│       ├── shortStory.md    # Hindi summary
│       └── longStory.md     # Hindi full chronicle
│
├── st-alphonsa/             # Saint Alphonsa content bundle
│   ├── profile.json
│   ├── en/
│   │   ├── shortStory.md
│   │   └── longStory.md
│   ├── ml/
│   │   ├── shortStory.md
│   │   └── longStory.md
│   └── hi/
│       ├── shortStory.md
│       └── longStory.md
│
└── st-euphrasia/            # Saint Euphrasia content bundle
    ├── profile.json
    ├── en/
    │   ├── shortStory.md
    │   └── longStory.md
    ├── ml/
    │   ├── shortStory.md
    │   └── longStory.md
    └── hi/
        ├── shortStory.md
        └── longStory.md
```

---

## How to Add a New Saint (3 Simple Steps)

### Step 1: Duplicate the `_template` folder
Copy the `content/_template` folder and rename it with your saint's kebab-case slug (e.g. `st-francis-of-assisi`):

```bash
# Example
cp -r content/_template content/st-francis-of-assisi
```

### Step 2: Fill in `profile.json` and Markdown files
1. Open `content/st-[slug]/profile.json` and fill in:
   - `id`: Must match the folder name (e.g., `"st-francis-of-assisi"`).
   - `name`, `latinName`, `epithet`, `era`, `feastDate`, `location`, `patronage`, `attributes`, `quote`.
   - `translations`: Add Malayalam (`ml`) and Hindi (`hi`) metadata if available.
2. Edit stories:
   - `en/shortStory.md`: 1-2 paragraphs for quick preview cards.
   - `en/longStory.md`: Full biographical chapters with `#` and `##` headings.
   - `ml/` and `hi/`: Translations for Malayalam and Hindi.

### Step 3: Register the Saint in `content/index.json`
Add an entry to the `items` array in `content/index.json`:

```json
{
  "id": "st-francis-of-assisi",
  "name": "St. Francis of Assisi",
  "latinName": "Sanctus Franciscus Assisiensis",
  "epithet": "Founder of the Franciscans • Patron of Ecology",
  "feastDate": "October 4",
  "feastMonth": "October",
  "era": "Medieval",
  "location": "Assisi, Italy",
  "patronage": ["Animals", "Ecology", "Italy", "Merchants", "Peace"],
  "path": "content/st-francis-of-assisi",
  "profile": "content/st-francis-of-assisi/profile.json",
  "languages": ["en", "ml", "hi"],
  "stories": {
    "en": {
      "shortStory": "content/st-francis-of-assisi/en/shortStory.md",
      "longStory": "content/st-francis-of-assisi/en/longStory.md"
    },
    "ml": {
      "shortStory": "content/st-francis-of-assisi/ml/shortStory.md",
      "longStory": "content/st-francis-of-assisi/ml/longStory.md"
    },
    "hi": {
      "shortStory": "content/st-francis-of-assisi/hi/shortStory.md",
      "longStory": "content/st-francis-of-assisi/hi/longStory.md"
    }
  }
}
```
*Tip: Update `"totalItems"` count in `content/index.json`.*

---

## Programmatic Fetching in Code

Use `@/lib/content` for fetching content in your Next.js components or API handlers:

```typescript
import {
  getContentIndex,
  getSaintSummary,
  getSaintProfile,
  getSaintStory,
  getCompleteSaint,
} from "@/lib/content";

// 1. Fetch entire index (works in client and server)
const index = getContentIndex();
console.log(index.items);

// 2. Fetch saint summary from index
const summary = getSaintSummary("st-alphonsa");

// 3. Fetch structured profile (Server-side)
const profile = await getSaintProfile("st-alphonsa");

// 4. Fetch markdown story (Server-side)
const shortStory = await getSaintStory("st-alphonsa", "en", "shortStory");
const longStoryMl = await getSaintStory("st-alphonsa", "ml", "longStory");

// 5. Fetch complete bundle (profile + all stories)
const completeSaint = await getCompleteSaint("st-alphonsa");
```
