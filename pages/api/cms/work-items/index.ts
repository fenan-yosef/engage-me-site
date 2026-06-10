import type { NextApiRequest, NextApiResponse } from "next"
import { getIronSession } from "iron-session"
import { sessionOptions, type SessionData } from "../../../../lib/session"
import { getAllWorkItems, saveWorkItem } from "../../../../lib/cms-db"

function normalizeImages(value: unknown, max: number) {
  if (!Array.isArray(value)) return []
  return value.filter((img): img is string => typeof img === "string" && img.trim().length > 0).slice(0, max)
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const items = await getAllWorkItems()
      return res.status(200).json(items)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Database error"
      return res.status(500).json({ error: msg })
    }
  }

  if (req.method === "POST") {
    const session = await getIronSession<SessionData>(req, res, sessionOptions)
    if (!session.user) return res.status(401).json({ error: "Unauthorized" })

    try {
      const item = req.body
      if (!item?.slug || !item?.title) {
        return res.status(400).json({ error: "Missing slug or title" })
      }
      await saveWorkItem({
        slug: item.slug,
        title: item.title,
        bannerUrl: item.bannerUrl || null,
        thumbnailUrl: item.thumbnailUrl || null,
        description: item.description || null,
        leftImages: normalizeImages(item.leftImages, 3),
        rightImages: normalizeImages(item.rightImages, 1),
      })
      return res.status(200).json({ ok: true })
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Database error"
      return res.status(500).json({ error: msg })
    }
  }

  return res.status(405).json({ error: "Method not allowed" })
}

export default handler
