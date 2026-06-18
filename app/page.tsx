import Header from "@/components/header"
import Hero from "@/components/hero"
import BringingBrandsToLife from "@/components/bringing-brands-to-life"
import EngagingStaff from "@/components/engaging-staff"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import { getPage } from "@/lib/cms-db"
import { extractHomeContent } from "@/lib/cms/home-content"

export const dynamic = "force-dynamic"

export default async function Home() {
  const page = await getPage("home").catch(() => null)
  const content = extractHomeContent(page)

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero bgImageUrl={content.hero.bgUrl} leftText={content.hero.leftText} logoUrl={content.hero.logoUrl} />
      <BringingBrandsToLife
        heading={content.bringing.heading}
        body={content.bringing.body}
        buttonLabel={content.bringing.buttonLabel}
        carouselImages={content.bringing.carouselUrls.map((src, idx) => ({ id: String(idx + 1), src, alt: `Carousel ${idx + 1}` }))}
      />
      <EngagingStaff
        engagingHeading={content.engaging.heading}
        engagingP1={content.engaging.p1}
        engagingP2={content.engaging.p2}
        engagingButtonLabel={content.engaging.buttonLabel}
        staffGridUrls={content.engaging.staffGridUrls}
        insightHeading={content.insight.heading}
        insightP1={content.insight.p1}
        insightP2={content.insight.p2}
        insightButtonLabel={content.insight.buttonLabel}
        insightImageUrl={content.insight.imageUrl}
      />
      <Footer />
      <FloatingButtons />
    </main>
  )
}
