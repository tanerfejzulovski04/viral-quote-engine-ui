import React from 'react'
import { Button } from '@/components/ui/button'
import { FolderOpen, Image, FileText, Video } from 'lucide-react'

export function AssetsPage() {
  const assetTypes = [
    { name: 'Images', count: 24, icon: Image, color: 'text-blue-500' },
    { name: 'Videos', count: 8, icon: Video, color: 'text-green-500' },
    { name: 'Documents', count: 12, icon: FileText, color: 'text-orange-500' },
    { name: 'Other', count: 5, icon: FolderOpen, color: 'text-purple-500' },
  ]

  const recentAssets = [
    { name: 'quote-background-1.jpg', type: 'Image', size: '2.1 MB', date: '2 hours ago' },
    { name: 'brand-logo.png', type: 'Image', size: '156 KB', date: '5 hours ago' },
    { name: 'inspiration-video.mp4', type: 'Video', size: '15.2 MB', date: '1 day ago' },
    { name: 'fonts-collection.zip', type: 'Archive', size: '4.8 MB', date: '2 days ago' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
          <p className="text-muted-foreground">
            Manage your images, videos, and other creative assets.
          </p>
        </div>
        <Button>Upload Assets</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {assetTypes.map((type) => (
          <div key={type.name} className="rounded-lg border bg-card p-6">
            <div className="flex items-center">
              <type.icon className={`h-8 w-8 ${type.color}`} />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{type.name}</p>
                <div className="text-2xl font-bold">{type.count}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="rounded-lg border bg-card">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Assets</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentAssets.map((asset, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{asset.name}</p>
                    <p className="text-sm text-muted-foreground">{asset.type} • {asset.size}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {asset.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card p-6">
        <div className="text-center py-12">
          <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Drag & Drop to Upload</h3>
          <p className="text-muted-foreground mb-4">
            Or click to browse and select files from your computer.
          </p>
          <Button>Browse Files</Button>
        </div>
      </div>
    </div>
  )
}