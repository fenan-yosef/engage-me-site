import type { NextApiRequest, NextApiResponse } from "next"
import { getIronSession } from "iron-session"
import { sessionOptions, type SessionData } from "../../../lib/session"
import fs from "fs"
import path from "path"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()
  const session = await getIronSession<SessionData>(req, res, sessionOptions)
  if (!session.user) return res.status(401).json({ error: "Unauthorized" })

  const { target } = req.body || {}
  if (!target) return res.status(400).json({ error: "Missing target path" })

  // sanitize target - must be inside public
  const safe = path.normalize(String(target)).replace(/^\/+/, "")
  const out = path.join(process.cwd(), "public", safe)
  if (!out.startsWith(path.join(process.cwd(), "public"))) return res.status(400).json({ error: "Invalid target" })

  try {
    if (fs.existsSync(out)) fs.unlinkSync(out)
    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error("delete error", e)
    return res.status(500).json({ error: "Could not delete" })
  }
}

export default handler
