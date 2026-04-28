import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import Link from "next/link"
import { getPage, getAllWorkItems } from "@/lib/cms-db"
import { extractWorkContent, type WorkItem } from "@/lib/cms/work-content"

export const dynamic = "force-dynamic"

const DEFAULT_WORK_ITEMS: WorkItem[] = [
  { title: "Airport activations", href: "/work/airport-activations" },
  { title: "Brand activations", href: "/work/brand-activations" },
  { title: "Corporate events", href: "/work/corporate-events" },
  { title: "Entertainers", href: "/work/entertainers" },
  { title: "Event staffing", href: "/work/event-staffing" },
  { title: "Exhibitions", href: "/work/exhibitions" },
  { title: "F & B staffing", href: "/work/f-b-staffing" },
  { title: "Hosts & hostesses", href: "/work/hosts-hostesses" },
  { title: "In-store promoters", href: "/work/in-store-promoters" },
  { title: "Lead generation", href: "/work/lead-generation" },
  { title: "Registration staff", href: "/work/registration-staff" },
  { title: "Retail support", href: "/work/retail-support" },
  { title: "Roadshows", href: "/work/roadshows" },
  { title: "Mall activations", href: "/work/mall-activations" },
  { title: "Models", href: "/work/models" },
  { title: "Social media content", href: "/work/social-media-content" },
  { title: "Sporting events", href: "/work/sporting-events" },
  { title: "Trade events", href: "/work/trade-events" },
  { title: "Themed promoters", href: "/work/themed-promoters" },
  { title: "Virtual promoters", href: "/work/virtual-promoters" }
]

export default async function WorkPage() {
  const page = await getPage("work").catch(() => null)
  const content = extractWorkContent(page, DEFAULT_WORK_ITEMS)
  
  const dbWorkItems = await getAllWorkItems().catch(() => [])
  const workItemsFromDb = dbWorkItems.map((item) => ({
    title: item.title,
    href: `/work/${item.slug}`
  }))

  const displayItems = workItemsFromDb.length > 0 ? workItemsFromDb : content.items

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="py-12 px-4 bg-[#212529]">
        <div className="max-w-7xl mx-auto" style={{ fontFamily: "run, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}>
          <style>{`
            @font-face {
              font-family: 'run';
              src: url('/fonts/run.ttf') format('truetype');
              font-display: swap;
            }
          `}</style>

          <h1
            className="section-title text-5xl md:text-8xl font-bold mb-8"
            style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
          >
            {content.heading}
          </h1>
          <p className="text-gray-300 text-lg mb-8">{content.intro}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-12">
            {displayItems.map((item) => (
              <div key={item.href}>
                <Link href={item.href} className="block text-white no-underline">
                  <span className="block text-3xl md:text-4xl lg:text-5xl leading-tight" style={{ fontFamily: 'run, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
                    {item.title}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  )
}
