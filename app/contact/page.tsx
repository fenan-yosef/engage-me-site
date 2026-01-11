"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import Image from "next/image"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero image full viewport minus header */}
      <div className="relative w-full h-[calc(100vh-5.5rem)] min-h-[440px] bg-gray-200 overflow-hidden">
        <Image
          src="/yellow-group-pic.jpg"
          alt="Engage Me contact"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Contact + Join Us Section */}
      <section id="contact" className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-gray-200 gap-12">
          {/* Brief Us form */}
          <div className="flex flex-col gap-6">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight" style={{ color: "#3AFCAD" }}>
              brief us
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              If you would like to arrange to meet or you have a brief for us, please complete the contact form and we will be in touch shortly.
            </p>

            <form className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter Full Name..."
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Enquiry Type</label>
                <select className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]">
                  <option>-- Select Enquiry Type --</option>
                  <option>Brief</option>
                  <option>Meeting Request</option>
                  <option>General Inquiry</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Enquiry Description</label>
                <textarea
                  rows={4}
                  placeholder="Enquiry description here..."
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">How did you hear about us?</label>
                <select className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]">
                  <option>-- Select --</option>
                  <option>Referral</option>
                  <option>Social Media</option>
                  <option>Search</option>
                  <option>Event</option>
                  <option>Other</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 bg-[#3AFCAD] text-white font-semibold px-5 py-3 text-sm shadow-sm hover:bg-[#35e6b3] transition"
              >
                SEND
                <span aria-hidden="true">▶</span>
              </button>
            </form>
          </div>

          {/* Join Us / Contact info */}
          <div className="flex flex-col gap-6 md:pl-10">
            <div className="flex flex-col gap-3">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight" style={{ color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}>
                join us
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                If you are a freelancer and looking for work as a model, hostess, promoter, entertainer, photographer, videographer etc, click below to complete our online registration form to join our database.
              </p>
              <a
                href="/jobs"
                className="inline-flex items-center gap-2 bg-[#3AFCAD] text-white text-xs font-semibold px-4 py-2 w-fit shadow-sm hover:bg-[#35e6b3] transition"
              >
                APPLY HERE
                <span aria-hidden="true">▶</span>
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-4xl md:text-8xl font-bold leading-tight" style={{ color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}>
                  email us:
                </h3>
                <p className="text-gray-800 text-lg mt-1">hello@engage-me.me</p>
              </div>

              <div>
                <h3 className="text-4xl md:text-8xl font-bold leading-tight" style={{ color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}>
                  call us:
                </h3>
                <p className="text-gray-800 text-lg mt-1">+971 4 585 6845</p>
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
