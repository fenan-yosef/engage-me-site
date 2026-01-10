"use client"

import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-row items-center justify-between w-full">
          {/* Left - Logo and copyright in a row */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="engage me"
                width={100}
                height={40}
                style={{ height: "40px", width: "auto" }}
              />
            </Link>
            <span className="text-gray-700 text-base">Copyright Engage Me Agency. All rights reserved.</span>
          </div>

          {/* Center - Scroll to top button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="flex items-center justify-center w-16 h-16 border-2 border-green-300 rounded-full hover:bg-green-50 transition"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="15" stroke="#2ee59d" strokeWidth="2" fill="none" />
              <path d="M16 22V10" stroke="#2ee59d" strokeWidth="2" strokeLinecap="round"/>
              <path d="M10 16L16 10L22 16" stroke="#2ee59d" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Right - Privacy Policy, divider, social icons */}
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-gray-700 underline hover:text-gray-900 text-base">
              Privacy Policy
            </Link>
            <span className="h-6 w-px bg-gray-300 mx-2"></span>
            <Link
              href="https://www.instagram.com/engagemeuae/"
              target="_blank"
              className="text-gray-700 hover:text-gray-900"
              aria-label="Instagram"
            >
              <i className="fa fa-instagram text-xl"></i>
            </Link>
            <Link
              href="https://web.facebook.com/Engage.Me"
              target="_blank"
              className="text-gray-700 hover:text-gray-900"
              aria-label="Facebook"
            >
              <i className="fa fa-facebook text-xl"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
