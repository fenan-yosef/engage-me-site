"use client"
import Header from "@/components/header"
import Hero from "@/components/hero"
import BringingBrandsToLife from "@/components/bringing-brands-to-life"
import EngagingStaff from "@/components/engaging-staff"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <BringingBrandsToLife />
      <EngagingStaff />
      <Footer />
      <FloatingButtons />
    </main>
  )
}
