"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import Link from "next/link"
import SimpleCarousel from "@/components/simple-carousel"

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
      } catch (e) {
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
          src="https://web.archive.org/web/20250804161257im_/https://engage-me.me/public/image/customs/28092020160128624423.jpg"
          alt="brand activations banner"
          style={{ width: "100%", objectFit: "cover" }}
        />
      </section>

      <section className="py-10 px-4 bg-white">
        <div className=" mx-auto">
          <style>{`
            @font-face {
              font-family: 'run';
              src: url('/fonts/run.ttf') format('truetype');
              font-display: swap;
            }
            .section-title { font-family: run, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; text-transform: none; line-height:1; color: #3AFCAD; }
            .section-title.lowercase { text-transform: lowercase; }
            .f-text-xlarge p { margin: 0 0 1rem 0; font-size: 1.125rem; line-height:1.4; }
            .work_post_banner img { width:100%; object-fit:cover; display:block; }
            .home_imggroup img { width:100%; object-fit:cover; display:block; }
            .f-btn-tertiary { background:#3AFCAD; color:#fff; padding:0.75rem 1.25rem; border-radius:0.5rem; display:inline-block; }
            .carousel-strip { display:grid; gap:0.75rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
            .carousel-strip img { height:220px; object-fit:cover; border-radius:0.5rem; }
            @media (min-width:768px) {
              .section-title { font-size: 3.2rem; }
              .f-text-xlarge p { font-size: 1.125rem; }
            }
          `}</style>

          <div className="relative border border-gray-300 mt-8">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-0 right-0 border-t border-gray-300"></div>
              <div className="absolute left-1/2 top-0 bottom-0 border-l border-gray-300"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="border-b border-black md:border-b md:border-r md:border-black p-4 md:p-6">
                <SimpleCarousel
                  images={CAROUSEL_IMAGES.map((src, idx) => ({ id: `${idx}`, src, alt: "brand activation" }))}
                  height={500}
                />
              </div>

              <div className="border-b border-gray-300 p-4 md:p-6 flex items-center">
                <div>
                  <h2 className="section-title text-3xl md:text-4xl font-bold lowercase">brand activations</h2>
                  <div className="section-description f-text-xlarge mt-4 text-gray-700">
                    <p>Brand activations are the heart of what we do; bringing brands to life through one-to-one interaction is what we live for.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6 flex items-center">
                <div className="section-description f-text-xlarge text-gray-700">
                  <p>We take time to understand your brand in order to carefully select and propose staff that we feel are the right fit to evoke your brand on a ground level.</p>

                  <p className="mt-4">We take pre campaign training and brand immersion seriously. We make sure; promoters, sampling staff, runners etc are fully equipped to be as effective as possible on-the-ground.</p>

                  <div className="mt-6">
                    <Link
                      href="/work"
                      className="inline-block bg-[#3AFCAD] text-white px-6 py-3"
                      style={{ borderTopLeftRadius: "2.5rem" }}
                    >
                      All Work
                      <i className="ml-3 fa fa-chevron-right" aria-hidden="true"></i>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="border-t md:border-t-0 md:border-l border-black p-4 md:p-6">
                <img
                  src="https://web.archive.org/web/20250804161257im_/https://engage-me.me/public/image/customs/280920201601286244550.jpg"
                  alt="brand activation image 2"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
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
