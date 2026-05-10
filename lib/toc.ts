export type TocItem = {
  id: string
  text: string
  level: 2 | 3
}

/**
 * GitHub-style slug: lowercase, strip non-word chars, collapse spaces to hyphens.
 * Must match the implementation used by the MDX heading components so anchor
 * links and the TOC point to the same ids.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[`*_~]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

/**
 * Parses a markdown source string and extracts level-2 and level-3 headings,
 * skipping anything inside fenced code blocks.
 */
export function extractToc(markdown: string): TocItem[] {
  const withoutFences = markdown.replace(/```[\s\S]*?```/g, "")
  const lines = withoutFences.split("\n")
  const items: TocItem[] = []
  const usedIds = new Map<string, number>()

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+?)\s*$/)
    if (!match) continue

    const level = match[1].length as 2 | 3
    const text = match[2]
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/_([^_]+)_/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .trim()

    const baseId = slugify(text)
    const count = usedIds.get(baseId) ?? 0
    const id = count === 0 ? baseId : `${baseId}-${count}`
    usedIds.set(baseId, count + 1)

    items.push({ id, text, level })
  }

  return items
}
