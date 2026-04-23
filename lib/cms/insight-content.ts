import type { CmsBlock, CmsPageData } from "../cms-db"
import { INSIGHT_KEYS } from "./insight-keys"

export type InsightContent = {
  intro: { heading: string; p1: string; p2: string; imageUrl: string }
  incentives: { heading: string; p1: string; p2: string; imageUrl: string }
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

function getImage(m: Map<string, CmsBlock>, key: string, fallback: string) {
  const b = m.get(key)
  if (!b) return fallback
  if (b.type === "image") return b.url || fallback
  return fallback
}

export function extractInsightContent(page: CmsPageData | null): InsightContent {
  const m = blocksByKey(page?.blocks)
  return {
    intro: {
      heading: getText(m, INSIGHT_KEYS.introHeading, "insight"),
      p1: getText(
        m,
        INSIGHT_KEYS.introP1,
        "Welcome to INSIGHT our bespoke reporting tool developed with your KPI's at the forefront of every project."
      ),
      p2: getText(
        m,
        INSIGHT_KEYS.introP2,
        "No one is closer to your consumer than our staff on-the-ground. Their feedback provides insights that can add value to your campaign and allow us to make changes throughout to ensure we meet your key objectives."
      ),
      imageUrl: getImage(m, INSIGHT_KEYS.introImage, "/driving-results.jpg"),
    },
    incentives: {
      heading: getText(m, INSIGHT_KEYS.incentivesHeading, "staff incentives"),
      p1: getText(
        m,
        INSIGHT_KEYS.incentivesP1,
        "A key tactic that we recommend to clients, for target driven campaigns, is incentives. We are experienced to develop programs that will motivate and encourage staff to hit targets."
      ),
      p2: getText(
        m,
        INSIGHT_KEYS.incentivesP2,
        "Incentives are tracked regularly and we adapt throughout the campaign to ensure we hit the client objective and provide ROI."
      ),
      imageUrl: getImage(m, INSIGHT_KEYS.incentivesImage, "/carousel-image-1.jpg"),
    },
  }
}

export function buildInsightPageData(content: InsightContent): CmsPageData {
  const blocks: CmsBlock[] = [
    { id: INSIGHT_KEYS.introHeading, key: INSIGHT_KEYS.introHeading, type: "heading", text: content.intro.heading },
    { id: INSIGHT_KEYS.introP1, key: INSIGHT_KEYS.introP1, type: "text", text: content.intro.p1 },
    { id: INSIGHT_KEYS.introP2, key: INSIGHT_KEYS.introP2, type: "text", text: content.intro.p2 },
    { id: INSIGHT_KEYS.introImage, key: INSIGHT_KEYS.introImage, type: "image", url: content.intro.imageUrl, alt: "Insight reporting" },

    { id: INSIGHT_KEYS.incentivesHeading, key: INSIGHT_KEYS.incentivesHeading, type: "heading", text: content.incentives.heading },
    { id: INSIGHT_KEYS.incentivesP1, key: INSIGHT_KEYS.incentivesP1, type: "text", text: content.incentives.p1 },
    { id: INSIGHT_KEYS.incentivesP2, key: INSIGHT_KEYS.incentivesP2, type: "text", text: content.incentives.p2 },
    { id: INSIGHT_KEYS.incentivesImage, key: INSIGHT_KEYS.incentivesImage, type: "image", url: content.incentives.imageUrl, alt: "Staff incentives" },
  ]

  const images = [content.intro.imageUrl, content.incentives.imageUrl].filter(Boolean)
  return { title: "insight", images, blocks }
}

