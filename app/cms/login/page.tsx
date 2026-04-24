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
    <div className="container-fluid engageME-adminLogin-parent">
      <div className="container">
        <div className="engageME-adminLogin">
          <div className="engageME-adminLogin-logo">
            <img src="/engage-me-icons-19.png" alt="Engage Me" />
          </div>

          <div className="engageME-adminLogin-text">Welcome to Engage Me Insight</div>

          <div className="engageME-adminLogin-text-parent">
            <form onSubmit={onSubmit}>
              <div className="engageME-adminLogin-text-cont">CMS Login</div>

              <div className="engageME-adminLogin-inp">
                <span aria-hidden="true">
                  <img src="/engage-me-icons-13.png" alt="" />
                </span>
                <input
                  type="email"
                  name="email"
                  autoComplete="username"
                  autoFocus
                  value={email}
                  placeholder="Username"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="engageME-adminLogin-inp">
                <span aria-hidden="true">
                  <img src="/engage-me-icons-09.png" alt="" />
                </span>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <div className="engageME-adminLogin-error">{error}</div>}

              <div className="engageME-adminLogin-btn">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
