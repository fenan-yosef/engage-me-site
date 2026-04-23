"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"

type CmsPageData = {
  title?: string
  sections?: Array<Record<string, unknown>>
  images?: string[]
  [key: string]: unknown
}

export default function PageEditor() {
  const router = useRouter()
  const params = useParams() as { slug?: string }
  const slug = params?.slug || ""
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<CmsPageData>({ title: "", sections: [] })
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    fetch(`/api/cms/pages/${slug}`)
      .then((r) => {
        if (r.status === 404) return {}
        return r.json()
      })
      .then((d) => setData(d || { title: "", sections: [] }))
      .finally(() => setLoading(false))
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

  async function uploadAndInsert(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const form = new FormData()
    form.append("file", file)
    const res = await fetch("/api/cms/upload", { method: "POST", body: form })
    const body = await res.json()
    if (body?.url) {
      // insert into images array
      setData((prev) => ({ ...prev, images: [...(prev.images || []), body.url] }))
    }
  }

  if (!slug) return <div>Missing page slug</div>
  if (loading) return <div>Loading…</div>

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Edit: {slug}</h2>
        <div className="flex items-center gap-2">
          <input type="file" accept="image/*" onChange={uploadAndInsert} />
          <button className="btn-engage" onClick={() => router.back()}>Back</button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Title</label>
        <input className="w-full border p-2" value={data.title || ""} onChange={(e) => setData({ ...data, title: e.target.value })} />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Main content (JSON structure)</label>
        <textarea
          className="w-full border p-2 font-mono"
          rows={12}
          value={JSON.stringify(data, null, 2)}
          onChange={(e) => {
            try {
              setData(JSON.parse(e.target.value))
            } catch {
              // ignore parse errors while typing
            }
          }}
        />
        <div className="text-sm text-gray-600 mt-2">Edit the JSON structure for this page. Example fields: <code>title</code>, <code>sections</code>, <code>images</code>.</div>
      </div>

      <div className="flex gap-3">
        <button className="btn-engage" onClick={save}>Save</button>
        <button className="border px-3 py-2" onClick={() => setData({ title: "", sections: [] })}>Reset</button>
        {message && <div className="text-sm text-gray-700">{message}</div>}
      </div>
    </div>
  )
}
