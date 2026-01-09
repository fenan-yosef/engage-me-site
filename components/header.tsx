"use client"


import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname() || "/"
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  const navLinkClassName = "font-medium text-lg text-gray-700 hover:text-gray-900"
  return (
    <header className="header py-6 bg-white border-b border-gray-200">
      <nav className="f-navbar f-navbar-attached">
        <div className="f-padding-left f-padding-right">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="f-navbar-brand flex-shrink-0 pl-6 pr-4 border-r border-gray-200">
              <span className="sr-only">go to homepage</span>
              <Image
                src="/engage-me-logo.png"
                alt="engage me"
                width={150}
                height={50}
                style={{ height: "50px", width: "auto" }}
              />
            </Link>

            {/* Navigation and right elements */}
            <div className="f-navbar-flip flex items-center justify-end gap-6">
              {/* Hamburger for mobile */}
              <button
                className="lg:hidden flex items-center px-3 py-2 border rounded text-cyan-500 border-cyan-400"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation menu"
              >
                <i className="fa fa-bars text-2xl"></i>
              </button>
              {/* Desktop Navigation */}
              <ul className={`hidden lg:flex f-navbar-nav gap-8`}>
                <li>
                  <Link
                    href="/"
                    className={navLinkClassName}
                    aria-current={isActive("/") ? "page" : undefined}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work"
                    className={navLinkClassName}
                    aria-current={isActive("/work") ? "page" : undefined}
                  >
                    Work
                  </Link>
                </li>
                <li>
                  <Link
                    href="/people"
          			className={navLinkClassName}
                    aria-current={isActive("/people") ? "page" : undefined}
                  >
                    People
                  </Link>
                </li>
                <li>
                  <Link
                    href="/insight"
                    className={navLinkClassName}
                    aria-current={isActive("/insight") ? "page" : undefined}
                  >
                    Insight
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobs"
                    className={navLinkClassName}
                    aria-current={isActive("/jobs") ? "page" : undefined}
                  >
                    Jobs Board
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className={navLinkClassName}
                    aria-current={isActive("/contact") ? "page" : undefined}
                  >
                    Get In Touch
                  </Link>
                </li>
              </ul>

              {/* Mobile Navigation Drawer */}
              <ul
                className={`${menuOpen ? "flex" : "hidden"} f-navbar-nav flex-col absolute top-16 right-4 bg-white shadow-lg rounded-lg p-6 gap-4 z-50 lg:hidden`}
                style={{ minWidth: 180 }}
              >
                <li>
                  <Link
                    href="/"
                    className={navLinkClassName}
                    aria-current={isActive("/") ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work"
                    className={navLinkClassName}
                    aria-current={isActive("/work") ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    Work
                  </Link>
                </li>
                <li>
                  <Link
                    href="/people"
                    className={navLinkClassName}
                    aria-current={isActive("/people") ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    People
                  </Link>
                </li>
                <li>
                  <Link
                    href="/insight"
                    className={navLinkClassName}
                    aria-current={isActive("/insight") ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    Insight
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobs"
                    className={navLinkClassName}
                    aria-current={isActive("/jobs") ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    Jobs Board
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className={navLinkClassName}
                    aria-current={isActive("/contact") ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    Get In Touch
                  </Link>
                </li>
              </ul>

              {/* separator before social icons */}
              <span className="hidden lg:block mx-3 h-6 border-l border-gray-200" aria-hidden="true"></span>

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

              {/* separator after social icons */}
              <span className="hidden lg:block mx-3 h-6 border-l border-gray-200" aria-hidden="true"></span>

              {/* Phone Number */}
              <p className="hidden md:block text-gray-700 header-phone pr-4">
                <a href="tel:+97145856845">+971 4 585 6845</a>
              </p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
