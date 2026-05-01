# DuangDoctor — AI หมอดู that actually computes your chart, not just talks about astrology

## What it is

DuangDoctor is a Thai-language AI astrologer that calculates your birth chart across three astrological traditions — Thai (ทักษา/ภูมิ), Chinese, and Western — then cross-references them to find where they agree. Unlike ChatGPT answering "tell me about Aries," DuangDoctor runs real calculations from your exact birthday: the 8-position thaksa wheel, the 108-year dasha lifecycle, the sunrise-aware Thai day boundary, Western planetary positions, Chinese animal-element cycles. It computes first, then talks to you about what it found.

The chatbot persona is หมอพิม (Mor Pim) — a warm, slightly playful AI fortune-teller who remembers your chart and previous conversations. She doesn't give generic horoscope content. She gives you *your* chart, computed from *your* birthday, and lets you ask follow-up questions about love, career, personality, timing, lucky numbers, partner compatibility, and remedies. The conversation runs on Claude with agentic tool_use — the bot reads and writes your profile data mid-conversation, calls its own astrology functions, and decides when to go deeper on a topic.

The product is live at duangdoctor-beta.vercel.app. Currently in a fake-door validation phase with three paid tiers (฿149 / ฿299 / ฿499) to test willingness-to-pay before building the payment infrastructure. The astrology engine, chat system, landing page, and full funnel are built and deployed. What's gated is the chat itself — users who click "buy" land on a capacity page with a Line OA follow CTA, so the validation measures real purchase intent, not just curiosity.

---

## Architecture / How it works

### Data flow

```
Birthday input
    ↓
Deterministic astro engine (12 modules, 1,103 lines)
    ↓
Pre-computed birth profile (thaksa wheel, dasha, traits, convergence)
    ↓
Injected into Claude system prompt (~3,500 tokens of computed data)
    ↓
Agentic chat with tool_use (bot reads/writes user data mid-conversation)
    ↓
Streamed response (SSE) with tool execution client-side
```

### Core layers

| Layer | What it does | Key files |
|-------|-------------|-----------|
| **Astro engine** | Deterministic birth-chart computation — no LLM involved. Thai thaksa wheel (8 positions × 8 planets), 108-year dasha cycles, sunrise-aware day resolution, Western zodiac, Chinese animal-element. | `src/lib/astro/` (12 modules, 1,103 lines) |
| **Convergence** | Cross-references traits across all three traditions. Maps to 8 meta-categories (leadership, creativity, intellect, etc.). Finds where 2-3 systems agree — those become high-confidence readings. | `src/lib/astro/convergence.ts` |
| **Prompt builder** | Assembles a per-session system prompt: bot persona + security rules + pre-computed birth data + tool definitions. The bot never recalculates astrology — it reasons about pre-computed facts. | `src/lib/prompt-builder.ts` (344 lines) |
| **Tool system** | 7 Claude tool_use definitions. Bot decides when to read profile, save notes, search the web, or update readings. Tools are auto-generated from config JSON — adding a new verse system or output tool makes it available to the bot without code changes. | `src/lib/tool-definitions.ts`, `src/lib/tool-executor.ts` |
| **Wiki KB** | 16 pages, 7,194 words of hand-written Thai astrology doctrine. Used as a preload/cache source for traditional rules (phumi interpretations, thaksa rotation, dasha sequences). Not RAG — loaded directly into context when needed. | `wiki/` |
| **Security** | Rate limiting (100 calls/hr/IP), daily budget cap ($5/day default), abuse logging (500-entry ring buffer), prompt injection guards via system-prompt rules. No user content logged — privacy by design. | `src/lib/rate-limit.ts`, `src/lib/budget-cap.ts`, `src/lib/abuse-log.ts` |
| **Config layer** | Bot personality, verse systems, output tools, and model selection are all JSON-driven. The admin panel can change personality at runtime. New astrology traditions or divination tools can be added without touching code. | `src/config/` (4 files) |

### Thai astro specifics worth understanding

- **Thaksa wheel**: 8 life positions (บริวาร, อายุ, เดช, ศรี, มูละ, อุตสาหะ, มนตรี, กาลกิณี) rotated based on birth day. Each position maps to a life domain — not the planet in it, but the house itself.
- **Dasha**: 108-year lifecycle where 8 planets rule consecutive periods. Sun rules 6 years, Moon 15, Mars 8, Mercury 17, Jupiter 19, Venus 21, Saturn 10, Rahu 12. The sequence depends on your birth day. The engine tells you: "You're in Venus period, 3 years remaining, next is Saturn."
- **Sunrise boundary**: Thai astrology counts the day starting at ~06:00, not midnight. A birth at 2 AM on Thursday is astrologically *Wednesday night* (วันราหู). The engine handles this automatically.
- **120+ deterministic interpretations**: Planet-in-sign lookups are pre-written in Thai. No LLM generates these — they're traditional textbook content stored as lookup tables.

---

## What was actually built

### Shipped and working today

- **12-module astrology engine** computing birth charts across 3 traditions with no LLM dependency. 1,103 lines of deterministic TypeScript.
- **Agentic chat system** where the bot uses Claude tool_use to read profiles, save notes, update readings, and search the web — all decided by the bot mid-conversation, not scripted.
- **7,194-word Thai-astrology wiki** hand-written from traditional sources (พรหมชาติ, ทักษาปกรณ์, MyHora, Mahamongkol), covering 8 birth-day variants, phumi interpretations, dasha rules, naming methods.
- **1,058-line landing page** with 11 sections, 4 JSON-LD schemas (Organization, Service, FAQ, WebSite), SEO metadata, and responsive design.
- **3-tier pricing page** (฿149 / 10 min, ฿299 / 30 min, ฿499 / 1 hr) with per-tier click tracking via URL params.
- **Full fake-door validation funnel**: landing → offer → capacity gate with Line OA CTA. Zero API cost per visitor during validation.
- **Admin panel** (password-protected) for editing bot personality, viewing abuse logs, and adjusting model at runtime.
- **Security layer**: per-IP rate limiting, daily token budget cap, abuse logging, prompt injection defenses — all server-side.
- **13 page routes, 6 API endpoints, 12 React components** — the full product surface.
- **14 total npm dependencies** (9 production, 5 dev). Extremely lean for a full-stack AI product.

### Numbers

- **8,621 lines** of TypeScript across the project
- **120+** pre-written planet-in-sign interpretations in Thai (deterministic, no LLM)
- **108-year** dasha lifecycle computed per user
- **8 × 8 = 64** thaksa wheel position combinations
- **฿46/session** organic API cost at Sonnet 4.6 pricing (85% margin at ฿299 tier)
- **$5/day** server-side budget cap prevents runaway costs
- **100 calls/hr/IP** rate limit
- **500-entry** abuse log ring buffer

### Not built yet (deliberately)

- Payment processing (PromptPay/Stripe) — validating demand first
- User accounts / auth (Supabase planned)
- Chat history persistence across devices (localStorage only today)
- Time-based session wallet (designed, not implemented)

---

## What makes it different

Most AI astrology products are ChatGPT wrappers with a zodiac prompt. They take your sun sign and generate generic personality text. DuangDoctor's insight is that **Thai astrology is computational, not conversational** — the ทักษา wheel, ภูมิ positions, and ดาวเสวยอายุ cycles are deterministic algorithms that should be *computed*, not *generated*. The LLM's job isn't to do astrology — it's to explain astrology that's already been calculated.

This means the engine produces the same chart every time for the same birthday (correctness you can verify against traditional tables), while the conversation layer adapts to what the user actually wants to know. The convergence system then exploits the multi-tradition approach: when Thai, Chinese, and Western astrology independently agree on a trait (e.g., all three flag "leadership"), that signal is stronger than any single system alone. Nobody else cross-references three traditions computationally — human astrologers specialize in one.

---

## Tech stack

- **Next.js 16** — App Router, server components, API routes. Bleeding-edge version with breaking changes (middleware → proxy rename, etc.)
- **Claude API (Anthropic SDK)** — Adaptive thinking with effort control. Agentic tool_use for mid-conversation data operations. Currently on claude-opus-4-6.
- **TypeScript** — End-to-end type safety. 8,621 lines, zero `any` escapees in the astro engine.
- **Tailwind CSS v4** — CSS-first config (no tailwind.config.js). PostCSS plugin, not the legacy approach.
- **Framer Motion** — Spring-based animations throughout. Shared motion system in `motion.tsx` with consistent damping/stiffness.
- **Phosphor Icons** — SSR-compatible icon set. ~20 icons used across the UI.
- **circular-natal-horoscope-js** — Western birth chart calculations (planetary positions, houses, aspects).
- **Vercel** — Deployment target. Serverless API routes, edge-optimized static pages.
- **Line OA** — Customer contact channel. Primary conversion metric during validation.

---

## What it delivers

A system that lets Thai-speaking users get a personalized, multi-tradition astrological consultation — computed from their exact birthday using deterministic algorithms across Thai, Chinese, and Western astrology, then explained conversationally by an AI that remembers their chart and can go deep on any topic they care about.

## Core properties

- **Computationally grounded.** The astro engine produces the same thaksa wheel and dasha cycle for the same birthday every time — verifiable against traditional Thai astrology tables. The LLM explains; it doesn't invent.
- **Multi-tradition convergence.** Three independent astrological systems cross-referenced into 8 meta-categories. When 3 traditions agree on a trait, that's signal, not coincidence. No human astrologer does this computation.
- **Thai-first, not translated.** 120+ planet interpretations written in Thai from Thai sources. Wiki KB sourced from พรหมชาติ and ทักษาปกรณ์. Bot persona speaks natural Thai, not translated-English-with-Thai-words.
- **Config-driven extensibility.** New astrology traditions, output tools, or bot personalities are added via JSON — no code changes. The tool_use system auto-generates Claude tool definitions from config files.
- **Operationally capped.** $5/day budget ceiling, 100 req/hr rate limit, abuse logging. A solo operator can run this without monitoring dashboards. The system protects itself.
- **14 dependencies.** The entire production stack is 9 npm packages. No state management library, no ORM, no CSS-in-JS runtime, no analytics SDK. Lean enough that one person maintains it.

## Use cases

- **"ดวงฉันเป็นยังไง"** — A 28-year-old office worker enters her birthday. Gets her thaksa wheel (ศรี position = finance is strong), Western sun sign (Scorpio — intensity, depth), Chinese element (Water Rabbit — diplomatic). The convergence engine flags "emotional intelligence" across all three. She asks about her love life; the bot cross-references her dasha period (Venus, 12 years remaining) with her ศรี position and says this is a strong period for relationships. She follows up about a specific person.

- **"ควรเปลี่ยนงานไหม"** — A freelance designer asks about career timing. The bot checks his dasha (currently Mercury period — communication, learning), his Chinese day energy, and his Western 10th house. Three systems align on "transition is favorable." He asks *when* specifically; the bot uses the Chinese day-energy system to suggest a date range.

- **"ลูกเกิดวันพุธตี 3 ชื่ออะไรดี"** — A parent asks about naming. The engine resolves the birth time (3 AM Wednesday = วันราหู, not วันพุธ) and rotates the thaksa wheel accordingly. The wiki KB has consonant-planet mappings for the Rahu day wheel. The bot suggests name consonants that align with favorable phumi positions and warns against กาลกิณี consonants.

- **"เบอร์มงคลของฉันคือเลขอะไร"** — A user triggers the lucky-numbers output tool. The bot uses tool_use to call the function, which computes from the thaksa wheel's favorable positions. Returns numbers tied to the user's specific birth chart, not random "lucky 7" advice.

- **"เปรียบเทียบดวงฉันกับแฟน"** — A user enters their partner's birthday into the partner-match tool. The engine computes both charts, compares element compatibility (Thai + Chinese + Western), and identifies friction points (e.g., one person's กาลกิณี planet is the other's เดช planet). The bot explains the dynamics conversationally.

- **Solo operator monitoring** — The admin checks `/api/admin/logs` to see abuse patterns. Sees 3 prompt-injection attempts (blocked by security rules, logged as "validation_failed"). Checks daily API spend: $3.20 of $5 budget used. Adjusts nothing — the system is self-governing.

## Future potential

**What's built:** The full astrology engine, chat system, landing page, pricing, and validation funnel. The computational layer and the conversational layer are both production-ready.

**What's next (if validation confirms demand):** Supabase auth + time-based wallet (designed but unbuilt, ~14 hours of work). Manual PromptPay payment with operator verification via Line OA — no Stripe needed at Thai indie scale. Chat history persistence across devices.

**What this becomes:** A personal AI advisor that accumulates context over time. Each conversation adds to what the bot knows about you — your dasha period shifts, your life events, your follow-up questions. The more you use it, the more specific the advice becomes. The multi-tradition convergence engine is a platform: adding a 4th tradition (Vedic, Japanese Rokusei) is a JSON config change, not a rewrite. The thaksa naming system alone could be a standalone product (Thai baby name generator from birth chart). The daily energy check (Chinese day-element vs. your chart) could be a push notification. The 7,194-word wiki KB is the beginning of a structured Thai-astrology knowledge base that doesn't exist anywhere else in machine-readable form.

The long game: the only AI astrologer that gets better at understanding *you specifically* with every session — because it remembers, and because the underlying computation is deterministic and verifiable, not hallucinated.
