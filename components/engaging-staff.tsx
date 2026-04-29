"use client"

import Link from "next/link"
import Image from "next/image"

export default function EngagingStaff({
  engagingHeading = "engaging staff",
  engagingP1 = "We believe the staff hired to represent your brand on-the-ground, will make or break your project.",
  engagingP2 = "Getting to know our staff, how they converse, their experience and even their interests helps us to match the right staff to your requirements.",
  engagingButtonLabel = "FIND OUT MORE",
  staffGridUrls = Array.from({ length: 9 }, (_, i) => `/staff-${i + 1}.jpg?height=200&width=200&query=staff member ${i + 1}`),

  insightHeading = "Driving Results",
  insightP1 = "With our bespoke reporting tool INSIGHT, clients can see results, feedback, pictures and videos throughout the duration of the campaign.",
  insightP2 = "This allows us to evolve and adapt throughout each project in order to get the desired results.",
  insightButtonLabel = "FIND OUT MORE",
  insightImageUrl = "/driving-results.jpg",
}: {
  engagingHeading?: string
  engagingP1?: string
  engagingP2?: string
  engagingButtonLabel?: string
  staffGridUrls?: string[]
  insightHeading?: string
  insightP1?: string
  insightP2?: string
  insightButtonLabel?: string
  insightImageUrl?: string
}) {

  return (
    <section className="bg-white py-0">
      <div className="mx-auto">
        {/* Engaging Staff Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch md:min-h-[42vw]">
          {/* Left side - Staff grid */}
          <div className="image-grid h-full">
            <div className="grid h-full grid-cols-3 grid-rows-3 gap-px">
              {Array.from({ length: 9 }, (_, i) => staffGridUrls[i] || "").map((src, i) => (
                <div
                  key={i}
                  className="relative h-full min-h-0 w-full bg-gray-300 overflow-hidden flex items-center justify-center"
                >
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Staff ${i + 1}`}
                    fill
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="comn_img_side_txt flex flex-col justify-center px-10 py-10 md:py-12">
            <h2
              className="section-title text-5xl md:text-8xl font-bold mb-8 pr-6"
              style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
            >
              <div>{engagingHeading}</div>
            </h2>

            <p className="all_para_size text-gray-600 text-base mb-6 leading-relaxed">
              {engagingP1}
            </p>

            <p className="all_para_size text-gray-600 text-base mb-8 leading-relaxed">
              {engagingP2}
            </p>

            <Link href="/people" className="btn-brand-leaf text-white w-fit">
              <span>{engagingButtonLabel}</span>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 translate-y-[1px]"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* INSIGHT Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch md:min-h-[42vw]">
          {/* Text content - order changes on mobile */}
          <div className="comn_img_side_txt order-2 md:order-1 insigh_last flex flex-col justify-center px-10 py-10 md:py-12">
              <h3
              className="section-title text-5xl md:text-8xl font-bold mb-6"
              style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
            >
              {insightHeading}
            </h3>

            <p className="all_para_size text-gray-600 text-base mb-6 leading-relaxed">
              {insightP1}
            </p>

            <p className="all_para_size text-gray-600 text-base mb-8 leading-relaxed">
              {insightP2}
            </p>

            <Link href="/insight" className="btn-brand-leaf text-white w-fit">
              <span>{insightButtonLabel}</span>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 translate-y-[1px]"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </Link>
          </div>

          {/* Image grid */}
          <div className="order-1 md:order-2 image-grid flex w-full">
            <div className="relative w-full h-full bg-gray-300 overflow-hidden md:min-h-[42vw]">
              <Image
                src={insightImageUrl}
                alt="Driving Results"
                fill
                unoptimized
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
