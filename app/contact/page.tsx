"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import PhoneInput, { isValidPhoneNumber, isPossiblePhoneNumber } from 'react-phone-number-input'



export default function ContactPage() {
  const [phoneValue, setPhoneValue] = useState<string | undefined>(undefined)
  const isPhonePossible = (val?: string) => {
    if (!val) return true
    try {
      return isPossiblePhoneNumber(val)
    } catch {
      const digits = (val.match(/\d/g) || []).length
      return digits >= 7 && digits <= 15
    }
  }
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

            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault()
              const form = e.currentTarget as HTMLFormElement
              const phoneEl = form.querySelector('input[name="phone"]') as HTMLInputElement | null
              if (phoneValue && !isValidPhoneNumber(phoneValue)) {
                alert('Please enter a valid phone number')
                return
              }
              if (phoneEl && phoneEl.dataset.dial && !phoneEl.value.trim().startsWith('+')) {
                phoneEl.value = `${phoneEl.dataset.dial} ${phoneEl.value.trim()}`
              }
              form.submit()
            }}>
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Full Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter Full Name..."
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Phone</label>
                <div>
                  <PhoneInput
                    international
                    defaultCountry="AE"
                    value={phoneValue}
                    onChange={(val: string | undefined) => {
                      if (!val || isPhonePossible(val)) setPhoneValue(val)
                    }}
                    countrySelectProps={{ unicodeFlags: true }}
                    className="w-full"
                  />
                  <input type="hidden" name="phone" value={phoneValue || ''} />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Enquiry Type</label>
                <select name="enquiryType" className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]">
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
                  name="description"
                  rows={4}
                  placeholder="Enquiry description here..."
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">How did you hear about us?</label>
                <select name="heardAbout" className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]">
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
                className="btn-brand-leaf text-white w-fit mt-2"
                style={{ border: 'none', cursor: 'pointer' }}
              >
                <span>SEND</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 translate-y-[1px]"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
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
              <Link
                href="/jobs"
                className="btn-brand-leaf text-white w-fit"
              >
                <span>APPLY HERE</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 translate-y-[1px]"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </Link>
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
