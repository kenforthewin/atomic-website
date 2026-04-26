# Atomic Website

Marketing site, documentation, and blog for [Atomic](https://github.com/kenforthewin/atomic) — a personal knowledge base that turns freeform notes into a semantically-connected, AI-augmented knowledge graph.

## Tech Stack

- **Framework**: Astro 6 (static site generator)
- **Docs**: Astro Starlight (sidebar, search via Pagefind, dark mode)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- **Interactive components**: React 19 (`@astrojs/react` for island architecture)
- **TypeScript**: Strict mode

## Common Commands

```bash
npm run dev               # Dev server (syncs docs first, then exposes via --host)
npm run build             # Production build → dist/ (always pulls fresh docs)
npm run preview           # Preview production build locally
npm run sync-docs         # Pull docs from atomic main (no-op if already present)
npm run sync-docs:fresh   # Force re-pull docs from atomic main
```

Docs are sourced from `kenforthewin/atomic/docs/manual/` — `src/content/docs/` is gitignored. See "Documentation" below.

## Site Structure

The site has three distinct sections with different design treatments:

### Landing Page (`src/pages/index.astro`)
- Light/warm background (`#faf9f7`), dark app screenshots pop against it
- Uses `BaseLayout.astro` — custom nav, footer, no Starlight
- Hero, feature grid, screenshot showcase, platform grid, CTA

### Documentation (`src/content/docs/`)
- Powered by **Starlight** — dark theme by default with light mode toggle
- Starlight handles routing, sidebar, search, and page chrome automatically
- Sidebar structure is defined in `astro.config.mjs` (not auto-generated from files)
- Docs pages are plain markdown with Starlight frontmatter (`title`, `description`)
- **Slugs do NOT include a `docs/` prefix** — a file at `src/content/docs/concepts/atoms.md` has slug `concepts/atoms` and URL `/concepts/atoms/`
- Internal links between docs pages use absolute paths without `docs/`: `/concepts/atoms/`, `/getting-started/installation/`
- **Source of truth lives in [kenforthewin/atomic](https://github.com/kenforthewin/atomic) at `docs/manual/`** — not in this repo. `src/content/docs/` is gitignored and populated by `scripts/sync-docs.sh`, which clones the atomic repo (shallow) and copies `docs/manual/` into place. `npm run dev` and `npm run build` invoke this automatically. Edit docs in the atomic repo, push to main, then re-run `npm run sync-docs:fresh` to pick up changes.

### Blog (`src/pages/blog/`, `src/content/blog/`)
- Light theme matching the landing page
- Uses `BlogLayout.astro` wrapping `BaseLayout.astro`
- Content collection with glob loader (defined in `src/content.config.ts`)
- Frontmatter: `title`, `description`, `date`, `author`, `draft`
- Blog post URLs use the file's `id` from the glob loader: `/blog/introducing-atomic/`

### API Explorer (`src/pages/api/explorer.astro`)
- Scalar-powered explorer that loads the OpenAPI JSON published by the Atomic release workflow
- Will use a React island component to render the interactive API docs

## Directory Layout

```
src/
  assets/           # Optimized images (processed by Astro)
    icon.png        # App icon (used as Starlight logo)
  components/       # Shared Astro + React components
  content/
    blog/           # Blog posts (markdown, glob-loaded)
    docs/           # Documentation (markdown, Starlight-managed)
      getting-started/
      concepts/
      guides/
      self-hosting/
      api/
  content.config.ts # Collection schemas (docs + blog)
  layouts/
    BaseLayout.astro  # Landing page + blog shell (nav, footer)
    BlogLayout.astro  # Blog post wrapper (extends BaseLayout)
  pages/
    index.astro       # Landing page
    blog/             # Blog listing + dynamic post routes
    api/              # API explorer page
  styles/
    global.css        # Tailwind imports, @font-face, @theme tokens
    docs.css          # Starlight CSS variable overrides
public/
  images/screenshots/ # Full-size app screenshots (canvas, chat, wiki)
  favicon.ico
```

## Design System

### Two-Tone Approach
- **Landing page + blog**: Light warm background. Clean, editorial feel. Screenshots contrast against light surface.
- **Docs (Starlight)**: Dark theme by default matching the app's palette. Light mode toggle available.

### Colors
- Backgrounds (landing): `#faf9f7` (primary), `#f2f0ec` (secondary), `#eae7e1` (tertiary)
- Backgrounds (docs dark): `#1e1e1e` (main), `#252525` (nav/sidebar), `#2d2d2d` (borders)
- Text: `#1a1a1a` (primary), `#4a4540` (secondary), `#8a8580` (muted)
- Accent: `#7c3aed` (purple) — consistent across both themes
- Borders: `#e0ddd8` (default), `#eceae6` (light)

### Typography
- **Display**: Instrument Serif (headings, hero text, blog titles)
- **Body**: DM Sans (paragraphs, nav, UI text)
- **Code**: DM Mono (code blocks, inline code)
- Fonts loaded via `@font-face` in `global.css` from Google Fonts CDN

### Tailwind Theme Tokens
Defined in `global.css` under `@theme`. Use as: `bg-bg-primary`, `text-text-secondary`, `text-accent`, `font-display`, `font-body`, `font-mono`, etc.

## Key Conventions

- **Astro pages** (`.astro`) for landing, blog listing, API explorer — anything with custom layout
- **Markdown** for all content (docs and blog) — never `.astro` for content pages
- **React islands** only where interactivity is required (API explorer). Everything else is zero-JS Astro.
- **Starlight sidebar** is manually configured in `astro.config.mjs`. When adding a new doc page, add its sidebar entry there too.
- Screenshots in `public/images/screenshots/` are copied from the main Atomic repo's `docs/images/`. They are not auto-synced.
- The `logo-explorations/` directory contains WIP logo design work — not part of the site build.

## Deployment

- **Target**: Cloudflare Pages
- **Build command**: `npm run build`
- **Output directory**: `dist/`
- **Domain**: Default Cloudflare subdomain for now, custom domain later

## Relationship to Main Repo

This website is a separate repo from [kenforthewin/atomic](https://github.com/kenforthewin/atomic), but it is not standalone. **User-facing docs are sourced from `kenforthewin/atomic/docs/manual/`** — the marketing site, blog, and design live here, but the docs content is pulled in at build time via `scripts/sync-docs.sh`. Edits to docs should happen in the atomic repo.

Other content that references the app:
- **Screenshots** in `public/images/screenshots/` are copied manually from `kenforthewin/atomic/docs/images/`. Not auto-synced.
- **API explorer** loads the OpenAPI JSON published by the Atomic release workflow at `https://kenforthewin.github.io/atomic/openapi.json`. Set `PUBLIC_ATOMIC_OPENAPI_URL` to point previews or forks at a different spec.
