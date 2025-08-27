"use client"

import { useState, useEffect } from 'react'
import { Asset } from '@/types/asset'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Search, MoreVertical, Download, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface PaginationData {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  })

  const fetchAssets = async (page = 1, search = '') => {
    setLoading(true)
    try {
      const url = new URL('/api/assets', window.location.origin)
      url.searchParams.set('page', page.toString())
      url.searchParams.set('limit', '6')
      if (search) {
        url.searchParams.set('search', search)
      }

      const response = await fetch(url.toString())
      const data = await response.json()
      
      setAssets(data.assets)
      setPagination(data.pagination)
    } catch (error) {
      toast.error('Failed to fetch assets')
      console.error('Error fetching assets:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAssets(currentPage, searchQuery)
  }, [currentPage, searchQuery])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleDelete = async (id: string, filename: string) => {
    try {
      const response = await fetch(`/api/assets/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Remove the asset from the current list
        setAssets(prev => prev.filter(asset => asset.id !== id))
        toast.success(`${filename} deleted successfully`)
      } else {
        toast.error('Failed to delete asset')
      }
    } catch (error) {
      toast.error('Failed to delete asset')
      console.error('Error deleting asset:', error)
    }
  }

  const handleDownload = (asset: Asset) => {
    // In a real application, this would download the actual file
    // For demo purposes, we'll just show a toast
    toast.success(`Downloading ${asset.filename}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const renderPagination = () => {
    const pages = []
    const { totalPages, page } = pagination

    // Always show first page
    pages.push(1)

    // Add ellipsis if there's a gap between 1 and current page range
    if (page > 3) {
      pages.push('ellipsis-start')
    }

    // Add pages around current page
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      if (!pages.includes(i)) {
        pages.push(i)
      }
    }

    // Add ellipsis if there's a gap between current page range and last page
    if (page < totalPages - 2) {
      pages.push('ellipsis-end')
    }

    // Always show last page if it's different from first page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages.map((pageItem, index) => {
      if (pageItem === 'ellipsis-start' || pageItem === 'ellipsis-end') {
        return (
          <PaginationItem key={`ellipsis-${index}`}>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      return (
        <PaginationItem key={pageItem}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setCurrentPage(pageItem as number)
            }}
            isActive={pageItem === page}
          >
            {pageItem}
          </PaginationLink>
        </PaginationItem>
      )
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Assets Library</h1>
        <p className="text-muted-foreground">
          Manage your exported quote images
        </p>
      </div>

      {/* Search Toolbar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by template name or label..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Assets Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : assets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchQuery ? 'No assets found matching your search.' : 'No assets found.'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {assets.map((asset) => (
              <Card key={asset.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={asset.imageUrl}
                    alt={asset.filename}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary">
                      {asset.size}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleDownload(asset)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(asset.id, asset.filename)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold truncate mb-1">{asset.templateName}</h3>
                  {asset.label && (
                    <Badge variant="outline" className="text-xs mb-2">
                      {asset.label}
                    </Badge>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {formatDate(asset.createdAt)}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {asset.filename}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (pagination.hasPrev) {
                          setCurrentPage(currentPage - 1)
                        }
                      }}
                      className={!pagination.hasPrev ? 'opacity-50 cursor-not-allowed' : ''}
                    />
                  </PaginationItem>
                  {renderPagination()}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (pagination.hasNext) {
                          setCurrentPage(currentPage + 1)
                        }
                      }}
                      className={!pagination.hasNext ? 'opacity-50 cursor-not-allowed' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  )
}