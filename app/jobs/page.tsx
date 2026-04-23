import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import { getPage } from "@/lib/cms-db"
import { extractJobsContent, type JobsContent } from "@/lib/cms/jobs-content"

type Job = {
  title: string
  color: string
  fields: Array<{ label: string; value: string }>
}

const FALLBACK: JobsContent = {
  heroImageUrl: "/her-sec.jpg",
  applyButtonLabel: "APPLY HERE",
  jobs: [
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
      { label: "Role", value: "bar/wait staff" },
      { label: "Location", value: "Dubai" },
      { label: "Date(s)", value: "August to September - Weekends only" },
      { label: "Timing", value: "6.00pm to 1.00am" },
    ],
  },
]
}

export default async function JobsPage() {
  const page = await getPage("jobs").catch(() => null)
  const content = extractJobsContent(page, FALLBACK)

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Full viewport hero image */}
      <div className="relative w-full h-[calc(100vh-5.5rem)] min-h-[400px] bg-gray-200 overflow-hidden">
        <Image
          src={content.heroImageUrl}
          alt="Engage Me jobs board"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <section className="bg-white pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Jobs grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-0">
            {content.jobs.map((job: Job) => (
              <div key={job.title} className="border border-gray-200 bg-white">
                <div className="p-4">
                  <h3 className="text-sm font-semibold mb-3" style={{ color: job.color }}>
                    {job.title}
                  </h3>

                  <div className="space-y-1 text-[12px] leading-5 text-gray-700">
                    {job.fields.map((field) => (
                      <div key={field.label} className="flex gap-2">
                        <span className="font-semibold min-w-[92px]">{field.label}:</span>
                        <span>{field.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/apply/start"
                  className="w-full text-left px-4 py-2 text-white text-xs font-semibold tracking-wide flex items-center justify-between"
                  style={{ backgroundColor: job.color, borderTopLeftRadius: 16, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}
                  aria-label={`Apply for ${job.title}`}
                >
                  <span>{content.applyButtonLabel}</span>
                  <span aria-hidden="true">▶</span>
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
