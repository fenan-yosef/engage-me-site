"use client"

import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"

type Job = {
  title: string
  color: string
  fields: Array<{ label: string; value: string }>
}

const jobs: Job[] = [
  {
    title: "me/gp",
    color: "#ff57c4",
    fields: [
      { label: "Job Ref", value: "OC/MON" },
      { label: "Requirement", value: "Male or Female" },
      { label: "Role", value: "Stage Manager" },
      { label: "Location", value: "Dubai" },
      { label: "Date(s)", value: "30th August" },
      { label: "Timing", value: "9.00am to 5.00pm" },
    ],
  },
  {
    title: "hostess",
    color: "#ff70ff",
    fields: [
      { label: "Job Ref", value: "R7/Hostess" },
      { label: "Requirement", value: "Bubbly Western Female" },
      { label: "Role", value: "hostess" },
      { label: "Location", value: "Dubai" },
      { label: "Date(s)", value: "28th - 30th Nov" },
      { label: "Timing", value: "10am to 10pm" },
    ],
  },
  {
    title: "mc",
    color: "#5ffeff",
    fields: [
      { label: "Job Ref", value: "MC/JHU" },
      { label: "Requirement", value: "Male & Female MC" },
      { label: "Role", value: "MC" },
      { label: "Location", value: "Dubai" },
      { label: "Date(s)", value: "20th July" },
      { label: "Timing", value: "11am to 5pm" },
    ],
  },
  {
    title: "models",
    color: "#33fbad",
    fields: [
      { label: "Job Ref", value: "MOD/FE" },
      { label: "Requirement", value: "Male" },
      { label: "Role", value: "model" },
      { label: "Location", value: "Dubai" },
      { label: "Date(s)", value: "15th Aug" },
      { label: "Timing", value: "TBC" },
    ],
  },
  {
    title: "supervisor",
    color: "#fe215a",
    fields: [
      { label: "Job Ref", value: "R7/SUP" },
      { label: "Requirement", value: "Experienced Supervisors" },
      { label: "Role", value: "Supervisor" },
      { label: "Location", value: "Dubai" },
      { label: "Date(s)", value: "28th - 30th Nov" },
      { label: "Timing", value: "7am to 9pm" },
    ],
  },
  {
    title: "make up artist",
    color: "#fe5b7e",
    fields: [
      { label: "Job Ref", value: "EXP/MUA" },
      { label: "Requirement", value: "Experienced MUA" },
      { label: "Role", value: "make up artist" },
      { label: "Location", value: "Dubai" },
      { label: "Date(s)", value: "25th Sep" },
      { label: "Timing", value: "TBC" },
    ],
  },
  {
    title: "admin",
    color: "#9efb16",
    fields: [
      { label: "Job Ref", value: "EXP/ADM" },
      { label: "Requirement", value: "Experienced Admin support" },
      { label: "Role", value: "admin support" },
      { label: "Location", value: "Dubai" },
      { label: "Date(s)", value: "Aug to Dec" },
      { label: "Timing", value: "9am to 6pm" },
    ],
  },
  {
    title: "promoters",
    color: "#9efb16",
    fields: [
      { label: "Job Ref", value: "EXP/PR" },
      { label: "Requirement", value: "Asians" },
      { label: "Role", value: "Instore Promoter" },
      { label: "Location", value: "Dubai" },
      { label: "Date(s)", value: "26th - 31st August" },
      { label: "Timing", value: "4pm to 8pm" },
    ],
  },
  {
    title: "bar/wait staff",
    color: "#ff58c4",
    fields: [
      { label: "Job Ref", value: "EXP/BWS" },
      { label: "Requirement", value: "Experienced wait staff / bar/wait staff" },
      { label: "Location", value: "Dubai" },
      { label: "Date(s)", value: "August to September - Weekends only" },
      { label: "Timing", value: "6.00pm to 1.00am" },
    ],
  },
]

export default function JobsPage() {
  const [comingSoonOpen, setComingSoonOpen] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-white pt-10">
        <div className="mx-auto">
          <div className="px-6">
            <div className="relative w-full max-w-6xl mx-auto h-[240px] sm:h-[320px] md:h-[420px] bg-gray-200 overflow-hidden">
              <Image
                src="/carousel-image-1.jpg"
                alt="Engage Me jobs board"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1100px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="px-6 pb-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {jobs.map((job) => (
                  <div key={job.title} className="border border-gray-200 bg-white">
                    <div className="p-4">
                      <h3 className="text-sm font-semibold mb-3" style={{ color: job.color }}>
                        {job.title}
                      </h3>

                      <div className="space-y-1 text-[12px] leading-5 text-gray-700">
                        {job.fields.map((field) => (
                          <div key={field.label} className="flex gap-2">
                            <span className="font-semibold min-w-[86px]">{field.label}:</span>
                            <span>{field.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 text-white text-xs font-semibold tracking-wide flex items-center justify-between"
                      style={{ backgroundColor: job.color }}
                      onClick={() => {
                        setSelectedTitle(job.title)
                        setComingSoonOpen(true)
                      }}
                    >
                      <span>APPLY HERE</span>
                      <span aria-hidden="true">▶</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {comingSoonOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Coming soon"
          onClick={() => setComingSoonOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-[92vw] max-w-md bg-white shadow-lg border border-gray-200 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Coming soon</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedTitle ? `Applications for “${selectedTitle}” will be available soon.` : "Applications will be available soon."}
                </p>
              </div>

              <button
                type="button"
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setComingSoonOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-800 hover:bg-gray-50"
                onClick={() => setComingSoonOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <FloatingButtons />
    </main>
  )
}
