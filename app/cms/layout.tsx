import React from "react"
import CMSShell from "@/components/cms-shell"

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return <CMSShell>{children}</CMSShell>
}
