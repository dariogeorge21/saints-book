# SaintsBook 📖✝️

> **An Open-Source Archival Repository of Christian Saint Chronicles & Hagiographies**  
> Preserving the lives, sacred chronicles, canonical milestones, and liturgical feast days of Christian saints across 2,000+ years of Church history for public reading.

[![Open Source](https://img.shields.io/badge/Open_Source-Public_Repository-FF2477?style=flat-square&logo=github)](https://github.com/dariogeorge21/saints-book)
[![Content Format](https://img.shields.io/badge/Chronicles-Markdown-38B2AC?style=flat-square&logo=markdown)](https://github.com/dariogeorge21/saints-book/tree/main/content)
[![Languages](https://img.shields.io/badge/Languages-English%20%7C%20%E0%B4%AE%E0%B4%B2%E0%B4%AF%E0%B4%BE%E0%B4%B3%E0%B4%82%20%7C%20%E0%A4%B9%E0%A4%BF%E0%A4%82%E0%A4%A6%E0%A4%80-9A92A8?style=flat-square)](https://github.com/dariogeorge21/saints-book)
[![Next.js](https://img.shields.io/badge/Next.js-16.4.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

---

## 🕊️ About the Repository

**SaintsBook** is an open-source, community-driven digital repository dedicated to gathering, preserving, and freely sharing the stories of holy men and women throughout the history of the Christian Church. 

Rather than treating hagiography as closed or proprietary content, **SaintsBook stores each saint's life as open, structured, human-readable Markdown files**. This allows researchers, students, believers, and curious readers around the world to read, study, cite, and contribute to an ever-expanding treasury of faith and spiritual wisdom.

### Why This Repository Exists
- **Public & Free Access**: High-quality hagiographical chronicles freely accessible to everyone without paywalls or subscriptions.
- **Single Source of Truth**: Every biography is written in plain, accessible Markdown, making it easy to version-control, translate, review, and syndicate.
- **Multilingual Heritage**: Dedicated native-script chronicles in **English**, **Malayalam (മലയാളം)**, and **Hindi (हिंदी)**, honoring cultural traditions and local devotions.
- **Historical & Canonical Accuracy**: Systematically records canonical milestones—date of birth, beatification, canonisation, feast day, patronage, and historical era.

---

## 📚 The Saint Chronicles Archive

Every saint in this repository is cataloged under the [`content/`](content/) directory as an independent, modular archive containing biographical metadata and narrative chapters:

```text
content/
├── index.json               # Master registry manifest of all saints
├── index.schema.json        # Schema validation for profiles and chronicles
├── _template/               # Blueprint starter to contribute a new saint
│   ├── profile.json         # Canonical metadata (milestones, patronages, quotes)
│   ├── en/
│   │   ├── shortStory.md    # English summary (1-2 paragraphs)
│   │   └── longStory.md     # Full English biographical chronicle
│   ├── ml/
│   │   ├── shortStory.md    # Malayalam summary (ലഘു വിവരണം)
│   │   └── longStory.md     # Full Malayalam chronicle (പൂർണ്ണ ചരിത്രം)
│   └── hi/
│       ├── shortStory.md    # Hindi summary (संक्षिप्त विवरण)
│       └── longStory.md     # Full Hindi chronicle (विस्तृत जीवन चरित्र)
│
├── st-alphonsa/             # Saint Alphonsa (India’s first woman saint)
├── st-euphrasia/            # Saint Euphrasia (The Praying Mother)
└── st-francis-of-assisi/    # Saint Francis of Assisi (Patron of Ecology)
```

### What Each Chronicle Contains
- **Short Story (`shortStory.md`)**: A concise, contemplative overview of the saint’s calling, spiritual virtues, and enduring legacy—ideal for quick reading and devotional reflection.
- **Full Chronicle (`longStory.md`)**: Comprehensive biographical chapters with structured headings detailing early life, spiritual trials, miracles, canonisation journeys, and historical context.
- **Canonical Milestones (`profile.json`)**: Verified records including:
  - Date of Birth & Earthly Resting Place
  - Beatification Date & Officiating Pontiff
  - Canonisation Date & Milestone Details
  - Liturgical Feast Date & Month
  - Historical Era (*Early Church*, *Medieval*, *Renaissance & Reformation*, *Modern Era*)
  - Patronages, Sacred Attributes, and Words of Wisdom

---

## 🌐 Multilingual Chronicles

The repository provides full native-script translations to make the lives of saints accessible to diverse language communities:

| Language | Code | Script & Typography | Focus |
| :--- | :---: | :--- | :--- |
| **English** | `en` | Latin (`Outfit`) | Global archival chronicles & historical documentation |
| **Malayalam** (മലയാളം) | `ml` | Malayalam (`Noto Sans Malayalam`) | Syro-Malabar, Malankara, and Indian Church hagiographies |
| **Hindi** (हिंदी) | `hi` | Devanagari (`Tiro Devanagari Hindi`) | Northern & pan-Indian devotional communities |

---

## 📖 Public Web Reader

To ensure these stories can be read comfortably by the public on any device, this repository includes an editorial web interface:

- **Saints Directory (`/saints`)**: Search the repository by name, epithet, patronage, location, or liturgical era.
- **Liturgical Feast Calendar (`/calendar`)**: Browse feast days across all 12 months with upcoming feast highlights.
- **Focus Chronicle Reader (`/saints/[id]`)**: A distraction-free reading canvas featuring:
  - Seamless language switching between English, Malayalam, and Hindi.
  - Adjustable reading typography (Comfortable, Standard, Large).
  - Estimated reading times and citation copy tools.
  - Interactive maps highlighting historical locations and shrines.

---

## 🤝 Contributing to SaintsBook

**We welcome you to help expand this repository!** Whether you would like to write the story of a new saint, refine historical dates, fix a typo, or contribute translations in Malayalam, Hindi, or other languages, your contribution directly enriches this public archive.

### Quick Start for Contributors:
1. **Duplicate** the [`content/_template`](content/_template) folder and name it with your saint's kebab-case slug (e.g., `content/st-teresa-of-calcutta`).
2. **Fill in** `profile.json` with historical milestones and write `shortStory.md` and `longStory.md` in your language of choice.
3. **Sync** the registry by running `npm run content:sync`.
4. **Submit** your Pull Request!

👉 **[Read the complete Contributing Guide in CONTRIBUTING.md](CONTRIBUTING.md)** for step-by-step instructions, JSON schema conventions, and markdown formatting standards.

---

## 💻 Running the Reader Locally

If you want to read or preview chronicles locally on your computer:

### Prerequisites
- [Node.js](https://nodejs.org/) version **18.18+** or **20+**
- `npm` (or `pnpm` / `yarn`)

### Steps
```bash
# 1. Clone the repository
git clone https://github.com/dariogeorge21/saints-book.git
cd saints-book

# 2. Install dependencies
npm install

# 3. Synchronize the content index (if editing markdown files)
npm run content:sync

# 4. Start the local reader
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to explore the archive.

---

## 👤 Curator & Maintainer

Maintained with devotion by **Dario George**:
- **Website / Portfolio**: [dariogeorge.in](https://dariogeorge.in)
- **LinkedIn**: [dariogeorge21](https://www.linkedin.com/in/dariogeorge21/)
- **Instagram**: [@dariogeorge21](https://instagram.com/dariogeorge21)
- **GitHub**: [@dariogeorge21](https://github.com/dariogeorge21)

---

## 📄 License & Attribution

- **Code & Platform**: Open-source under the [MIT License](LICENSE).
- **Hagiographical Chronicles**: Freely available for public reading, education, research, and parish bulletins. When quoting or republishing long-form chronicles, a citation link back to SaintsBook is warmly appreciated.
