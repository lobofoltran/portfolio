# AGENTS.md

## Purpose
Operational contract for agents working in this repository. Prioritize correctness, minimalism, and static-export compatibility.

## Product Scope
- Personal engineering portfolio (backend/distributed systems focus)
- Next.js App Router + static export (`output: 'export'`)
- Core surfaces: Home, Blog, Blog Post, Courses, Resume, Contact

## Hard Constraints
- Keep visual language minimalist (no flashy effects, no decorative complexity).
- Preserve static export compatibility (avoid server-only runtime dependencies).
- Do not expose secrets in client code.
- Keep MDX rendering stable (images, code highlighting, copy button).
- Favor small atomic commits using Conventional Commits.

## Repository Map
- `app/`: routes
  - `app/page.tsx`
  - `app/blog/page.tsx`
  - `app/blog/[slug]/page.tsx`
  - `app/courses/page.tsx`
  - `app/courses/[slug]/page.tsx`
  - `app/resume/page.tsx`
  - `app/contact/page.tsx`
- `content/blog/*.mdx`: blog source
- `components/blog/*`: blog-specific UI (filters, zoom image, code block, back link)
- `components/mdx-components.tsx`: MDX component mapping
- `lib/posts.ts`: frontmatter parsing/validation + read time
- `lib/blog.ts`: categories + filtering + adjacent posts
- `lib/courses.ts`: courses catalog and link tracking
- `tests/*.test.ts`: Vitest tests

## Blog Frontmatter Contract
Every post must provide:
```md
---
title: "..."
date: "YYYY-MM-DD"
categories: ["..."]
cover: "/blog/<image>.png"
excerpt: "..."
---
```
Rules:
- `cover` is mandatory (`lib/posts.ts` throws when missing).
- `categories` should be array of strings.
- Keep `excerpt` short for cards/metadata.

## MDX Rules
- Markdown images are zoomable and can open lightbox.
- Fenced code blocks use `rehype-pretty-code` and copy action.
- Inline code styling is CSS-driven via `.mdx-content :not(pre) > code`.
- When modifying MDX renderer, avoid invalid nesting that causes hydration errors.

## Testing Rules
Minimum checks for changes touching blog/content infra:
- post parsing and frontmatter validation
- category filtering and adjacent post logic
- code block utility behavior
- zoom image helper behavior

## Commands
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm test`

## Commit Guidelines
- Use Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`, `chore:`).
- Keep commits atomic and domain-scoped (blog, courses, docs, tests, etc.).
- Avoid mixed commits (feature + unrelated formatting).

## Do / Don’t
Do:
- Keep route UX clear and scan-friendly.
- Keep components typed and small.
- Preserve URL-state behavior for blog filters.

Don’t:
- Reintroduce dark-mode/theme complexity if intentionally fixed to light.
- Add form back to contact page unless explicitly requested.
- Break static export by using dynamic runtime-only APIs.

## How To Add A Blog Post
1. Add file at `content/blog/<slug>.mdx`.
2. Add required frontmatter fields.
3. Put images in `public/blog/`.
4. Include architecture/code snippets as fenced blocks.
5. Validate rendering at `/blog` and `/blog/<slug>`.
6. Run lint/tests before commit.
