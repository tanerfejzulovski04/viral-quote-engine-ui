import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center gap-8 mb-8">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="h-24 w-24 animate-spin" alt="React logo" />
          </a>
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-4">Viral Quote Engine</h1>
        <p className="text-center text-muted-foreground mb-8">
          Built with Vite + React + TypeScript + Tailwind + shadcn/ui
        </p>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Demo</CardTitle>
              <CardDescription>
                Test the shadcn/ui Button component functionality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={() => setCount((count) => count + 1)} className="w-full">
                Count is {count}
              </Button>
              
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm">Secondary</Button>
                <Button variant="outline" size="sm">Outline</Button>
                <Button variant="ghost" size="sm">Ghost</Button>
                <Button variant="destructive" size="sm">Destructive</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Form Components</CardTitle>
              <CardDescription>
                Input and Label components from shadcn/ui
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input 
                  id="name"
                  placeholder="Enter your name..." 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {name && (
                <p className="text-sm text-muted-foreground">
                  Hello, <span className="font-medium">{name}</span>! 👋
                </p>
              )}
              <Button variant="outline" className="w-full">
                Submit Form
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            This demonstrates that Tailwind CSS and shadcn/ui components are working correctly. 
            The setup includes Button, Card, Input, and Label components with proper theming and interactions.
            Edit <code className="bg-muted px-2 py-1 rounded">src/App.tsx</code> and save to test HMR.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
