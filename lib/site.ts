export const SITE_URL = "https://lobofoltran.dev"
export const SITE_NAME = "Gustavo Lobo"
export const SITE_AUTHOR = "Gustavo Lobo"
export const SITE_TWITTER = "@lobofoltran"
export const SITE_DESCRIPTION =
  "Software Engineer focused on architecture, distributed systems, and performance."

export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}
