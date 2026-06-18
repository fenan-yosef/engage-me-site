import PeopleClient from "@/components/people-client"
import { getPage } from "@/lib/cms-db"
import { extractPeopleContent } from "@/lib/cms/people-content"

export const dynamic = "force-dynamic"

export default async function PeoplePage() {
  const page = await getPage("people").catch(() => null)
  const content = extractPeopleContent(page)
  return <PeopleClient initial={content} />
}
