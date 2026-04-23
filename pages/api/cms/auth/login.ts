import type { NextApiRequest, NextApiResponse } from "next"
import { getIronSession } from "iron-session"
import { sessionOptions, type SessionData } from "../../../../lib/session"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()
  const { email, password } = req.body || {}

  const adminEmail = process.env.CMS_ADMIN_EMAIL
  const adminPassword = process.env.CMS_ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    return res.status(500).json({ error: "CMS admin not configured (CMS_ADMIN_EMAIL/CMS_ADMIN_PASSWORD missing)" })
  }

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  const session = await getIronSession<SessionData>(req, res, sessionOptions)
  session.user = { email }
  await session.save()

  return res.status(200).json({ ok: true })
}

export default handler
