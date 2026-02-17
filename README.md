# Gustavo Lobo Portfolio

Engineering portfolio focused on backend systems, distributed architecture, and production reliability.

## Features
- Static-export Next.js app (`output: 'export'`)
- Technical MDX blog with:
  - category segmented navigation
  - featured post + responsive grid
  - code highlighting + copy button
  - image zoom/lightbox
  - previous/next post cards
- Courses listing + details pages
- Resume page optimized for readability
- Contact page with direct email card

## Stack
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- `next-mdx-remote`
- `rehype-pretty-code` + Shiki
- Vitest

## Local Development
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Scripts
```bash
npm run dev
npm run build
npm run lint
npm test
```

## Blog Authoring
Create files in `content/blog` with this frontmatter:

```md
---
title: "Zero-Cost AI Gateway on the Edge"
date: "2026-02-16"
categories: ["Distributed Systems", "Cloudflare"]
cover: "/blog/ai-gateway-architecture.png"
excerpt: "Architecture and trade-offs for an edge AI gateway on free tier"
---
```

Notes:
- `cover` is required and validated in `lib/posts.ts`.
- Markdown images are zoomable.
- Fenced blocks are highlighted and copyable.

## Architecture
See `ARCHITECTURE.md` for route map, data flow, and component boundaries.

## Deployment
`next.config.ts` is configured for static export:
- `output: 'export'`
- `images.unoptimized: true`

## Tests
Vitest tests are in `tests/` and cover:
- post parsing and cover validation
- blog filtering + adjacency logic
- codeblock helper behavior
- zoom image helper behavior
- courses data and link tracking
