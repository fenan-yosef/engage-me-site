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

const VIEW_MAX = 560 // max on-screen viewport width in px
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
  const [viewW, setViewW] = useState(VIEW_MAX)
  const [aspect, setAspect] = useState<number | null>(defaultAspect)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 })
  const offsetRef = useRef<Point>({ x: 0, y: 0 })

  // Effective aspect: locked value, or the image's own ratio when "Free".
  const aspectRatio = aspect ?? (natural ? natural.w / natural.h : 1)
  const viewH = viewW / aspectRatio

  // Scale that makes the image cover the viewport at zoom = 1, then × zoom.
  const coverScale = natural ? Math.max(viewW / natural.w, viewH / natural.h) : 1
  const dispW = natural ? natural.w * coverScale * zoom : viewW
  const dispH = natural ? natural.h * coverScale * zoom : viewH

  // Measure available width so the viewport fits the modal.
  useEffect(() => {
    function measure() {
      const w = wrapRef.current?.parentElement?.clientWidth ?? VIEW_MAX
      setViewW(Math.max(240, Math.min(VIEW_MAX, w)))
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  // Keep the image clamped/centred when sizing inputs change.
  useEffect(() => {
    setOffset((o) => {
      const next = { x: Math.min(0, Math.max(viewW - dispW, o.x)), y: Math.min(0, Math.max(viewH - dispH, o.y)) }
      offsetRef.current = next
      return next
    })
  }, [viewW, viewH, dispW, dispH])

  function onImgLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const el = e.currentTarget
    imgRef.current = el
    setNatural({ w: el.naturalWidth, h: el.naturalHeight })
    setZoom(1)
    const o = { x: 0, y: 0 }
    offsetRef.current = o
    setOffset(o)
  }

  // Smooth drag: update the DOM transform directly during the gesture,
  // commit to React state only on release (no re-render per frame).
  function onPointerDown(e: React.PointerEvent) {
    if (!natural) return
    e.preventDefault()
    const start = { ...offsetRef.current }
    const sx = e.clientX
    const sy = e.clientY
    const minX = viewW - dispW
    const minY = viewH - dispH
    function move(ev: PointerEvent) {
      const nx = Math.min(0, Math.max(minX, start.x + ev.clientX - sx))
      const ny = Math.min(0, Math.max(minY, start.y + ev.clientY - sy))
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
    const srcX = -o.x * sf
    const srcY = -o.y * sf
    const srcW = viewW * sf
    const srcH = viewH * sf
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
          <div className="font-medium">Edit image — drag to position</div>
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
              className="relative overflow-hidden bg-gray-100 border touch-none select-none cursor-grab active:cursor-grabbing"
              style={{ width: viewW, height: viewH }}
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

          <p className="text-xs text-gray-600">Drag the image to position it inside the frame, use the slider to zoom. The visible frame is what gets saved.</p>

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
