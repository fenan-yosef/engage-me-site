"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import Link from "next/link"

export default function LeadGenerationPage(){
  return (
    <main className="min-h-screen bg-[#212529] text-white">
      <Header />
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto" style={{ fontFamily: "run, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}>
          <h1 className="text-5xl font-bold mb-6">Lead generation</h1>
          <p className="text-gray-300">Coming soon — content will match the site design.</p>
          <div className="mt-8">
            <Link href="/work" className="text-cyan-400">← All Work</Link>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingButtons />
    </main>
  )
}
