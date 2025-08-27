"use client"

import { useState } from "react"
import { Panel, PanelGroup, PanelResizeHandle } from "@/components/ui/resizable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Wand2 } from "lucide-react"
import { toPng } from "html-to-image"

// Mock templates data - in real app, this would come from /api/templates
const templates = [
  { id: "modern", name: "Modern", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { id: "minimal", name: "Minimal", background: "#ffffff" },
  { id: "dark", name: "Dark", background: "linear-gradient(135deg, #232526 0%, #414345 100%)" },
  { id: "vibrant", name: "Vibrant", background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
]

const brandColors = [
  { name: "Primary", color: "#667eea" },
  { name: "Secondary", color: "#764ba2" },
  { name: "Accent", color: "#f093fb" },
]

const exportSizes = {
  x: { width: 1600, height: 900, label: "Twitter/X (1600×900)" },
  ig: { width: 1080, height: 1080, label: "Instagram (1080×1080)" },
  story: { width: 1080, height: 1920, label: "Story (1080×1920)" },
}

export default function EditorPage() {
  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [selectedSize, setSelectedSize] = useState("x")
  const [isExporting, setIsExporting] = useState(false)

  const template = templates.find(t => t.id === selectedTemplate) || templates[0]
  const size = exportSizes[selectedSize as keyof typeof exportSizes]

  const handleExport = async (exportSize: string) => {
    const exportSizeConfig = exportSizes[exportSize as keyof typeof exportSizes]
    if (!exportSizeConfig) return

    setIsExporting(true)
    try {
      const element = document.getElementById("quote-preview")
      if (!element) return

      // Temporarily resize for export
      element.style.width = `${exportSizeConfig.width}px`
      element.style.height = `${exportSizeConfig.height}px`
      element.style.transform = "scale(1)"

      const dataUrl = await toPng(element, {
        width: exportSizeConfig.width,
        height: exportSizeConfig.height,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
        },
      })

      // Reset styles
      element.style.width = ""
      element.style.height = ""
      element.style.transform = ""

      // Download
      const link = document.createElement("a")
      link.download = `quote-${exportSize}-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const getFontSize = (text: string) => {
    const length = text.length
    if (length < 50) return "text-5xl"
    if (length < 100) return "text-4xl"
    if (length < 150) return "text-3xl"
    return "text-2xl"
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="border-b p-4">
        <h1 className="text-2xl font-bold">Quote Editor</h1>
        <p className="text-muted-foreground">Create viral quote graphics with live preview</p>
      </header>

      <div className="flex-1">
        <PanelGroup direction="horizontal" className="h-full">
          {/* Left Controls Panel */}
          <Panel defaultSize={30} minSize={25} maxSize={40}>
            <div className="p-6 h-full overflow-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Quote Controls</CardTitle>
                  <CardDescription>
                    Customize your quote design and content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Quote Text */}
                  <div className="space-y-2">
                    <Label htmlFor="quote">Quote Text</Label>
                    <Textarea
                      id="quote"
                      placeholder="Enter your inspiring quote here..."
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      maxLength={200}
                      className="min-h-[100px]"
                    />
                    <div className="text-xs text-muted-foreground text-right">
                      {quote.length}/200 characters
                    </div>
                  </div>

                  {/* Author */}
                  <div className="space-y-2">
                    <Label htmlFor="author">Author (Optional)</Label>
                    <Input
                      id="author"
                      placeholder="Quote author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>

                  {/* Template Selector */}
                  <div className="space-y-2">
                    <Label>Template</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Size Preset */}
                  <div className="space-y-2">
                    <Label>Preset Size</Label>
                    <ToggleGroup type="single" value={selectedSize} onValueChange={(value) => value && setSelectedSize(value)}>
                      <ToggleGroupItem value="x" aria-label="Twitter/X format">
                        X
                      </ToggleGroupItem>
                      <ToggleGroupItem value="ig" aria-label="Instagram format">
                        IG
                      </ToggleGroupItem>
                      <ToggleGroupItem value="story" aria-label="Story format">
                        Story
                      </ToggleGroupItem>
                    </ToggleGroup>
                    <div className="text-xs text-muted-foreground">
                      {size.label}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full" disabled>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Rewrite with AI
                    </Button>
                    
                    <div className="space-y-2">
                      <Label>Export Options</Label>
                      <div className="grid gap-2">
                        {Object.entries(exportSizes).map(([key, size]) => (
                          <Button
                            key={key}
                            variant="outline" 
                            size="sm"
                            onClick={() => handleExport(key)}
                            disabled={isExporting || !quote.trim()}
                            className="justify-start"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            {size.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Brand Kit */}
                  <div className="space-y-2">
                    <Label>Brand Kit</Label>
                    <div className="flex gap-2 flex-wrap">
                      {brandColors.map((brand) => (
                        <Badge 
                          key={brand.name}
                          variant="secondary" 
                          className="cursor-pointer"
                          style={{ backgroundColor: brand.color, color: "white" }}
                        >
                          {brand.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Panel>

          <PanelResizeHandle className="w-2 bg-border hover:bg-accent transition-colors" />

          {/* Right Preview Panel */}
          <Panel defaultSize={70}>
            <div className="p-6 h-full flex items-center justify-center bg-muted/30">
              <div className="w-full max-w-4xl">
                <div className="mb-4 text-center">
                  <h2 className="text-lg font-semibold mb-2">Live Preview</h2>
                  <p className="text-sm text-muted-foreground">
                    Aspect ratio: {size.width}×{size.height} ({selectedSize.toUpperCase()})
                  </p>
                </div>

                {/* Preview Canvas */}
                <div 
                  className="mx-auto border-2 border-border rounded-lg overflow-hidden shadow-lg"
                  style={{
                    aspectRatio: `${size.width}/${size.height}`,
                    maxWidth: selectedSize === "story" ? "300px" : "600px",
                  }}
                >
                  <div
                    id="quote-preview"
                    className="w-full h-full flex flex-col items-center justify-center p-8 relative"
                    style={{
                      background: template.background,
                    }}
                  >
                    {/* Logo placeholder (top-left) */}
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 bg-white/40 rounded"></div>
                    </div>

                    {/* Quote Content */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center max-w-[90%]">
                      {quote ? (
                        <>
                          <blockquote 
                            className={`font-bold text-white mb-4 leading-tight ${getFontSize(quote)}`}
                            style={{
                              textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                            }}
                          >
                            &ldquo;{quote}&rdquo;
                          </blockquote>
                          {author && (
                            <cite className="text-white/90 text-lg font-medium">
                              — {author}
                            </cite>
                          )}
                        </>
                      ) : (
                        <div className="text-white/60 text-2xl text-center">
                          Enter a quote to see the preview
                        </div>
                      )}
                    </div>

                    {/* Watermark placeholder (bottom-right) */}
                    <div className="absolute bottom-4 right-4 text-white/30 text-xs font-medium">
                      Quote Engine
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  )
}