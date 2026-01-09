"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"

export default function PeoplePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 6)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* A to Z People */}
      <section className="bg-white pt-10">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="pl-10 flex flex-col justify-left people_in_1">
              <h1
                className="section-title text-5xl md:text-8xl font-regular mb-8"
                style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
              >
                <div>a to z people</div>
              </h1>

              <p className="all_para_size text-gray-600 text-base mb-8 leading-relaxed max-w-xl">
                With over 5,000 staff on our database, we can provide any type of temporary staffing solution required by
                client&apos;s, from; models, hostesses, promoters, actors, dancers, F&amp;B staff, waiters, bar staff,
                ushers, entertainers.
              </p>
            </div>

            <div className="content_side_img relative flex items-start justify-end md:translate-x-16 md:-translate-y-8 w-full people_in_2">
              <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl relative">
                <div className="carousel slide relative w-full overflow-hidden bg-gray-200 h-[22rem] sm:h-[26rem] md:h-[30rem] lg:h-[34rem] shadow-lg" id="a2zCarousel">
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
                          <Image
                            src={`/a-z-${idx + 1}.gif`}
                            alt={`A to Z ${idx + 1}`}
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
      <section className="bg-white">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left - founders cards */}
            <div className="bg-gray-200 people_in_3">
              <div className="grid grid-rows-2">
                {/* Founder 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="relative min-h-[280px] sm:min-h-[320px]">
                    <Image
                      src="/lisa.gif"
                      alt="Founder portrait"
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover grayscale"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">lisa haddad</h3>
                    <p className="text-gray-800 font-semibold leading-snug mb-6">
                      strategic planning &amp;
                      <br />
                      driving results expert
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      9 year&apos;s experience
                      <br />
                      in brand activation
                      <br />
                      at OgilvyAction/Geometry
                      <br />
                      in the UK &amp; UAE
                    </p>
                  </div>
                </div>

                {/* Founder 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="flex flex-col justify-center p-8 order-2 sm:order-1">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">clare walsh</h3>
                    <p className="text-gray-800 font-semibold leading-snug mb-6">
                      on-ground
                      <br />
                      management expert
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      7 year&apos;s experience
                      <br />
                      in event management
                      <br />
                      specialising in promotional
                      <br />
                      staffing management
                      <br />
                      and uniform development.
                    </p>
                  </div>
                  <div className="relative min-h-[280px] sm:min-h-[320px] order-1 sm:order-2">
                    <Image
                      src="/clare.gif"
                      alt="Founder portrait"
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover grayscale"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right - founders copy */}
            <div className="comn_img_side_txt flex flex-col justify-center people_in_4">
              <h2
                className="section-title text-5xl md:text-8xl font-regular mb-8"
                style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
              >
                <div>meet the</div>
                <div>founders</div>
              </h2>

              <p className="all_para_size text-gray-600 text-base mb-6 leading-relaxed">
                Established in the UAE in 2014, our founders not only have vast experience within the region but also
                internationally.
              </p>
              <p className="all_para_size text-gray-600 text-base leading-relaxed">
                Our founders bring a mix of strategic planning and effectiveness expertise with pristine talent and
                on-the-ground management expertise, from their previous roles in Events and Marketing, to ensure we
                deliver for our client&apos;s time and time again.
              </p>
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
                <div>want to join our</div>
                <div>team</div>
              </h2>

              <p className="all_para_size text-gray-600 text-base mb-8 leading-relaxed max-w-xl">
                If you are freelancer and looking for work as a model, hostess, promoter, entertainer, photographer,
                videographer etc, click below to complete our online registration form to join our database. You are
                just a couple of clicks away from joining our fun team.
              </p>

              <a href="/jobs" className="browser_btn footer_btn text-white w-fit">
                APPLY HERE →
              </a>
            </div>

            <div className="content_side_img relative flex items-center justify-center w-full">
              <div className="relative w-full h-[22rem] sm:h-[26rem] md:h-[30rem] lg:h-[34rem] bg-gray-200 overflow-hidden">
                <Image
                  src="/ladies.jpg"
                  alt="Engage Me team"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover"
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
