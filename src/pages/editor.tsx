import React from 'react'
import { Button } from '@/components/ui/button'

export function EditorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quote Editor</h1>
        <p className="text-muted-foreground">
          Create and customize your viral quotes with our powerful editor.
        </p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Text Content</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Quote Text</label>
                <textarea 
                  className="w-full mt-2 p-3 border rounded-md min-h-[120px] resize-none"
                  placeholder="Enter your inspiring quote here..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Author</label>
                <input 
                  type="text" 
                  className="w-full mt-2 p-2 border rounded-md"
                  placeholder="Quote author (optional)"
                />
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Style Options</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Font Family</label>
                <select className="w-full mt-2 p-2 border rounded-md">
                  <option>Inter</option>
                  <option>Roboto</option>
                  <option>Open Sans</option>
                  <option>Playfair Display</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Background Style</label>
                <select className="w-full mt-2 p-2 border rounded-md">
                  <option>Gradient</option>
                  <option>Solid Color</option>
                  <option>Image</option>
                  <option>Pattern</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Preview</h2>
            <div className="aspect-square bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center p-8">
              <div className="text-center text-white">
                <blockquote className="text-xl font-medium mb-4">
                  "The only way to do great work is to love what you do."
                </blockquote>
                <cite className="text-sm opacity-80">- Steve Jobs</cite>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button className="flex-1">Save Quote</Button>
            <Button variant="outline" className="flex-1">Export</Button>
          </div>
        </div>
      </div>
    </div>
  )
}