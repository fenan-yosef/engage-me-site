"use client"

import { useCallback, useRef, useState } from "react"
import Cropper, { type Area } from "react-easy-crop"

export type AspectPreset = { label: string; value: number | null }

// Aspect presets offered in the cropper. `null` = free (use the image ratio).
const PRESETS: AspectPreset[] = [
  { label: "Tile (work grid)", value: 432 / 262 },
  { label: "Wide 16:9", value: 16 / 9 },
  { label: "Square 1:1", value: 1 },
  { label: "Portrait 3:4", value: 3 / 4 },
  { label: "Free", value: null },
]

// Recommend a default aspect for a CMS field based on its name.
export function cropAspectForField(field: string): number | null {
  const f = field.toLowerCase()
  if (f.includes("thumbnail")) return 432 / 262
  if (f.includes("logo")) return null // logos shouldn't be force-cropped
  if (f.includes("banner") || f.includes("hero") || f.includes("bg")) return 16 / 9
  if (f.includes("staffgrid") || f.includes("grid")) return 1
  if (f.includes("carousel") || f.includes("left") || f.includes("right") || f.includes("image")) return 3 / 2
  return null
}

const OUTPUT_MAX = 1600 // cap exported width in px

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export default function ImageCropper({
  src,
  fileName,
  defaultAspect,
  onCancel,
  onConfirm,
  busy,
}: {
  src: string
  fileName: string
  defaultAspect: number | null
  onCancel: () => void
  onConfirm: (file: File) => void | Promise<void>
  busy?: boolean
}) {
  const [aspectChoice, setAspectChoice] = useState<number | null>(defaultAspect)
  const [natRatio, setNatRatio] = useState<number | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const areaRef = useRef<Area | null>(null)

  const aspect = aspectChoice ?? natRatio ?? 1

  const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    areaRef.current = areaPixels
  }, [])

  async function save() {
    const area = areaRef.current
    if (!area) return
    const image = await loadImage(src)
    const srcW = Math.max(1, Math.round(area.width))
    const srcH = Math.max(1, Math.round(area.height))
    const outW = Math.min(OUTPUT_MAX, srcW)
    const outH = Math.round((outW * srcH) / srcW)
    const canvas = document.createElement("canvas")
    canvas.width = outW
    canvas.height = outH
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.imageSmoothingQuality = "high"
    ctx.drawImage(image, area.x, area.y, area.width, area.height, 0, 0, outW, outH)
    const isPng = /\.png$/i.test(fileName) || fileName.startsWith("image/png")
    const mime = isPng ? "image/png" : "image/jpeg"
    const ext = isPng ? "png" : "jpg"
    canvas.toBlob(
      (blob) => {
        if (!blob) return
        const base = fileName.replace(/\.[^.]+$/, "").replace(/[^a-z0-9_-]+/gi, "-").slice(0, 40) || "image"
        const file = new File([blob], `${base}-cropped-${Date.now()}.${ext}`, { type: mime })
        void onConfirm(file)
      },
      mime,
      0.85
    )
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="bg-white w-full max-w-2xl rounded shadow-lg border">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-medium">Edit image — drag the photo to position it, zoom to frame it</div>
          <button className="border px-3 py-1 text-sm disabled:opacity-50" type="button" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-600">Aspect ratio:</span>
            {PRESETS.map((p) => {
              const active =
                (p.value === null && aspectChoice === null) ||
                (p.value !== null && aspectChoice !== null && Math.abs(p.value - aspectChoice) < 1e-6)
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setAspectChoice(p.value)}
                  className={`text-xs border px-2 py-1 rounded ${active ? "bg-[#3AFCAD] border-[#3AFCAD]" : "bg-white"}`}
                >
                  {p.label}
                </button>
              )
            })}
          </div>

          <div className="relative w-full h-[360px] bg-gray-800 overflow-hidden rounded">
            <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              minZoom={1}
              maxZoom={5}
              restrictPosition={false}
              showGrid
              zoomWithScroll
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              onMediaLoaded={(m) => setNatRatio(m.naturalWidth / m.naturalHeight)}
              mediaProps={{ crossOrigin: "anonymous" }}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-600 w-12">Zoom</span>
            <input
              type="range"
              min={1}
              max={5}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1"
            />
          </div>

          <p className="text-xs text-gray-600">Drag the photo to move it up/down/sideways, scroll or use the slider to zoom. The area inside the frame is what gets saved.</p>

          <div className="flex justify-end gap-2">
            <button className="border px-3 py-2 text-sm disabled:opacity-50" type="button" onClick={onCancel} disabled={busy}>
              Cancel
            </button>
            <button className="btn-engage disabled:opacity-50" type="button" onClick={save} disabled={busy}>
              {busy ? "Saving..." : "Save crop"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
