"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import Image from "next/image"
import Link from "next/link"
import { FormEvent } from "react"

type ContactCard = {
  name: string
  role: string
  phone: string
  img: string
}

type Option = { label: string; value: string }

type CheckOption = { label: string; value: string }

const contacts: ContactCard[] = [
  { name: "Clare Walsh", role: "Managing Partner", phone: "+971 50 375 7605", img: "/+971503757605.jpg" },
  { name: "Lisa Hadeed", role: "Managing Partner", phone: "+971 55 672 4500", img: "/+971556724500.jpg" },
  { name: "Katie Turner", role: "Business Director", phone: "+971 55 775 5080", img: "/+971557755080.jpg" },
  { name: "Angelo Sejas", role: "Project Manager", phone: "+971 52 500 3840", img: "/+971525003840.jpg" },
  { name: "Kareen Bared", role: "Business Support", phone: "+971 50 624 0688", img: "/+971506240688.jpg" },
  { name: "Engage Me", role: "Booking Manager", phone: "+971 54 573 0414", img: "/+971545730414.jpg" },
  { name: "Engage Me", role: "General Enquiries", phone: "+971 56 988 3530", img: "/+971569883530.jpg" },
]

const genders: Option[] = [
  { label: "Female", value: "female" },
  { label: "Male", value: "male" },
]

const footSizes: Option[] = [
  { label: "EU 36", value: "36" },
  { label: "EU 37", value: "37" },
  { label: "EU 38", value: "38" },
  { label: "EU 39", value: "39" },
  { label: "EU 40", value: "40" },
  { label: "EU 41", value: "41" },
  { label: "EU 42", value: "42" },
  { label: "EU 43", value: "43" },
]

const visaTypes: Option[] = [
  { label: "Tourist Visa", value: "tourist" },
  { label: "Employment Visa", value: "employment" },
  { label: "Freelance Visa", value: "freelance" },
  { label: "Student Visa", value: "student" },
  { label: "Other", value: "other" },
]

const availability: CheckOption[] = [
  { label: "Weekends (Saturday/Sunday)", value: "weekends" },
  { label: "Weekdays (Monday to Friday)", value: "weekdays" },
  { label: "Nights (6pm to 6am)", value: "nights" },
  { label: "Day (6am to 6pm)", value: "day" },
]

const jobTypes: CheckOption[] = [
  { label: "Actor", value: "actor" },
  { label: "Bar/Wait Staff", value: "bar-wait" },
  { label: "Bartender", value: "bartender" },
  { label: "Brand Ambassador", value: "brand-ambassador" },
  { label: "Choreographer", value: "choreographer" },
  { label: "DJ / Professional", value: "dj" },
  { label: "Event Promoter", value: "event-promoter" },
  { label: "Host/Hostess", value: "hostess" },
  { label: "In-store Promoter", value: "instore-promoter" },
  { label: "Make Up Artist", value: "mua" },
  { label: "MC / Professional", value: "mc" },
  { label: "Model", value: "model" },
  { label: "Photographer", value: "photographer" },
  { label: "Promoter", value: "promoter" },
  { label: "Registration Desk", value: "registration" },
  { label: "Retail Model", value: "retail-model" },
  { label: "Sales", value: "sales" },
  { label: "Social Media Model", value: "social-model" },
  { label: "Videographer", value: "videographer" },
  { label: "VIP Access", value: "vip" },
]

const languages: Option[] = [
  { label: "English", value: "english" },
  { label: "Arabic", value: "arabic" },
  { label: "French", value: "french" },
  { label: "Spanish", value: "spanish" },
  { label: "Hindi/Urdu", value: "hindi" },
  { label: "Russian", value: "russian" },
]

export default function ApplyPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert("Application submitted (demo). Replace with real submission.")
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <div className="relative w-full h-[70vh] min-h-[520px] bg-gray-200 overflow-hidden">
        <Image
          src="/group-pic.jpg"
          alt="Application form hero"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
        <div className="absolute top-16 left-6 sm:left-10 text-white drop-shadow-lg">
          <p className="text-3xl sm:text-4xl md:text-5xl font-light">application</p>
          <p className="text-3xl sm:text-4xl md:text-5xl font-light">form</p>
        </div>
      </div>

      {/* Contacts */}
      <section className="bg-white px-6 py-14">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-xl font-semibold text-[#fe57c4]">Engage Me Contacts</h2>
            <p className="text-sm text-gray-600 mt-2">Scan the QR or tap a number to save the contact.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {contacts.map((contact) => (
              <div key={contact.phone} className="flex flex-col items-center gap-3 text-center border border-gray-200 p-4 shadow-sm">
                <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                  <Image src={contact.img} alt={contact.name} fill className="object-contain" sizes="100vw" />
                </div>
                <div className="text-sm font-semibold text-gray-900 leading-tight">{contact.name}</div>
                <div className="text-xs text-gray-600">{contact.role}</div>
                <Link href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="text-xs text-[#fe57c4] font-semibold">
                  {contact.phone}
                </Link>
                <Link
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="mt-1 inline-flex items-center gap-2 px-3 py-1.5 bg-[#3AFCAD] text-white text-xs font-semibold rounded shadow hover:bg-[#2fd1a0] transition border border-[#2fd1a0] focus:outline-none focus:ring-2 focus:ring-[#fe57c4] focus:ring-offset-2"
                  style={{ textDecoration: 'none' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="h-4 w-4" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5v10m5-5H5" /></svg>
                  Save Contact
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#f3f8ff] border border-[#cde7ff] p-4 text-[13px] text-gray-700 mb-8">
            Make sure you have your profile picture ready before you complete the application. You cannot submit without uploading your picture.
          </div>

          <form onSubmit={handleSubmit} className="space-y-10 text-sm text-gray-800">
            {/* Basic info */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900">Personal Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">First Name</span>
                  <input className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" required />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Last Name</span>
                  <input className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" required />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Mobile Number</span>
                  <input className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" placeholder="+971" />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">WhatsApp Number</span>
                  <input className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" placeholder="+971" />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Email</span>
                  <input type="email" className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" required />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Password</span>
                  <input type="password" className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Nationality</span>
                  <input className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Languages</span>
                  <select multiple className="border border-gray-300 px-3 py-2 min-h-[96px] focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]">
                    {languages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Date of Birth</span>
                  <input type="date" className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Gender</span>
                  <select className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]">
                    {genders.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            {/* Measurements */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900">Measurements</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {["Height (cm)", "Weight (kg)", "Dress Size (UK)", "Bust/Chest (in)", "Waist (in)", "Hips (in)", "Shirt Size (in)", "T-Shirt Size", "Shoe Size (EU)", "Hair Length", "Hair Color", "Eye Color"].map((label) => (
                  <label key={label} className="flex flex-col gap-1">
                    <span className="text-xs text-gray-600">{label}</span>
                    {label === "Shoe Size (EU)" ? (
                      <select className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]">
                        {footSizes.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Visa and location */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900">Visa and Location</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Type of Visa</span>
                  <select className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]">
                    {visaTypes.map((v) => (
                      <option key={v.value} value={v.value}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">City / Country</span>
                  <input className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" />
                </label>
                <label className="flex flex-col gap-1 sm:col-span-2">
                  <span className="text-xs text-gray-600">Do you have any visible tattoos or piercings? Please describe them.</span>
                  <textarea rows={3} className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" />
                </label>
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900">Availability</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availability.map((slot) => (
                  <label key={slot.value} className="inline-flex items-center gap-2 text-sm text-gray-800">
                    <input type="checkbox" className="accent-[#3AFCAD]" />
                    {slot.label}
                  </label>
                ))}
              </div>
              <label className="flex flex-col gap-1">
                <span className="text-xs text-gray-600">Are there areas you do not want to be offered jobs in?</span>
                <textarea rows={3} className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" />
              </label>
            </div>

            {/* Roles */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900">What type of work are you looking for?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {jobTypes.map((job) => (
                  <label key={job.value} className="inline-flex items-center gap-2 text-sm text-gray-800">
                    <input type="checkbox" className="accent-[#3AFCAD]" />
                    {job.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Social media */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900">Social & Portfolio</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Instagram</span>
                  <input className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" placeholder="@username" />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Facebook</span>
                  <input className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" />
                </label>
                <label className="flex flex-col gap-1 sm:col-span-2">
                  <span className="text-xs text-gray-600">Upload your profile picture (placeholder)</span>
                  <input type="file" className="border border-gray-300 px-3 py-2" />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="bg-[#fe57c4] text-white px-6 py-3 text-sm font-semibold tracking-wide shadow-md hover:bg-[#e44dad] transition"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  )
}
