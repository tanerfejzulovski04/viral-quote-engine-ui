import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-4xl font-bold">Viral Quote Engine</h1>
        <p className="text-xl text-muted-foreground">Welcome to your quote management platform</p>
        <Link href="/settings/profile">
          <Button size="lg">Go to Profile Settings</Button>
        </Link>
      </div>
    </main>
  )
}