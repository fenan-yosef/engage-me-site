"use client"

import Image from "next/image"

export default function Hero() {
  return (
    <section
      className="hero relative bg-cover bg-center overflow-hidden py-20 md:py-32"
      style={{
        backgroundImage: "url('/striped-background.jpg')",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative z-10">
          {/* Banner Text */}
          <h1 className="text-6xl md:text-8xl font-bold mb-12" id="banner_text">
            <div className="flex items-center gap-6 md:gap-12">
              <span className="text-white">We are</span>
              {/* Logo placeholder - Engage Me Logo */}
              <Image
                src="/engage-me-logo.jpg"
                alt="engage me"
                width={150}
                height={150}
                style={{ height: "120px", width: "auto" }}
              />
            </div>
          </h1>

          {/* Fixed Floating Buttons - positioned absolutely */}
          <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-50">
            <a
              href="#contact"
              className="bg-cyan-400 text-black font-bold px-3 py-2 rounded-l-full hover:bg-cyan-500 transition whitespace-nowrap text-sm"
            >
              Brief Us
            </a>
            <a
              href="/careers"
              className="bg-cyan-400 text-black font-bold px-3 py-2 rounded-l-full hover:bg-cyan-500 transition whitespace-nowrap text-sm"
            >
              Join Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
