"use client"

import Image from "next/image"

export default function Hero() {
  return (
      <section
        className="hero relative bg-cover bg-center overflow-hidden py-20 md:py-32"
        style={{
          backgroundImage: "url('/her-sec.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          height: '100vh',
          maxHeight: 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative z-10">
            {/* Banner Text */}
            <h1 className="flex  justify-between text-4xl md:text-6xl font-bold mb-12 mt-[-60px] md:mt-[-100px]" id="banner_text">
              <div className="flex items-center gap-30 md:gap-50 ">
                <span className="text-white text-7xl md:text-9xl ">We are</span>
                {/* Logo placeholder - Engage Me Logo */}
                <Image
                  src="/engage-me-logo.png"
                  alt="engage me"
                  width={270}
                  height={270}
                  style={{ height: "180px", width: "auto", marginTop: '28px' }}
                />
              </div>
            </h1>
          {/* Fixed Floating Buttons - positioned absolutely */}
          {/* <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-50">
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
          </div> */}
        </div>
      </div>
    </section>
  )
}
