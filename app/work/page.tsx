"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import Link from "next/link"

const WORK_ITEMS = [
  { title: "Airport activations", href: "/work/airport-activations_work" },
  { title: "Brand activations", href: "/work/brand-activations_work" },
  { title: "Corporate events", href: "/work/corporate-events_work" },
  { title: "Entertainers", href: "/work/entertainers_work" },
  { title: "Event staffing", href: "/work/event-staffing_work" },
  { title: "Exhibitions", href: "/work/exhibitions_work" },
  { title: "F & B staffing", href: "/work/f-b-staffing_work" },
  { title: "Hosts & hostesses", href: "/work/hosts-hostesses_work" },
  { title: "In-store promoters", href: "/work/in-store-promoters_work" },
  { title: "Lead generation", href: "/work/lead-generation_work" },
  { title: "Registration staff", href: "/work/registration-staff_work" },
  { title: "Retail support", href: "/work/retail-support_work" },
  { title: "Roadshows", href: "/work/roadshows_work" },
  { title: "Mall activations", href: "/work/mall-activations_work" },
  { title: "Models", href: "/work/models_work" },
  { title: "Social media content", href: "/work/social-media-content_work" },
  { title: "Sporting events", href: "/work/sporting-events_work" },
  { title: "Trade events", href: "/work/trade-events_work" },
  { title: "Themed promoters", href: "/work/themed-promoters_work" },
  { title: "Virtual promoters", href: "/work/virtual-promoters_work" }
]

export default function WorkPage() {
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

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            <span className="text-cyan-400">Our</span> Work
          </h1>
          <p className="text-gray-300 text-lg mb-8">A selection of the projects and staffing services we deliver.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-12">
            {WORK_ITEMS.map((item) => (
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
