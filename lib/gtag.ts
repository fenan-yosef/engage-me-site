export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-VZJYZKESPD"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export const pageview = (url: string) => {
  if (typeof window === "undefined" || !window.gtag) return
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: url })
}

export const event = ({
  action,
  params,
}: {
  action: string
  params: Record<string, unknown>
}) => {
  if (typeof window === "undefined" || !window.gtag) return
  window.gtag('event', action, params)
}
