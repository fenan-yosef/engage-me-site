"use client"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { pageview, GA_MEASUREMENT_ID } from "../lib/gtag"

export default function AnalyticsClient() {
  const pathname = usePathname()

  useEffect(() => {
    if (!window || !window.gtag) return
    // send a page_view on route change
    pageview(window.location.pathname + window.location.search)
  }, [pathname])

  return null
}
