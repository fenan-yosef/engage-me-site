"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import Image from "next/image"
import Link from "next/link"
import { useState, FormEvent } from "react"
import PhoneInput, { isValidPhoneNumber, isPossiblePhoneNumber } from 'react-phone-number-input'

export default function ApplyStartPage() {
  const [jobRef, setJobRef] = useState("MOD/FE")
  
  const [phoneValue, setPhoneValue] = useState<string | undefined>(undefined)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // validate phone
    if (phoneValue && !isValidPhoneNumber(phoneValue)) {
      alert('Please enter a valid phone number.')
      return
    }
    // Phone value is handled by PhoneInput and submitted via hidden input
    alert("Submitted. On production, submit to your backend.")
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image left */}
          <div className="relative w-full h-[360px] sm:h-[440px] md:h-[520px] overflow-hidden bg-gray-100">
            <Image
              src="/yellow-group-pic.jpg"
              alt="Apply with Engage Me"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Content right */}
          <div className="flex flex-col gap-5 text-gray-800">
            <h1
              className="text-5xl sm:text-6xl font-bold leading-tight"
              style={{ color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
            >
              apply
            </h1>

            <p className="text-base leading-relaxed">
              Before you apply for this job you must ensure you are registered with us and know your staff number. Your staff number is on the Welcome Email you received from
              <span className="font-semibold"> joinme@engage-me.me</span>.
            </p>

            <p className="text-base leading-relaxed">
              If you need to register with us please click the link to apply. If you know your staff number please complete the form below.
            </p>

            <Link
              href="https://engage-me.me/staffapplication/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start bg-[#3AFCAD] text-white text-sm font-semibold px-4 py-2 shadow-sm hover:bg-[#35e6b3] transition rounded-full"
            >
              APPLY HERE
              <span aria-hidden="true">▶</span>
            </Link>

            <p className="text-base leading-relaxed">
              Please complete the below form to apply for this job. If you are successful in your application we will contact you, you do not need to follow up with us.
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <label className="flex flex-col gap-1">
                <span className="text-gray-700">Full Name</span>
                <input name="name" className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" required />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-gray-700">Staff Num.</span>
                <input name="staffnum" className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-gray-700">Email</span>
                <input name="email" type="email" className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" required />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-gray-700">Phone</span>
                <div>
                  <PhoneInput
                    international
                    defaultCountry="AE"
                    value={phoneValue}
                    onChange={(val: string | undefined) => {
                      try {
                        if (!val || isPossiblePhoneNumber(val)) setPhoneValue(val)
                      } catch {
                        const digits = (val || '').replace(/\D/g, '')
                        if (!val || (digits.length >= 7 && digits.length <= 15)) setPhoneValue(val)
                      }
                    }}
                    countrySelectProps={{ unicodeFlags: true }}
                    className="w-full"
                  />
                  <input type="hidden" name="phone" value={phoneValue || ''} />
                </div>
              </label>

              <label className="flex flex-col gap-1 sm:col-span-2">
                <span className="text-gray-700">Job Ref.</span>
                <input
                  name="jobRef"
                  value={jobRef}
                  onChange={(e) => setJobRef(e.target.value)}
                  className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]"
                />
              </label>

              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#3AFCAD] text-white font-semibold px-5 py-2 shadow-sm hover:bg-[#35e6b3] transition rounded-full"
                >
                  SUBMIT
                  <span aria-hidden="true">▶</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  )
}
