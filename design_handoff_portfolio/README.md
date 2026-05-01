# PORTFOLIO.EXE — Terminal Portfolio Template

A single-page personal portfolio styled as a CRT/terminal interface. Six sections, a works database browser with keyboard navigation, scanlines, film grain, glitch effects, and an optional boot-up sequence.

No build step. No frameworks to install. Edit one file, drop in your images, deploy.

![Terminal Portfolio Preview](https://img.shields.io/badge/STATUS-ONLINE-d4b86a?style=flat-square&labelColor=0d0a07)

---

## Features

- **Works Database** — three-column browser with filter bar, project cards, hero images, spec cards, documentation tabs, and process overview
- **6 Sections** — Overview, Works, About, Skills, Journal, Contact
- **4 Color Themes** — Cream, Ash, Rust, Mono
- **4 Font Pairings** — JetBrains + Cormorant, IBM Plex + Playfair, Space + Bodoni, VT323 + IM Fell
- **3 Density Modes** — Compact, Normal, Spacious
- **CRT Effects** — Scanlines, film grain, vignette (all adjustable)
- **Boot Sequence** — Fake terminal startup animation
- **Glitch Text** — Chromatic aberration flicker on titles
- **Keyboard Navigation** — W/S to browse projects, A/D to switch filters, ESC to go back
- **Tweaks Panel** — Ctrl+Shift+. to open live customization
- **Zero Build Step** — Pure HTML + React (CDN) + Babel. Just serve the files.

---

## Quick Start

### 1. Use This Template

Click **"Use this template"** on GitHub to create your own copy.

Or clone it:
```bash
git clone https://github.com/YOUR-USERNAME/portfolio.git
cd portfolio/design_handoff_portfolio
```

### 2. Edit Your Profile

Open `data.jsx` and update the `PROFILE` object:

```js
const PROFILE = {
  handle: "YOUR-NAME",
  role: "YOUR ROLE / TITLE",
  location: "YOUR CITY",
  status: "OPEN TO WORK",
  joined: "2024.01.01",
  about: `Your bio goes here...`,
  values: [
    { label: "VALUE 1", body: "Description." },
    // ...
  ],
  contact: {
    email: "you@email.com",
    instagram: "@you",
    linkedin: "/in/you",
  },
  copyright: `© 2026 YOUR-NAME. ALL RIGHTS RESERVED.`,
  banner: `"Your tagline quote here."`,
};
```

### 3. Add Your Projects

Edit the `PROJECTS` array in `data.jsx`. Each project looks like this:

```js
{
  id: 1,
  code: "01",
  title: "PROJECT NAME",
  category: "CATEGORY / SUBCATEGORY",
  tags: ["AI ART"],              // Used for filter bar: AI ART, CONCEPT, VIDEO, EXPERIMENT
  date: "2024.05",
  quote: "A short poetic quote\nabout the project.",
  completed: "2024.05.21",
  tools: "TOOL 1 / TOOL 2 / TOOL 3",
  resolution: "7680 × 4320 (8K)",
  workflow: "STEP 1 / STEP 2 / STEP 3",
  duration: "124 HOURS",
  metaTags: "TAG1 / TAG2 / TAG3",
  palette: ["#2a2520", "#3d352b", "#5a4f38", "#8a7a55"]  // 4 colors, dark to light
}
```

### 4. Add Your Images

Drop images into the `images/` folder, then update `PROJECT_IMAGES` in `data.jsx`:

```js
const PROJECT_IMAGES = {
  1: { hero: "images/project-01-hero.png" },
  2: { hero: "images/project-02-hero.png" },
  // ...
};
```

The hero image is used automatically for the works list thumbnail, detail hero, thumbnail strip, and doc reference panel. Projects without an entry use the built-in placeholder.

### 5. Customize Documentation Tabs

Edit `DOC_CONTENT` in `data.jsx` to change the content shown in each tab (Concept, Process, Technical Breakdown, Challenges, Outcome, Future Iterations).

### 6. Preview Locally

Serve the files with any static server:

```bash
npx serve .
```

Open `http://localhost:3000/portfolio.html`

### 7. Deploy

**GitHub Pages (free):**
1. Go to your repo → Settings → Pages
2. Set source to **Deploy from a branch**
3. Select **main** branch, root folder
4. Your site will be live at `https://YOUR-USERNAME.github.io/portfolio/design_handoff_portfolio/portfolio.html`

**Other options:** Netlify, Vercel, Cloudflare Pages — just point to the repo root. No build command needed.

---

## Customization

### Themes & Effects

Press **Ctrl+Shift+.** to open the Tweaks panel. Change:
- Color theme (Cream / Ash / Rust / Mono)
- Font pairing
- Density (Compact / Normal / Spacious)
- Scanline intensity
- Film grain amount
- Vignette toggle
- Boot animation toggle
- Cursor blink speed

### Editing Sections

All section content (Overview, About, Skills, Journal, Contact) lives in `data.jsx` and renders from `sections.jsx`. Edit the data arrays directly:

- `SKILLS` — grouped skill bars with percentage levels
- `JOURNAL` — dated entries with title and excerpt
- `PROCESS_STEPS` — the 6-step workflow shown in project detail
- `DOC_TABS` / `DOC_CONTENT` — documentation tab labels and body text

### Adding Filters

Edit the `FILTERS` array in `data.jsx` and make sure your projects have matching values in their `tags` array.

---

## File Structure

```
design_handoff_portfolio/
  portfolio.html       ← Entry point
  styles.css           ← All design tokens and component styles
  data.jsx             ← All content (projects, profile, skills, etc.)
  app.jsx              ← App shell, state management, keyboard nav
  sidebar.jsx          ← Left sidebar with profile and navigation
  works-list.jsx       ← Middle column project list with filters
  project-detail.jsx   ← Right column detail view (hero, docs, process)
  sections.jsx         ← Overview, About, Skills, Journal, Contact
  effects.jsx          ← FX layer, Boot sequence, Glitch, Cursor
  placeholder.jsx      ← SVG placeholder generator (for missing images)
  tweaks-panel.jsx     ← Tweaks panel UI framework
  tweaks-portfolio.jsx ← Portfolio-specific tweaks wiring
  template.md          ← Template for documenting new projects
  images/              ← Your project images go here
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `W` / `↑` | Previous project |
| `S` / `↓` | Next project |
| `A` | Previous filter tab |
| `D` | Next filter tab |
| `ESC` | Back to Overview |
| `Ctrl+Shift+.` | Toggle Tweaks panel |

Keyboard nav is only active in the Works section.

---

## Credits

Built by [WIN-07](https://github.com/noppywinner7). Terminal aesthetic inspired by CRT interfaces, post-apocalyptic UI, and the beauty of monospace typography.

---

`[ END OF TRANSMISSION ]`
