# Architecture

## High-Level
This portfolio is a static-exported Next.js application with MDX-driven blog content.

Primary goals:
- Technical credibility and content clarity
- Zero backend runtime requirement for portfolio pages
- Predictable rendering under static export

## Route Topology
- `/` Home
- `/blog` Blog index
- `/blog/[slug]` Blog post details
- `/courses` Courses list
- `/courses/[slug]` Course details
- `/resume` Resume
- `/contact` Contact

## Blog Architecture
### Content source
- Files: `content/blog/*.mdx`
- Parser: `lib/posts.ts`
- Post contract:
  - `title`, `date`, `categories`, `cover`, `excerpt`

### Data flow
1. `lib/posts.ts` parses MDX frontmatter and computes read time.
2. `app/blog/page.tsx` loads posts and categories.
3. `components/blog/blog-list.tsx` applies client-side query filtering (`?category=`).
4. `app/blog/[slug]/page.tsx` renders post body and adjacent navigation.

### MDX rendering stack
- `next-mdx-remote/rsc`
- `rehype-pretty-code` (syntax highlight)
- `remark-unwrap-images` (unwrap image paragraphs)
- `components/mdx-components.tsx` custom components
  - `ZoomImage`
  - `CodeBlock`

## Courses Architecture
- Source: `lib/courses.ts`
- List page: `app/courses/page.tsx`
- Detail page: `app/courses/[slug]/page.tsx`
- External links use `withTrackingParams()` for UTM attribution.

## Contact Architecture
- Route: `app/contact/page.tsx`
- UI component: `components/contact/email-card.tsx`
- No form submission, no worker dependency, no client secrets.

## Styling Strategy
- Tailwind CSS + global tokens in `app/globals.css`
- Minimalist palette and typography hierarchy
- Code highlighting CSS uses Shiki variables for light/dark token values.

## SEO and Metadata
- Route-level metadata with Open Graph on major content routes.
- Blog post metadata derives from parsed post frontmatter.

## Testing Architecture
- Framework: Vitest
- Scope:
  - parsing + validation (`tests/posts.test.ts`)
  - blog logic (`tests/blog-utils.test.ts`)
  - codeblock helpers (`tests/code-block*.test.ts`)
  - zoom image helper (`tests/zoom-image.test.ts`)
  - courses data/tracking (`tests/courses.test.ts`)

## Design Constraints
- Keep static export compatible.
- Avoid runtime server dependencies for page rendering.
- Preserve clear component boundaries:
  - parsing in `lib/*`
  - route composition in `app/*`
  - presentational behavior in `components/*`
