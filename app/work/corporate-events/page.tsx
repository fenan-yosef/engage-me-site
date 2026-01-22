"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import SimpleCarousel from "@/components/simple-carousel"
import Link from "next/link"

export default function CorporateEventsPage() {
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
      src: "https://web.archive.org/web/20250917013409im_/https://engage-me.me/public/image/customs/071020201602053744151.jpg",
      alt: "corporate event image 1"
    },
    {
      id: "2",
      src: "https://web.archive.org/web/20250917013409im_/https://engage-me.me/public/image/customs/200220251740063796680.JPG",
      alt: "corporate event image 2"
    },
    {
      id: "3",
      src: "https://web.archive.org/web/20250917013409im_/https://engage-me.me/public/image/customs/200220251740064629470.JPEG",
      alt: "corporate event image 3"
    },
    {
      id: "4",
      src: "https://web.archive.org/web/20250917013409im_/https://engage-me.me/public/image/customs/200220251740064708370.jpeg",
      alt: "corporate event image 4"
    },
    {
      id: "5",
      src: "https://web.archive.org/web/20250917013409im_/https://engage-me.me/public/image/customs/200220251740065028310.jpg",
      alt: "corporate event image 5"
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="work_post_banner">
        <img
          id="work_banner_image"
          src="https://web.archive.org/web/20250917013409im_/https://engage-me.me/public/image/customs/20022025174006373096.JPG"
          alt="corporate events banner"
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
            .section-title { font-family: run, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; text-transform: none; line-height:1; color: #3AFCAD; font-size: 2.5rem; }
            .section-title.lowercase { text-transform: none; text-transform: lowercase; }
            .f-text-xlarge p { margin: 0 0 1rem 0; font-size: 1.25rem; line-height:1.5; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; }
            .work_post_banner img { width:100%; object-fit:cover; display:block; }
            .home_imggroup img { width:100%; object-fit:cover; display:block; }
            .f-btn-tertiary { background:#3AFCAD; color:#fff; padding:0.75rem 1.25rem; border-radius:0.5rem; display:inline-block; }
            .carousel .carousel-control-prev, .carousel .carousel-control-next { position: absolute; top: 50%; transform: translateY(-50%); color:#3AFCAD; }
            @media (min-width:768px) {
              .section-title { font-size: 4rem; }
              .f-text-xlarge p { font-size: 1.5rem; }
            }
          `}</style>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="comn_img_side_txt flex flex-col justify-center">
              <h2 className="section-title text-3xl md:text-4xl font-bold lowercase ">corporate events</h2>

              <div className="section-description f-text-xlarge mt-4 text-gray-700">
                <p>
                  Whether your corporate event requires fun and energetic promoters or elegant hosts and hostesses we have the right staff for all your needs.
                </p>
              </div>
            </div>

            <div className="home_imggroup">
              <SimpleCarousel images={carouselImages} height={500} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-8">
            <div className="home_imggroup">
              <img
                src="https://web.archive.org/web/20250917013409im_/https://engage-me.me/public/image/customs/200220251740065095210.JPG"
                alt="corporate event image"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div className="comn_img_side_txt flex flex-col justify-center">
              <div className="section-description f-text-xlarge text-gray-700">
                <p>Our experienced staff are professional, courteous and full of smiles to make sure; gala dinners, family days and team building days, leave a lasting impression on your guests.</p>

                <div className="mt-6">
                  <Link
                    href="/work"
                    className="inline-block bg-[#3AFCAD] text-white px-6 py-3"
                    style={{ borderTopLeftRadius: '2.5rem' }}
                  >
                    All Work
                    <i className=" ml-2 fa fa-chevron-right" aria-hidden="true"></i>
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
