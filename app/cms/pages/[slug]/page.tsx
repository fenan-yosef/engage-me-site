"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import type { HomeContent } from "../../../../lib/cms/home-content"
import { buildHomePageData, extractHomeContent } from "../../../../lib/cms/home-content"
import type { WorkContent } from "../../../../lib/cms/work-content"
import { buildWorkPageData, extractWorkContent } from "../../../../lib/cms/work-content"

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

  if (slug === "home") {
    return <HomeEditor media={media} setMedia={setMedia} />
  }

  if (slug === "work") {
    return <WorkEditor />
  }

  async function save() {
    setMessage(null)
    const res = await fetch(`/api/cms/pages/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const body = await res.json().catch(() => ({}))
    if (res.ok) setMessage("Saved")
    else setMessage(body?.error || "Save failed")
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

function HomeEditor({ media, setMedia }: { media: ImageURL[]; setMedia: (v: ImageURL[]) => void }) {
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)
  const [content, setContent] = useState<HomeContent>(() => extractHomeContent(null))
  const [picker, setPicker] = useState<null | { field: string; title: string }>(null)
  const [mediaQuery, setMediaQuery] = useState("")

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      try {
        const pageResp = await fetch(`/api/cms/pages/home`)
        const page = pageResp.status === 404 ? null : await pageResp.json().catch(() => null)
        setContent(extractHomeContent(page))
        const imgs = await fetch(`/api/cms/list-uploads`).then((r) => r.json()).catch(() => [])
        setMedia(Array.isArray(imgs) ? imgs : [])
      } finally {
        setLoading(false)
      }
    })()
  }, [setMedia])

  async function uploadFile(file: File) {
    const form = new FormData()
    form.append("file", file)
    const res = await fetch("/api/cms/upload", { method: "POST", body: form })
    const body = await res.json().catch(() => ({}))
    return body?.url as string | undefined
  }

  async function handleUploadToPickerField(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await uploadFile(file)
    if (!url) return
    setMedia((m) => [url, ...m])
    if (picker?.field) setContent((prev) => setImageField(prev, picker.field, url))
  }

  function onPickFromLibrary(url: string) {
    if (!picker?.field) return
    setContent((prev) => setImageField(prev, picker.field, url))
    setPicker(null)
  }

  async function save() {
    setMessage(null)
    const payload = buildHomePageData(content)
    const res = await fetch(`/api/cms/pages/home`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const body = await res.json().catch(() => ({}))
    if (res.ok) setMessage("Saved")
    else setMessage(body?.error || "Save failed")
  }

  if (loading) return <div>Loading…</div>

  const filteredMedia = mediaQuery.trim()
    ? media.filter((m) => m.toLowerCase().includes(mediaQuery.trim().toLowerCase()))
    : media

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Edit: home</h2>
        <div className="flex items-center gap-2">
          <Link href="/cms" className="btn-engage">
            Back
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-8">
          <Section title="Hero">
            <TextRow label="Left text" value={content.hero.leftText} onChange={(v) => setContent((p) => ({ ...p, hero: { ...p.hero, leftText: v } }))} />
            <ImageRow
              label="Background image"
              value={content.hero.bgUrl}
              onChangeClick={() => setPicker({ field: "hero.bgUrl", title: "Hero background" })}
            />
            <ImageRow
              label="Logo image"
              value={content.hero.logoUrl}
              onChangeClick={() => setPicker({ field: "hero.logoUrl", title: "Hero logo" })}
            />
          </Section>

          <Section title="Bringing brands to life">
            <TextRow label="Heading" value={content.bringing.heading} onChange={(v) => setContent((p) => ({ ...p, bringing: { ...p.bringing, heading: v } }))} />
            <TextareaRow label="Paragraph" value={content.bringing.body} onChange={(v) => setContent((p) => ({ ...p, bringing: { ...p.bringing, body: v } }))} />
            <TextRow
              label="Button label"
              value={content.bringing.buttonLabel}
              onChange={(v) => setContent((p) => ({ ...p, bringing: { ...p.bringing, buttonLabel: v } }))}
            />
            <GalleryRow
              label="Carousel images (3)"
              urls={content.bringing.carouselUrls}
              activeIndexKey="bringing.carousel"
              onChangeClick={(idx) => setPicker({ field: `bringing.carousel[${idx}]`, title: `Carousel image ${idx + 1}` })}
            />
          </Section>

          <Section title="Engaging staff">
            <TextRow label="Heading" value={content.engaging.heading} onChange={(v) => setContent((p) => ({ ...p, engaging: { ...p.engaging, heading: v } }))} />
            <TextareaRow label="Paragraph 1" value={content.engaging.p1} onChange={(v) => setContent((p) => ({ ...p, engaging: { ...p.engaging, p1: v } }))} />
            <TextareaRow label="Paragraph 2" value={content.engaging.p2} onChange={(v) => setContent((p) => ({ ...p, engaging: { ...p.engaging, p2: v } }))} />
            <TextRow
              label="Button label"
              value={content.engaging.buttonLabel}
              onChange={(v) => setContent((p) => ({ ...p, engaging: { ...p.engaging, buttonLabel: v } }))}
            />
            <GalleryRow
              label="Staff grid images (9)"
              urls={content.engaging.staffGridUrls}
              activeIndexKey="engaging.staffGrid"
              onChangeClick={(idx) => setPicker({ field: `engaging.staffGrid[${idx}]`, title: `Staff grid image ${idx + 1}` })}
            />
          </Section>

          <Section title="Insight">
            <TextRow label="Heading" value={content.insight.heading} onChange={(v) => setContent((p) => ({ ...p, insight: { ...p.insight, heading: v } }))} />
            <TextareaRow label="Paragraph 1" value={content.insight.p1} onChange={(v) => setContent((p) => ({ ...p, insight: { ...p.insight, p1: v } }))} />
            <TextareaRow label="Paragraph 2" value={content.insight.p2} onChange={(v) => setContent((p) => ({ ...p, insight: { ...p.insight, p2: v } }))} />
            <TextRow
              label="Button label"
              value={content.insight.buttonLabel}
              onChange={(v) => setContent((p) => ({ ...p, insight: { ...p.insight, buttonLabel: v } }))}
            />
            <ImageRow
              label="Right image"
              value={content.insight.imageUrl}
              onChangeClick={() => setPicker({ field: "insight.imageUrl", title: "Insight right image" })}
            />
          </Section>

          <div className="flex gap-3 items-center">
            <button className="btn-engage" onClick={save}>
              Save
            </button>
            {message && <div className="text-sm text-gray-700">{message}</div>}
          </div>
        </div>

        <aside className="border p-4 rounded">
          <h3 className="font-medium mb-2">Media library</h3>
          <div className="mb-3 text-sm text-gray-600">This is your server files in `public/uploads`.</div>
          <input
            className="w-full border p-2 mb-3"
            placeholder="Search images…"
            value={mediaQuery}
            onChange={(e) => setMediaQuery(e.target.value)}
          />
          <div className="text-xs text-gray-600 mb-3">
            To replace an image: click <span className="font-medium">Change</span> on any image slot, then pick from here (or upload in the popup).
          </div>
          <div className="grid grid-cols-3 gap-2 max-h-96 overflow-auto">
            {filteredMedia.map((m) => (
              <button key={m} onClick={() => picker ? onPickFromLibrary(m) : null} className="border p-0" title={picker ? "Click to use this image" : "Open a Change popup first"}>
                <img src={m} alt="" className="w-full h-20 object-cover" />
              </button>
            ))}
          </div>
        </aside>
      </div>

      {picker ? (
        <ImagePickerModal
          title={picker.title}
          onClose={() => setPicker(null)}
          onUpload={handleUploadToPickerField}
          media={filteredMedia}
          onPick={onPickFromLibrary}
        />
      ) : null}
    </div>
  )
}

function WorkEditor() {
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)
  const [content, setContent] = useState<WorkContent>(() =>
    extractWorkContent(null, [
      { title: "Airport activations", href: "/work/airport-activations_work" },
      { title: "Brand activations", href: "/work/brand-activations_work" },
      { title: "Corporate events", href: "/work/corporate-events_work" },
      { title: "Entertainers", href: "/work/entertainers_work" },
      { title: "Event staffing", href: "/work/event-staffing_work" },
      { title: "Exhibitions", href: "/work/exhibitions_work" },
      { title: "F & B staffing", href: "/work/f-b-staffing_work" },
      { title: "Hosts & hostesses", href: "/work/hosts-hostesses_work" },
      { title: "In-store promoters", href: "/work/in-store-promoters_work" },
      { title: "Lead generation", href: "/work/lead-generation_work" },
      { title: "Registration staff", href: "/work/registration-staff_work" },
      { title: "Retail support", href: "/work/retail-support_work" },
      { title: "Roadshows", href: "/work/roadshows_work" },
      { title: "Mall activations", href: "/work/mall-activations_work" },
      { title: "Models", href: "/work/models_work" },
      { title: "Social media content", href: "/work/social-media-content_work" },
      { title: "Sporting events", href: "/work/sporting-events_work" },
      { title: "Trade events", href: "/work/trade-events_work" },
      { title: "Themed promoters", href: "/work/themed-promoters_work" },
      { title: "Virtual promoters", href: "/work/virtual-promoters_work" },
    ])
  )

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      try {
        const pageResp = await fetch(`/api/cms/pages/work`)
        const page = pageResp.status === 404 ? null : await pageResp.json().catch(() => null)
        setContent((prev) => extractWorkContent(page, prev.items))
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  async function save() {
    setMessage(null)
    const payload = buildWorkPageData(content)
    const res = await fetch(`/api/cms/pages/work`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const body = await res.json().catch(() => ({}))
    if (res.ok) setMessage("Saved")
    else setMessage(body?.error || "Save failed")
  }

  if (loading) return <div>Loading…</div>

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Edit: work</h2>
        <div className="flex items-center gap-2">
          <Link href="/cms" className="btn-engage">
            Back
          </Link>
        </div>
      </div>

      <div className="space-y-8">
        <Section title="Header">
          <TextRow label="Heading" value={content.heading} onChange={(v) => setContent((p) => ({ ...p, heading: v }))} />
          <TextareaRow label="Intro" value={content.intro} onChange={(v) => setContent((p) => ({ ...p, intro: v }))} />
        </Section>

        <Section title="Work items">
          <div className="text-sm text-gray-600">Edit only the labels shown on the /work page. Links are fixed by the site.</div>
          <div className="space-y-3">
            {content.items.map((it, idx) => (
              <div key={idx} className="border rounded p-3">
                <div>
                  <label className="block mb-2">Title {idx + 1}</label>
                  <input
                    className="w-full border p-2"
                    value={it.title}
                    onChange={(e) =>
                      setContent((p) => {
                        const items = [...p.items]
                        items[idx] = { ...items[idx], title: e.target.value }
                        return { ...p, items }
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <div className="flex gap-3 items-center">
          <button className="btn-engage" onClick={save}>
            Save
          </button>
          {message && <div className="text-sm text-gray-700">{message}</div>}
        </div>
      </div>
    </div>
  )
}

function setImageField(prev: HomeContent, field: string, url: string): HomeContent {
  if (field === "hero.bgUrl") return { ...prev, hero: { ...prev.hero, bgUrl: url } }
  if (field === "hero.logoUrl") return { ...prev, hero: { ...prev.hero, logoUrl: url } }
  if (field === "insight.imageUrl") return { ...prev, insight: { ...prev.insight, imageUrl: url } }

  if (field.startsWith("bringing.carousel[")) {
    const idx = Number(field.slice("bringing.carousel[".length, -1))
    if (!Number.isFinite(idx)) return prev
    const urls = [...prev.bringing.carouselUrls]
    urls[idx] = url
    return { ...prev, bringing: { ...prev.bringing, carouselUrls: urls } }
  }

  if (field.startsWith("engaging.staffGrid[")) {
    const idx = Number(field.slice("engaging.staffGrid[".length, -1))
    if (!Number.isFinite(idx)) return prev
    const urls = [...prev.engaging.staffGridUrls]
    urls[idx] = url
    return { ...prev, engaging: { ...prev.engaging, staffGridUrls: urls } }
  }

  return prev
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border rounded p-4">
      <div className="font-medium mb-4">{title}</div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function TextRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block mb-2">{label}</label>
      <input className="w-full border p-2" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

function TextareaRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block mb-2">{label}</label>
      <textarea className="w-full border p-2" rows={6} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

function ImageRow({
  label,
  value,
  onChangeClick,
}: {
  label: string
  value: string
  onChangeClick: () => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block">{label}</label>
        <button
          type="button"
          className="border px-3 py-1 text-sm"
          onClick={onChangeClick}
          title="Change this image"
        >
          Change
        </button>
      </div>
      <div className="border rounded p-2">
        {value ? <img src={value} alt="" className="w-full max-w-md h-48 object-cover border" /> : <div className="text-sm text-gray-600">No image</div>}
        {value ? <div className="mt-2 text-xs text-gray-600 break-all">{value}</div> : null}
      </div>
    </div>
  )
}

function GalleryRow({
  label,
  urls,
  activeIndexKey,
  onChangeClick,
}: {
  label: string
  urls: string[]
  activeIndexKey: "bringing.carousel" | "engaging.staffGrid"
  onChangeClick: (idx: number) => void
}) {
  return (
    <div>
      <label className="block mb-2">{label}</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {urls.map((u, idx) => {
          const key = `${activeIndexKey}[${idx}]`
          return (
            <div key={key} className="border rounded p-2">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-gray-700">Slot {idx + 1}</div>
                <button type="button" className="border px-2 py-1 text-xs" onClick={() => onChangeClick(idx)}>
                  Change
                </button>
              </div>
              {u ? <img src={u} alt="" className="w-full h-28 object-cover border" /> : <div className="text-sm text-gray-600">No image</div>}
              {u ? <div className="mt-2 text-[10px] text-gray-600 break-all">{u}</div> : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ImagePickerModal({
  title,
  onClose,
  onUpload,
  media,
  onPick,
}: {
  title: string
  onClose: () => void
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  media: ImageURL[]
  onPick: (url: string) => void
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="bg-white w-full max-w-4xl rounded shadow-lg border">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-medium">Change image: {title}</div>
          <button className="border px-3 py-1 text-sm" onClick={onClose} type="button">
            Close
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border rounded p-4">
            <div className="font-medium mb-2">Upload</div>
            <label className="btn-engage cursor-pointer inline-block">
              Upload file
              <input className="hidden" type="file" accept="image/*" onChange={onUpload} />
            </label>
            <div className="text-xs text-gray-600 mt-2">Files are saved to `public/uploads` and the path is stored in DB.</div>
          </div>

          <div className="border rounded p-4">
            <div className="font-medium mb-2">Choose from library</div>
            <div className="grid grid-cols-3 gap-2 max-h-80 overflow-auto">
              {media.map((m) => (
                <button key={m} onClick={() => onPick(m)} className="border p-0" type="button">
                  <img src={m} alt="" className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
