import fs from "fs"
import path from "path"

export type CmsAuditEntry = {
  id: number
  page: string
  user: string | null
  timestamp: string
}

export type CmsPageData = {
  title?: string
  sections?: Array<Record<string, unknown>>
  images?: string[]
  [key: string]: unknown
}

const ROOT = path.join(process.cwd(), "data", "cms")
const PAGES = path.join(ROOT, "pages")
const BACKUPS = path.join(ROOT, "backups")
const AUDIT = path.join(ROOT, "audit.json")

export function ensureCmsDirs() {
  fs.mkdirSync(PAGES, { recursive: true })
  fs.mkdirSync(BACKUPS, { recursive: true })
}

export function readPage(page: string) {
  const fp = path.join(PAGES, `${page}.json`)
  if (!fs.existsSync(fp)) return null
  return JSON.parse(fs.readFileSync(fp, "utf8")) as CmsPageData
}

export function writePage(page: string, data: CmsPageData, userEmail?: string) {
  ensureCmsDirs()
  const fp = path.join(PAGES, `${page}.json`)
  if (fs.existsSync(fp)) {
    const existing = fs.readFileSync(fp, "utf8")
    fs.writeFileSync(path.join(BACKUPS, `${page}-${Date.now()}.json`), existing)
  }
  fs.writeFileSync(fp, JSON.stringify(data, null, 2))

  // audit
  let audits: CmsAuditEntry[] = []
  try {
    if (fs.existsSync(AUDIT)) audits = JSON.parse(fs.readFileSync(AUDIT, "utf8"))
  } catch {
    audits = []
  }
  audits.push({ id: Date.now(), page, user: userEmail || null, timestamp: new Date().toISOString() })
  fs.writeFileSync(AUDIT, JSON.stringify(audits, null, 2))
}
