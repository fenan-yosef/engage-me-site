import type { NextApiRequest, NextApiResponse } from "next"
import { getIronSession } from "iron-session"
import { sessionOptions, type SessionData } from "../../../lib/session"
import { IncomingForm } from "formidable"
import fs from "fs"
import path from "path"

type UploadFieldValue = string | string[] | undefined

type UploadFile = {
  filepath?: string
  path?: string
  originalFilename?: string | null
  name?: string | null
}

type UploadParseFields = Record<string, UploadFieldValue>
type UploadParseFiles = Record<string, UploadFile | UploadFile[] | undefined>

export const config = {
  api: {
    bodyParser: false,
  },
}

function isImage(filename: string) {
  const ext = path.extname(filename || "").toLowerCase()
  return [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"].includes(ext)
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()
  const session = await getIronSession<SessionData>(req, res, sessionOptions)
  if (!session.user) return res.status(401).json({ error: "Unauthorized" })

  const form = new IncomingForm({ multiples: false })
  form.parse(req, (err: Error | null, fields: UploadParseFields, files: UploadParseFiles) => {
    if (err) {
      console.error("upload parse error", err)
      return res.status(500).json({ error: "Upload parse error" })
    }

    const uploaded = files.file || files.upload || null
    if (!uploaded) return res.status(400).json({ error: "No file uploaded" })

    const file = Array.isArray(uploaded) ? uploaded[0] : uploaded
    const tempPath = file.filepath || file.path
    if (!tempPath) return res.status(500).json({ error: "Upload file path missing" })
    const originalName = file.originalFilename || file.name || `upload-${Date.now()}`

    if (!isImage(String(originalName))) return res.status(400).json({ error: "Only image uploads allowed" })

    const uploadsDir = path.join(process.cwd(), "public", "uploads")
    fs.mkdirSync(uploadsDir, { recursive: true })

    const destField = fields.dest ? String(fields.dest) : undefined
    try {
      const data = fs.readFileSync(tempPath)
      if (destField) {
        // sanitize and write into public/ (allow overwrite)
        const safe = path.normalize(destField).replace(/^\/+/, "")
        const out = path.join(process.cwd(), "public", safe)
        if (!out.startsWith(path.join(process.cwd(), "public"))) {
          return res.status(400).json({ error: "Invalid destination" })
        }
        fs.mkdirSync(path.dirname(out), { recursive: true })
        fs.writeFileSync(out, data)
        return res.status(200).json({ url: `/${path.relative(path.join(process.cwd(), "public"), out).replace(/\\/g, "/")}` })
      }

      const filename = `${Date.now()}-${originalName}`
      const outPath = path.join(uploadsDir, filename)
      fs.writeFileSync(outPath, data)
      return res.status(200).json({ url: `/uploads/${filename}` })
    } catch (e) {
      console.error("upload save error", e)
      return res.status(500).json({ error: "Could not save file" })
    }
  })
}

export default handler
