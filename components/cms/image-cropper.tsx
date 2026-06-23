"use client"

import { useRef, useState } from "react"
import { Cropper, type ReactCropperElement } from "react-cropper"
import "cropperjs/dist/cropper.css"

export type AspectPreset = { label: string; value: number | null }

// Aspect presets offered in the cropper. `null` = free (any ratio).
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
  const cropperRef = useRef<ReactCropperElement>(null)
  const [aspectChoice, setAspectChoice] = useState<number | null>(defaultAspect)

  function applyAspect(value: number | null) {
    setAspectChoice(value)
    cropperRef.current?.cropper.setAspectRatio(value ?? NaN)
  }

  function save() {
    const cropper = cropperRef.current?.cropper
    if (!cropper) return
    const canvas = cropper.getCroppedCanvas({ maxWidth: OUTPUT_MAX, imageSmoothingQuality: "high" })
    if (!canvas) return
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
          <div className="font-medium">Edit image — drag the photo to move it, drag the box corners to resize</div>
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
                  onClick={() => applyAspect(p.value)}
                  className={`text-xs border px-2 py-1 rounded ${active ? "bg-[#3AFCAD] border-[#3AFCAD]" : "bg-white"}`}
                >
                  {p.label}
                </button>
              )
            })}
          </div>

          <div className="w-full">
            <Cropper
              ref={cropperRef}
              src={src}
              style={{ height: 380, width: "100%" }}
              aspectRatio={aspectChoice ?? NaN}
              viewMode={1}
              dragMode="move"
              cropBoxMovable
              cropBoxResizable
              toggleDragModeOnDblclick={false}
              autoCropArea={0.85}
              guides
              background
              responsive
              restore
              checkOrientation={false}
            />
          </div>

          <p className="text-xs text-gray-600">Drag the photo to move it up/down/sideways. Drag the green corners/edges to resize the crop box. Only the area inside the box is saved.</p>

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
