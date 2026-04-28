import type { CmsBlock, CmsPageData } from "../cms-db"
import { WORK_KEYS } from "./work-keys"

export type WorkItem = { title: string; href: string }

export type WorkContent = {
  heading: string
  intro: string
  items: WorkItem[]
}

function blocksByKey(blocks: CmsBlock[] | undefined) {
  const m = new Map<string, CmsBlock>()
  for (const b of blocks || []) {
    if (b.key) m.set(b.key, b)
  }
  return m
}

function getText(m: Map<string, CmsBlock>, key: string, fallback: string) {
  const b = m.get(key)
  if (!b) return fallback
  if (b.type === "heading" || b.type === "text") return typeof b.text === "string" ? b.text : fallback
  return fallback
}

export function extractWorkContent(page: CmsPageData | null, fallbackItems: WorkItem[]): WorkContent {
  const m = blocksByKey(page?.blocks)

  return {
    heading: getText(m, WORK_KEYS.heading, "our work"),
    intro: getText(m, WORK_KEYS.intro, "A selection of the projects and staffing services we deliver."),
    items: fallbackItems,
  }
}

export function buildWorkPageData(content: WorkContent): CmsPageData {
  const blocks: CmsBlock[] = [
    { id: WORK_KEYS.heading, key: WORK_KEYS.heading, type: "heading", text: content.heading },
    { id: WORK_KEYS.intro, key: WORK_KEYS.intro, type: "text", text: content.intro },
  ]

  return { title: "work", images: [], blocks }
}
