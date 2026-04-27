# AGENTS.md

Style guide for the marketing site, blog, and public-facing copy. Captures the voice and design decisions that should hold across future edits. Read this before writing copy or designing a new section. For tech stack, file structure, and deployment, read `CLAUDE.md` instead.

---

## Voice

**Builder, quietly technical.** Short. Declarative. Confident without snark. Most copy on the site is one to three sentences long; sentence-level moves matter more than paragraph-level ones.

**Audience:** technically literate users — developers, homelab enthusiasts, Obsidian/Logseq power users, AI tool builders. They've seen every buzzword. They respond to specificity and architectural honesty, not enthusiasm.

**The voice test:** if you read the line aloud and it sounds like a person typing in a Slack DM, it works. If it sounds like a press release, marketing email, or AI-generated tagline, rewrite it.

The voice is defined by what it refuses. Most of the work in writing for this site is removing.

---

## Anti-patterns

These constructions consistently make copy feel AI-generated. Strip them on sight.

### "Not just X — a Y."
The most overused sentence in AI-PKM marketing. Frames the product against an unnamed lesser version.
- AVOID: "Not just a note-taking app — a knowledge graph."
- INSTEAD: a positive declarative about what Atomic *is*.

### Rule-of-three lists.
LLMs lean on three-item lists reflexively. Pick the strongest one and let it stand.
- AVOID: "Notes, articles, web clips, feeds — everything is automatically embedded, tagged, and linked."
- INSTEAD: "No folders. Atomic tags every note the moment it lands."

### Em-dash drama, repeated.
Em-dashes are fine sparingly. Multiple per page reads as the same sentence on repeat. Hard cap: one or two per section.

### Italic-plus-color accent.
The italic-purple-keyword move is the visual tell of generic AI marketing. **At most one italic phrase per page**, on the hero kicker. The purple `text-accent` color is reserved for interactive elements (buttons, links, hover states), not decorative text emphasis.

### Buzzword sandwiches.
"AI-augmented", "AI-powered", "AI-native intelligent platform" — phrases that mean nothing alone and stack into less than nothing. Use specifics: "self-organizing", "agent-ready", "vector embeddings", "cites sources". Atomic is AI-native — back that claim up with what AI actually does.

### Generic ownership language.
Obsidian already owns "your knowledge, your hardware." Atomic's wedge is **AI-native + self-hostable**, not self-hosted alone. Lines a competitor could lift unchanged are losses.
- AVOID: "Your knowledge, on your hardware."
- INSTEAD: "An AI-native knowledge graph that's yours end-to-end."

### Press-release feature lists.
- AVOID: "Atomic collects your notes, articles, and research into an AI-augmented knowledge graph — with semantic search, wiki synthesis, and agentic chat."
- INSTEAD: "Free. Open Source. Yours end-to-end."

### "Wake up to" / "Imagine" / "Picture this".
Twee. Narrows the use case. Dates badly. Cut.

### "Actually" used defensively.
"What X actually means" reads as snarky pushback against detractors. Prefer "What X looks like" — observational, concrete, less embattled.

### Listicle counts in headings.
"Six things..." / "Five reasons..." / "Three ways..." — listicle energy. Prefer headings that frame *what* the cards demonstrate, not how many.

---

## Patterns that work

### Three flat declaratives.
The voice's signature move.
- "Free. Open Source. Yours end-to-end."
- "Open source. Self-hosted. Your data stays yours." (early form)
- "It cites them; it doesn't invent them."

### One sentence per feature card.
Card title labels. Body lands the magic. No setup paragraph.
- "Search by what you meant, not what you typed."
- "Chat with your notes. It cites them; it doesn't invent them."

### Atomic-only terms.
Lines a competitor couldn't lift are inherently better.
- "Wikis, written by your notes."
- "Everything is an atom."
- "A force-directed map of your thinking."
- "One server. Every device."

### Architecture claims, made plain.
The site's unfair advantage is being able to describe a real architecture (server + clients + sync) competitors can't. Use it.
- "Your server is the source of truth. Every client points at it: desktop, iOS, browser, MCP."

### One italic kicker.
The hero H1 italicizes the differentiating clause. Works because nothing else on the page is italicized. Keep scarce.

---

## Terminology

Use the left column. Avoid the right.

| Use | Not |
|---|---|
| knowledge graph | knowledge base (SaaS-support coded) |
| atom | document, entry, item, record |
| self-organizing | "automatically organized" |
| AI-native | AI-powered, AI-augmented |
| self-hosted | on-prem (B2B-coded), cloud-hosted |
| local-first | offline-first |
| agentic chat | "AI assistant" |
| end-to-end (hyphenated) | end to end (in kicker phrases) |
| MCP | "AI integrations" |
| source of truth | "single source", "centralized" |

### Distinguishing related concepts

- **Self-organizing** is the user-felt magic (notes connect themselves).
- **AI-native** is the mechanism (embeddings, LLM synthesis, agents).
- Use "self-organizing" when describing experience; "AI-native" when describing architecture.

### Capitalization

- "Open Source" capitalized in display headings (deliberate term, like a brand).
- "open source" lowercase in body text.
- "AI-native" — hyphenated, lowercase `native`.
- "MCP" all-caps (acronym).
- "Atomic" always capitalized; "atom" never (the noun, the primitive).

---

## Section heuristics

### Hero (`src/pages/index.astro`)

- Single column, left-aligned. Outer container `max-w-7xl`.
- H1 takes the full container width — no inner max-w cap on the H1's wrapper. Use `text-balance` so wrapping doesn't orphan words.
- H1 ends with a period (it's a complete sentence).
- One italic phrase: the kicker ("that's yours end-to-end"). No purple on it.
- Subhead is one sentence, capped at `max-w-3xl`, leads with the user-felt magic.
- Two CTAs max: primary (Download) + secondary (GitHub).
- Tight vertical padding so the video peeks above the fold.
- **No version pill, no "new" badges.** Both have been tried; both stole attention from the H1.

### Features grid ("What AI-native looks like")

- Section H2 is short, no period, sentence-cased.
- Six cards, each a 2-3 word title + one sentence of body.
- Don't cap the count in the H2 ("Six things..." reads listicle).
- Bodies are 1-2 sentences max. If a card needs more, promote it to an image-paired section.

### Image-paired feature sections

- Eyebrow label (small uppercase, `text-text-muted`) + section H2 + 1-2 sentence body + "Learn more →" link.
- Eyebrow label is muted gray, not purple.
- Section H2 has a period.
- The "Learn more" link is the one place purple is allowed in the section — it's interactive.

### Daily briefing / video-feature sections

- Centered text block: H2 (no period) + one sentence + video below.
- No "New" pill.
- Lead with the magic interaction ("Click any citation; the source atom lights up...").

### "One server. Every device." section

- H2 names the architecture in five words.
- Body states *server is the source of truth*; lists clients literally; names the dual-deployment story (laptop or homelab).
- Icon grid puts Server in the visual center.

### Final CTA

- Three flat declaratives in display font, centered.
- Period after each.
- Two CTAs: Download + GitHub. No body paragraph.

---

## Design conventions

### Color use

- **Backgrounds**: light warm cream for landing/blog; dark for Starlight docs.
- **Accent (`#7c3aed`, `text-accent`)**: interactive only — primary buttons, links in body, hover states. Not for decorative text emphasis. Eyebrow labels are muted gray, not accent.
- **Decorative emphasis on text**: usually none. The H1's kicker uses italic, no color. Section H2s with emphasized words use solid black.

### Typography

- **Display**: Instrument Serif — H1, H2, hero kickers, blog titles.
- **Body**: DM Sans — everything else.
- **Code**: DM Mono.

### Italics

Italic is structural, not decorative. Marks the differentiating phrase in the hero H1. Not used elsewhere. If you find yourself reaching for italics, rewrite the surrounding text instead.

### Decorative elements (hero only)

- Subtle dot grid background (`opacity-[0.03]`).
- A handful of animated dots near the hero's outer edges, never crowding content.
- Faint SVG lines (`opacity-[0.04]`) flanking the layout.

These evoke the "graph" theme without being literal. They belong to the hero — don't replicate elsewhere.

### Layout

- **Outer container**: `max-w-7xl` for hero and most sections.
- **Inner text**: `max-w-3xl` for paragraphs (readable line length); H1 takes full container.
- **Vertical padding**: tight (`pt-10 md:pt-14 pb-10 md:pb-12` for hero; `py-20 md:py-28` for full sections). Earlier spacious versions felt loose.

---

## Pre-ship checklist

Before committing copy changes:

1. **Could a competitor lift this line unchanged?** If yes, rewrite to be Atomic-specific.
2. **Buzzwords or rule-of-three lists present?** Remove.
3. **More than two em-dashes on the page?** Cut some.
4. **More than one italic phrase on the page?** Drop all but one.
5. **Read aloud — does it sound like a press release?** Rewrite.
6. **Does the H1 describe the actual product, or has it abstracted into AI-language?** Concrete beats clever.

---

## Breaking these rules

These conventions are defaults, not commandments. Break them when:

- A line is so distinctive and Atomic-specific that the trade is worth it.
- A list of three items is genuinely the right count (not chosen for rhythm).
- An italic phrase elsewhere is doing real semantic work that solid weight wouldn't.

Default to the rules; deviate consciously, not accidentally.
