import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import Link from "next/link"
import { getPage, getAllWorkItems } from "@/lib/cms-db"
import { extractWorkContent, type WorkItem } from "@/lib/cms/work-content"

export const dynamic = "force-dynamic"

const FALLBACK_THUMBNAILS: Record<string, string> = {
  "brand-activations": "/images/work-categories/brand-activations.jpg",
  "corporate-events": "/images/work-categories/corporate-events.jpg",
  "entertainers": "/images/work-categories/entertainers.jpg",
  "event-staffing": "/images/work-categories/event-staffing.jpg",
  "exhibitions": "/images/work-categories/exhibitions.jpg",
  "f-b-staffing": "/images/work-categories/f-b-staffing.jpg",
  "hosts-hostesses": "/images/work-categories/hosts-hostesses.jpg",
  "in-store-promoters": "/images/work-categories/in-store-promoters.jpg",
  "lead-generation": "/images/work-categories/lead-generation.jpg",
  "mall-activations": "/images/work-categories/mall-activations.jpg",
  "models": "/images/work-categories/models.jpg",
  "sporting-events": "/images/work-categories/sporting-events.jpg",
}

const FALLBACK_ITEMS = Object.entries(FALLBACK_THUMBNAILS).map(([slug, image]): WorkItem & { image: string } => {
  const title = slug
    .split("-")
    .map((w) => {
      if (w === "f") return "F"
      if (w === "b") return "B"
      return w.charAt(0).toUpperCase() + w.slice(1)
    })
    .join(" ")
  return { title, href: `/work/${slug}`, image }
})

export default async function WorkPage() {
  const page = await getPage("work").catch(() => null)
  const content = extractWorkContent(page, FALLBACK_ITEMS)

  const dbWorkItems = await getAllWorkItems().catch(() => [])

  const displayItems =
    dbWorkItems.length === 0
      ? FALLBACK_ITEMS
      : dbWorkItems
          .filter((item) => item.thumbnailUrl != null || FALLBACK_THUMBNAILS[item.slug] != null)
          .map((item) => ({
            title: item.title,
            href: `/work/${item.slug}`,
            image: item.thumbnailUrl || FALLBACK_THUMBNAILS[item.slug] || "",
          }))

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="bg-[#212529] px-4 md:px-8 py-6">
        <div className="max-w-[918px] mx-auto">
          <style>{`
            @font-face {
              font-family: 'run';
              src: url('/fonts/run.ttf') format('truetype');
              font-display: swap;
            }
          `}</style>

          <h1
            className="text-4xl md:text-5xl font-bold"
            style={{ lineHeight: "1", color: "#3AFCAD", fontFamily: "Run, var(--font-sans)" }}
          >
            {content.heading}
          </h1>
          <p
            className="text-gray-300 text-lg mt-4"
            style={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 300 }}
          >
            {content.intro}
          </p>
        </div>
      </div>

      <div className="h-3 md:h-4" />

      <div className="bg-white max-w-[918px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px">
          {displayItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative block overflow-hidden aspect-[432/262] bg-gray-200"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span
                  className="text-white text-center px-2"
                  style={{
                    fontFamily: '"Run", sans-serif',
                    fontSize: "22px",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {item.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="h-3 md:h-4" />

      <div className="bg-[#212529] h-6" />

      <Footer />
      <FloatingButtons />
    </main>
  )
}
