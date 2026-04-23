import type { CmsBlock, CmsPageData } from "../cms-db"
import { CONTACT_KEYS } from "./contact-keys"

export type ContactContent = {
  heroImageUrl: string
  briefHeading: string
  briefBody: string
  joinHeading: string
  joinBody: string
  joinButtonLabel: string
  emailHeading: string
  emailValue: string
  callHeading: string
  callValue: string
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

export function extractContactContent(page: CmsPageData | null): ContactContent {
  const m = blocksByKey(page?.blocks)
  return {
    heroImageUrl: getImage(m, CONTACT_KEYS.heroImage, "/yellow-group-pic.jpg"),
    briefHeading: getText(m, CONTACT_KEYS.briefHeading, "brief us"),
    briefBody: getText(
      m,
      CONTACT_KEYS.briefBody,
      "If you would like to arrange to meet or you have a brief for us, please complete the contact form and we will be in touch shortly."
    ),
    joinHeading: getText(m, CONTACT_KEYS.joinHeading, "join us"),
    joinBody: getText(
      m,
      CONTACT_KEYS.joinBody,
      "If you are a freelancer and looking for work as a model, hostess, promoter, entertainer, photographer, videographer etc, click below to complete our online registration form to join our database."
    ),
    joinButtonLabel: getText(m, CONTACT_KEYS.joinButtonLabel, "APPLY HERE"),
    emailHeading: getText(m, CONTACT_KEYS.emailHeading, "email us:"),
    emailValue: getText(m, CONTACT_KEYS.emailValue, "hello@engage-me.me"),
    callHeading: getText(m, CONTACT_KEYS.callHeading, "call us:"),
    callValue: getText(m, CONTACT_KEYS.callValue, "+971 4 585 6845"),
  }
}

export function buildContactPageData(content: ContactContent): CmsPageData {
  const blocks: CmsBlock[] = [
    { id: CONTACT_KEYS.heroImage, key: CONTACT_KEYS.heroImage, type: "image", url: content.heroImageUrl, alt: "Engage Me contact" },
    { id: CONTACT_KEYS.briefHeading, key: CONTACT_KEYS.briefHeading, type: "heading", text: content.briefHeading },
    { id: CONTACT_KEYS.briefBody, key: CONTACT_KEYS.briefBody, type: "text", text: content.briefBody },
    { id: CONTACT_KEYS.joinHeading, key: CONTACT_KEYS.joinHeading, type: "heading", text: content.joinHeading },
    { id: CONTACT_KEYS.joinBody, key: CONTACT_KEYS.joinBody, type: "text", text: content.joinBody },
    { id: CONTACT_KEYS.joinButtonLabel, key: CONTACT_KEYS.joinButtonLabel, type: "text", text: content.joinButtonLabel },
    { id: CONTACT_KEYS.emailHeading, key: CONTACT_KEYS.emailHeading, type: "heading", text: content.emailHeading },
    { id: CONTACT_KEYS.emailValue, key: CONTACT_KEYS.emailValue, type: "text", text: content.emailValue },
    { id: CONTACT_KEYS.callHeading, key: CONTACT_KEYS.callHeading, type: "heading", text: content.callHeading },
    { id: CONTACT_KEYS.callValue, key: CONTACT_KEYS.callValue, type: "text", text: content.callValue },
  ]

  return { title: "contact", images: [content.heroImageUrl].filter(Boolean), blocks }
}

