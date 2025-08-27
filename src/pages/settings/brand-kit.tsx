import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export function BrandKitPage() {
  const [brandName, setBrandName] = useState('My Brand')
  const [primaryColor, setPrimaryColor] = useState('#3b82f6')
  const [secondaryColor, setSecondaryColor] = useState('#8b5cf6')
  const [accentColor, setAccentColor] = useState('#10b981')
  const [isSaving, setIsSaving] = useState(false)

  const colorPresets = [
    { name: 'Blue', colors: ['#3b82f6', '#8b5cf6', '#10b981'] },
    { name: 'Purple', colors: ['#8b5cf6', '#ec4899', '#f59e0b'] },
    { name: 'Green', colors: ['#10b981', '#3b82f6', '#f59e0b'] },
    { name: 'Orange', colors: ['#f59e0b', '#ef4444', '#8b5cf6'] },
  ]

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Brand Kit</h1>
        <p className="text-muted-foreground">
          Customize your brand colors, fonts, and style preferences for consistent quote designs.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Brand Information</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="brandName" className="text-sm font-medium">
                  Brand Name
                </label>
                <Input
                  id="brandName"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Logo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="text-muted-foreground">
                    <p className="mb-2">Upload your brand logo</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Color Palette</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Primary</label>
                  <div className="mt-2 flex items-center space-x-2">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-10 h-10 rounded border cursor-pointer"
                    />
                    <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Secondary</label>
                  <div className="mt-2 flex items-center space-x-2">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-10 h-10 rounded border cursor-pointer"
                    />
                    <Input value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Accent</label>
                  <div className="mt-2 flex items-center space-x-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-10 h-10 rounded border cursor-pointer"
                    />
                    <Input value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">Color Presets</label>
                <div className="grid grid-cols-2 gap-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      className="p-2 border rounded-lg hover:bg-accent transition-colors"
                      onClick={() => {
                        setPrimaryColor(preset.colors[0])
                        setSecondaryColor(preset.colors[1])
                        setAccentColor(preset.colors[2])
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {preset.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <span className="text-sm">{preset.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Typography</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Heading Font</label>
                <select className="w-full mt-2 p-2 border rounded-md">
                  <option>Inter</option>
                  <option>Roboto</option>
                  <option>Open Sans</option>
                  <option>Playfair Display</option>
                  <option>Montserrat</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Body Font</label>
                <select className="w-full mt-2 p-2 border rounded-md">
                  <option>Inter</option>
                  <option>Roboto</option>
                  <option>Open Sans</option>
                  <option>Source Sans Pro</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Preview</h2>
            <div 
              className="aspect-square rounded-lg flex items-center justify-center p-8 text-white"
              style={{
                background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
              }}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Inter' }}>
                  {brandName}
                </h3>
                <blockquote className="text-lg mb-4">
                  "Your brand colors and typography in action"
                </blockquote>
                <div 
                  className="w-12 h-1 mx-auto rounded"
                  style={{ backgroundColor: accentColor }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Brand Kit'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}