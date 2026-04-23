import type { NextApiRequest, NextApiResponse } from "next"
import { getIronSession } from "iron-session"
import { sessionOptions, type SessionData } from "../../../../lib/session"
import fs from "fs"
import path from "path"

type AuditEntry = {
  id: number
  page: string
  user: string | null
  timestamp: string
}

const dataRoot = path.join(process.cwd(), "data", "cms")
const pagesDir = path.join(dataRoot, "pages")
const backupsDir = path.join(dataRoot, "backups")
const auditFile = path.join(dataRoot, "audit.json")

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page } = req.query
  const pageName = Array.isArray(page) ? page[0] : String(page || "")
  if (!pageName) return res.status(400).json({ error: "Missing page" })

  const filePath = path.join(pagesDir, `${pageName}.json`)

  if (req.method === "GET") {
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: "Page not found" })
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"))
    return res.status(200).json(data)
  }

  if (req.method === "PUT") {
    const session = await getIronSession<SessionData>(req, res, sessionOptions)
    if (!session.user) return res.status(401).json({ error: "Unauthorized" })

    const body = req.body
    fs.mkdirSync(pagesDir, { recursive: true })
    fs.mkdirSync(backupsDir, { recursive: true })

    if (fs.existsSync(filePath)) {
      const existing = fs.readFileSync(filePath, "utf8")
      fs.writeFileSync(path.join(backupsDir, `${pageName}-${Date.now()}.json`), existing)
    }

    fs.writeFileSync(filePath, JSON.stringify(body, null, 2))

    // append audit
    let audits: AuditEntry[] = []
    try {
      if (fs.existsSync(auditFile)) audits = JSON.parse(fs.readFileSync(auditFile, "utf8"))
    } catch {
      audits = []
    }
    audits.push({ id: Date.now(), page: pageName, user: session.user?.email || null, timestamp: new Date().toISOString() })
    fs.writeFileSync(auditFile, JSON.stringify(audits, null, 2))

    return res.status(200).json({ ok: true })
  }

  return res.status(405).json({ error: "Method not allowed" })
}

export default handler
