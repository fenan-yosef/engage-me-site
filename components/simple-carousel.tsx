"use client"

import { useEffect, useState } from "react"

interface CarouselImage {
  id: string
  src: string
  alt: string
}

interface SimpleCarouselProps {
  images: CarouselImage[]
  height?: number | string
  intervalMs?: number
  className?: string
}

export default function SimpleCarousel({ images, height, intervalMs = 2500, className = "" }: SimpleCarouselProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!images.length) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [images.length, intervalMs])

  if (!images.length) return null

  return (
    <div className={`relative w-full overflow-hidden bg-gray-200 ${className}`} style={height ? { height } : {}}>
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ width: `${images.length * 100}%`, transform: `translateX(-${current * (100 / images.length)}%)` }}
      >
        {images.map((img) => (
          <div key={img.id} className="relative flex-shrink-0" style={{ width: `${100 / images.length}%`, height: "100%" }}>
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="flex gap-2 justify-center items-center absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="h-3 w-3 rounded-full border border-white"
            style={{ backgroundColor: idx === current ? "#3AFCAD" : "#ffffff" }}
          />
        ))}
      </div>

      {/* Controls */}
      <button
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10"
        onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)}
        style={{ color: "#3AFCAD" }}
      >
        <i className="fa fa-long-arrow-left text-2xl rounded-full p-2" style={{ border: "2px solid #3AFCAD" }}></i>
      </button>
      <button
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10"
        onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
        style={{ color: "#3AFCAD" }}
      >
        <i className="fa fa-long-arrow-right text-2xl rounded-full p-2" style={{ border: "2px solid #3AFCAD" }}></i>
      </button>
    </div>
  )
}
