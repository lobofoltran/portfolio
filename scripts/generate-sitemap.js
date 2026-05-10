const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")

const BASE_URL = "https://lobofoltran.dev"
const BLOG_DIR = path.join(process.cwd(), "content/blog")

// [path, priority, changefreq]
const staticPages = [
  ["", "1.0", "weekly"],
  ["/blog", "0.8", "weekly"],
  ["/courses", "0.7", "monthly"],
  ["/resume", "0.7", "monthly"],
  ["/contact", "0.5", "yearly"],
]

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function toIsoDate(value) {
  if (!value) return null
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString()
}

function getBlogPosts() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "")
      const source = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8")
      const { data } = matter(source)
      const lastmod = toIsoDate(data.updated || data.modified || data.date)
      return { slug, lastmod }
    })
}

function fileMtimeIso(relativePath) {
  try {
    const stat = fs.statSync(path.join(process.cwd(), relativePath))
    return stat.mtime.toISOString()
  } catch {
    return null
  }
}

function generateSitemap() {
  const posts = getBlogPosts()
  const today = new Date().toISOString()

  const entries = [
    ...staticPages.map(([p, priority, changefreq]) => ({
      loc: `${BASE_URL}${p}`,
      lastmod:
        fileMtimeIso(p === "" ? "app/page.tsx" : `app${p}/page.tsx`) || today,
      changefreq,
      priority,
    })),
    ...posts.map((post) => ({
      loc: `${BASE_URL}/blog/${post.slug}`,
      lastmod: post.lastmod || today,
      changefreq: "monthly",
      priority: "0.8",
    })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`

  fs.writeFileSync(path.join(process.cwd(), "public/sitemap.xml"), xml)
  console.log(`Sitemap generated with ${entries.length} URLs`)
}

generateSitemap()
