# Contributing to SaintsBook 📖✝️

Thank you for your interest in contributing to **SaintsBook**! We welcome community contributions to expand our archival chronicles of Christian saints, refine biographical historical records, improve multi-language translations (English, Malayalam, Hindi), and enhance frontend performance.

---

## Table of Contents

1. [Architectural Principle: Single Source of Truth](#1-architectural-principle-single-source-of-truth)
2. [Content Directory Structure](#2-content-directory-structure)
3. [How to Add a New Saint (Step-by-Step)](#3-how-to-add-a-new-saint-step-by-step)
4. [How to Update an Existing Saint](#4-how-to-update-an-existing-saint)
5. [Markdown Formatting Standards](#5-markdown-formatting-standards)
6. [Code & Frontend Guidelines](#6-code--frontend-guidelines)
7. [Development Workflow & Verification](#7-development-workflow--verification)
8. [Submitting a Pull Request](#8-submitting-a-pull-request)

---

## 1. Architectural Principle: Single Source of Truth

SaintsBook strictly adheres to a **single source of truth** architecture:

```
[Markdown Files in content/] 
           │
           ▼
[Mapped in content/index.json] (file paths & metadata only, NO inlined story text)
           │
           ▼
[Server Component & API Layer] (lib/content-server.ts)
           │
           ▼
[Client-Side Reader] (components/markdown-renderer.tsx)
```

> [!IMPORTANT]
> **Zero Story Duplication**: Narrative text must **never** be typed into `content/index.json` or hardcoded in frontend components. Stories belong exclusively in `.md` files inside the `content/` folder.

---

## 2. Content Directory Structure

All content is maintained under the `content/` folder:

```text
content/
├── index.json               # Master registry manifest (mapped paths & metadata)
├── index.schema.json        # JSON Schema for index validation
├── README.md                # Content organization overview
│
├── _template/               # Blueprint starter to copy for new saints
│   ├── profile.json         # Saint biographical metadata & translation dictionaries
│   ├── en/
│   │   ├── shortStory.md    # English summary (1-3 paragraphs)
│   │   └── longStory.md     # Full English chronicle with markdown chapters
│   ├── ml/
│   │   ├── shortStory.md    # Malayalam summary
│   │   └── longStory.md     # Full Malayalam chronicle
│   └── hi/
│       ├── shortStory.md    # Hindi summary
│       └── longStory.md     # Full Hindi chronicle
│
├── st-alphonsa/             # Saint Alphonsa bundle
├── st-euphrasia/            # Saint Euphrasia bundle
└── st-francis-of-assisi/    # Saint Francis of Assisi bundle
```

---

## 3. How to Add a New Saint (Step-by-Step)

Adding a saint takes less than 5 minutes once your research is ready:

### Step 1: Copy the Template
Duplicate the `content/_template` folder and rename it with your saint's kebab-case slug (e.g. `st-anthony-of-padua`):

```bash
# On Windows PowerShell
Copy-Item -Recurse content/_template content/st-anthony-of-padua

# On Bash / macOS / Linux
cp -r content/_template content/st-anthony-of-padua
```

### Step 2: Edit `profile.json`
Open `content/st-[slug]/profile.json` and fill in the biographical metadata:

```json
{
  "id": "st-anthony-of-padua",
  "name": "St. Anthony of Padua",
  "latinName": "Sanctus Antonius Patavinus",
  "epithet": "Doctor of the Church • Patron of Lost Articles",
  "dateOfBirth": "15 August 1195",
  "beatifiedDate": "Pre-congregation",
  "canonisedDate": "30 May 1232 by Pope Gregory IX",
  "feastDate": "June 13",
  "feastMonth": "June",
  "era": "Medieval",
  "location": "Lisbon, Portugal & Padua, Italy",
  "patronage": ["Lost Items", "The Poor", "Travelers", "Padua"],
  "attributes": "Franciscan habit, Child Jesus, white lily, book",
  "quote": "Example quote from the saint.",
  "translations": {
    "ml": {
      "name": "വിശുദ്ധന്റെ പേര്",
      "epithet": "വിശേഷണം",
      "feastDate": "ജൂൺ 13",
      "location": "ലിസ്ബൺ & പാദുവ",
      "patronage": ["മധ്യസ്ഥത 1", "മധ്യസ്ഥത 2"],
      "attributes": "പ്രതീകങ്ങൾ",
      "quote": "വിശുദ്ധന്റെ വാക്കുകൾ"
    },
    "hi": {
      "name": "संत का नाम",
      "epithet": "उपाधि",
      "feastDate": "13 जून",
      "location": "स्थान",
      "patronage": ["संरक्षण 1", "संरक्षण 2"],
      "attributes": "प्रतीक",
      "quote": "संत के प्रेरक विचार"
    }
  }
}
```

### Step 3: Write Markdown Stories
Author the narrative stories in the language folders:
- `en/shortStory.md`: 1–3 concise paragraphs summarizing their life and spiritual legacy.
- `en/longStory.md`: Detailed biographical chronicle organized with `#` and `##` headings, canonical milestone tables, and rich historical detail.
- `ml/` and `hi/`: Translations for Malayalam and Hindi (if available).

### Step 4: Synchronize the Content Registry
Run the automated index synchronization script:

```bash
npm run content:sync
```

This automatically scans the `content/` folder, verifies all files, and registers the file paths into `content/index.json`.

### Step 5: Test Locally
Verify that the new saint loads cleanly and error-free:

```bash
# 1. Run content test script
node scripts/test-content-fetch.mjs

# 2. Run Next.js development server
npm run dev
```

Visit `http://localhost:3000/saints` and `http://localhost:3000/saints/st-[slug]` in your browser.

---

## 4. How to Update an Existing Saint

1. Locate the saint folder in `content/st-[slug]/`.
2. To update biographical dates, quotes, or patronages: edit `profile.json`, then run `npm run content:sync`.
3. To update or refine stories: edit `[lang]/shortStory.md` or `[lang]/longStory.md`. Changes appear immediately without needing re-syncing, because stories are loaded dynamically from files!

---

## 5. Markdown Formatting Standards

The reader uses custom styling powered by `react-markdown` and `remark-gfm`:

### Headings
```markdown
# Chapter or Life Story Title
## Section Heading (receives liturgical accent indicator)
### Milestone or Detail Title
```

### Bold & Italics
```markdown
**Bold text** for names, milestones, and solemn oaths.
*Italic text* for Latin phrases, contemplative reflections, and book titles.
```

### Canonical Milestone Tables
```markdown
| Milestone                      | Date            |
| ------------------------------ | --------------- |
| Declared Servant of God        | 2 December 1953 |
| Beatified by Pope John Paul II | 8 February 1986 |
| Canonized by Pope Benedict XVI | 12 October 2008 |
```

### Blockquotes
```markdown
> "Inspirational reflection or quote from the saint."
```

---

## 6. Code & Frontend Guidelines

If you contribute to the application code (React/Next.js/TypeScript):

- **No Mock Fallback Data**: Do not introduce temporary datasets or mock arrays. All data must pass through `content/` -> `index.json` -> client reader.
- **Server vs. Client Boundaries**:
  - Keep filesystem access (`fs`, `path`) strictly inside `lib/content-server.ts` or API routes (`app/api/`).
  - Client components must declare `"use client"` and focus purely on UI, user interactions, and rendering.
- **Performance**:
  - Use React 19's `useDeferredValue` for search inputs to prevent blocking typing.
  - Wrap filter computations in `useMemo`.
  - Ensure zero Turbopack dynamic tracing warnings by scoping filesystem access to `content`.
- **Styling**:
  - Use Tailwind CSS v4 utility classes adhering to the plum-and-pink theme (`#3B2D47`, `#FF2477`, `#C2BDCE`, `#F8F6FA`).
  - Support multi-script typography: English (`Outfit`), Malayalam (`font-malayalam`), Hindi (`font-hindi`).
- **Accessibility**:
  - Provide proper `aria-label`, `role="search"`, and semantic HTML tags.
  - Ensure interactive elements are keyboard-navigable (`Tab`, `Escape`, `/` to focus search).

---

## 7. Development Workflow & Verification

Before submitting any Pull Request, ensure all checks pass:

```bash
# 1. Synchronize content index
npm run content:sync

# 2. Verify content files
node scripts/test-content-fetch.mjs

# 3. Type check & production build (Turbopack)
npm run build

# 4. ESLint check
npm run lint
```

---

## 8. Submitting a Pull Request

1. Fork the repository and create your branch:
   ```bash
   git checkout -b feat/add-st-anthony
   ```
2. Commit your changes using conventional commit messages:
   ```bash
   git commit -m "feat(content): add St. Anthony of Padua chronicle and profile"
   ```
3. Push to your fork:
   ```bash
   git push origin feat/add-st-anthony
   ```
4. Open a Pull Request on GitHub with a clear description of the saint or improvement added.

Thank you for helping preserve and celebrate the sacred stories of Christian saints! 🕊️
