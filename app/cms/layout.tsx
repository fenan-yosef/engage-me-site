import React from "react"
import Link from "next/link"

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 py-4 mb-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="engage me" style={{ height: 40 }} />
          </Link>
          <h1 className="text-xl font-semibold" style={{ color: "var(--cyan)" }}>
            Engage Me — CMS
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6">{children}</main>
    </div>
  )
}
