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
            <h1
              className="grid grid-cols-2 items-center mb-12 mt-[-100px] md:mt-[-135px]"
              id="banner_text"
              style={{ fontFamily: "'Run', sans-serif" }}
            >
              {/* Left Column: We are */}
              <div className="flex justify-center md:justify-end md:pr-[18%]">
                <span 
                  className="text-white leading-none inline-block whitespace-nowrap" 
                  style={{ fontSize: "13vw", fontWeight: "normal", letterSpacing: "-0.02em" }}
                >
                  We are
                </span>
              </div>

              {/* Right Column: Logo */}
              <div className="flex justify-center md:justify-start md:pl-[18%] pt-8 md:pt-4">
                <div className="relative" style={{ height: "13vw", width: "100%", maxWidth: "450px" }}>
                  <Image
                    src="/engage-me-logo.png"
                    alt="engage me"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </h1>
        </div>
      </div>
    </section>
  )
}
