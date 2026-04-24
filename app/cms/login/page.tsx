"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const res = await fetch("/api/cms/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    if (res.ok) {
      router.push("/cms")
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || "Login failed")
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        background:
          "radial-gradient(circle at top, rgba(58,252,173,0.18), transparent 34%), linear-gradient(180deg, #0f172a 0%, #081018 100%)",
      }}
    >
      <div className="w-full max-w-md rounded-[32px] bg-white/95 shadow-2xl ring-1 ring-black/5 px-8 py-10 md:px-10 md:py-12">
        <div className="flex flex-col items-center text-center">
          <img src="/logo.png" alt="Engage Me" className="h-14 w-auto mb-5" />
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Welcome to Engage Me CMS</h1>
          <p className="mt-2 text-sm text-slate-500">Manager Login</p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Username</span>
            <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 focus-within:border-[#3AFCAD] focus-within:ring-2 focus-within:ring-[#3AFCAD]/20">
              <div className="flex w-12 items-center justify-center bg-white border-r border-slate-200 text-slate-400" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
                  <path d="M20 21a8 8 0 0 0-16 0" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <input
                className="w-full bg-transparent px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400"
                type="email"
                autoComplete="username"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
            <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 focus-within:border-[#3AFCAD] focus-within:ring-2 focus-within:ring-[#3AFCAD]/20">
              <div className="flex w-12 items-center justify-center bg-white border-r border-slate-200 text-slate-400" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
                  <rect x="4" y="11" width="16" height="9" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
              </div>
              <input
                className="w-full bg-transparent px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>

          {error && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">
              {error}
            </div>
          )}

          <button
            className="w-full rounded-2xl bg-[#3AFCAD] px-5 py-3.5 text-sm font-semibold tracking-wide text-slate-950 transition hover:bg-[#35e6b3] focus:outline-none focus:ring-2 focus:ring-[#3AFCAD]/40"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
