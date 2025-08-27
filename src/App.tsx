import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from '@/components/ui/button'

function App() {
  const [count, setCount] = useState(0)

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
        
        <h1 className="text-4xl font-bold text-center mb-8">Viral Quote Engine</h1>
        <p className="text-center text-muted-foreground mb-8">
          Built with Vite + React + TypeScript + Tailwind + shadcn/ui
        </p>
        
        <div className="flex flex-col items-center gap-4">
          <Button onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </Button>
          
          <div className="flex gap-2">
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          
          <p className="text-sm text-muted-foreground text-center max-w-md">
            This demonstrates that Tailwind CSS and shadcn/ui components are working correctly.
            Edit <code>src/App.tsx</code> and save to test HMR.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
