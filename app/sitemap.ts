import type { MetadataRoute } from "next"

const SITE_URL = "https://engage-me.me"

// Main public pages
const STATIC_PATHS = [
  "",
  "work",
  "people",
  "insight",
  "jobs",
  "contact",
  "Credentials",
]

// Work category pages
const WORK_CATEGORY_PATHS = [
  "work/airport-activations_work",
  "work/brand-activations_work",
  "work/corporate-events_work",
  "work/entertainers_work",
  "work/event-staffing_work",
  "work/exhibitions_work",
  "work/f-b-staffing_work",
  "work/hosts-hostesses_work",
  "work/in-store-promoters_work",
  "work/lead-generation_work",
  "work/mall-activations_work",
  "work/models_work",
  "work/registration-staff_work",
  "work/retail-support_work",
  "work/roadshows_work",
  "work/social-media-content_work",
  "work/sporting-events_work",
  "work/themed-promoters_work",
  "work/trade-events_work",
  "work/virtual-promoters_work",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [...STATIC_PATHS, ...WORK_CATEGORY_PATHS].map((path) => ({
    url: path ? `${SITE_URL}/${path}` : SITE_URL,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }))
}
