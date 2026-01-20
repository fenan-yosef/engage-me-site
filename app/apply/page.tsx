"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import Image from "next/image"
import Link from "next/link"
import { FormEvent, useState, useEffect, useMemo } from "react"
import PhoneInput, { isValidPhoneNumber, isPossiblePhoneNumber } from 'react-phone-number-input'
import { countryDialCodes, countryOptions } from "@/lib/countryDialCodes"

type ContactCard = {
  name: string
  role: string
  phone: string
  phone2?: string
  img: string
}

type Option = { label: string; value: string }

type CheckOption = { label: string; value: string }

const contacts: ContactCard[] = [
  { name: "Clare Walsh", role: "Managing Partner", phone: "+971 (0) 4 585 6845", phone2: "+971 58 596 7185", img: "/+971585967185.jpeg" },
  { name: "Lisa Haddad", role: "Managing Partner", phone: "+971 (0) 4 585 6845", phone2: "+971 58 572 4508", img: "/+971585724508.jpeg" },
  { name: "Katie Turner", role: "Business Director", phone: "+971 58 579 5090", img: "/+971585795090.jpeg" },
  { name: "Angela Sales", role: "Project Manager", phone: "0585308640", img: "/0585308640.jpeg" },
  { name: "Koleen Beredo", role: "Business Support Assistant", phone: "+971 50 424 9866", img: "/+971504249866.jpeg" },
  // { name: "Engage Me", role: "Booking Manager", phone: "+971 54 573 0414", img: "/+971545730414.jpg" },
  // { name: "Engage Me", role: "General Enquiries", phone: "+971 56 988 3530", img: "/+971569883530.jpg" },
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
  const isPhonePossible = (val?: string) => {
    if (!val) return true
    try {
      return isPossiblePhoneNumber(val)
    } catch {
      const digits = (val.match(/\d/g) || []).length
      return digits >= 7 && digits <= 15
    }
  }
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
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")
  const [selectedCountry, setSelectedCountry] = useState("United Arab Emirates")
  const [cityOptions, setCityOptions] = useState<string[]>([])
  const [selectedDialCode, setSelectedDialCode] = useState<string>("+971")
  const [editableDial, setEditableDial] = useState<string>(selectedDialCode)
  const [mbPhoneValue, setMbPhoneValue] = useState<string | undefined>(undefined)
  const [wtPhoneValue, setWtPhoneValue] = useState<string | undefined>(undefined)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const photoInput = (form.querySelector('input[name="photo"]') as HTMLInputElement | null)
    if (!photoInput || !photoInput.files || photoInput.files.length === 0) {
      setMessage('Please upload your profile picture before submitting the application.')
      setMessageType('error')
      photoInput?.focus()
      return
    }
    const agreeCheckbox = form.querySelector('input[name="agree"]') as HTMLInputElement | null
    if (!agreeCheckbox || !agreeCheckbox.checked) {
      setMessage('You must agree to the supplier terms before submitting.')
      setMessageType('error')
      agreeCheckbox?.focus()
      return
    }

    setLoading(true)
    setMessage("")
    try {
      // validate phone numbers
      if (mbPhoneValue && !isValidPhoneNumber(mbPhoneValue)) {
        setMessage('Please enter a valid mobile number.')
        setMessageType('error')
        setLoading(false)
        return
      }
      if (wtPhoneValue && !isValidPhoneNumber(wtPhoneValue)) {
        setMessage('Please enter a valid WhatsApp number.')
        setMessageType('error')
        setLoading(false)
        return
      }
      // ensure phone fields include the selected/edited dial code before sending
      const mbEl = form.querySelector('input[name="mbnumber"]') as HTMLInputElement | null
      if (mbEl && editableDial && !mbEl.value.trim().startsWith('+')) mbEl.value = `${editableDial} ${mbEl.value.trim()}`
      const wtEl = form.querySelector('input[name="wtnumber"]') as HTMLInputElement | null
      if (wtEl && editableDial && !wtEl.value.trim().startsWith('+')) wtEl.value = `${editableDial} ${wtEl.value.trim()}`

      const fd = new FormData(form)
      const res = await fetch('/api/staffapplication/promoter/employee_create', {
        method: 'POST',
        body: fd,
      })
      const data = await res.json()
      if (res.ok) {
        setMessage('Application submitted successfully.')
        setMessageType('success')
        form.reset()
        setCityOptions([])
      } else {
        import { redirect } from 'next/navigation'

        export default function ApplyRedirect() {
          redirect('https://engage-me.me/manage/signup')
        }
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
                    <input type="checkbox" name="workTypes[]" value={job.value} className="accent-[#3AFCAD]" />
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

            {/* Agreement */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900">Agreement</h3>
              <div className="text-xs text-gray-600">Please read and accept the Engage Me freelance supplier agreement before submitting your application.</div>
              <label className="inline-flex items-center gap-2">
                <input name="agree" type="checkbox" className="accent-[#3AFCAD]" />
                <span className="text-sm text-gray-800">I agree to the Engage Me supplier terms</span>
              </label>
              <details className="mt-2 p-3 border border-gray-200 bg-white text-xs">
                <summary className="font-semibold">Read the full agreement</summary>
                <div className="mt-2 text-[12px] leading-5 text-gray-700">By submitting this application you acknowledge that Engage Me is not your employer and you accept the freelance supplier agreement terms including payment, fines and data protection clauses.</div>
              </details>
            </div>

            {/* Q31: Additional skills */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900">Do you have additional skills?</h3>
              <span className="text-xs text-gray-600">List all skills i.e. Chef, Cheerleader, Yoga Instructor etc</span>
              <textarea name="additionalSkills" rows={4} className="border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" placeholder="Enter your skills here..." />
            </div>

            {/* Q32: Social Media channels */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900">Do you use Social Media channels?</h3>
              <span className="text-xs text-gray-600">List usernames if you are happy to connect with us via social</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Facebook</span>
                  <input name="facebook" className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Instagram</span>
                  <input name="instagram" className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]" />
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
                      name="Workedbefore[]"
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
                      name="eventbefore[]"
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
                      name="Supervisoron[]"
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
                disabled={loading}
                className="bg-[#fe57c4] disabled:opacity-50 text-white px-6 py-3 text-sm font-semibold tracking-wide shadow-md hover:bg-[#e44dad] transition"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
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
