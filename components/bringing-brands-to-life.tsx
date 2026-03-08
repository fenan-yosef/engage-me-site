"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import Image, { type StaticImageData } from "next/image"

import carouselImage1 from "../public/carousel-image-1.jpg"
import carouselImage2 from "../public/carousel-image-2.jpg"
import carouselImage3 from "../public/carousel-image-3.jpg"

interface CarouselImage {
  id: string
  src: string | StaticImageData
  alt: string
}

interface BringingBrandsToLifeProps {
  carouselImages?: CarouselImage[]
}

export default function BringingBrandsToLife({
  carouselImages = [
    { id: "1", src: carouselImage1, alt: "Carousel 1" },
    { id: "2", src: carouselImage2, alt: "Carousel 2" },
    { id: "3", src: carouselImage3, alt: "Carousel 3" },
  ],
}: BringingBrandsToLifeProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [carouselImages.length])

  return (
    <section className="section-featured bg-white py-0">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch md:min-h-[42vw]">
          {/* Left side - Text content */}
          <div className="flex flex-col justify-center px-10 py-10 md:py-12">
            <h2
              className="section-title text-5xl md:text-8xl font-bold mb-8"
              style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
            >
              <div>bringing brands to life</div>
            </h2>

            <p className="section-description all_para_size text-gray-600 text-base mb-8 leading-relaxed">
              Our mission is to drive results for our clients by pairing the right staff with effective on-ground
              management. It&apos;s that simple.
            </p>

            <Link
              href="/work"
              className="btn-brand-leaf text-white w-fit mb-8"
            >
              <span>OUR WORK</span>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 translate-y-[1px]"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </Link>
          </div>

          {/* Right side - Carousel (empty space for user to add their carousel) */}
          <div className="content_side_img relative flex w-full">
            <div className="relative group w-full">
              <div
                className="carousel slide relative h-full min-h-[28rem] w-full overflow-hidden bg-gray-200 shadow-lg md:min-h-[42vw]"
                id="demo"
                data-interval="2500"
              >
                {/* Indicators */}
                <ul className="carousel-indicators flex justify-center gap-2 absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                  {carouselImages.map((_, index) => (
                    <li
                      key={index}
                      className={`h-3 w-3 rounded-full cursor-pointer transition`}
                      onClick={() => setCurrentSlide(index)}
                      style={{ backgroundColor: index === currentSlide ? "#3AFCAD" : "#FFFFFF" }}
                    ></li>
                  ))}
                </ul>

                {/* Carousel inner */}
                <div className="carousel-inner content_side_img relative w-full h-full overflow-hidden">
                  <div
                    className="flex transition-transform duration-700 ease-in-out h-full"
                    style={{
                      width: `${carouselImages.length * 100}%`,
                      transform: `translateX(-${currentSlide * (100 / carouselImages.length)}%)`,
                    }}
                  >
                    {carouselImages.map((image) => (
                      <div
                        key={image.id}
                        className="carousel-item content_side_img relative w-full h-full flex-shrink-0"
                        style={{ width: `${100 / carouselImages.length}%` }}
                      >
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          fill
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Left/Right controls */}
                <a
                  className="carousel-control-prev absolute left-0 top-1/2 -translate-y-1/2 z-10"
                  href="#demo"
                  role="button"
                  data-slide="prev"
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)}
                  style={{ color: "#3AFCAD" }}
                >
                  <i className="fa fa-long-arrow-left text-2xl rounded-full p-2" style={{ border: "2px solid #3AFCAD", color: "#3AFCAD" }}></i>
                </a>
                <a
                  className="carousel-control-next absolute right-0 top-1/2 -translate-y-1/2 z-10"
                  href="#demo"
                  role="button"
                  data-slide="next"
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselImages.length)}
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
  )
}
