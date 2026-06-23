"use client"

import { useEffect, useRef, useState } from "react"

export type AspectPreset = { label: string; value: number | null }

// Aspect presets offered in the cropper. `null` = free (whole image, no crop).
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

const VIEW_MAX = 560 // max editing-surface width in px
const FRAME_MARGIN = 0.86 // crop frame size relative to the surface
const OUTPUT_MAX = 1600 // cap exported width in px

type Point = { x: number; y: number }

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
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null)
  const [contW, setContW] = useState(VIEW_MAX)
  const [aspect, setAspect] = useState<number | null>(defaultAspect)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 })
  const offsetRef = useRef<Point>({ x: 0, y: 0 })

  // Editing surface + centred crop frame.
  const contH = Math.max(280, Math.min(440, Math.round(contW * 0.78)))
  const aspectRatio = aspect ?? (natural ? natural.w / natural.h : 1)
  let cropW = contW * FRAME_MARGIN
  let cropH = cropW / aspectRatio
  if (cropH > contH * FRAME_MARGIN) {
    cropH = contH * FRAME_MARGIN
    cropW = cropH * aspectRatio
  }
  const cropX = (contW - cropW) / 2
  const cropY = (contH - cropH) / 2

  // Image scaled to cover the crop frame at zoom = 1, then × zoom.
  const coverScale = natural ? Math.max(cropW / natural.w, cropH / natural.h) : 1
  const dispW = natural ? natural.w * coverScale * zoom : cropW
  const dispH = natural ? natural.h * coverScale * zoom : cropH

  // Measure available width so the surface fits the modal.
  useEffect(() => {
    function measure() {
      const w = wrapRef.current?.parentElement?.clientWidth ?? VIEW_MAX
      setContW(Math.max(240, Math.min(VIEW_MAX, w)))
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  function clampPt(o: Point): Point {
    return {
      x: Math.min(cropX, Math.max(cropX + cropW - dispW, o.x)),
      y: Math.min(cropY, Math.max(cropY + cropH - dispH, o.y)),
    }
  }

  // Re-centre when the image first loads or the aspect/zoom/size changes.
  useEffect(() => {
    if (!natural) return
    const next = clampPt({ x: cropX + (cropW - dispW) / 2, y: cropY + (cropH - dispH) / 2 })
    offsetRef.current = next
    setOffset(next)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [natural, aspect, zoom, contW])

  function onImgLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const el = e.currentTarget
    imgRef.current = el
    setNatural({ w: el.naturalWidth, h: el.naturalHeight })
    setZoom(1)
  }

  // Smooth drag: update the transform directly during the gesture, commit on release.
  function onPointerDown(e: React.PointerEvent) {
    if (!natural) return
    e.preventDefault()
    const start = { ...offsetRef.current }
    const sx = e.clientX
    const sy = e.clientY
    const minX = cropX + cropW - dispW
    const minY = cropY + cropH - dispH
    function move(ev: PointerEvent) {
      const nx = Math.min(cropX, Math.max(minX, start.x + ev.clientX - sx))
      const ny = Math.min(cropY, Math.max(minY, start.y + ev.clientY - sy))
      offsetRef.current = { x: nx, y: ny }
      if (imgRef.current) imgRef.current.style.transform = `translate3d(${nx}px, ${ny}px, 0)`
    }
    function up() {
      setOffset(offsetRef.current)
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
    }
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
  }

  function exportBlob() {
    const img = imgRef.current
    if (!img || !natural) return
    const o = offsetRef.current
    const sf = 1 / (coverScale * zoom) // displayed px -> source px
    const srcX = (cropX - o.x) * sf
    const srcY = (cropY - o.y) * sf
    const srcW = cropW * sf
    const srcH = cropH * sf
    const outW = Math.min(OUTPUT_MAX, Math.round(srcW))
    const outH = Math.round((outW * srcH) / srcW)
    const canvas = document.createElement("canvas")
    canvas.width = outW
    canvas.height = outH
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.imageSmoothingQuality = "high"
    ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, outW, outH)
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
          <div className="font-medium">Edit image — drag the photo to position it inside the crop box</div>
          <button className="border px-3 py-1 text-sm disabled:opacity-50" type="button" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-600">Aspect ratio:</span>
            {PRESETS.map((p) => {
              const active = (p.value === null && aspect === null) || (p.value !== null && aspect !== null && Math.abs(p.value - aspect) < 1e-6)
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setAspect(p.value)}
                  className={`text-xs border px-2 py-1 rounded ${active ? "bg-[#3AFCAD] border-[#3AFCAD]" : "bg-white"}`}
                >
                  {p.label}
                </button>
              )
            })}
          </div>

          <div className="w-full flex justify-center">
            <div
              ref={wrapRef}
              className="relative overflow-hidden bg-gray-200 border touch-none select-none cursor-grab active:cursor-grabbing"
              style={{ width: contW, height: contH }}
              onPointerDown={onPointerDown}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="Crop source"
                crossOrigin="anonymous"
                onLoad={onImgLoad}
                draggable={false}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: dispW,
                  height: dispH,
                  maxWidth: "none",
                  transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
                  willChange: "transform",
                }}
              />
              {/* crop frame: dims everything outside, highlights the saved area */}
              <div
                className="absolute pointer-events-none"
                style={{
                  left: cropX,
                  top: cropY,
                  width: cropW,
                  height: cropH,
                  boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)",
                  outline: "2px solid #3AFCAD",
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-600 w-12">Zoom</span>
            <input
              type="range"
              min={1}
              max={4}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1"
            />
          </div>

          <p className="text-xs text-gray-600">Drag the photo to move it up/down/sideways inside the crop box, use the slider to zoom. Only the bright area is saved.</p>

          <div className="flex justify-end gap-2">
            <button className="border px-3 py-2 text-sm disabled:opacity-50" type="button" onClick={onCancel} disabled={busy}>
              Cancel
            </button>
            <button className="btn-engage disabled:opacity-50" type="button" onClick={exportBlob} disabled={busy || !natural}>
              {busy ? "Saving..." : "Save crop"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
