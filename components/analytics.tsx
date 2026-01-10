"use client"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { pageview } from "../lib/gtag"

export default function AnalyticsClient() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return
    pageview(window.location.pathname + window.location.search)
  }, [pathname])

  return null
}
