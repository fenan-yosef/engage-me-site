"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import Link from "next/link"

export default function AirportActivationsPage() {
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

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="work_post_banner">
        <img
          id="work_banner_image"
          src="https://web.archive.org/web/20250917024326im_/https://engage-me.me/public/image/customs/28092020160128475430.jpg"
          alt="airport activations banner"
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
            .section-title { font-family: run, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; text-transform: none; line-height:1; color: #3AFCAD; }
            .section-title.lowercase { text-transform: none; text-transform: lowercase; }
            .f-text-xlarge p { margin: 0 0 1rem 0; font-size: 1.125rem; line-height:1.4; font-family: Arial; }
            .work_post_banner img { width:100%; object-fit:cover; display:block; }
            .home_imggroup img { width:100%; object-fit:cover; display:block; }
            .f-btn-tertiary { background:#3AFCAD; color:#fff; padding:0.75rem 1.25rem; border-radius:0.5rem; display:inline-block; }
            .carousel .carousel-control-prev, .carousel .carousel-control-next { position: absolute; top: 50%; transform: translateY(-50%); color:#3AFCAD; }
            @media (min-width:768px) {
              
            }
          `}</style>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch md:min-h-[42vw]">
            <div className="px-10 py-10 md:py-12 comn_img_side_txt flex flex-col justify-center order-1">
              <h2
                className="section-title text-5xl md:text-8xl font-bold mb-8 lowercase"
                style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
              >
                airport activations
              </h2>

              <div className="section-description mt-4">
                <p className="all_para_size text-gray-600 mb-6 leading-relaxed">
                  As a Department of Economic Development (DED) licensed company, we can provide our staff with work
                  permits and airport passes, in order for our staff to work legally within Dubai Duty Free (DDF).
                </p>
              </div>
            </div>

            <div className="home_imggroup order-2">
              <div className="relative w-full h-full min-h-[22rem] md:min-h-[42vw]">
                <img
                  src="https://web.archive.org/web/20250917024326im_/https://engage-me.me/public/image/customs/280920201601284189370.jpg"
                  alt="airport image"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="home_imggroup order-4 md:order-3">
              <div className="relative w-full h-full min-h-[22rem] md:min-h-[42vw]">
                <img
                  src="https://web.archive.org/web/20250917024326im_/https://engage-me.me/public/image/customs/280920201601284189790.jpg"
                  alt="airport image 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="px-10 py-10 md:py-12 comn_img_side_txt flex flex-col justify-center order-3 md:order-4">
              <div className="section-description">
                <p className="all_para_size text-gray-600 mb-6 leading-relaxed">24 hours staffing solutions are managed by organised scheduling, to provide round the clock engagement at DDF activation stands.</p>

                <p className="all_para_size text-gray-600 mb-6 leading-relaxed">We can provide; runners, promoters and temporary sales staff to cater for all your requirements in Dubai Duty Free.</p>

                <div className="mt-8">
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
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  )
}
