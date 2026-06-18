import type { Metadata } from "next"
import { getPage } from "@/lib/cms-db"
import { extractContactContent } from "@/lib/cms/contact-content"

export const metadata: Metadata = {
  title: "Engage Me - Get In Touch",
}
import ContactClient from "@/components/contact-client"

export const dynamic = "force-dynamic"

export default async function ContactPage() {
  const page = await getPage("contact").catch(() => null)
  const content = extractContactContent(page)
  return <ContactClient content={content} />
}
