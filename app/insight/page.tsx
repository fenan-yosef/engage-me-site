import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import Image from "next/image"
import { getPage } from "@/lib/cms-db"
import { extractInsightContent } from "@/lib/cms/insight-content"

export default async function InsightPage() {
  const page = await getPage("insight").catch(() => null)
  const content = extractInsightContent(page)

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Insight intro */}
      <section className="bg-white py-0">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch md:min-h-[42vw]">
            <div className="flex flex-col justify-center px-10 py-10 md:py-12 insight_in_1">
              <h1
                className="section-title text-5xl md:text-8xl font-regular mb-8"
                style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
              >
                <div>{content.intro.heading}</div>
              </h1>

              <p className="all_para_size text-gray-600 text-base mb-8 leading-relaxed max-w-xl">
                {content.intro.p1}
              </p>

              <p className="all_para_size text-gray-600 text-base mb-8 leading-relaxed max-w-xl">
                {content.intro.p2}
              </p>
            </div>

            <div className="content_side_img relative flex w-full insight_in_2">
              <div className="relative w-full h-full min-h-[22rem] md:min-h-[42vw] overflow-hidden bg-gray-200">
                <Image
                  src={content.intro.imageUrl}
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
      </section>

      {/* Staff incentives */}
      <section className="bg-white py-0">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch md:min-h-[42vw]">
            <div className="content_side_img relative flex w-full insight_in_3 order-2 md:order-1">
              <div className="relative w-full h-full min-h-[22rem] md:min-h-[42vw] bg-gray-200 overflow-hidden">
                <Image
                  src={content.incentives.imageUrl}
                  alt="Staff incentives"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="comn_img_side_txt flex flex-col justify-center px-10 py-10 md:py-12 insight_in_4 order-1 md:order-2">
              <h2
                className="section-title text-5xl md:text-8xl font-regular mb-8"
                style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
              >
                <div>{content.incentives.heading}</div>
              </h2>

              <p className="all_para_size text-gray-600 text-base mb-6 leading-relaxed">
                {content.incentives.p1}
              </p>

              <p className="all_para_size text-gray-600 text-base leading-relaxed">
                {content.incentives.p2}
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
