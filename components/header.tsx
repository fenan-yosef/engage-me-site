"use client"

import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header className="header bg-white border-b border-gray-200">
      <nav className="f-navbar f-navbar-attached">
        <div className="f-padding-left f-padding-right">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="f-navbar-brand flex-shrink-0">
              <span className="sr-only">go to homepage</span>
              <Image
                src="/engage-me-logo.jpg"
                alt="engage me"
                width={150}
                height={50}
                style={{ height: "50px", width: "auto" }}
              />
            </Link>

            {/* Navigation and right elements */}
            <div className="f-navbar-flip flex items-center justify-end gap-6">
              {/* Desktop Navigation */}
              <ul className="hidden lg:flex f-navbar-nav gap-8">
                <li>
                  <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium text-lg">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/work" className="text-gray-700 hover:text-gray-900 font-medium text-lg">
                    Work
                  </Link>
                </li>
                <li>
                  <Link href="/people" className="text-gray-700 hover:text-gray-900 font-medium text-lg">
                    People
                  </Link>
                </li>
                <li>
                  <Link href="/insight" className="text-gray-700 hover:text-gray-900 font-medium text-lg">
                    Insight
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="text-gray-700 hover:text-gray-900 font-medium text-lg">
                    Jobs Board
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-700 hover:text-gray-900 font-medium text-lg">
                    Get In Touch
                  </Link>
                </li>
              </ul>

              {/* Social Icons - Cyan background */}
              <ul className="flex gap-3 social-icons">
                <li className="bg-cyan-400">
                  <Link
                    href="https://www.instagram.com/engagemeuae/"
                    target="_blank"
                    className="flex items-center justify-center w-10 h-10"
                  >
                    <i className="fa fa-instagram text-white" aria-hidden="true"></i>
                    <span className="sr-only">Follow EngageMe on Instagram</span>
                  </Link>
                </li>
                <li className="bg-cyan-400">
                  <Link
                    href="https://www.facebook.com/Engage-Me"
                    target="_blank"
                    className="flex items-center justify-center w-10 h-10"
                  >
                    <i className="fa fa-facebook text-white" aria-hidden="true"></i>
                    <span className="sr-only">Follow EngageMe on Facebook</span>
                  </Link>
                </li>
              </ul>

              {/* Phone Number */}
              <p className="hidden md:block text-gray-700 font-medium">
                <a href="tel:+97145856845">+971 4 585 6845</a>
              </p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
