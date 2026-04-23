import type { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import path from "path"

function walkImages(dir: string, root: string) {
  let out: string[] = []
  const items = fs.readdirSync(dir)
  for (const it of items) {
    const full = path.join(dir, it)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) out = out.concat(walkImages(full, root))
    else {
      const ext = path.extname(it).toLowerCase()
      if ([".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"].includes(ext)) {
        out.push("/" + path.relative(root, full).replace(/\\/g, "/"))
      }
    }
  }
  return out
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const publicDir = path.join(process.cwd(), "public")
  if (!fs.existsSync(publicDir)) return res.status(200).json([])
  const images = walkImages(publicDir, publicDir)
  res.status(200).json(images)
}
