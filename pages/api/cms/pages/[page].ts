import type { NextApiRequest, NextApiResponse } from "next"
import { getIronSession } from "iron-session"
import { sessionOptions, type SessionData } from "../../../../lib/session"
import { getPage, savePage } from "../../../../lib/cms-db"

function formatCmsDbError(e: unknown) {
  const msg = e instanceof Error ? e.message : "Database error"
  if (msg.includes("Unknown column") && msg.includes("block_key")) {
    return (
      msg +
      " — Your DB schema is missing `cms_blocks.block_key`. Run: ALTER TABLE cms_blocks ADD COLUMN block_key VARCHAR(64) NULL; CREATE UNIQUE INDEX uniq_cms_blocks_page_key ON cms_blocks (page_id, block_key);"
    )
  }
  return msg
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page } = req.query
  const pageName = Array.isArray(page) ? page[0] : String(page || "")
  if (!pageName) return res.status(400).json({ error: "Missing page" })

  if (req.method === "GET") {
    try {
      const data = await getPage(pageName)
      if (!data) return res.status(404).json({ error: "Page not found" })
      return res.status(200).json(data)
    } catch (e: unknown) {
      return res.status(500).json({ error: formatCmsDbError(e) })
    }
  }

  if (req.method === "PUT") {
    const session = await getIronSession<SessionData>(req, res, sessionOptions)
    if (!session.user) return res.status(401).json({ error: "Unauthorized" })

    try {
      await savePage(pageName, req.body || {})
      return res.status(200).json({ ok: true })
    } catch (e: unknown) {
      return res.status(500).json({ error: formatCmsDbError(e) })
    }
  }

  return res.status(405).json({ error: "Method not allowed" })
}

export default handler
