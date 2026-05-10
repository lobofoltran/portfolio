/**
 * Post-build step: inject JSON-LD <script> tags into generated static HTML.
 *
 * Necessary because React 19 / Next.js 15 with `output: 'export'` strips
 * non-async, non-`src` <script> tags from the rendered HTML, even when
 * declared in a Server Component. We work around it by walking the build
 * output and inserting the appropriate Schema.org payload into <head>.
 */

const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")

const SITE_URL = "https://lobofoltran.dev"
const SITE_NAME = "Gustavo Lobo"
const BLOG_DIR = path.join(process.cwd(), "content/blog")
const OUT_DIR = path.join(process.cwd(), "out")

function absoluteUrl(p) {
  if (!p) return SITE_URL
  if (/^https?:\/\//.test(p)) return p
  return `${SITE_URL}${p.startsWith("/") ? p : `/${p}`}`
}

function escapeForScript(value) {
  return value.replace(/</g, "\\u003c").replace(/<\/script>/gi, "<\\/script>")
}

function injectIntoHead(htmlPath, scriptHtml) {
  if (!fs.existsSync(htmlPath)) return false
  const html = fs.readFileSync(htmlPath, "utf-8")
  if (html.includes('type="application/ld+json"')) return false
  const updated = html.replace("</head>", `${scriptHtml}</head>`)
  if (updated === html) return false
  fs.writeFileSync(htmlPath, updated)
  return true
}

function buildBlogPostingJsonLd(post) {
  const wordCount = post.content.trim().split(/\s+/).filter(Boolean).length
  const url = absoluteUrl(`/blog/${post.slug}`)
  const cover = absoluteUrl(post.cover)
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.excerpt,
    image: [cover],
    datePublished: post.date,
    dateModified: post.updated || post.date,
    keywords: [...(post.categories || []), ...(post.tags || [])].join(", "),
    articleSection: (post.categories || [])[0],
    wordCount,
    author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
  }
}

function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    jobTitle: "Software Engineer — Backend & Distributed Systems",
    sameAs: [
      "https://linkedin.com/in/gustavo-lobo",
      "https://github.com/lobofoltran",
    ],
  }
}

function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
  }
}

function loadPosts() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "")
      const source = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8")
      const { data, content } = matter(source)
      return {
        slug,
        title: data.title || slug,
        excerpt: data.excerpt || data.description || "",
        date: data.date,
        updated: data.updated || data.modified,
        cover: data.cover,
        categories: Array.isArray(data.categories)
          ? data.categories
          : data.categories
            ? [data.categories]
            : [],
        tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
        content,
      }
    })
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.warn("inject-jsonld: out/ directory not found — did you run `next build`?")
    return
  }

  const posts = loadPosts()
  let blogCount = 0
  for (const post of posts) {
    const jsonLd = buildBlogPostingJsonLd(post)
    const scriptHtml = `<script type="application/ld+json">${escapeForScript(JSON.stringify(jsonLd))}</script>`
    const htmlPath = path.join(OUT_DIR, "blog", `${post.slug}.html`)
    if (injectIntoHead(htmlPath, scriptHtml)) blogCount += 1
  }

  // Inject Person + WebSite JSON-LD into the home page for stronger entity signal
  const homeJsonLd = [buildPersonJsonLd(), buildWebSiteJsonLd()]
    .map(
      (obj) =>
        `<script type="application/ld+json">${escapeForScript(JSON.stringify(obj))}</script>`
    )
    .join("")
  const homeInjected = injectIntoHead(path.join(OUT_DIR, "index.html"), homeJsonLd)

  console.log(
    `JSON-LD injected: ${blogCount} blog post(s)${homeInjected ? ", home page" : ""}`
  )
}

main()
