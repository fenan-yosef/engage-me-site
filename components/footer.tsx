"use client"

import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left - Logo and copyright */}
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex-shrink-0 mb-4">
              <Image
                src="/engage-me-logo.jpg"
                alt="engage me"
                width={100}
                height={40}
                style={{ height: "40px", width: "auto" }}
              />
            </Link>
            <p className="text-gray-600 text-sm">Copyright Engage Me Agency. All rights reserved.</p>
          </div>

          {/* Center - Links */}
          <div className="flex gap-6 mb-8 md:mb-0">
            <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900 text-sm">
              Privacy Policy
            </Link>
          </div>

          {/* Right - Social icons and info button */}
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <Link
              href="https://www.instagram.com/engagemeuae/"
              target="_blank"
              className="text-gray-600 hover:text-gray-900"
            >
              <i className="fa fa-instagram text-lg"></i>
            </Link>

            {/* Facebook */}
            <Link
              href="https://www.facebook.com/Engage-Me"
              target="_blank"
              className="text-gray-600 hover:text-gray-900"
            >
              <i className="fa fa-facebook text-lg"></i>
            </Link>

            {/* Info button */}
            <Link
              href="#"
              className="w-8 h-8 bg-cyan-400 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-cyan-500 transition"
            >
              i
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
