"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import SimpleCarousel from "@/components/simple-carousel"
import Link from "next/link"

export default function EntertainersPage() {
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
      src: "https://web.archive.org/web/20250917011934im_/https://engage-me.me/public/image/customs/071020201602054047910.jpg",
      alt: "entertainers image 1"
    },
    {
      id: "2",
      src: "https://web.archive.org/web/20250917011934im_/https://engage-me.me/public/image/customs/071020201602054047851.jpg",
      alt: "entertainers image 2"
    },
    {
      id: "3",
      src: "https://web.archive.org/web/20250917011934im_/https://engage-me.me/public/image/customs/071020201602054047492.jpg",
      alt: "entertainers image 3"
    },
    {
      id: "4",
      src: "https://web.archive.org/web/20250917011934im_/https://engage-me.me/public/image/customs/071020201602054047283.jpg",
      alt: "entertainers image 4"
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="work_post_banner">
        <img
          id="work_banner_image"
          src="https://web.archive.org/web/20250917011934im_/https://engage-me.me/public/image/customs/28092020160128736066.jpg"
          alt="entertainers banner"
          style={{ width: "100%", objectFit: "cover" }}
        />
      </section>

      <section className="py-10 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <style>{`
            @import url('https://fonts.googleapis.com/css?family=Barlow+Condensed:600');
            @font-face {
              font-family: 'run';
              src: url('/fonts/run.ttf') format('truetype');
              font-display: swap;
            }
            .section-title { font-family: run, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; text-transform: none; line-height:1; color: #3AFCAD; font-size: 3rem; }
            .section-title.lowercase { text-transform: none; text-transform: lowercase; }
            .f-text-xlarge p { margin: 0 0 1rem 0; font-size: 1.25rem; line-height:1.5; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; }
            .work_post_banner img { width:100%; object-fit:cover; display:block; }
            .home_imggroup img { width:100%; object-fit:cover; display:block; }
            .f-btn-tertiary { background:#3AFCAD; color:#fff; padding:0.75rem 1.25rem; border-radius:0.5rem; display:inline-block; font-family: 'Barlow Condensed', sans-serif; font-weight: 600; }
            .carousel .carousel-control-prev, .carousel .carousel-control-next { position: absolute; top: 50%; transform: translateY(-50%); color:#3AFCAD; }
            @media (min-width:768px) {
              .section-title { font-size: 5rem; }
              .f-text-xlarge p { font-size: 1.5rem; }
            }
          `}</style>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="home_imggroup">
              <SimpleCarousel images={carouselImages} height={500} />
            </div>

            <div className="comn_img_side_txt flex flex-col justify-center">
              <h2 className="section-title font-bold ">entertainers</h2>

              <div className="section-description f-text-xlarge mt-4 text-gray-700">
                <p>
                  In addition to providing staffing for events and activations we also provide entertainers to bring theatre and music to your campaign.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-8">
            <div className="comn_img_side_txt flex flex-col justify-center">
              <div className="section-description f-text-xlarge text-gray-700">
                <p>We can support with, actors, dancers, mascots, characters, voice over artists, DJ&apos;s, you name it we can provide it.</p>

                <p className="mt-4">We also work with a variety of; choreographers, stylists, costume designers and make-up artists, to provide a complete solution to your entertainment needs.</p>

                <div className="mt-6">
                  <Link
                    href="/work"
                    className="f-btn-tertiary text-2xl font-semibold rounded-none"
                    style={{ borderTopLeftRadius: '3.5rem', borderTopRightRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, padding: '0.5rem 1.5rem' }}
                  >
                    All Work
                    <i className=" ml-2 fa fa-chevron-right" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="home_imggroup">
              <img
                src="https://web.archive.org/web/20250917011934im_/https://engage-me.me/public/image/customs/280920201601287360860.jpg"
                alt="entertainers image"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
