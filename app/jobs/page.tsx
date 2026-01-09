"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-8">
            <span className="text-cyan-400">Jobs</span> Board
          </h1>
          <p className="text-gray-600 text-lg">Coming soon...</p>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  )
}
