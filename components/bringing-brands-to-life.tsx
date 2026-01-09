"use client"

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
    <section className="section-featured bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left side - Text content */}
          <div className="home-en-text flex flex-col justify-center">
            <h2
              className="section-title text-5xl md:text-8xl font-bold mb-8"
              style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
            >
              <div>bringing brands</div>
              <div>to life</div>
            </h2>

            <p className="section-description all_para_size text-gray-600 text-base mb-8 leading-relaxed">
              Our mission is to drive results for our clients by pairing the right staff with effective on-ground
              management. It&apos;s that simple.
            </p>

            <a href="/work" className="subscribe_btn footer_btn text-white w-fit mb-8">
              OUR WORK →
            </a>
          </div>

          {/* Right side - Carousel (empty space for user to add their carousel) */}
          <div className="content_side_img relative flex items-start justify-end md:translate-x-16 md:-translate-y-8 w-full">
            <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl relative group">
              <div
                className="carousel slide relative w-full overflow-hidden bg-gray-200 h-[28rem] md:h-[32rem] lg:h-[36rem] rounded-xl shadow-lg"
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
                <div className="carousel-inner content_side_img relative w-full h-full">
                  {carouselImages.map((image, index) => (
                    <div
                      key={image.id}
                      className={`carousel-item content_side_img absolute inset-0 transition-opacity duration-500 ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                      }`}
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
