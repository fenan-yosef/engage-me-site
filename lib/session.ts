import type { SessionOptions } from "iron-session"

export const sessionOptions: SessionOptions = {
  password: process.env.CMS_SESSION_SECRET || "replace_with_a_strong_secret_at_deploy",
  cookieName: "engage_me_cms",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  },
}

export type SessionUser = {
  email?: string
}

export type SessionData = {
  user?: SessionUser
}
