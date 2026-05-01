# Phuket Private Experience — Ultra-luxury longevity lifestyle landing page

## What it is

A single-page marketing site for an invitation-only lifestyle brand operating in Phuket, Thailand. The brand packages private yacht charters, luxury villa residences, clinical longevity programmes, and bespoke celebrations into high-ticket experiences ($8,000–$150,000+) for ultra-high-net-worth individuals. The site exists to do one thing: convert a visitor who arrived via Instagram DM or a concierge referral into someone who fills out the inquiry form.

The page is built as a React application with Framer Motion handling all animation. Every section uses scroll-triggered reveals with spring physics, parallax image movement, and staggered orchestration — the kind of motion design associated with $150K agency builds. The visual language is dark cinematic luxury: near-black backgrounds (#080808), warm gold accents (#C9A96E), and editorial serif typography (Instrument Serif) paired with a clean sans-serif body font (Plus Jakarta Sans). The single exception is the inquiry form section, which flips to a warm cream (#F5F0EB) background to signal "this is where you act."

The site is not connected to a backend. The form does not submit anywhere yet. There is no CMS, no booking system, no payment flow. It is a conversion-focused front door — a digital version of the velvet rope.

## Architecture / How it works

The application is a standard Vite + React 18 single-page app. There is no routing, no server-side rendering, no API layer. The entire page renders from `src/App.jsx`, which imports and composes 10 section components in sequence.

**Component tree:**

```
App.jsx
├── Nav.jsx          — Fixed header, scroll-aware glass blur, hamburger → X mobile menu
├── Hero.jsx         — Full-viewport hero with parallax yacht image, magnetic CTA
├── BrandStrip       — Inline component in App.jsx, thin keyword bar
├── Experiences.jsx  — 5 image cards in asymmetric bento grid (2 rows)
├── Philosophy.jsx   — Word-by-word animated quote reveal
├── Journeys.jsx     — 3 pricing tier cards with hover gold bar
├── Wellness.jsx     — Protocol list + parallax spa image with double-bezel frame
├── Addons.jsx       — 4-column grid of upsell services
├── Inquiry.jsx      — Application-style form (cream background)
└── Footer.jsx       — Logo, nav links, Instagram + WhatsApp social icons
```

**Shared animation layer:**

`src/components/Reveal.jsx` exports three components used across every section:
- `Reveal` — wraps any element with `whileInView` fade-up-and-deblur (spring: stiffness 80, damping 20)
- `StaggerContainer` — parent that staggers children by 0.12s
- `StaggerItem` — child element within a stagger group

These fire once per element as it enters the viewport. No scroll listeners — everything uses Framer Motion's `IntersectionObserver`-based `whileInView`.

**Specialty animations (isolated per component):**
- `Hero.jsx` contains `MagneticCTA` — a button that tracks the cursor via `useMotionValue` and pulls toward it with spring physics (stiffness 150, damping 12)
- `Hero.jsx` uses `useScroll` + `useTransform` for parallax background movement (0% → 20% Y shift) and opacity fade (0.8 → 0.1) as user scrolls
- `Philosophy.jsx` contains `AnimatedQuote` — splits text into words and reveals them one by one with 0.04s stagger delay
- `Wellness.jsx` contains `ParallaxImage` — image moves -8% to +8% on Y axis relative to scroll position

**Styling architecture:**

Tailwind CSS v3 handles 95% of styling via utility classes. The custom theme in `tailwind.config.js` defines the brand color palette (base, elevated, card, gold, cream, secondary, muted), the two font families (display, body), and two custom easing functions (out-expo, spring). `src/index.css` adds three things Tailwind can't: a CSS reset, the SVG noise texture overlay (fixed, pointer-events-none, 3.5% opacity), and the `.eyebrow` component class used for section labels.

**File structure:**

```
├── index.html              — Vite entry, loads Google Fonts + mounts React
├── package.json            — Dependencies: react, framer-motion, vite, tailwindcss
├── vite.config.js          — React plugin, nothing else
├── tailwind.config.js      — Brand colors, fonts, custom easings
├── postcss.config.js       — Tailwind + Autoprefixer
├── src/
│   ├── main.jsx            — ReactDOM.createRoot, StrictMode
│   ├── index.css           — Tailwind directives, reset, noise overlay, eyebrow class
│   ├── App.jsx             — Layout orchestrator + inline BrandStrip
│   └── components/
│       ├── Reveal.jsx      — Shared animation wrappers (Reveal, StaggerContainer, StaggerItem)
│       ├── Logo.jsx        — SVG palm leaf mark
│       ├── Nav.jsx         — 143 lines, fixed nav + mobile menu
│       ├── Hero.jsx        — 150 lines, parallax + magnetic CTA + stats
│       ├── Experiences.jsx — 107 lines, 5 image cards in 2 grid rows
│       ├── Philosophy.jsx  — 66 lines, word-by-word quote animation
│       ├── Journeys.jsx    — 136 lines, 3 pricing tier cards
│       ├── Wellness.jsx    — 85 lines, protocols list + parallax image
│       ├── Addons.jsx      — 92 lines, 4-column upsell grid
│       ├── Inquiry.jsx     — 185 lines, cream-bg form with submit state
│       └── Footer.jsx      — 85 lines, branding + social links
├── assets/                 — Source brand images (7 production + 5 reference)
├── public/assets/          — Copied to public for Vite static serving
└── taste skills/           — 8 design system reference docs (not used at runtime)
```

## What was actually built

A complete, functional, responsive landing page with 10 React components across 1,250 lines of source code. Specifically:

- 8 content sections covering the full brand story: hero, experiences, philosophy, pricing, wellness, add-ons, inquiry, footer
- 7 brand images integrated (yacht, sunset, villa, drinks, champagne, jet ski, spa)
- 4 distinct Framer Motion animation patterns: scroll reveals, parallax, magnetic hover, word-by-word text
- 3 pricing tiers with full feature lists ($8K / $20K / $50K)
- 1 inquiry form with 6 fields and a select dropdown (first name, last name, email, phone, interest, message)
- Full mobile responsiveness with a hamburger-to-X animated menu and single-column collapse at 768px
- A custom SVG logo mark used in the nav and footer
- Production build output: 22.5KB CSS + 296KB JS (94KB gzipped)

**What does not exist yet:**
- No form backend — the submit button shows "Application Received" for 3 seconds, then resets. No data goes anywhere.
- No CMS — all content is hardcoded in JSX
- No analytics or tracking
- No domain or hosting — runs locally via `npm run dev`
- No favicon (uses browser default)
- No real booking or payment integration
- The Privacy Policy and Terms of Service links point to `#`

## What makes it different

The page was generated using a set of design system documents (stored in `taste skills/`) that encode specific anti-patterns common in AI-generated UI. These documents ban Inter font, ban centered hero layouts, ban 3-column equal card grids, ban neon purple gradients, ban generic placeholder names, and enforce spring physics over linear easing, double-bezel card architecture, and editorial serif typography for luxury contexts. The result is a page that doesn't read as AI-generated — it reads as an agency build with a specific creative director behind it.

The design decision that matters most: the entire page is dark mode except the inquiry section, which flips to warm cream. This isn't decorative. It signals a psychological shift — every dark section builds desire and exclusivity, and the cream section says "now act." The form feels like an application, not a contact form, because the copy and visual treatment frame it that way ("Submit Application", "We accept a limited number of guests each month").

## Tech stack

- **Vite 5.4** — Dev server with hot module replacement, production bundler. Chosen over Next.js because a single landing page needs no routing, SSR, or API layer.
- **React 18.3** — Component architecture for the 10 sections. Enables Framer Motion integration and state management for the mobile menu and form.
- **Tailwind CSS 3.4** — All layout, spacing, color, and typography via utility classes. Custom theme extends the default palette with the brand's gold/cream/dark color system.
- **Framer Motion 11.15** — Every animation on the page. Spring physics for interactions, `whileInView` for scroll reveals, `useScroll`/`useTransform` for parallax, `useMotionValue` for magnetic cursor tracking.
- **Instrument Serif** (Google Fonts) — Display/headline typeface. Editorial luxury feel without being a banned generic serif.
- **Plus Jakarta Sans** (Google Fonts) — Body/UI typeface. Clean, geometric, not Inter.
- **PostCSS + Autoprefixer** — CSS processing pipeline. Tailwind runs through PostCSS; Autoprefixer handles vendor prefixes.

---

## What it delivers

A conversion-focused landing page that presents a $8K–$150K lifestyle brand with the visual authority of a top-tier agency build — dark cinematic luxury, spring-physics animation, and editorial typography — without a design team, in a single React codebase that any developer can modify, deploy, and extend.

## Core properties

- **Fast.** Production build is 94KB gzipped. Vite dev server starts in ~200ms. No external API calls, no database, no SSR overhead.
- **Animated without being slow.** Every animation uses `transform` and `opacity` only (GPU-accelerated). Scroll reveals fire via IntersectionObserver, not scroll listeners. Parallax uses Framer Motion's optimized scroll hooks.
- **Mobile-complete.** Every section collapses to single-column at 768px. The nav becomes a full-screen overlay menu with staggered link reveals. Touch targets meet 44px minimum. Typography scales via `clamp()`.
- **Visually consistent.** 9 colors, 2 fonts, 2 easing curves. The entire design system fits in 27 lines of Tailwind config. No color or font varies across components.
- **Editable by a non-React developer.** All content — copy, prices, feature lists, images — lives as plain strings and arrays at the top of each component file. No CMS abstraction to learn.
- **Deployable anywhere.** `npm run build` outputs static HTML/CSS/JS to `dist/`. Works on Vercel, Netlify, Cloudflare Pages, S3, or any static host with zero configuration.

## Use cases

- **The founder** opens the Vite dev server, edits the copy in `Journeys.jsx` to adjust pricing for a new season, and pushes to GitHub. Vercel auto-deploys. The live site updates in under 60 seconds.
- **A concierge in Dubai** receives a DM from a client interested in a Phuket experience. They send the landing page URL. The client scrolls through the yacht imagery and wellness protocols, reaches the inquiry form, and submits their details. The concierge follows up on WhatsApp within 24 hours.
- **A wedding planner in London** finds the Instagram account (@phuket.private.curator), follows the link in bio to the landing page, and selects "Destination Celebration" from the inquiry form dropdown. The brand now has a qualified B2B lead.
- **A developer hired to add a booking flow** reads `OVERVIEW.md`, understands the component structure in 10 minutes, and knows exactly where to wire up the form submission (line 8 of `Inquiry.jsx`) and where to add a new section (import it in `App.jsx` and drop it in the JSX tree).
- **The founder wants to A/B test hero copy.** They duplicate `Hero.jsx`, change the headline, deploy to a separate Vercel preview URL, and send each version to different referral partners to see which generates more form submissions.

## Future potential

**What's built:** The complete front-of-house — brand presentation, experience showcase, pricing, and lead capture. Everything a visitor needs to go from "what is this?" to "I want in."

**What's not built:** The back-of-house. The form doesn't submit anywhere. There's no CRM, no booking calendar, no payment processing, no client portal, no admin dashboard. There's also no blog, no SEO content strategy, and no analytics.

**Immediate next steps:**
- Connect the inquiry form to a backend (Formspree, Supabase, or a simple serverless function that forwards to WhatsApp/email)
- Add a favicon and Open Graph image for social sharing
- Deploy to Vercel or Netlify with a custom domain
- Install analytics (Plausible or Fathom for privacy-respecting tracking)

**Medium-term extensions:**
- A private client portal behind authentication where approved guests can view their itinerary, communicate with their concierge, and manage bookings
- A CMS layer (Sanity or Contentful) so the founder can update copy, images, and pricing without touching code
- Multi-language support (Arabic for UAE clients, Russian for Eastern European UHNW market)
- Integration with a CRM (HubSpot or a lightweight alternative) to track the full referral-to-booking pipeline

**The long game:** This landing page is the first touchpoint in a high-ticket sales funnel. Every repeat client, every concierge partnership, every referral compounds. The site doesn't need to convert thousands — it needs to convert the right twelve people per month at $20K–$150K each. The technology is deliberately simple because the business model doesn't need scale — it needs trust.
