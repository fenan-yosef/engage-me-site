import { getPage } from "@/lib/cms-db"
import { extractContactContent } from "@/lib/cms/contact-content"
import ContactClient from "@/components/contact-client"

export default async function ContactPage() {
  const page = await getPage("contact").catch(() => null)
  const content = extractContactContent(page)
  return <ContactClient content={content} />
}
