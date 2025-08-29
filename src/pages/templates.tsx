import React from 'react'
import { Button } from '@/components/ui/button'

export function TemplatesPage() {
  const templates = [
    { id: 1, name: 'Modern Gradient', preview: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 2, name: 'Classic Black', preview: 'bg-gray-900' },
    { id: 3, name: 'Ocean Blue', preview: 'bg-gradient-to-r from-blue-500 to-teal-500' },
    { id: 4, name: 'Sunset Orange', preview: 'bg-gradient-to-r from-orange-500 to-red-500' },
    { id: 5, name: 'Forest Green', preview: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { id: 6, name: 'Royal Purple', preview: 'bg-gradient-to-r from-purple-600 to-indigo-600' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">
            Choose from our collection of professionally designed quote templates.
          </p>
        </div>
        <Button>Create New Template</Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <div key={template.id} className="rounded-lg border bg-card overflow-hidden">
            <div className={`aspect-video ${template.preview} flex items-center justify-center`}>
              <div className="text-center text-white p-4">
                <blockquote className="text-lg font-medium mb-2">
                  "Sample Quote Text"
                </blockquote>
                <cite className="text-sm opacity-80">- Author</cite>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2">{template.name}</h3>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">Use Template</Button>
                <Button variant="outline" size="sm">Preview</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="rounded-lg border bg-card p-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">Create Your Own Template</h3>
          <p className="text-muted-foreground mb-4">
            Design custom templates that match your brand perfectly.
          </p>
          <Button>Start Creating</Button>
        </div>
      </div>
    </div>
  )
}