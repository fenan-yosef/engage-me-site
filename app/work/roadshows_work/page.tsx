"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import SimpleCarousel from "@/components/simple-carousel"
import Link from "next/link"

export default function RoadshowsWorkPage() {
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

  const carouselImages = [
    {
      id: "1",
      src: "https://web.archive.org/web/20250917020957im_/https://engage-me.me/public/image/customs/280920201601296638890.JPG",
      alt: "roadshows image"
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="work_post_banner">
        <img
          id="work_banner_image"
          src="https://web.archive.org/web/20250917020957im_/https://engage-me.me/public/image/customs/280920201601296638890.JPG"
          alt="roadshows banner"
          style={{ width: "100%", objectFit: "cover" }}
        />
      </section>

      <section className="bg-white">
        <div className="mx-auto">
          <style>{`
            @import url('https://fonts.googleapis.com/css?family=Barlow+Condensed:600');
            @font-face {
              font-family: 'run';
              src: url('/fonts/run.ttf') format('truetype');
              font-display: swap;
            }
            .section-title { font-family: run, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; text-transform: none; line-height:1; color: #3AFCAD; font-size: 3rem; letter-spacing: 0.1em; }
            .section-title.lowercase { text-transform: none; text-transform: lowercase; }
            .f-text-xlarge p { margin: 0 0 1rem 0; font-size: 1.25rem; line-height:1.5; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; }
            .work_post_banner img { width:100%; object-fit:cover; display:block; }
            .home_imggroup img { width:100%; object-fit:cover; display:block; }
            .f-btn-tertiary { background:#3AFCAD; color:#fff; padding:0.75rem 1.25rem; border-radius:0.5rem; display:inline-block; font-family: 'Barlow Condensed', sans-serif; font-weight: 600; }
            .carousel .carousel-control-prev, .carousel .carousel-control-next { position: absolute; top: 50%; transform: translateY(-50%); color:#3AFCAD; }
            @media (min-width:768px) {
              
            }
          `}</style>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch md:min-h-[42vw]">
            <div className="home_imggroup flex items-stretch order-2 md:order-1">
              <SimpleCarousel images={carouselImages} className="h-full min-h-[22rem] md:min-h-[42vw]" />
            </div>

            <div className="px-10 py-10 md:py-12 comn_img_side_txt flex flex-col justify-center order-1 md:order-2">
              <h2
                className="section-title text-5xl md:text-8xl font-bold mb-8 lowercase"
                style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
              >
                roadshows
              </h2>

              <div className="section-description f-text-xlarge mt-4 text-gray-700">
                <p>
                  The key to a successful roadshow is consistency; recruiting and training a team for a long-term campaign.
                </p>
              </div>
            </div>

            <div className="px-10 py-10 md:py-12 comn_img_side_txt flex flex-col justify-center order-3 md:order-3">
              <div className="section-description f-text-xlarge text-gray-700">
                <p>By providing a consistent team through organized scheduling and shifts, we can utilize on ground learnings, evolve and adapt from the very beginning, to ensure the success of the roadshow.</p>

                <div className="mt-6">
                  <Link
                    href="/work"
                    className="btn-brand-leaf text-white w-fit"
                  >
                    <span>All Work</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 translate-y-[1px]"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="home_imggroup order-4 md:order-4">
              <img
                src="https://web.archive.org/web/20250917020957im_/https://engage-me.me/public/image/customs/280920201601296638890.JPG"
                alt="roadshows image"
                className="w-full h-full object-cover min-h-[22rem] md:min-h-[42vw]"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  )
}
