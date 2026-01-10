"use client"

import Link from "next/link"

export default function FloatingButtons() {
  return (
    <>
      {/* Fixed floating buttons - right side, positioned fixed */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-7 z-50 pr-0">
        {/* Brief Us Button */}
        <Link
          href="/contact#jobs"
          className="bg-[#3AFCAD] text-white font-light px-10 py-7 rounded-l-full hover:bg-[#35E6B3] transition shadow-lg whitespace-nowrap text-2xl fix-btn-scroll"
        >
          Brief Us
        </Link>

        {/* Join Us Button */}
        <Link
          href="/apply"
          className="bg-[#3AFCAD] text-white font-light px-10 py-7 rounded-l-full hover:bg-[#35E6B3] transition shadow-lg whitespace-nowrap text-5xl fix-btn-scroll"
        >
          Join Us
        </Link>
      </div>

      {/* WhatsApp Button - bottom right corner, fixed position */}
      <Link
        href="https://wa.me/971458568645"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-6 bg-green-500 text-white p-7 rounded-full hover:bg-green-600 transition shadow-lg z-50 flex items-center justify-center"
        title="Chat with us on WhatsApp"
      >
        <i className="fa fa-whatsapp text-5xl"></i>
      </Link>
    </>
  )
}
