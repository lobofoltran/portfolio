const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")

const BASE_URL = "https://lobofoltran.dev"
const SITE_TITLE = "Gustavo Lobo"
const SITE_DESCRIPTION =
  "Software Engineer focused on architecture, distributed systems, and performance."
const FEED_AUTHOR = "Gustavo Lobo"
const FEED_LANG = "en-us"
const BLOG_DIR = path.join(process.cwd(), "content/blog")

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function toRfc2822(value) {
  if (!value) return new Date().toUTCString()
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return new Date().toUTCString()
  return date.toUTCString()
}

function loadPosts() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "")
      const source = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8")
      const { data } = matter(source)
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
      }
    })
    .filter((post) => post.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function generateRss() {
  const posts = loadPosts()
  const lastBuildDate = toRfc2822(
    posts[0]?.updated || posts[0]?.date || new Date()
  )

  const items = posts
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`
      const cover = post.cover
        ? post.cover.startsWith("http")
          ? post.cover
          : `${BASE_URL}${post.cover}`
        : null

      const enclosure = cover
        ? `\n      <enclosure url="${escapeXml(cover)}" type="image/png" length="0" />`
        : ""

      const categoriesXml = post.categories
        .map((c) => `\n      <category>${escapeXml(c)}</category>`)
        .join("")

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${toRfc2822(post.date)}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <author>noreply@lobofoltran.dev (${escapeXml(FEED_AUTHOR)})</author>${categoriesXml}${enclosure}
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)} — Blog</title>
    <link>${BASE_URL}/blog</link>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>${FEED_LANG}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>Custom static export</generator>
${items}
  </channel>
</rss>
`

  fs.writeFileSync(path.join(process.cwd(), "public/rss.xml"), xml)
  console.log(`RSS feed generated with ${posts.length} items`)
}

generateRss()
