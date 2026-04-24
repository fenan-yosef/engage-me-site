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
            <img src="/logo.png" alt="Engage Me" />
          </div>

          <div className="engageME-adminLogin-text">Welcome to Engage Me CMS</div>

          <div className="engageME-adminLogin-text-parent">
            <form onSubmit={onSubmit}>
              <div className="engageME-adminLogin-text-cont">Manager Login</div>

              <div className="engageME-adminLogin-inp">
                <span aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="login-icon-svg">
                    <path d="M20 21a8 8 0 0 0-16 0" />
                    <circle cx="12" cy="8" r="4" />
                  </svg>
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
                  <svg viewBox="0 0 24 24" className="login-icon-svg">
                    <rect x="4" y="11" width="16" height="9" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
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
