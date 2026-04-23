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
    <div className="py-12">
      <div className="max-w-md mx-auto bg-white shadow p-8 rounded">
        <h2 className="text-2xl font-semibold mb-4">CMS Login</h2>
        <form onSubmit={onSubmit}>
          <label className="block mb-2">Email</label>
          <input className="w-full border p-2 mb-4" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label className="block mb-2">Password</label>
          <input type="password" className="w-full border p-2 mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />

          {error && <div className="text-red-600 mb-4">{error}</div>}

          <button className="btn-engage" type="submit">Sign in</button>
        </form>
      </div>
    </div>
  )
}
