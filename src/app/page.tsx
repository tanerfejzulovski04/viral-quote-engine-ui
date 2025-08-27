import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Viral Quote Engine</h1>
          <p className="text-xl text-muted-foreground">
            Create stunning quote graphics that get shared. Design, customize, and export 
            professional-looking quote images in seconds.
          </p>
        </div>

        <Card className="text-left">
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>Everything you need to create viral quotes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Resizable panels with live preview</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Multiple export sizes (Twitter/X, Instagram, Stories)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Beautiful templates with customizable backgrounds</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Auto-fitting text and smart typography</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>High-quality PNG export</span>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Link href="/editor">
            <Button size="lg" className="text-lg px-8 py-6">
              Open Quote Editor
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            Start creating your viral quote graphics now
          </p>
        </div>
      </div>
    </div>
  )
}
