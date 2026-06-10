import type { NextApiRequest, NextApiResponse } from "next"
import { getIronSession } from "iron-session"
import { sessionOptions, type SessionData } from "../../../../lib/session"
import { getWorkItem, saveWorkItem, deleteWorkItem } from "../../../../lib/cms-db"

function normalizeImages(value: unknown, max: number) {
  if (!Array.isArray(value)) return []
  return value.filter((img): img is string => typeof img === "string" && img.trim().length > 0).slice(0, max)
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query
  const slugStr = Array.isArray(slug) ? slug[0] : String(slug || "")
  if (!slugStr) return res.status(400).json({ error: "Missing slug" })

  if (req.method === "GET") {
    try {
      const item = await getWorkItem(slugStr)
      if (!item) return res.status(404).json({ error: "Work item not found" })
      return res.status(200).json(item)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Database error"
      return res.status(500).json({ error: msg })
    }
  }

  if (req.method === "PUT" || req.method === "POST") {
    const session = await getIronSession<SessionData>(req, res, sessionOptions)
    if (!session.user) return res.status(401).json({ error: "Unauthorized" })

    try {
      const item = req.body
      if (!item?.title) {
        return res.status(400).json({ error: "Missing title" })
      }
      if (!slugStr || !/^[a-z0-9][a-z0-9_-]*$/.test(slugStr)) {
        return res.status(400).json({ error: "Invalid slug - use only lowercase letters, numbers, and hyphens" })
      }
      
      await saveWorkItem({
        slug: item.slug || slugStr,
        title: item.title,
        bannerUrl: item.bannerUrl || null,
        thumbnailUrl: item.thumbnailUrl || null,
        description: item.description || null,
        leftImages: normalizeImages(item.leftImages, 3),
        rightImages: normalizeImages(item.rightImages, 1),
      }, item.originalSlug || slugStr)
      return res.status(200).json({ ok: true })
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Database error"
      return res.status(500).json({ error: msg })
    }
  }

  if (req.method === "DELETE") {
    const session = await getIronSession<SessionData>(req, res, sessionOptions)
    if (!session.user) return res.status(401).json({ error: "Unauthorized" })

    try {
      await deleteWorkItem(slugStr)
      return res.status(200).json({ ok: true })
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Database error"
      return res.status(500).json({ error: msg })
    }
  }

  return res.status(405).json({ error: "Method not allowed" })
}

export default handler
