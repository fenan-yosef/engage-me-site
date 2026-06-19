import type { MetadataRoute } from "next"

const SITE_URL = "https://engage-me.me"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cms", "/api", "/staffapplication"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
