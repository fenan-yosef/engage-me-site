"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

type ImageURL = string

type BlockType = "heading" | "text" | "image" | "gallery"

type HeadingBlock = { id: string; type: "heading"; text: string }
type TextBlock = { id: string; type: "text"; text: string }
type ImageBlock = { id: string; type: "image"; url?: string; alt?: string }
type GalleryBlock = { id: string; type: "gallery"; urls: string[] }
type Block = HeadingBlock | TextBlock | ImageBlock | GalleryBlock

type CmsPageData = {
  title?: string
  images?: ImageURL[]
  blocks?: Block[]
  [key: string]: unknown
}

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

function convertToBlocks(d: unknown): Block[] {
  if (!d) return []
  if (typeof d === "object" && d !== null) {
    const obj = d as Record<string, unknown>
    if (Array.isArray(obj["blocks"])) return (obj["blocks"] as unknown) as Block[]
    if (Array.isArray(obj["sections"])) {
      return (obj["sections"] as unknown[]).map((s: unknown) => {
        if (typeof s === "string") return { id: makeId(), type: "text", text: s }
        if (s && typeof s === "object") {
          const sec = s as Record<string, unknown>
          if (typeof sec["content"] === "string") return { id: makeId(), type: "text", text: String(sec["content"]) }
          if (sec["type"] === "heading" && typeof sec["text"] === "string") return { id: makeId(), type: "heading", text: String(sec["text"]) }
        }
        return { id: makeId(), type: "text", text: JSON.stringify(s) }
      })
    }
    // fallback: if there's a body-ish string
    if (typeof obj["body"] === "string") return [{ id: makeId(), type: "text", text: String(obj["body"]) }]
  }
  return []
}

export default function PageEditor() {
  const params = useParams() as { slug?: string }
  const slug = params?.slug || ""
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<CmsPageData>({ title: "", images: [], blocks: [] })
  const [message, setMessage] = useState<string | null>(null)
  const [media, setMedia] = useState<ImageURL[]>([])

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    ;(async () => {
      try {
        const pageResp = await fetch(`/api/cms/pages/${slug}`)
        let page: Record<string, unknown> = {}
        if (pageResp.status !== 404) {
          page = await pageResp.json().catch(() => ({}))
        }
        const imgs = await fetch(`/api/cms/list-uploads`).then((r) => r.json()).catch(() => [])
        const base = page || {}
        const blocks = convertToBlocks(base)
        const title = typeof base["title"] === "string" ? String(base["title"]) : ""
        const images = Array.isArray(base["images"]) ? (base["images"] as string[]) : []
        setData({ title, images, blocks })
        setMedia(Array.isArray(imgs) ? imgs : [])
      } finally {
        setLoading(false)
      }
    })()
  }, [slug])

  async function save() {
    setMessage(null)
    const res = await fetch(`/api/cms/pages/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (res.ok) setMessage("Saved")
    else setMessage("Save failed")
  }

  async function uploadFile(file: File) {
    const form = new FormData()
    form.append("file", file)
    const res = await fetch("/api/cms/upload", { method: "POST", body: form })
    const body = await res.json().catch(() => ({}))
    return body?.url as string | undefined
  }

  async function handleUploadAndInsert(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await uploadFile(file)
    if (url) {
      setData((prev) => ({ ...prev, images: [...(prev.images || []), url] }))
      setMedia((m) => [url, ...m])
    }
  }

  function addBlock(type: BlockType) {
    const id = makeId()
    const b: Block =
      type === "heading"
        ? { id, type: "heading", text: "" }
        : type === "text"
        ? { id, type: "text", text: "" }
        : type === "image"
        ? { id, type: "image", url: undefined }
        : { id, type: "gallery", urls: [] }
    setData((prev) => ({ ...prev, blocks: [...(prev.blocks || []), b] }))
  }

  function updateBlock(idx: number, patch: Partial<Block>) {
    setData((prev) => {
      const blocks = [...(prev.blocks || [])]
      blocks[idx] = ({ ...(blocks[idx] as Block), ...(patch as Partial<Block>) } as Block)
      return { ...prev, blocks }
    })
  }

  function moveBlock(idx: number, dir: -1 | 1) {
    setData((prev) => {
      const blocks = [...(prev.blocks || [])]
      const to = idx + dir
      if (to < 0 || to >= blocks.length) return prev
      const tmp = blocks[to]
      blocks[to] = blocks[idx]
      blocks[idx] = tmp
      return { ...prev, blocks }
    })
  }

  function removeBlock(idx: number) {
    setData((prev) => {
      const blocks = [...(prev.blocks || [])]
      blocks.splice(idx, 1)
      return { ...prev, blocks }
    })
  }

  function insertImageAsBlock(url: string) {
    const id = makeId()
    const b: ImageBlock = { id, type: "image", url }
    setData((prev) => ({ ...prev, blocks: [...(prev.blocks || []), b] }))
  }

  if (!slug) return <div>Missing page slug</div>
  if (loading) return <div>Loading…</div>

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Edit: {slug}</h2>
        <div className="flex items-center gap-2">
          <label className="btn-engage cursor-pointer">
            Upload image
            <input className="hidden" type="file" accept="image/*" onChange={handleUploadAndInsert} />
          </label>
          <Link href="/cms" className="btn-engage">
            Back
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input className="w-full border p-2" value={String(data.title || "")} onChange={(e) => setData({ ...data, title: e.target.value })} />
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block">Content blocks</label>
              <div className="flex items-center gap-2">
                <select id="add-block" defaultValue="text" className="border p-1" onChange={(e) => { if (e.target.value) { addBlock(e.target.value as BlockType); (e.target as HTMLSelectElement).value = "text" } }}>
                  <option value="text">Text</option>
                  <option value="heading">Heading</option>
                  <option value="image">Image</option>
                  <option value="gallery">Gallery</option>
                </select>
                <button className="border px-3 py-1" onClick={() => addBlock("text")}>Add</button>
              </div>
            </div>

            <div className="space-y-4">
              {(data.blocks || []).map((b, i) => (
                <div key={b.id} className="border rounded p-3">
                  <div className="flex items-start justify-between">
                    <div className="font-medium">{b.type.toUpperCase()}</div>
                    <div className="flex items-center gap-2">
                      <button className="px-2 py-1 border text-sm" onClick={() => moveBlock(i, -1)} aria-label="Move up">↑</button>
                      <button className="px-2 py-1 border text-sm" onClick={() => moveBlock(i, 1)} aria-label="Move down">↓</button>
                      <button className="px-2 py-1 border text-sm" onClick={() => removeBlock(i)} aria-label="Delete">Delete</button>
                    </div>
                  </div>

                  <div className="mt-2">
                    {b.type === "heading" && (
                      <input className="w-full border p-2" value={(b as HeadingBlock).text} onChange={(e) => updateBlock(i, { ...(b as HeadingBlock), text: e.target.value })} />
                    )}

                    {b.type === "text" && (
                      <textarea className="w-full border p-2" rows={6} value={(b as TextBlock).text} onChange={(e) => updateBlock(i, { ...(b as TextBlock), text: e.target.value })} />
                    )}

                    {b.type === "image" && (
                      <div>
                        <div className="mb-2">
                          <input className="w-full border p-2" placeholder="Image URL or leave empty to choose from library" value={String((b as ImageBlock).url || "")}
                            onChange={(e) => updateBlock(i, { ...(b as ImageBlock), url: e.target.value })} />
                        </div>
                        {(b as ImageBlock).url ? (
                          <img src={(b as ImageBlock).url} alt={((b as ImageBlock).alt) || ""} className="max-w-xs border" />
                        ) : (
                          <div className="text-sm text-gray-600">No image selected. Use the media library to insert one.</div>
                        )}
                      </div>
                    )}

                    {b.type === "gallery" && (
                      <div>
                        <div className="flex flex-wrap gap-2">
                          {((b as GalleryBlock).urls || []).map((u, k) => (
                            <div key={k} className="relative">
                              <img src={u} alt="" className="w-28 h-20 object-cover border" />
                            </div>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 mt-2">Use the media library to add images to this gallery.</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button className="btn-engage" onClick={save}>Save</button>
            <button className="border px-3 py-2" onClick={() => setData({ title: "", images: [], blocks: [] })}>Reset</button>
            {message && <div className="text-sm text-gray-700">{message}</div>}
          </div>
        </div>

        <aside className="border p-4 rounded">
          <h3 className="font-medium mb-2">Media library</h3>
          <div className="mb-3 text-sm text-gray-600">Click an image to insert as a new image block.</div>
          <div className="grid grid-cols-3 gap-2 max-h-96 overflow-auto">
            {media.map((m) => (
              <button key={m} onClick={() => insertImageAsBlock(m)} className="border p-0">
                <img src={m} alt="" className="w-full h-20 object-cover" />
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
