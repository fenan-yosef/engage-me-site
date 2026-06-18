import type { Metadata } from "next"
import { getWorkItem } from "@/lib/cms-db"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const item = await getWorkItem(slug)
  return {
    title: item ? `Engage Me - ${item.title}` : "Engage Me",
  }
}

export default function WorkDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
