"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import Image from "next/image"

const CAROUSEL_IMAGES = [
  "https://web.archive.org/web/20250804161257im_/https://engage-me.me/public/image/customs/280920201601286244570.jpg",
  "https://web.archive.org/web/20250804161257im_/https://engage-me.me/public/image/customs/280920201601286244991.jpg",
  "https://web.archive.org/web/20250804161257im_/https://engage-me.me/public/image/customs/280920201601286244792.jpg",
  "https://web.archive.org/web/20250804161257im_/https://engage-me.me/public/image/customs/280920201601286244603.jpg",
  "https://web.archive.org/web/20250804161257im_/https://engage-me.me/public/image/customs/280920201601286244354.jpg",
  "https://web.archive.org/web/20250804161257im_/https://engage-me.me/public/image/customs/280920201601286244405.jpg"
]

export default function BrandActivationsPage() {

  useEffect(() => {
    function setBannerHeight() {
      try {
        const header = document.querySelector("header") as HTMLElement | null
        const banner = document.getElementById("work_banner_image") as HTMLElement | null
        if (!banner) return
        const winH: number = window.innerHeight
        const headerH: number = header ? header.offsetHeight : 0
        if (window.matchMedia("(max-width: 576px)").matches) {
          banner.style.height = "auto"
        } else {
          const height: number = Math.max(400, winH - headerH + 70)
          banner.style.height = `${height}px`
        }
      } catch {
        // ignore
      }
    }
    setBannerHeight()
    function setBorderedBoxHeight() {
      try {
        const header = document.querySelector("header") as HTMLElement | null
        const box = document.getElementById("borderedBox") as HTMLElement | null
        if (!box) return
        const winH = window.innerHeight
        const headerH = header ? header.offsetHeight : 0
        const target = Math.max(520, winH - headerH - 120)
        const inner = box.querySelector('.inner-grid') as HTMLElement | null
        if (inner) inner.style.minHeight = `${target}px`
      } catch {
        // ignore
      }
    }
    setBorderedBoxHeight()
    window.addEventListener("resize", setBannerHeight)
    window.addEventListener("resize", setBorderedBoxHeight)
    return () => window.removeEventListener("resize", setBannerHeight)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="work_post_banner">
        <img
          id="work_banner_image"
          src="https://web.archive.org/web/20250804161257im_/https://engage-me.me/public/image/customs/28092020160128624423.jpg"
          alt="brand activations banner"
          style={{ width: "100%", objectFit: "cover" }}
        />
      </section>

      <section className="py-10 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <style>{`
            @font-face {
              font-family: 'run';
              src: url('/fonts/run.ttf') format('truetype');
              font-display: swap;
            }
            .section-title { font-family: run, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; text-transform: none; line-height:1; color: #3AFCAD; }
            .section-title.lowercase { text-transform: lowercase; }
            .f-text-xlarge p { margin: 0 0 1rem 0; font-size: 1.125rem; line-height:1.4; font-family: Arial; }
            .work_post_banner img { width:100%; object-fit:cover; display:block; }
            .home_imggroup img { width:100%; object-fit:cover; display:block; }
            .f-btn-tertiary { background:#3AFCAD; color:#fff; padding:0.75rem 1.25rem; border-radius:0.5rem; display:inline-block; }
            .carousel-strip { display:grid; gap:0.75rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
            .carousel-strip img { height:220px; object-fit:cover; border-radius:0.5rem; }
            /* full-bleed container to span viewport width */
            .full-bleed { width:100vw; margin-left:calc(50% - 50vw); margin-right:calc(50% - 50vw); }
            .full-bleed .inner-grid { min-height: 60vh; }
            @media (min-width:1024px) {
              .full-bleed .inner-grid { min-height: 75vh; }
            }
            @media (min-width:768px) {
              .section-title { font-size: 3.2rem; }
              .f-text-xlarge p { font-size: 1.125rem; }
            }
          `}</style>

          {/* Box with 2x2 cross grid and outer border */}
          <div id="borderedBox" className="mt-10 border border-gray-300 full-bleed">
            <div className="grid grid-cols-2 grid-rows-2 inner-grid" style={{ minHeight: 440 }}>
              <div className="p-6 border-r border-b relative bg-white">
                {/* Small carousel (top-left) */}
                <SmallCarousel images={CAROUSEL_IMAGES.slice(0, 3)} />
              </div>

              <div className="p-8 border-b flex items-center bg-white">
                {/* Top-right: heading */}
                <div>
                  <h3 className="section-title text-4xl font-bold" style={{ color: '#3AFCAD' }}>brand activations</h3>
                  <p className="mt-3 text-gray-700" style={{ maxWidth: 420 }}>Bringing brands to life through targeted, on-ground experiences — staff selection, training and activation management.</p>
                </div>
              </div>

              <div className="p-8 border-r bg-white">
                {/* Bottom-left: descriptive text */}
                <div className="text-gray-700 f-text-xlarge">
                  <p>We take time to understand your brand in order to carefully select and propose staff that we feel are the right fit to evoke your brand on a ground level.</p>
                  <p className="mt-4">Pre-campaign training and brand immersion are standard; promoters, sampling staff and runners are briefed to deliver measurable results.</p>
                </div>
              </div>

              <div className="p-6 bg-white flex items-center justify-center">
                {/* Bottom-right: feature image */}
                <img src={CAROUSEL_IMAGES[3]} alt="brand activation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>


        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  )
}

function SmallCarousel({ images }: { images: string[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!images || images.length === 0) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [images.length])

  if (!images || images.length === 0) return null

  return (
    <div className="carousel slide relative w-full overflow-hidden h-52" id="smallCarousel">
      {/* Indicators */}
      <ul className="carousel-indicators flex justify-center gap-2 absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
        {images.map((_, index) => (
          <li
            key={index}
            className={`h-2 w-2 rounded-full cursor-pointer transition`}
            onClick={() => setCurrentSlide(index)}
            style={{ backgroundColor: index === currentSlide ? "#3AFCAD" : "#FFFFFF" }}
          ></li>
        ))}
      </ul>

      {/* Carousel inner */}
      <div className="carousel-inner relative w-full h-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(-${currentSlide * (100 / images.length)}%)`,
          }}
        >
          {images.map((src, idx) => (
            <div
              key={src}
              className="carousel-item relative w-full h-full flex-shrink-0"
              style={{ width: `${100 / images.length}%` }}
            >
              <Image src={src} alt={`slide-${idx}`} fill className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <a
        className="carousel-control-prev absolute left-0 top-1/2 -translate-y-1/2 z-10"
        href="#smallCarousel"
        role="button"
        data-slide="prev"
        onClick={() => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)}
        style={{ color: "#3AFCAD" }}
      >
        <i className="fa fa-long-arrow-left text-2xl rounded-full p-2" style={{ border: "2px solid #3AFCAD", color: "#3AFCAD" }}></i>
      </a>
      <a
        className="carousel-control-next absolute right-0 top-1/2 -translate-y-1/2 z-10"
        href="#smallCarousel"
        role="button"
        data-slide="next"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % images.length)}
        style={{ color: "#3AFCAD" }}
      >
        <i className="fa fa-long-arrow-right text-2xl rounded-full p-2" style={{ border: "2px solid #3AFCAD", color: "#3AFCAD" }}></i>
      </a>
    </div>
  )
}
