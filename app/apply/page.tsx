import type { Metadata } from "next"
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: "Engage Me - Apply",
}

export default function ApplyRedirect() {
  redirect('https://engage-me.me/staffapplication/')
}
