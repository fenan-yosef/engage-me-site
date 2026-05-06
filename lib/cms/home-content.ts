import type { CmsBlock, CmsPageData } from "../cms-db"
import { HOME_KEYS } from "./home-keys"

export type HomeContent = {
  hero: { leftText: string; bgUrl: string; logoUrl: string }
  bringing: { heading: string; body: string; buttonLabel: string; carouselUrls: string[] }
  engaging: { heading: string; p1: string; p2: string; buttonLabel: string; staffGridUrls: string[] }
  insight: { heading: string; p1: string; p2: string; buttonLabel: string; imageUrl: string }
}

function normalizeUrl(v: string) {
  const s = v.trim()
  if (!s) return s
  if (s.startsWith("/")) return s
  return `/${s}`
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
  if (!b) return normalizeUrl(fallback)
  if (b.type === "image") return normalizeUrl(b.url || fallback)
  return normalizeUrl(fallback)
}

function getGallery(m: Map<string, CmsBlock>, key: string, fallback: string[]) {
  const b = m.get(key)
  if (!b) return fallback.map(normalizeUrl)
  if (b.type === "gallery") {
    const urls = Array.isArray(b.urls) ? b.urls.filter((u) => typeof u === "string" && u.trim()) : []
    return (urls.length ? urls : fallback).map(normalizeUrl)
  }
  return fallback.map(normalizeUrl)
}

export function extractHomeContent(page: CmsPageData | null): HomeContent {
  const m = blocksByKey(page?.blocks)

  return {
    hero: {
      leftText: getText(m, HOME_KEYS.heroLeftText, "We are"),
      bgUrl: getImage(m, HOME_KEYS.heroBg, "/her-sec.jpg"),
      logoUrl: getImage(m, HOME_KEYS.heroLogo, "/engage-me-logo.png"),
    },
    bringing: {
      heading: getText(m, HOME_KEYS.bringingHeading, "bringing brands to life"),
      body: getText(
        m,
        HOME_KEYS.bringingBody,
        "Our mission is to drive results for our clients by pairing the right staff with effective on-ground management. It's that simple."
      ),
      buttonLabel: getText(m, HOME_KEYS.bringingButtonLabel, "OUR WORK"),
      carouselUrls: getGallery(m, HOME_KEYS.bringingCarousel, ["/carousel-image-1.jpg", "/carousel-image-2.jpg", "/carousel-image-3.jpg"]),
    },
    engaging: {
      heading: getText(m, HOME_KEYS.engagingHeading, "engaging staff"),
      p1: getText(m, HOME_KEYS.engagingP1, "We believe the staff hired to represent your brand on-the-ground, will make or break your project."),
      p2: getText(
        m,
        HOME_KEYS.engagingP2,
        "Getting to know our staff, how they converse, their experience and even their interests helps us to match the right staff to your requirements."
      ),
      buttonLabel: getText(m, HOME_KEYS.engagingButtonLabel, "FIND OUT MORE"),
      staffGridUrls: getGallery(
        m,
        HOME_KEYS.staffGrid,
        Array.from({ length: 9 }, (_, i) => `/staff-${i + 1}.jpg`)
      ),
    },
    insight: {
      heading: getText(m, HOME_KEYS.insightHeading, "Driving Results"),
      p1: getText(
        m,
        HOME_KEYS.insightP1,
        "With our bespoke reporting tool INSIGHT, clients can see results, feedback, pictures and videos throughout the duration of the campaign."
      ),
      p2: getText(
        m,
        HOME_KEYS.insightP2,
        "This allows us to evolve and adapt throughout each project in order to get the desired results."
      ),
      buttonLabel: getText(m, HOME_KEYS.insightButtonLabel, "FIND OUT MORE"),
      imageUrl: getImage(m, HOME_KEYS.insightImage, "/driving-results.jpg"),
    },
  }
}

export function buildHomePageData(content: HomeContent): CmsPageData {
  const blocks: CmsBlock[] = [
    { id: HOME_KEYS.heroLeftText, key: HOME_KEYS.heroLeftText, type: "heading", text: content.hero.leftText },
    { id: HOME_KEYS.heroBg, key: HOME_KEYS.heroBg, type: "image", url: normalizeUrl(content.hero.bgUrl) },
    { id: HOME_KEYS.heroLogo, key: HOME_KEYS.heroLogo, type: "image", url: normalizeUrl(content.hero.logoUrl), alt: "engage me" },

    { id: HOME_KEYS.bringingHeading, key: HOME_KEYS.bringingHeading, type: "heading", text: content.bringing.heading },
    { id: HOME_KEYS.bringingBody, key: HOME_KEYS.bringingBody, type: "text", text: content.bringing.body },
    { id: HOME_KEYS.bringingButtonLabel, key: HOME_KEYS.bringingButtonLabel, type: "text", text: content.bringing.buttonLabel },
    { id: HOME_KEYS.bringingCarousel, key: HOME_KEYS.bringingCarousel, type: "gallery", urls: content.bringing.carouselUrls.map(normalizeUrl) },

    { id: HOME_KEYS.engagingHeading, key: HOME_KEYS.engagingHeading, type: "heading", text: content.engaging.heading },
    { id: HOME_KEYS.engagingP1, key: HOME_KEYS.engagingP1, type: "text", text: content.engaging.p1 },
    { id: HOME_KEYS.engagingP2, key: HOME_KEYS.engagingP2, type: "text", text: content.engaging.p2 },
    { id: HOME_KEYS.engagingButtonLabel, key: HOME_KEYS.engagingButtonLabel, type: "text", text: content.engaging.buttonLabel },
    { id: HOME_KEYS.staffGrid, key: HOME_KEYS.staffGrid, type: "gallery", urls: content.engaging.staffGridUrls.map(normalizeUrl) },

    { id: HOME_KEYS.insightHeading, key: HOME_KEYS.insightHeading, type: "heading", text: content.insight.heading },
    { id: HOME_KEYS.insightP1, key: HOME_KEYS.insightP1, type: "text", text: content.insight.p1 },
    { id: HOME_KEYS.insightP2, key: HOME_KEYS.insightP2, type: "text", text: content.insight.p2 },
    { id: HOME_KEYS.insightButtonLabel, key: HOME_KEYS.insightButtonLabel, type: "text", text: content.insight.buttonLabel },
    { id: HOME_KEYS.insightImage, key: HOME_KEYS.insightImage, type: "image", url: normalizeUrl(content.insight.imageUrl), alt: "Driving Results" },
  ]

  const images = [
    content.hero.bgUrl,
    content.hero.logoUrl,
    ...content.bringing.carouselUrls,
    ...content.engaging.staffGridUrls,
    content.insight.imageUrl,
  ]
    .map(normalizeUrl)
    .filter(Boolean)

  return { title: "home", images, blocks }
}
