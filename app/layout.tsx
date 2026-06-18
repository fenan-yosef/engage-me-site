/* eslint-disable @next/next/no-page-custom-font */
import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script"
import "./globals.css"
import 'react-phone-number-input/style.css'
import AnalyticsClient from "../components/analytics"

export const metadata: Metadata = {
  title: "Engage Me - Event Staffing",
  description:
    "Our mission is to drive results for our clients by pairing the right staff with effective on-ground management. It's that simple.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/favicon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-VZJYZKESPD"

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        {/* Font Awesome CDN for icons */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        {/* Montserrat font for navbar */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&family=Barlow+Condensed:wght@600;700&display=swap" rel="stylesheet" />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });`}
        </Script>
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <AnalyticsClient />
      </body>
    </html>
  )
}
