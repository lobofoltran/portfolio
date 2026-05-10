# Gustavo Lobo Portfolio

Engineering portfolio focused on backend systems, distributed architecture, and production reliability. Built as a static-export Next.js app — no server runtime, fully crawlable HTML.

🌐 **Live**: https://lobofoltran.dev

## Features

### Site
- Static-export Next.js app (`output: 'export'`)
- App-shell layout: viewport-fixed shell with a single internal scroll container (no sticky header jitter)
- Unified visual language: every internal page follows the same width, header, and badge patterns
- Responsive nav with mobile sheet, desktop social icons, active-state styling

### Blog
- MDX rendering via `next-mdx-remote/rsc`
- Category badges as eyebrow + pill-badge filter on the listing
- Featured post + responsive card grid
- Code highlighting (`rehype-pretty-code` + Shiki) with copy button
- Image zoom/lightbox
- Markdown images automatically wrapped in zoomable figures
- **Mermaid diagrams** with hover toolbar (Expand / Copy PNG / Download PNG / Download SVG) and a fullscreen lightbox with pan, wheel/button zoom, and fit-to-viewport on open
- **Table of contents** on `xl+` screens with scroll-spy via `IntersectionObserver`
- **Heading anchors** (`h2`/`h3` get slug ids and a hover `#` link)
- Previous/next post cards
- Programmatic blog covers generated from frontmatter (`scripts/generate-blog-covers.py`)

### Courses
- Catalog with status badges (`WIP`, `Recording`, `Published`)
- Per-course detail page with positioning, objectives, methodology, modules, project, and outcomes
- Outbound link tracking (UTM params)

### Resume / Contact
- Resume optimized for skim reading
- Contact page with `mailto:` CTA, copy-to-clipboard with feedback, and LinkedIn / GitHub links

### SEO
- `metadataBase`, canonical URLs per page, Open Graph (with `siteName`, `modifiedTime`, image type, tags), Twitter Card (`summary_large_image`)
- `keywords` derived from categories + tags
- `robots`/`googleBot` directives (`max-image-preview: large`, `max-snippet: -1`)
- Favicons, manifest, theme-color (light/dark)
- **JSON-LD**: Schema.org `BlogPosting` per post (with `wordCount`, `articleSection`, `author`, `publisher`) plus `Person` + `WebSite` on the home page
- **RSS 2.0 feed** at `/rss.xml` (advertised via `<link rel="alternate">`)
- Sitemap with `lastmod`, `changefreq`, and `priority`

## Stack
- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS
- `next-mdx-remote` + `rehype-pretty-code` (Shiki) + `remark-gfm`
- `mermaid` (lazy-loaded client-side)
- Vitest

## Local Development
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Scripts
```bash
npm run dev      # next dev
npm run build    # next build (runs prebuild + postbuild around it)
npm run lint     # eslint
npm test         # vitest
```

The `prebuild` script generates `public/sitemap.xml` and `public/rss.xml`. The `postbuild` script injects JSON-LD into the static HTML output (workaround for React 19 stripping inline non-async `<script>` tags from the static export).

## Blog Authoring

Create files in `content/blog` with this frontmatter:

```md
---
title: "Zero-Cost AI Gateway on the Edge"
date: "2026-02-16"
updated: "2026-04-12"            # optional, drives og:modified_time and JSON-LD
categories: ["Distributed Systems", "Cloudflare"]
tags: ["LLM", "Edge Computing"]   # optional, surfaces as keywords
cover: "/blog/ai-gateway.png"
excerpt: "Architecture and trade-offs for an edge AI gateway on free tier."
---
```

Notes:
- `cover` and `excerpt` are required (validated in `lib/posts.ts`).
- Markdown images are zoomable and lightbox-able.
- Fenced blocks are highlighted and copyable.
- Use ` ```mermaid ` fences for diagrams — they render inline with a toolbar and lightbox.
- Heading levels `##` and `###` are auto-included in the table of contents.

To generate a placeholder cover from frontmatter:
```bash
uv run scripts/generate-blog-covers.py            # only posts pointing at placeholder.svg
uv run scripts/generate-blog-covers.py --force    # regenerate all
```

## Architecture
See [`ARCHITECTURE.md`](ARCHITECTURE.md) for route map, data flow, and component boundaries.
See [`AGENTS.md`](AGENTS.md) for the operational contract used by automated contributors.

## Deployment
`next.config.ts` is configured for static export:
- `output: 'export'`
- `images.unoptimized: true`

The `out/` directory (after `npm run build`) can be served by any static host (Cloudflare Pages, Vercel, GitHub Pages, S3, etc.).

## Tests
Vitest tests in `tests/` cover:
- post parsing and frontmatter validation
- blog filtering + adjacency logic
- code-block helper behavior
- zoom-image helper behavior
- courses data and outbound-link tracking
- contact card rendering

## Releases
- **v2.0** — Engineering Polish & SEO (Mermaid, TOC, anchors, JSON-LD, RSS feed, expanded sitemap, app-shell layout)
- **v1.0** — Initial Engineering Release
