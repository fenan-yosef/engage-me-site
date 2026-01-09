"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import Image from "next/image"

export default function InsightPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Insight intro */}
      <section className="bg-white pt-10">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="pl-10 flex flex-col justify-left">
              <h1
                className="section-title text-5xl md:text-8xl font-regular mb-8"
                style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
              >
                <div>insight</div>
              </h1>

              <p className="all_para_size text-gray-600 text-base mb-8 leading-relaxed max-w-xl">
                Welcome to INSIGHT our bespoke reporting tool developed with your KPI&apos;s at the forefront of every
                project.
              </p>

              <p className="all_para_size text-gray-600 text-base mb-8 leading-relaxed max-w-xl">
                No one is closer to your consumer than our staff on-the-ground. Their feedback provides insights that
                can add value to your campaign and allow us to make changes throughout to ensure we meet your key
                objectives.
              </p>
            </div>

            <div className="content_side_img relative flex items-start justify-end md:translate-x-16 md:-translate-y-8 w-full">
              <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl relative">
                <div className="relative w-full overflow-hidden bg-gray-200 h-[22rem] sm:h-[26rem] md:h-[30rem] lg:h-[34rem] shadow-lg">
                  <Image
                    src="/driving-results.jpg"
                    alt="Insight reporting"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff incentives */}
      <section className="bg-white pb-20">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="content_side_img relative flex items-center justify-center w-full">
              <div className="relative w-full h-[22rem] sm:h-[26rem] md:h-[30rem] lg:h-[34rem] bg-gray-200 overflow-hidden">
                <Image
                  src="/carousel-image-1.jpg"
                  alt="Staff incentives"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="comn_img_side_txt flex flex-col justify-center insigh_last">
              <h2
                className="section-title text-5xl md:text-8xl font-regular mb-8"
                style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
              >
                <div>staff incentives</div>
              </h2>

              <p className="all_para_size text-gray-600 text-base mb-6 leading-relaxed">
                A key tactic that we recommend to clients, for target driven campaigns, is incentives. We are
                experienced to develop programs that will motivate and encourage staff to hit targets.
              </p>

              <p className="all_para_size text-gray-600 text-base leading-relaxed">
                Incentives are tracked regularly and we adapt throughout the campaign to ensure we hit the client
                objective and provide ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  )
}
