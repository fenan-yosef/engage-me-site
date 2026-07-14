"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import Link from "next/link"

type WorkItemData = {
  slug: string
  title: string
  bannerUrl: string | null
  description: string | null
  leftImages: string[]
  rightImages: string[]
}

export default function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [data, setData] = useState<WorkItemData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    params.then((p) => {
      loadWorkItem(p.slug)
    })
  }, [params])

  async function loadWorkItem(itemSlug: string) {
    setLoading(true)
    try {
      const res = await fetch(`/api/cms/work-items/${itemSlug}`)
      if (!res.ok) {
        if (res.status === 404) {
          setError("Work item not found in CMS")
        } else {
          setError("Failed to load work item")
        }
        setLoading(false)
        return
      }
      const itemData = await res.json()
      setData(itemData)
    } catch {
      setError("Failed to load work item")
    }
    setLoading(false)
  }

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
    window.addEventListener("resize", setBannerHeight)
    return () => window.removeEventListener("resize", setBannerHeight)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-gray-500">Loading...</div>
        </div>
        <Footer />
        <FloatingButtons />
      </main>
    )
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="text-gray-500 mb-4">{error || "Work item not found"}</div>
          <Link href="/work" className="btn-brand-leaf text-white">
            Back to Work
          </Link>
        </div>
        <Footer />
        <FloatingButtons />
      </main>
    )
  }

  const leftImages = data.leftImages || []
  const rightImages = data.rightImages || []
  const left0 = leftImages[0] || null
  const left1 = leftImages[1] || null
  const left2 = leftImages[2] || null
  const right0 = rightImages[0] || null
  const hasCarousel = (!!left1 || !!left2)
  const hasSingleSideLayout = !!left0 || !!right0
  const displayPrimaryImage = left0 || right0

  return (
    <main className="work-detail-page min-h-screen bg-white">
      <Header />

      <section className="work_post_banner">
        <img
          id="work_banner_image"
          src={data.bannerUrl || "https://web.archive.org/web/20250917024326im_/https://engage-me.me/public/image/customs/28092020160128475430.jpg"}
          alt={`${data.title} banner`}
          style={{ width: "100%", objectFit: "cover" }}
        />
      </section>

      <section className="bg-white">
        <div className="mx-auto">
          <style>{`
            @font-face {
              font-family: 'run';
              src: url('/fonts/run.ttf') format('truetype');
              font-display: swap;
            }
            .work-detail-page .section-title { font-family: 'Run', sans-serif; font-weight: 700; text-transform: none; line-height:1; color: #3AFCAD; }
            .section-title.lowercase { text-transform: none; text-transform: lowercase; }
            .work-detail-page .f-text-xlarge p { margin: 0 0 1rem 0; font-size: 1.125rem; line-height:1.4; font-family: 'Montserrat', sans-serif; font-weight: 300; }
            .work-detail-page .btn-brand-leaf { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; }
            .work_post_banner img { width:100%; object-fit:cover; display:block; }
            .home_imggroup img { width:100%; object-fit:cover; display:block; }
            .f-btn-tertiary { background:#3AFCAD; color:#fff; padding:0.75rem 1.25rem; border-radius:0.5rem; display:inline-block; }
          `}</style>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch md:min-h-[42vw]">
            {hasCarousel ? (
              <>
                <div className="order-2 md:order-1 relative bg-white flex items-stretch">
                  <WorkCarousel images={[left0, left1, left2].filter((url): url is string => !!url)} className="h-full min-h-[22rem] md:min-h-[42vw]" />
                </div>
                <div className="px-10 py-10 md:py-12 flex items-center bg-white order-1 md:order-2">
                  <div>
                    <h2
                      className="section-title text-5xl md:text-8xl font-bold mb-8 lowercase"
                      style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
                    >
                      {data.title}
                    </h2>
                    {data.description && (
                      <p className="mt-3 text-gray-700" style={{ maxWidth: 420 }}>
                        {data.description.split("\n")[0]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="px-10 py-10 md:py-12 bg-white order-3 md:order-3 flex flex-col justify-center">
                  <div className="text-gray-700 f-text-xlarge">
                    {data.description && (
                      <>
                        {data.description.split("\n").slice(1).map((para, idx) => (
                          <p key={idx} className={idx === 0 ? "mt-4" : ""}>
                            {para}
                          </p>
                        ))}
                      </>
                    )}
                    <div className="mt-6">
                      <Link href="/work" className="btn-brand-leaf text-white w-fit">
                        <span>All Work</span>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 translate-y-[1px]">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="bg-white flex items-stretch order-4 md:order-4">
                  {right0 && (
                    <img src={right0} alt="work image" className="w-full h-full object-cover min-h-[22rem] md:min-h-[42vw]" />
                  )}
                </div>
              </>
            ) : hasSingleSideLayout ? (
              <>
                <div className="px-10 py-10 md:py-12 comn_img_side_txt flex flex-col justify-center order-1 md:order-2">
                  <h2
                    className="section-title text-5xl md:text-8xl font-bold mb-8 lowercase"
                    style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
                  >
                    {data.title}
                  </h2>
                  {data.description && (
                    <div className="section-description f-text-xlarge mt-4 text-gray-700">
                      <p>{data.description.split("\n")[0]}</p>
                    </div>
                  )}
                </div>
                <div className="home_imggroup order-2 md:order-1">
                  <div className="relative w-full h-full min-h-[22rem] md:min-h-[42vw]">
                    {displayPrimaryImage ? (
                      <img src={displayPrimaryImage} alt={`${data.title} image 1`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 min-h-[22rem] md:min-h-[42vw]" />
                    )}
                  </div>
                </div>
                <div className="px-10 py-10 md:py-12 comn_img_side_txt flex flex-col justify-center order-3 md:order-3">
                  <div className="section-description f-text-xlarge text-gray-700">
                    {data.description && data.description.split("\n").length > 1 && (
                      <>
                        {data.description.split("\n").slice(1).map((para, idx) => (
                          <p key={idx} className={idx === 0 ? "mt-4" : ""}>{para}</p>
                        ))}
                      </>
                    )}
                    <div className="mt-6">
                      <Link href="/work" className="btn-brand-leaf text-white w-fit">
                        <span>All Work</span>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 translate-y-[1px]">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                {left0 && right0 ? (
                  <div className="home_imggroup order-4 md:order-4">
                    <div className="relative w-full h-full min-h-[22rem] md:min-h-[42vw]">
                      <img src={right0} alt={`${data.title} image 2`} className="w-full h-full object-cover" />
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <div className="px-10 py-10 md:py-12 comn_img_side_txt flex flex-col justify-center order-1 md:order-2">
                  <h2
                    className="section-title text-5xl md:text-8xl font-bold mb-8 lowercase"
                    style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
                  >
                    {data.title}
                  </h2>
                  {data.description && (
                    <div className="section-description f-text-xlarge mt-4 text-gray-700">
                      {data.description.split("\n").map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                  )}
                </div>
                <div className="home_imggroup order-2 md:order-1">
                  <div className="relative w-full h-full min-h-[22rem] md:min-h-[42vw]">
                    {left0 ? (
                      <img src={left0} alt={data.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 min-h-[22rem] md:min-h-[42vw]" />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  )
}

function WorkCarousel({ images, className = "" }: { images: string[]; className?: string }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!images || images.length === 0) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [images])

  useEffect(() => {
    if (currentSlide >= images.length) {
      setCurrentSlide(0)
    }
  }, [currentSlide, images.length])

  if (!images || images.length === 0) return null

  return (
    <div className={`carousel slide relative w-full overflow-hidden ${className}`} id="workCarousel">
      <ul className="carousel-indicators flex justify-center gap-2 absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
        {images.map((_, index) => (
          <li
            key={index}
            className={`h-2 w-2 rounded-full cursor-pointer transition`}
            onClick={() => setCurrentSlide(index)}
            style={{ backgroundColor: index === currentSlide ? "#3AFCAD" : "#FFFFFF" }}
          />
        ))}
      </ul>
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
              <img src={src} alt={`slide-${idx}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      <a
        className="carousel-control-prev absolute left-0 top-1/2 -translate-y-1/2 z-10"
        role="button"
        onClick={() => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)}
        style={{ color: "#3AFCAD" }}
      >
        <i className="fa fa-long-arrow-left text-2xl rounded-full p-2" style={{ border: "2px solid #3AFCAD", color: "#3AFCAD" }} />
      </a>
      <a
        className="carousel-control-next absolute right-0 top-1/2 -translate-y-1/2 z-10"
        role="button"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % images.length)}
        style={{ color: "#3AFCAD" }}
      >
        <i className="fa fa-long-arrow-right text-2xl rounded-full p-2" style={{ border: "2px solid #3AFCAD", color: "#3AFCAD" }} />
      </a>
    </div>
  )
}
