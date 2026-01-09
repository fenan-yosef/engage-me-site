"use client"

import Image from "next/image"

export default function EngagingStaff() {
  const staffImages = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    alt: `Staff ${i + 1}`,
  }))

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Engaging Staff Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left side - Staff grid */}
          <div className="image-grid">
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 9 }, (_, i) => (
                <div
                  key={i}
                  className="relative w-full aspect-square bg-gray-300 overflow-hidden flex items-center justify-center"
                >
                  <Image
                    src={`/staff-member-.jpg?height=200&width=200&query=staff member ${i + 1}`}
                    alt={`Staff ${i + 1}`}
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="comn_img_side_txt flex flex-col justify-center">
            <h2 className="section-title text-5xl md:text-6xl font-bold mb-8 text-cyan-400" style={{ lineHeight: "1" }}>
              <div>engaging</div>
              <div>staff</div>
            </h2>

            <p className="all_para_size text-gray-600 text-base mb-6 leading-relaxed">
              We believe the staff hired to represent your brand on-the-ground, will make or break your project.
            </p>

            <p className="all_para_size text-gray-600 text-base mb-8 leading-relaxed">
              Getting to know our staff, how they converse, their experience and even their interests helps us to match
              the right staff to your requirements.
            </p>

            <a href="/people" className="browser_btn footer_btn text-white w-fit">
              FIND OUT MORE →
            </a>
          </div>
        </div>

        {/* INSIGHT Section */}
        <div className="mt-20 pt-20 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text content - order changes on mobile */}
          <div className="comn_img_side_txt order-2 md:order-1 insigh_last">
            <h3 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">INSIGHT</h3>

            <p className="all_para_size text-gray-600 text-base mb-6 leading-relaxed">
              With our bespoke reporting tool INSIGHT, clients can see results, feedback, pictures and videos throughout
              the duration of the campaign.
            </p>

            <p className="all_para_size text-gray-600 text-base mb-8 leading-relaxed">
              This allows us to evolve and adapt throughout each project in order to get the desired results.
            </p>

            <a href="/insight" className="browser_btn footer_btn text-white w-fit">
              FIND OUT MORE →
            </a>
          </div>

          {/* Image grid */}
          <div className="order-1 md:order-2 image-grid">
            <div className="grid grid-cols-3 gap-4">
              {staffImages.map((item) => (
                <div
                  key={item.id}
                  className="relative w-full aspect-square bg-gray-300 overflow-hidden flex items-center justify-center"
                >
                  <Image
                    src={`/insight-.jpg?height=200&width=200&query=insight ${item.id}`}
                    alt={`Insight ${item.id}`}
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
