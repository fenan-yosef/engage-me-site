"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import Image from "next/image"
import Link from "next/link"
import { FormEvent, useState } from "react"

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
  { label: "Residency", value: "residency" },
]

const jobTypes: CheckOption[] = [
  { label: "Actor", value: "actor" },
  { label: "Bar/Wait Staff", value: "bar-wait-staff" },
  { label: "Bartender", value: "bartender" },
  { label: "Character", value: "character" },
  { label: "Child Model (Under 18 years old)", value: "child-model-under-18-years-old" },
  { label: "Choreographer (Professional)", value: "choreographer-professional" },
  { label: "Dancer (Professional)", value: "dancer-professional" },
  { label: "DJ (Professional)", value: "dj-professional" },
  { label: "Driver", value: "driver" },
  { label: "Duty Free Promoter", value: "duty-free-promoter" },
  { label: "Entertainer (Professional)", value: "entertainer-professional" },
  { label: "Fashion Stylist (Professional)", value: "fashion-stylist-professional" },
  { label: "Hair Stylist (Professional)", value: "hair-stylist-professional" },
  { label: "Host", value: "host" },
  { label: "Hostess", value: "hostess" },
  { label: "In Store Promoter", value: "in-store-promoter" },
  { label: "iPad data/lead collection", value: "ipad-data-lead-collection" },
  { label: "Language Interpreter", value: "language-interpreter" },
  { label: "Make Up Artist (Professional)", value: "make-up-artist-professional" },
  { label: "MC – Amateur", value: "mc-amateur" },
  { label: "MC – Professional", value: "mc-professional" },
  { label: "Modelling", value: "modelling" },
  { label: "Photographer (Professional)", value: "photographer-professional" },
  { label: "Promoter", value: "promoter" },
  { label: "Prop Stylist (Professional)", value: "prop-stylist-professional" },
  { label: "Registration Desk", value: "registration-desk" },
  { label: "Runner", value: "runner" },
  { label: "Social Media Model", value: "social-media-model" },
  { label: "Security", value: "security" },
  { label: "Stylist (Professional)", value: "stylist-professional" },
  { label: "Supervisor", value: "supervisor" },
  { label: "Themed Promoter", value: "themed-promoter" },
  { label: "Ticketing", value: "ticketing" },
  { label: "Usher", value: "usher" },
  { label: "Videographer (Professional)", value: "videographer-professional" },
  { label: "VIP Areas", value: "vip-areas" },
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
  const [brands, setBrands] = useState<string[]>([''])
  const [events, setEvents] = useState<string[]>([''])
  const [supervisorEvents, setSupervisorEvents] = useState<string[]>([''])

  const addBrand = () => setBrands([...brands, ''])
  const removeBrand = (index: number) => setBrands(brands.filter((_, i) => i !== index))
  const updateBrand = (index: number, value: string) => setBrands(brands.map((b, i) => i === index ? value : b))

  const addEvent = () => setEvents([...events, ''])
  const removeEvent = (index: number) => setEvents(events.filter((_, i) => i !== index))
  const updateEvent = (index: number, value: string) => setEvents(events.map((e, i) => i === index ? value : e))

  const addSupervisorEvent = () => setSupervisorEvents([...supervisorEvents, ''])
  const removeSupervisorEvent = (index: number) => setSupervisorEvents(supervisorEvents.filter((_, i) => i !== index))
  const updateSupervisorEvent = (index: number, value: string) => setSupervisorEvents(supervisorEvents.map((e, i) => i === index ? value : e))

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
                  <span className="text-xs text-gray-600">Last Name Initial</span>
                  <input maxLength={1} placeholder="A" className="border border-gray-300 px-3 py-2 w-20 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" />
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
                  <select className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]">
                    {[
                      "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan",
                      "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi",
                      "Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo, Democratic Republic of the","Congo, Republic of the","Costa Rica","Cote d'Ivoire","Croatia","Cuba","Cyprus","Czech Republic",
                      "Denmark","Djibouti","Dominica","Dominican Republic",
                      "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia",
                      "Fiji","Finland","France",
                      "Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana",
                      "Haiti","Honduras","Hungary",
                      "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy",
                      "Jamaica","Japan","Jordan",
                      "Kazakhstan","Kenya","Kiribati","Korea, North","Korea, South","Kosovo","Kuwait","Kyrgyzstan",
                      "Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
                      "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar (Burma)",
                      "Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Macedonia","Norway",
                      "Oman",
                      "Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
                      "Qatar",
                      "Romania","Russia","Rwanda",
                      "Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria",
                      "Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
                      "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
                      "Vanuatu","Vatican City","Venezuela","Vietnam",
                      "Yemen",
                      "Zambia","Zimbabwe"
                    ].map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
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
                {/* Dress Size (UK - Females only) */}
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Dress Size (UK) <span className="text-red-500">*</span> (Females only)</span>
                  <select defaultValue="" className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]">
                    <option value="" disabled>Dress Size</option>
                    <option value="male">I&apos;m Male</option>
                    {[6,8,10,12,14,16].map(size => (
                      <option key={size} value={size}>{`UK-${size}`}</option>
                    ))}
                  </select>
                </label>
                {/* Hair Color */}
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Hair Color <span className="text-red-500">*</span></span>
                  <select className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]">
                    {["Black","Brown","Blonde","Red","Grey","White","Other"].map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </label>
                {/* Eye Color */}
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Eye Color <span className="text-red-500">*</span></span>
                  <select className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]">
                    {["Brown","Blue","Green","Hazel","Grey","Amber","Other"].map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </label>
                {/* Height (cm) */}
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Height (in cm)</span>
                  <input type="number" min={100} max={250} placeholder="170" className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" />
                </label>
                {/* Shirt Size (Inches) */}
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Shirt Size (Inches)</span>
                  <input type="number" min={28} max={48} placeholder="36" className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" />
                </label>
                {/* T-Shirt Size */}
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">T-Shirt Size</span>
                  <select className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]">
                    {['XS','S','M','L','XL','XXL'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
                {/* Waist Size (in inches) */}
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Waist Size (in inches)</span>
                  <input type="number" min={25} max={36} placeholder="30" className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" />
                </label>
                {/* Weight (kg) */}
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Weight (in kg)</span>
                  <input type="number" min={30} max={200} placeholder="60" className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" />
                </label>
                {/* Shoe Size (EUR) */}
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Shoe Size (in EUR)</span>
                  <select className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]">
                    {footSizes.map(f => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>
                </label>
                {/* Country and City */}
                <label className="flex flex-col gap-1 md:col-span-2">
                  <span className="text-xs text-gray-600">Select your Country and City <span className="text-red-500">*</span></span>
                  <div className="flex gap-2">
                    <select className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD] w-1/2">
                      {[
                        "United Arab Emirates",
                        "Saudi Arabia",
                        "Kuwait",
                        "Oman",
                        "Bahrain",
                        "Qatar"
                      ].map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    <input className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD] w-1/2" placeholder="City" />
                  </div>
                </label>
                {/* Religion */}
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Religion</span>
                  <input className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" />
                </label>
                {/* Type of Visa */}
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
                <div className="flex flex-col gap-2">
                  <div className="text-xs text-gray-600">Do you hold a labour card?</div>
                  <div className="flex items-center gap-4">
                    <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                      <input type="radio" name="labourCard" value="yes" className="accent-[#3AFCAD]" />
                      Yes
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                      <input type="radio" name="labourCard" value="no" className="accent-[#3AFCAD]" />
                      No
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-xs text-gray-600">Do you drive in UAE?</div>
                  <div className="flex items-center gap-4">
                    <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                      <input type="radio" name="driveInUae" value="yes" className="accent-[#3AFCAD]" />
                      Yes
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                      <input type="radio" name="driveInUae" value="no" className="accent-[#3AFCAD]" />
                      No
                    </label>
                  </div>
                </div>
                <label className="flex flex-col gap-1 sm:col-span-2">
                  <span className="text-xs text-gray-600 font-semibold">Do you have any visible tattoos or piercings?</span>
                  <div className="flex flex-col gap-1 mt-1">
                    <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                      <input type="radio" name="tattoos" value="no" className="accent-[#3AFCAD]" />
                      No
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                      <input type="radio" name="tattoos" value="not-visible" className="accent-[#3AFCAD]" />
                      Yes but they are NOT visible when wearing shorts and a t-shirt and hair is up (if female)
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                      <input type="radio" name="tattoos" value="visible" className="accent-[#3AFCAD]" />
                      Yes but they ARE visible when wearing shorts and a t-shirt and hair is up (if female)
                    </label>
                  </div>
                </label>
              </div>
            </div>

            {/* Availability */}
            {/* Q27: Areas you do NOT want to work in */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900">Are there areas you do not want to be offered jobs in?</h3>
              <span className="text-xs text-gray-600">(Please tick all areas you do NOT want to work in)</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                  <input type="checkbox" name="areasNo[]" value="na" className="accent-[#3AFCAD]" /> N/A
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                  <input type="checkbox" name="areasNo[]" value="nightclubs" className="accent-[#3AFCAD]" /> Nightclubs & bars
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                  <input type="checkbox" name="areasNo[]" value="serving-food" className="accent-[#3AFCAD]" /> Serving food or drinks
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                  <input type="checkbox" name="areasNo[]" value="cigarettes" className="accent-[#3AFCAD]" /> Cigarettes
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                  <input type="checkbox" name="areasNo[]" value="alcohol" className="accent-[#3AFCAD]" /> Alcohol
                </label>
              </div>
            </div>

            {/* Q28: Work time restrictions (checklist) */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900">Do you have restrictions in the times you can work?</h3>
              <span className="text-xs text-gray-600">(Please tick all timings you WOULD like to work)</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                  <input type="checkbox" name="workTimes[]" value="weekends" className="accent-[#3AFCAD]" /> Weekends (Saturday & Sunday)
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                  <input type="checkbox" name="workTimes[]" value="weekdays" className="accent-[#3AFCAD]" /> Week days (Monday to Friday)
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                  <input type="checkbox" name="workTimes[]" value="nights" className="accent-[#3AFCAD]" /> Nights (6pm to 4am)
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                  <input type="checkbox" name="workTimes[]" value="day" className="accent-[#3AFCAD]" /> Day (6am to 8pm)
                </label>
              </div>
            </div>

            {/* Q29: Rates happy to work for (checklist) */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900">What rates are you happy to work for?</h3>
              <span className="text-xs text-gray-600">(Please tick all rates you WOULD like be asked for)</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                  <input type="checkbox" name="rates[]" value="30-50" className="accent-[#3AFCAD]" /> 30 – 50AED
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                  <input type="checkbox" name="rates[]" value="50-80" className="accent-[#3AFCAD]" /> 50 – 80AED
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                  <input type="checkbox" name="rates[]" value="80-100" className="accent-[#3AFCAD]" /> 80 – 100AED
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                  <input type="checkbox" name="rates[]" value="100plus" className="accent-[#3AFCAD]" /> 100AED+
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                  <input type="checkbox" name="rates[]" value="all" className="accent-[#3AFCAD]" /> I would like to be sent all job offers regardless of rate
                </label>
              </div>
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
            {/* <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900">Social & Portfolio</h3> */}
              {/* Removed Instagram, Facebook, and Upload image fields as requested */}
              {/* <div />
            </div> */}

            {/* Q31: Additional skills */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900">Do you have additional skills?</h3>
              <span className="text-xs text-gray-600">List all skills i.e. Chef, Cheerleader, Yoga Instructor etc</span>
              <textarea rows={4} className="border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" placeholder="Enter your skills here..." />
            </div>

            {/* Q32: Social Media channels */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900">Do you use Social Media channels?</h3>
              <span className="text-xs text-gray-600">List usernames if you are happy to connect with us via social</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Facebook</span>
                  <input className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Instagram</span>
                  <input className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" />
                </label>
              </div>
            </div>

            {/* Q33: Brands worked for */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900">List all the brands that you have worked for</h3>
              <span className="text-xs text-gray-600">(insert one brand at a time, click the plus sign to add more)</span>
              <div className="space-y-2">
                {brands.map((brand, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={brand}
                      onChange={(e) => updateBrand(index, e.target.value)}
                      className="border border-gray-300 px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]"
                      placeholder="Brand name"
                    />
                    {brands.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBrand(index)}
                        className="text-red-500 hover:text-red-700 px-2 py-1"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addBrand}
                  className="text-[#3AFCAD] hover:text-[#2fd1a0] font-semibold"
                >
                  + Add another brand
                </button>
              </div>
            </div>

            {/* Q34: Events worked at */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900">List of the events you have worked at</h3>
              <span className="text-xs text-gray-600">(insert one event at a time, click the plus sign to add more)</span>
              <div className="space-y-2">
                {events.map((event, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={event}
                      onChange={(e) => updateEvent(index, e.target.value)}
                      className="border border-gray-300 px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]"
                      placeholder="Event name"
                    />
                    {events.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEvent(index)}
                        className="text-red-500 hover:text-red-700 px-2 py-1"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addEvent}
                  className="text-[#3AFCAD] hover:text-[#2fd1a0] font-semibold"
                >
                  + Add another event
                </button>
              </div>
            </div>

            {/* Q35: Supervisor events */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900">Please list all the events/activations that you have been a Supervisor on.</h3>
              <div className="space-y-2">
                {supervisorEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={event}
                      onChange={(e) => updateSupervisorEvent(index, e.target.value)}
                      className="border border-gray-300 px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]"
                      placeholder="Event/activation name"
                    />
                    {supervisorEvents.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSupervisorEvent(index)}
                        className="text-red-500 hover:text-red-700 px-2 py-1"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSupervisorEvent}
                  className="text-[#3AFCAD] hover:text-[#2fd1a0] font-semibold"
                >
                  + Add another event
                </button>
              </div>
            </div>

            {/* Q36: Experienced roles */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900">Select all roles you are experienced in</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {jobTypes.map((job) => (
                  <label key={job.value} className="inline-flex items-center gap-2 text-sm text-gray-800">
                    <input type="checkbox" name="experiencedRoles[]" value={job.value} className="accent-[#3AFCAD]" />
                    {job.label}
                  </label>
                ))}
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
