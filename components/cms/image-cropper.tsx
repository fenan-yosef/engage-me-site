"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export type AspectPreset = { label: string; value: number | null }

// Aspect presets offered in the cropper. `null` = free crop (no lock).
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

const MAX_W = 620 // max displayed image width
const MAX_H = 460 // max displayed image height
const MIN_BOX = 24 // min crop box size in display px
const OUTPUT_MAX = 1600 // cap exported width in px

type Box = { x: number; y: number; w: number; h: number }
type Handle = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w"

// Largest box of the given aspect centered inside w x h. Free aspect -> full.
function fitBox(dispW: number, dispH: number, aspect: number | null): Box {
  if (aspect == null) return { x: 0, y: 0, w: dispW, h: dispH }
  let w = dispW
  let h = w / aspect
  if (h > dispH) {
    h = dispH
    w = h * aspect
  }
  return { x: (dispW - w) / 2, y: (dispH - h) / 2, w, h }
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
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null)
  const [maxW, setMaxW] = useState(MAX_W)
  const [aspect, setAspect] = useState<number | null>(defaultAspect)
  const [box, setBox] = useState<Box | null>(null)
  const drag = useRef<null | { mode: "move" | Handle; sx: number; sy: number; start: Box }>(null)

  // Display sizing: fit the image inside MAX_W x MAX_H.
  const scale = natural ? Math.min(maxW / natural.w, MAX_H / natural.h) : 1
  const dispW = natural ? natural.w * scale : maxW
  const dispH = natural ? natural.h * scale : MAX_H

  useEffect(() => {
    function measure() {
      const w = wrapRef.current?.clientWidth ?? MAX_W
      setMaxW(Math.max(240, Math.min(MAX_W, w)))
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  function onImgLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const el = e.currentTarget
    imgRef.current = el
    setNatural({ w: el.naturalWidth, h: el.naturalHeight })
  }

  // (Re)initialise the crop box when image size or aspect changes.
  useEffect(() => {
    if (!natural) return
    setBox(fitBox(dispW, dispH, aspect))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [natural, aspect, dispW, dispH])

  const clampMove = useCallback(
    (b: Box): Box => ({
      ...b,
      x: Math.min(Math.max(0, b.x), dispW - b.w),
      y: Math.min(Math.max(0, b.y), dispH - b.h),
    }),
    [dispW, dispH]
  )

  const resize = useCallback(
    (handle: Handle, start: Box, px: number, py: number): Box => {
      const cx = Math.min(Math.max(0, px), dispW)
      const cy = Math.min(Math.max(0, py), dispH)

      if (aspect != null) {
        // Locked ratio: anchor at the opposite corner, grow toward the handle.
        const sx = handle.includes("e") ? 1 : handle.includes("w") ? -1 : 1
        const sy = handle.includes("s") ? 1 : handle.includes("n") ? -1 : 1
        const ax = sx > 0 ? start.x : start.x + start.w
        const ay = sy > 0 ? start.y : start.y + start.h
        const availW = sx > 0 ? dispW - ax : ax
        const availH = sy > 0 ? dispH - ay : ay
        let w = Math.min(Math.max(Math.abs(cx - ax), MIN_BOX), availW)
        let h = w / aspect
        if (h > availH) {
          h = availH
          w = h * aspect
        }
        return { x: sx > 0 ? ax : ax - w, y: sy > 0 ? ay : ay - h, w, h }
      }

      // Free: move only the edges the handle controls.
      let l = start.x
      let t = start.y
      let r = start.x + start.w
      let b = start.y + start.h
      if (handle.includes("w")) l = Math.min(cx, r - MIN_BOX)
      if (handle.includes("e")) r = Math.max(cx, l + MIN_BOX)
      if (handle.includes("n")) t = Math.min(cy, b - MIN_BOX)
      if (handle.includes("s")) b = Math.max(cy, t + MIN_BOX)
      return { x: l, y: t, w: r - l, h: b - t }
    },
    [aspect, dispW, dispH]
  )

  useEffect(() => {
    function onMove(e: PointerEvent) {
      const d = drag.current
      if (!d || !box) return
      const rect = wrapRef.current?.getBoundingClientRect()
      if (!rect) return
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      if (d.mode === "move") {
        setBox(clampMove({ ...d.start, x: d.start.x + (e.clientX - d.sx), y: d.start.y + (e.clientY - d.sy) }))
      } else {
        setBox(resize(d.mode, d.start, px, py))
      }
    }
    function onUp() {
      drag.current = null
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [box, clampMove, resize])

  // Nudge the crop framing in a direction by a small step (also draggable).
  function nudge(dx: number, dy: number) {
    setBox((b) => (b ? clampMove({ ...b, x: b.x + dx, y: b.y + dy }) : b))
  }
  const stepX = Math.max(5, Math.round(dispW * 0.05))
  const stepY = Math.max(5, Math.round(dispH * 0.05))

  function startMove(e: React.PointerEvent) {
    if (!box) return
    e.preventDefault()
    drag.current = { mode: "move", sx: e.clientX, sy: e.clientY, start: box }
  }
  function startResize(handle: Handle) {
    return (e: React.PointerEvent) => {
      if (!box) return
      e.preventDefault()
      e.stopPropagation()
      drag.current = { mode: handle, sx: e.clientX, sy: e.clientY, start: box }
    }
  }

  function exportBlob() {
    const img = imgRef.current
    if (!img || !natural || !box) return
    const sf = 1 / scale // display px -> source px
    const srcX = box.x * sf
    const srcY = box.y * sf
    const srcW = box.w * sf
    const srcH = box.h * sf
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

  const handles: Handle[] = aspect != null ? ["nw", "ne", "se", "sw"] : ["nw", "n", "ne", "e", "se", "s", "sw", "w"]
  const handlePos: Record<Handle, { left: string; top: string; cursor: string }> = {
    nw: { left: "0%", top: "0%", cursor: "nwse-resize" },
    n: { left: "50%", top: "0%", cursor: "ns-resize" },
    ne: { left: "100%", top: "0%", cursor: "nesw-resize" },
    e: { left: "100%", top: "50%", cursor: "ew-resize" },
    se: { left: "100%", top: "100%", cursor: "nwse-resize" },
    s: { left: "50%", top: "100%", cursor: "ns-resize" },
    sw: { left: "0%", top: "100%", cursor: "nesw-resize" },
    w: { left: "0%", top: "50%", cursor: "ew-resize" },
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="bg-white w-full max-w-3xl rounded shadow-lg border">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-medium">Edit image — drag to position, drag the corners to resize</div>
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
              className="relative bg-gray-100 border select-none touch-none"
              style={{ width: dispW, height: dispH }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="Crop source"
                crossOrigin="anonymous"
                onLoad={onImgLoad}
                draggable={false}
                style={{ position: "absolute", left: 0, top: 0, width: dispW, height: dispH }}
              />

              {box && (
                <>
                  {/* the box's boxShadow dims everything outside the crop region */}
                  <div
                    className="absolute bg-transparent"
                    style={{
                      left: box.x,
                      top: box.y,
                      width: box.w,
                      height: box.h,
                      boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)",
                      outline: "2px solid #3AFCAD",
                      cursor: "move",
                    }}
                    onPointerDown={startMove}
                  >
                    {handles.map((h) => (
                      <div
                        key={h}
                        onPointerDown={startResize(h)}
                        style={{
                          position: "absolute",
                          left: handlePos[h].left,
                          top: handlePos[h].top,
                          width: 14,
                          height: 14,
                          transform: "translate(-50%, -50%)",
                          background: "#fff",
                          border: "2px solid #3AFCAD",
                          borderRadius: 2,
                          cursor: handlePos[h].cursor,
                          touchAction: "none",
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-600">Move:</span>
            <div className="inline-grid grid-cols-3 gap-1">
              <span />
              <button type="button" aria-label="Move up" title="Move up" className="border rounded w-7 h-7 leading-none hover:bg-gray-100" onClick={() => nudge(0, -stepY)}>↑</button>
              <span />
              <button type="button" aria-label="Move left" title="Move left" className="border rounded w-7 h-7 leading-none hover:bg-gray-100" onClick={() => nudge(-stepX, 0)}>←</button>
              <span />
              <button type="button" aria-label="Move right" title="Move right" className="border rounded w-7 h-7 leading-none hover:bg-gray-100" onClick={() => nudge(stepX, 0)}>→</button>
              <span />
              <button type="button" aria-label="Move down" title="Move down" className="border rounded w-7 h-7 leading-none hover:bg-gray-100" onClick={() => nudge(0, stepY)}>↓</button>
              <span />
            </div>
            <span className="text-xs text-gray-500">or drag the box / image area</span>
          </div>

          <div className="flex justify-end gap-2">
            <button className="border px-3 py-2 text-sm disabled:opacity-50" type="button" onClick={onCancel} disabled={busy}>
              Cancel
            </button>
            <button className="btn-engage disabled:opacity-50" type="button" onClick={exportBlob} disabled={busy || !natural || !box}>
              {busy ? "Saving..." : "Save crop"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
