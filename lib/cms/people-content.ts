import type { CmsBlock, CmsPageData } from "../cms-db"
import { PEOPLE_KEYS } from "./people-keys"

export type PeopleContent = {
  a2z: { heading: string; body: string; carouselUrls: string[] }
  founders: {
    f1: { imageUrl: string; name: string; roleLines: string; bioLines: string }
    f2: { imageUrl: string; name: string; roleLines: string; bioLines: string }
    headingLines: string
    p1: string
    p2: string
  }
  join: { headingLines: string; body: string; buttonLabel: string; imageUrl: string }
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

function getGallery(m: Map<string, CmsBlock>, key: string, fallback: string[]) {
  const b = m.get(key)
  if (!b) return fallback
  if (b.type === "gallery") return Array.isArray(b.urls) && b.urls.length ? b.urls : fallback
  return fallback
}

export function extractPeopleContent(page: CmsPageData | null): PeopleContent {
  const m = blocksByKey(page?.blocks)
  return {
    a2z: {
      heading: getText(m, PEOPLE_KEYS.a2zHeading, "a to z people"),
      body: getText(
        m,
        PEOPLE_KEYS.a2zBody,
        "With over 5,000 staff on our database, we can provide any type of temporary staffing solution required by client's, from; models, hostesses, promoters, actors, dancers, F&B staff, waiters, bar staff, ushers, entertainers."
      ),
      carouselUrls: getGallery(m, PEOPLE_KEYS.a2zCarousel, Array.from({ length: 6 }, (_, i) => `/a-z-${i + 1}.gif`)),
    },
    founders: {
      f1: {
        imageUrl: getImage(m, PEOPLE_KEYS.founder1Image, "/lisa.gif"),
        name: getText(m, PEOPLE_KEYS.founder1Name, "lisa haddad"),
        roleLines: getText(m, PEOPLE_KEYS.founder1Role, "strategic planning &\ndriving results expert"),
        bioLines: getText(m, PEOPLE_KEYS.founder1Bio, "9 year's experience\nin brand activation\nat OgilvyAction/Geometry\nin the UK & UAE"),
      },
      f2: {
        imageUrl: getImage(m, PEOPLE_KEYS.founder2Image, "/clare.gif"),
        name: getText(m, PEOPLE_KEYS.founder2Name, "clare walsh"),
        roleLines: getText(m, PEOPLE_KEYS.founder2Role, "on-ground\nmanagement expert"),
        bioLines: getText(m, PEOPLE_KEYS.founder2Bio, "7 year's experience\nin event management\nspecialising in promotional\nstaffing management\nand uniform development."),
      },
      headingLines: getText(m, PEOPLE_KEYS.foundersHeading, "meet the\nfounders"),
      p1: getText(m, PEOPLE_KEYS.foundersP1, "Established in the UAE in 2014, our founders not only have vast experience within the region but also internationally."),
      p2: getText(
        m,
        PEOPLE_KEYS.foundersP2,
        "Our founders bring a mix of strategic planning and effectiveness expertise with pristine talent and on-the-ground management expertise, from their previous roles in Events and Marketing, to ensure we deliver for our client's time and time again."
      ),
    },
    join: {
      headingLines: getText(m, PEOPLE_KEYS.joinHeading, "want to join our\nteam"),
      body: getText(
        m,
        PEOPLE_KEYS.joinBody,
        "If you are freelancer and looking for work as a model, hostess, promoter, entertainer, photographer, videographer etc, click below to complete our online registration form to join our database. You are just a couple of clicks away from joining our fun team."
      ),
      buttonLabel: getText(m, PEOPLE_KEYS.joinButtonLabel, "APPLY HERE"),
      imageUrl: getImage(m, PEOPLE_KEYS.joinImage, "/ladies.jpg"),
    },
  }
}

export function buildPeoplePageData(content: PeopleContent): CmsPageData {
  const blocks: CmsBlock[] = [
    { id: PEOPLE_KEYS.a2zHeading, key: PEOPLE_KEYS.a2zHeading, type: "heading", text: content.a2z.heading },
    { id: PEOPLE_KEYS.a2zBody, key: PEOPLE_KEYS.a2zBody, type: "text", text: content.a2z.body },
    { id: PEOPLE_KEYS.a2zCarousel, key: PEOPLE_KEYS.a2zCarousel, type: "gallery", urls: content.a2z.carouselUrls },

    { id: PEOPLE_KEYS.founder1Image, key: PEOPLE_KEYS.founder1Image, type: "image", url: content.founders.f1.imageUrl, alt: "Founder portrait" },
    { id: PEOPLE_KEYS.founder1Name, key: PEOPLE_KEYS.founder1Name, type: "text", text: content.founders.f1.name },
    { id: PEOPLE_KEYS.founder1Role, key: PEOPLE_KEYS.founder1Role, type: "text", text: content.founders.f1.roleLines },
    { id: PEOPLE_KEYS.founder1Bio, key: PEOPLE_KEYS.founder1Bio, type: "text", text: content.founders.f1.bioLines },

    { id: PEOPLE_KEYS.founder2Image, key: PEOPLE_KEYS.founder2Image, type: "image", url: content.founders.f2.imageUrl, alt: "Founder portrait" },
    { id: PEOPLE_KEYS.founder2Name, key: PEOPLE_KEYS.founder2Name, type: "text", text: content.founders.f2.name },
    { id: PEOPLE_KEYS.founder2Role, key: PEOPLE_KEYS.founder2Role, type: "text", text: content.founders.f2.roleLines },
    { id: PEOPLE_KEYS.founder2Bio, key: PEOPLE_KEYS.founder2Bio, type: "text", text: content.founders.f2.bioLines },

    { id: PEOPLE_KEYS.foundersHeading, key: PEOPLE_KEYS.foundersHeading, type: "heading", text: content.founders.headingLines },
    { id: PEOPLE_KEYS.foundersP1, key: PEOPLE_KEYS.foundersP1, type: "text", text: content.founders.p1 },
    { id: PEOPLE_KEYS.foundersP2, key: PEOPLE_KEYS.foundersP2, type: "text", text: content.founders.p2 },

    { id: PEOPLE_KEYS.joinHeading, key: PEOPLE_KEYS.joinHeading, type: "heading", text: content.join.headingLines },
    { id: PEOPLE_KEYS.joinBody, key: PEOPLE_KEYS.joinBody, type: "text", text: content.join.body },
    { id: PEOPLE_KEYS.joinButtonLabel, key: PEOPLE_KEYS.joinButtonLabel, type: "text", text: content.join.buttonLabel },
    { id: PEOPLE_KEYS.joinImage, key: PEOPLE_KEYS.joinImage, type: "image", url: content.join.imageUrl, alt: "Engage Me team" },
  ]

  const images = [
    ...content.a2z.carouselUrls,
    content.founders.f1.imageUrl,
    content.founders.f2.imageUrl,
    content.join.imageUrl,
  ].filter(Boolean)
  return { title: "people", images, blocks }
}

