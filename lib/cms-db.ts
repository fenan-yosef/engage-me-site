import { type ResultSetHeader, type RowDataPacket } from "mysql2/promise"
import { unstable_noStore as noStore } from "next/cache"
import { getDbPool } from "./db"

export type CmsBlockType = "heading" | "text" | "image" | "gallery"

export type CmsHeadingBlock = { id: string; key?: string; type: "heading"; text: string }
export type CmsTextBlock = { id: string; key?: string; type: "text"; text: string }
export type CmsImageBlock = { id: string; key?: string; type: "image"; url?: string; alt?: string }
export type CmsGalleryBlock = { id: string; key?: string; type: "gallery"; urls: string[] }
export type CmsBlock = CmsHeadingBlock | CmsTextBlock | CmsImageBlock | CmsGalleryBlock

export type CmsPageData = {
  title?: string
  images?: string[]
  blocks?: CmsBlock[]
}

interface CmsPageRow extends RowDataPacket {
  id: number
  title: string | null
}

interface CmsImageRow extends RowDataPacket {
  url: string
}

interface CmsBlockRow extends RowDataPacket {
  id: number
  type: CmsBlockType
  block_key: string | null
  text: string | null
  image_url: string | null
  image_alt: string | null
}

interface CmsGalleryRow extends RowDataPacket {
  block_id: number
  url: string
}

interface CmsIdRow extends RowDataPacket {
  id: number
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null
}

type ParsedBlock =
  | { type: "heading"; key: string | null; text: string }
  | { type: "text"; key: string | null; text: string }
  | { type: "image"; key: string | null; url: string | null; alt: string | null }
  | { type: "gallery"; key: string | null; urls: string[] }

function parseBlock(v: unknown): ParsedBlock | null {
  if (!isRecord(v)) return null
  const key = typeof v["key"] === "string" ? v["key"] : null
  const type = v["type"]
  if (type === "heading" || type === "text") {
    const text = typeof v["text"] === "string" ? v["text"] : ""
    return { type, key, text }
  }
  if (type === "image") {
    const url = typeof v["url"] === "string" ? v["url"] : null
    const alt = typeof v["alt"] === "string" ? v["alt"] : null
    return { type: "image", key, url, alt }
  }
  if (type === "gallery") {
    const urls = Array.isArray(v["urls"]) ? (v["urls"] as unknown[]).filter((u): u is string => typeof u === "string") : []
    return { type: "gallery", key, urls }
  }
  return null
}

function coerceSlug(slug: string) {
  const s = slug.trim().toLowerCase()
  if (!s) throw new Error("Missing page slug")
  if (!/^[a-z0-9][a-z0-9_-]*$/.test(s)) throw new Error("Invalid page slug")
  return s
}

export async function getPage(slugRaw: string): Promise<CmsPageData | null> {
  noStore()
  const slug = coerceSlug(slugRaw)
  const pool = getDbPool()

  const [pageRows] = await pool.query<CmsPageRow[]>("SELECT id, title FROM cms_pages WHERE slug = ? LIMIT 1", [slug])
  const page = pageRows[0]
  if (!page) return null

  const [pageImagesRows] = await pool.query<CmsImageRow[]>("SELECT url FROM cms_page_images WHERE page_id = ? ORDER BY sort_order ASC, id ASC", [page.id])

  const [blockRows] = await pool.query<CmsBlockRow[]>(
    "SELECT id, type, block_key, text, image_url, image_alt FROM cms_blocks WHERE page_id = ? ORDER BY sort_order ASC, id ASC",
    [page.id]
  )

  const blockIds = blockRows.filter((b) => b.type === "gallery").map((b) => b.id)
  let galleriesByBlockId = new Map<number, string[]>()
  if (blockIds.length) {
    const [galleryRows] = await pool.query<CmsGalleryRow[]>(
      `SELECT block_id, url FROM cms_block_gallery_images WHERE block_id IN (${blockIds.map(() => "?").join(",")}) ORDER BY sort_order ASC, id ASC`,
      blockIds
    )
    galleriesByBlockId = galleryRows.reduce((m, r) => {
      const arr = m.get(r.block_id) || []
      arr.push(r.url)
      m.set(r.block_id, arr)
      return m
    }, new Map<number, string[]>())
  }

  const blocks: CmsBlock[] = blockRows.map((r) => {
    const id = String(r.id)
    const key = r.block_key || undefined
    if (r.type === "heading") return { id, key, type: "heading", text: r.text || "" }
    if (r.type === "text") return { id, key, type: "text", text: r.text || "" }
    if (r.type === "image") return { id, key, type: "image", url: r.image_url || undefined, alt: r.image_alt || undefined }
    return { id, key, type: "gallery", urls: galleriesByBlockId.get(r.id) || [] }
  })

  return {
    title: page.title || "",
    images: pageImagesRows.map((r) => r.url),
    blocks,
  }
}

export async function savePage(slugRaw: string, data: CmsPageData): Promise<void> {
  const slug = coerceSlug(slugRaw)
  const pool = getDbPool()
  const title = typeof data.title === "string" ? data.title : ""
  const images = Array.isArray(data.images) ? data.images.filter((u) => typeof u === "string") : []
  const blocks = Array.isArray(data.blocks) ? (data.blocks as unknown[]) : []

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()

    const [existingRows] = await conn.query<CmsIdRow[]>("SELECT id FROM cms_pages WHERE slug = ? LIMIT 1", [slug])
    let pageId = existingRows[0]?.id
    if (!pageId) {
      const [ins] = await conn.query<ResultSetHeader>("INSERT INTO cms_pages (slug, title) VALUES (?, ?)", [slug, title])
      pageId = ins.insertId
    } else {
      await conn.query("UPDATE cms_pages SET title = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", [title, pageId])
    }

    // Replace page images
    await conn.query("DELETE FROM cms_page_images WHERE page_id = ?", [pageId])
    for (let i = 0; i < images.length; i++) {
      await conn.query("INSERT INTO cms_page_images (page_id, sort_order, url) VALUES (?, ?, ?)", [pageId, i, images[i]])
    }

    // Replace blocks (and gallery children)
    const [oldBlocks] = await conn.query<CmsIdRow[]>("SELECT id FROM cms_blocks WHERE page_id = ?", [pageId])
    const oldIds = oldBlocks.map((b) => b.id)
    if (oldIds.length) {
      await conn.query(
        `DELETE FROM cms_block_gallery_images WHERE block_id IN (${oldIds.map(() => "?").join(",")})`,
        oldIds
      )
    }
    await conn.query("DELETE FROM cms_blocks WHERE page_id = ?", [pageId])

    for (let i = 0; i < blocks.length; i++) {
      const parsed = parseBlock(blocks[i])
      if (!parsed) continue

      if (parsed.type === "heading" || parsed.type === "text") {
        await conn.query("INSERT INTO cms_blocks (page_id, sort_order, type, block_key, text) VALUES (?, ?, ?, ?, ?)", [
          pageId,
          i,
          parsed.type,
          parsed.key,
          parsed.text,
        ])
        continue
      }

      if (parsed.type === "image") {
        await conn.query("INSERT INTO cms_blocks (page_id, sort_order, type, block_key, image_url, image_alt) VALUES (?, ?, ?, ?, ?, ?)", [
          pageId,
          i,
          "image",
          parsed.key,
          parsed.url,
          parsed.alt,
        ])
        continue
      }

      if (parsed.type === "gallery") {
        const [ins] = await conn.query<ResultSetHeader>(
          "INSERT INTO cms_blocks (page_id, sort_order, type, block_key) VALUES (?, ?, ?, ?)",
          [pageId, i, "gallery", parsed.key]
        )
        const blockId = ins.insertId
        for (let k = 0; k < parsed.urls.length; k++) {
          await conn.query("INSERT INTO cms_block_gallery_images (block_id, sort_order, url) VALUES (?, ?, ?)", [blockId, k, parsed.urls[k]])
        }
        continue
      }
    }

    await conn.commit()
  } catch (err) {
    await conn.rollback()
    throw err
  } finally {
    conn.release()
  }
}

export type CmsWorkItem = {
  slug: string
  title: string
  bannerUrl: string | null
  thumbnailUrl: string | null
  description: string | null
  leftImages: string[]
  rightImages: string[]
}

interface CmsWorkItemRow extends RowDataPacket {
  id: number
  slug: string
  title: string
  banner_url: string | null
  thumbnail_url: string | null
  description: string | null
  content_images: string | null
}

type ParsedContentImages = {
  leftImages: string[]
  rightImages: string[]
}

function toImageList(val: unknown) {
  if (!Array.isArray(val)) return []
  return val.filter((v): v is string => typeof v === "string" && v.trim().length > 0)
}

function parseContentImages(val: unknown): ParsedContentImages {
  if (!val) return { leftImages: [], rightImages: [] }
  if (Array.isArray(val)) {
    return {
      leftImages: toImageList(val.slice(0, 3)),
      rightImages: toImageList(val.slice(3, 4)),
    }
  }
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val)
      if (Array.isArray(parsed)) {
        return {
          leftImages: toImageList(parsed.slice(0, 3)),
          rightImages: toImageList(parsed.slice(3, 4)),
        }
      }
      if (isRecord(parsed)) {
        return {
          leftImages: toImageList(parsed["leftImages"]),
          rightImages: toImageList(parsed["rightImages"]),
        }
      }
      return { leftImages: [], rightImages: [] }
    } catch {
      return { leftImages: [], rightImages: [] }
    }
  }
  if (isRecord(val)) {
    return {
      leftImages: toImageList(val["leftImages"]),
      rightImages: toImageList(val["rightImages"]),
    }
  }
  return { leftImages: [], rightImages: [] }
}

export async function getWorkItem(slugRaw: string): Promise<CmsWorkItem | null> {
  noStore()
  const slug = coerceSlug(slugRaw)
  const pool = getDbPool()
  const [rows] = await pool.query<CmsWorkItemRow[]>("SELECT * FROM cms_work_items WHERE slug = ? LIMIT 1", [slug])
  const row = rows[0]
  if (!row) return null
  return {
    slug: row.slug,
    title: row.title,
    bannerUrl: row.banner_url,
    thumbnailUrl: row.thumbnail_url,
    description: row.description,
    ...parseContentImages(row.content_images),
  }
}

export async function getAllWorkItems(): Promise<CmsWorkItem[]> {
  noStore()
  const pool = getDbPool()
  const [rows] = await pool.query<CmsWorkItemRow[]>("SELECT * FROM cms_work_items ORDER BY title ASC")
  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    bannerUrl: row.banner_url,
    thumbnailUrl: row.thumbnail_url,
    description: row.description,
    ...parseContentImages(row.content_images),
  }))
}

export async function saveWorkItem(item: CmsWorkItem, previousSlugRaw?: string): Promise<void> {
  const slug = coerceSlug(item.slug)
  const previousSlug = previousSlugRaw ? coerceSlug(previousSlugRaw) : slug
  const pool = getDbPool()
  const contentImages = JSON.stringify({
    leftImages: toImageList(item.leftImages).slice(0, 3),
    rightImages: toImageList(item.rightImages).slice(0, 1),
  })

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()

    const [existingRows] = await conn.query<CmsIdRow[]>("SELECT id FROM cms_work_items WHERE slug = ? LIMIT 1", [previousSlug])
    if (existingRows[0]?.id) {
      if (previousSlug !== slug) {
        const [duplicateRows] = await conn.query<CmsIdRow[]>("SELECT id FROM cms_work_items WHERE slug = ? LIMIT 1", [slug])
        if (duplicateRows[0]?.id) {
          throw new Error("A work item with this slug already exists")
        }
      }
      await conn.query(
        "UPDATE cms_work_items SET slug = ?, title = ?, banner_url = ?, thumbnail_url = ?, description = ?, content_images = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [slug, item.title, item.bannerUrl, item.thumbnailUrl, item.description, contentImages, existingRows[0].id]
      )
    } else {
      await conn.query(
        "INSERT INTO cms_work_items (slug, title, banner_url, thumbnail_url, description, content_images) VALUES (?, ?, ?, ?, ?, ?)",
        [slug, item.title, item.bannerUrl, item.thumbnailUrl, item.description, contentImages]
      )
    }

    await conn.commit()
  } catch (err) {
    await conn.rollback()
    throw err
  } finally {
    conn.release()
  }
}

export async function deleteWorkItem(slugRaw: string): Promise<void> {
  const slug = coerceSlug(slugRaw)
  const pool = getDbPool()
  await pool.query("DELETE FROM cms_work_items WHERE slug = ?", [slug])
}
