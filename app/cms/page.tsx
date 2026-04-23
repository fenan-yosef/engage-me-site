"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type SessionUser = {
  email: string
}

export default function CMSDashboard() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [user, setUser] = useState<SessionUser | null>(null)

  useEffect(() => {
    fetch("/api/cms/auth/session")
      .then((r) => r.json())
      .then((d) => {
        if (!d?.user) return router.push("/cms/login")
        setUser(d.user)
      })
      .finally(() => setChecking(false))
  }, [router])

  if (checking) return <div>Checking session…</div>

  const pages = [
    { slug: "home", label: "Home" },
    { slug: "work", label: "Work" },
    { slug: "people", label: "People" },
    { slug: "insight", label: "Insight" },
    { slug: "jobs", label: "Jobs Board" },
    { slug: "contact", label: "Get In Touch" },
  ]

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <div>
          <span className="mr-4">{user?.email}</span>
          <button
            className="btn-engage"
            onClick={async () => {
              await fetch("/api/cms/auth/logout", { method: "POST" })
              router.push("/cms/login")
            }}
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pages.map((p) => (
          <Link key={p.slug} href={`/cms/pages/${p.slug}`} className="border p-4 rounded hover:shadow">
            <h3 className="text-lg font-medium mb-2">{p.label}</h3>
            <div className="text-sm text-gray-600">Edit main content and images for the {p.label} page.</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
