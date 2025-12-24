const fs = require("fs")
const path = require("path")

const BASE_URL = "https://lobofoltran.dev"
const BLOG_DIR = path.join(process.cwd(), "content/blog")

const staticPages = [
  "",
  "/blog",
  "/resume"
]

function getBlogSlugs() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

function generateSitemap() {
  const slugs = getBlogSlugs()

  const urls = [
    ...staticPages.map((p) => `${BASE_URL}${p}`),
    ...slugs.map((slug) => `${BASE_URL}/blog/${slug}`)
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url}</loc>
  </url>`
  )
  .join("")}
</urlset>
`

  fs.writeFileSync(
    path.join(process.cwd(), "public/sitemap.xml"),
    xml.trim()
  )
}

generateSitemap()
