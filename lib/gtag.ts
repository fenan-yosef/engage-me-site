export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-VZJYZKESPD"

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export const pageview = (url: string) => {
  if (!globalThis.window || !window.gtag) return
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: url })
}

export const event = ({
  action,
  params,
}: {
  action: string
  params: { [key: string]: any }
}) => {
  if (!globalThis.window || !window.gtag) return
  window.gtag('event', action, params)
}
