import type { CmsBlock, CmsPageData } from "../cms-db"
import { JOBS_KEYS } from "./jobs-keys"

export type JobsField = { label: string; value: string }
export type JobsCard = { title: string; color: string; fields: JobsField[] }
export type JobsContent = { heroImageUrl: string; applyButtonLabel: string; jobs: JobsCard[] }

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

function getImage(m: Map<string, CmsBlock>, key: string, fallback: string) {
  const b = m.get(key)
  if (!b) return fallback
  if (b.type === "image") return b.url || fallback
  return fallback
}

export function extractJobsContent(page: CmsPageData | null, fallback: JobsContent): JobsContent {
  const m = blocksByKey(page?.blocks)

  const jobs: JobsCard[] = fallback.jobs.map((j, i) => ({
    title: getText(m, JOBS_KEYS.jobTitle(i), j.title),
    color: getText(m, JOBS_KEYS.jobColor(i), j.color),
    fields: j.fields.map((f, k) => ({
      label: getText(m, JOBS_KEYS.fieldLabel(i, k), f.label),
      value: getText(m, JOBS_KEYS.fieldValue(i, k), f.value),
    })),
  }))

  return {
    heroImageUrl: getImage(m, JOBS_KEYS.heroImage, fallback.heroImageUrl),
    applyButtonLabel: getText(m, JOBS_KEYS.applyButtonLabel, fallback.applyButtonLabel),
    jobs,
  }
}

export function buildJobsPageData(content: JobsContent): CmsPageData {
  const blocks: CmsBlock[] = [
    { id: JOBS_KEYS.heroImage, key: JOBS_KEYS.heroImage, type: "image", url: content.heroImageUrl, alt: "Engage Me jobs board" },
    { id: JOBS_KEYS.applyButtonLabel, key: JOBS_KEYS.applyButtonLabel, type: "text", text: content.applyButtonLabel },
  ]

  for (let i = 0; i < content.jobs.length; i++) {
    blocks.push({ id: JOBS_KEYS.jobTitle(i), key: JOBS_KEYS.jobTitle(i), type: "text", text: content.jobs[i]?.title || "" })
    blocks.push({ id: JOBS_KEYS.jobColor(i), key: JOBS_KEYS.jobColor(i), type: "text", text: content.jobs[i]?.color || "" })
    for (let k = 0; k < content.jobs[i].fields.length; k++) {
      blocks.push({ id: JOBS_KEYS.fieldLabel(i, k), key: JOBS_KEYS.fieldLabel(i, k), type: "text", text: content.jobs[i].fields[k]?.label || "" })
      blocks.push({ id: JOBS_KEYS.fieldValue(i, k), key: JOBS_KEYS.fieldValue(i, k), type: "text", text: content.jobs[i].fields[k]?.value || "" })
    }
  }

  const images = [content.heroImageUrl].filter(Boolean)
  return { title: "jobs", images, blocks }
}

