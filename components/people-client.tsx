"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import type { PeopleContent } from "@/lib/cms/people-content"

function renderLines(text: string) {
  const lines = (text || "").split("\n").map((s) => s.trim()).filter(Boolean)
  if (!lines.length) return null
  return (
    <>
      {lines.map((l, i) => (
        <span key={i}>
          {l}
          {i < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  )
}

function renderHeadingLines(text: string) {
  const lines = (text || "").split("\n").map((s) => s.trim()).filter(Boolean)
  if (!lines.length) return null
  return (
    <>
      {lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </>
  )
}

export default function PeopleClient({ initial }: { initial: PeopleContent }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 6)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const c = initial

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* A to Z People */}
      <section className="bg-white py-0">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch md:min-h-[42vw]">
            <div className="flex flex-col justify-center px-10 py-10 md:py-12 people_in_1">
              <h1
                className="section-title text-5xl md:text-8xl font-regular mb-8"
                style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
              >
                <div>{c.a2z.heading}</div>
              </h1>

              <p className="all_para_size text-gray-600 text-base mb-8 leading-relaxed max-w-xl">{c.a2z.body}</p>
            </div>

            <div className="content_side_img relative flex w-full people_in_2">
              <div className="relative w-full">
                <div className="carousel slide relative h-full min-h-[22rem] w-full overflow-hidden bg-gray-200 shadow-lg md:min-h-[42vw]" id="a2zCarousel">
                  {/* Indicators */}
                  <ul className="carousel-indicators flex justify-center gap-2 absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <li
                        key={i}
                        className={`h-3 w-3 rounded-full cursor-pointer transition`}
                        onClick={() => setCurrentSlide(i)}
                        style={{ backgroundColor: i === currentSlide ? "#3AFCAD" : "#FFFFFF" }}
                      ></li>
                    ))}
                  </ul>

                  {/* Carousel inner */}
                  <div className="carousel-inner content_side_img relative w-full h-full overflow-hidden">
                    <div
                      className="flex transition-transform duration-700 ease-in-out h-full"
                      style={{
                        width: `${6 * 100}%`,
                        transform: `translateX(-${currentSlide * (100 / 6)}%)`,
                      }}
                    >
                      {Array.from({ length: 6 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="carousel-item content_side_img relative w-full h-full flex-shrink-0"
                          style={{ width: `${100 / 6}%` }}
                        >
                          <Image src={c.a2z.carouselUrls[idx] || "/placeholder.svg"} alt={`A to Z ${idx + 1}`} fill unoptimized className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Left/Right controls */}
                  <a
                    className="carousel-control-prev absolute left-0 top-1/2 -translate-y-1/2 z-10"
                    href="#a2zCarousel"
                    role="button"
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + 6) % 6)}
                    style={{ color: "#3AFCAD" }}
                  >
                    <i className="fa fa-long-arrow-left text-2xl rounded-full p-2" style={{ border: "2px solid #3AFCAD", color: "#3AFCAD" }}></i>
                  </a>
                  <a
                    className="carousel-control-next absolute right-0 top-1/2 -translate-y-1/2 z-10"
                    href="#a2zCarousel"
                    role="button"
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % 6)}
                    style={{ color: "#3AFCAD" }}
                  >
                    <i className="fa fa-long-arrow-right text-2xl rounded-full p-2" style={{ border: "2px solid #3AFCAD", color: "#3AFCAD" }}></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founders */}
      <section className="bg-white py-0">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch md:min-h-[42vw]">
            {/* Left - founders cards */}
            <div className="bg-gray-200 people_in_3 h-full">
              <div className="grid grid-rows-2 h-full">
                {/* Founder 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
                  <div className="relative h-full">
                    <Image
                      src={c.founders.f1.imageUrl}
                      alt="Founder portrait"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover grayscale"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{c.founders.f1.name}</h3>
                    <p className="text-gray-800 font-semibold leading-snug mb-6">{renderLines(c.founders.f1.roleLines)}</p>
                    <p className="text-gray-700 leading-relaxed">{renderLines(c.founders.f1.bioLines)}</p>
                  </div>
                </div>

                {/* Founder 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
                  <div className="flex flex-col justify-center p-8 order-2 sm:order-1">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{c.founders.f2.name}</h3>
                    <p className="text-gray-800 font-semibold leading-snug mb-6">{renderLines(c.founders.f2.roleLines)}</p>
                    <p className="text-gray-700 leading-relaxed">{renderLines(c.founders.f2.bioLines)}</p>
                  </div>
                  <div className="relative h-full order-1 sm:order-2">
                    <Image
                      src={c.founders.f2.imageUrl}
                      alt="Founder portrait"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover grayscale"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right - founders copy */}
            <div className="comn_img_side_txt flex flex-col justify-center people_in_4 px-10 py-10 md:py-12">
              <h2
                className="section-title text-5xl md:text-8xl font-regular mb-8"
                style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
              >
                {renderHeadingLines(c.founders.headingLines)}
              </h2>

              <p className="all_para_size text-gray-600 text-base mb-6 leading-relaxed">{c.founders.p1}</p>
              <p className="all_para_size text-gray-600 text-base leading-relaxed">{c.founders.p2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Want to Join Our Team */}
      <section className="bg-white pb-20 border-t border-gray-200">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="pl-10 flex flex-col justify-left">
              <h2
                className="section-title text-5xl md:text-8xl font-regular mb-8"
                style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
              >
                {renderHeadingLines(c.join.headingLines)}
              </h2>

              <p className="all_para_size text-gray-600 text-base mb-8 leading-relaxed max-w-xl">{c.join.body}</p>

              <Link href="/jobs" className="btn-brand-leaf text-white w-fit">
                <span>{c.join.buttonLabel}</span>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 translate-y-[1px]">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </Link>
            </div>

            <div className="content_side_img relative flex items-center justify-center w-full">
              <div className="relative w-full h-[22rem] sm:h-[26rem] md:h-[30rem] lg:h-[34rem] bg-gray-200 overflow-hidden">
                <Image src={c.join.imageUrl} alt="Engage Me team" fill unoptimized sizes="(max-width: 768px) 100vw, 50vw" className="w-full h-full object-cover" />
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

