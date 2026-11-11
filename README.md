# SaintsBook 📖✝️

> **Archival Christian Hagiography & Saint Chronicles** — An editorial platform exploring the lives, faith, canonisation milestones, and feast days of Christian saints across 2,000+ years of Church history.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Languages](https://img.shields.io/badge/Languages-EN%20%7C%20%E0%B4%AE%E0%B4%B2%E0%B4%AF%E0%B4%BE%E0%B4%B3%E0%B4%82%20%7C%20%E0%A4%B9%E0%A4%BF%E0%A4%82%E0%A4%A6%E0%A4%80-FF2477?style=flat-square)](https://github.com/dariogeorge21/saints-book)

---

## 🌟 Overview

**SaintsBook** is a modern, archival web application crafted to present the biographies, words of wisdom, and chronological milestones of Christian saints. Built with a bespoke design system featuring deep atmospheric plum backgrounds (`#3B2D47`), liturgical vibrant pink accents (`#FF2477`), and ethereal lavender typography (`#C2BDCE`).

---

## ✨ Features

### 🔄 3D Center-Pivot Rotating Showcase
- **Dual-Axis 3D Rotation**: The featured hero card rotates smoothly on both the **X and Y axes** from its geometric center (`transform-origin: center center`, `perspective: 1300px`).
- **Sequential Stories**: Automatically rotates through all 10 featured saints in sequence (*Saint 1 → Saint 2 → Saint 3 → ... → Saint 10*).
- **Interactive Tactile Parallax**: Tilts in real time according to mouse position on hover, with a luminous ambient light sheen.
- **Thoughtful Reading Controls**: Pauses auto-rotation on hover, includes manual Previous/Next buttons, a Play/Pause toggle, 10 quick-jump dot indicators, and an auto-advance hairline progress bar.

### 🌐 Comprehensive Tri-Lingual Support (i18n)
- **Three Languages**: Full UI and archival translations in:
  - **English** (`en`)
  - **Malayalam** (`ml` / മലയാളം)
  - **Hindi** (`hi` / हिंदी)
- **Authentic Native Scripts**:
  - Latin: `Outfit`
  - Malayalam: `Google Sans` & `Noto Sans Malayalam`
  - Hindi: `Tiro Devanagari Hindi` & `Noto Sans Devanagari`
- **Flexible Retention Modes**:
  - **Permanent**: Always keep chosen language across visits.
  - **7-Day Memory**: Remembers preference for 7 days with live countdown.
  - **Session-Only**: Prompts on each visit with real-time UI previews.
- **Language Switchers**: Dedicated [Settings Page](/settings), sticky near-footer quick-switch bar, and dynamic modal prompt.

### 📅 Feast Calendar & Directory
- **Feast Calendar (`/calendar`)**: Filter by all 12 liturgical months, view upcoming celebrations, and browse dates of birth, beatification, canonisation, and feast days.
- **Saints Directory (`/saints`)**: Instant live search by name, epithet, patronage, or historical era (*Early Church*, *Medieval*, *Renaissance & Reformation*, *Modern Era*).
- **In-Depth Chronicle Reader (`/saints/[id]`)**: Long-form multi-paragraph biographies, quotes, patronage tags, and Google Maps integration for historical locations.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.4.5](https://nextjs.org/) (App Router, Turbopack, Partial Prerendering)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Typography**: Google Fonts (`Outfit`, `Google Sans`, `Tiro Devanagari Hindi`, `Noto Sans Malayalam`)

---

## 📂 Project Structure

```plaintext
saints-book/
├── app/
│   ├── calendar/          # Liturgical feast days & calendar page
│   ├── saints/            # Saints archive index & [id] chronicle pages
│   ├── settings/          # Language preference & font preview settings
│   ├── globals.css        # Tailwind v4 theme, 3D keyframe animations & styles
│   ├── layout.tsx         # Root layout with font preconnects & providers
│   └── page.tsx           # Landing page with 3D rotating hero showcase
├── components/
│   ├── hero.tsx                    # 3D dual-axis rotating featured card & hero
│   ├── saints-gallery.tsx          # Featured 3-saint editorial grid
│   ├── saintsbook-logo.tsx         # Handcrafted geometric chevron brand mark
│   ├── language-prompt-modal.tsx   # Real-time multi-language modal prompt
│   ├── language-footer-bar.tsx     # Near-footer quick language switch bar
│   ├── saint-chronicle-reader.tsx  # Dynamic multi-language story reader
│   ├── navbar.tsx                  # Minimal top navigation
│   └── footer.tsx                  # Archival footer with creator & social links
├── lib/
│   ├── data.ts            # Hagiographical dataset with EN, ML & HI translations
│   ├── i18n.ts            # UI translations dictionary & language metadata
│   ├── language-context.tsx # React Context provider with persistence logic
│   └── utils.ts           # Class merging utilities (clsx + tailwind-merge)
└── public/                # Static assets, favicon, manifest
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) version **18.18+** or **20+**
- `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dariogeorge21/saints-book.git
   cd saints-book
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

---

## 👤 Creator

Created with dedication by **Dario George**:
- **Website / Portfolio**: [dariogeorge.in](https://dariogeorge.in)
- **LinkedIn**: [dariogeorge21](https://www.linkedin.com/in/dariogeorge21/)
- **Instagram**: [@dariogeorge21](https://instagram.com/dariogeorge21)
- **GitHub**: [@dariogeorge21](https://github.com/dariogeorge21)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
