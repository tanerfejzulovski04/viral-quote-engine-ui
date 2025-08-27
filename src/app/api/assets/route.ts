import { NextRequest, NextResponse } from 'next/server'
import { Asset } from '@/types/asset'

// Mock data for demonstration
const mockAssets: Asset[] = [
  {
    id: '1',
    filename: 'motivational-quote-1.png',
    templateName: 'Modern Gradient',
    label: 'Success Quote',
    size: '1080x1080',
    createdAt: '2024-01-15T10:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop'
  },
  {
    id: '2',
    filename: 'inspirational-quote-2.png',
    templateName: 'Minimalist Dark',
    label: 'Motivation',
    size: '1920x1080',
    createdAt: '2024-01-14T15:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'
  },
  {
    id: '3',
    filename: 'life-quote-3.png',
    templateName: 'Colorful Burst',
    label: 'Life Wisdom',
    size: '1200x1200',
    createdAt: '2024-01-13T09:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=400&fit=crop'
  },
  {
    id: '4',
    filename: 'business-quote-4.png',
    templateName: 'Professional Blue',
    label: 'Business',
    size: '1080x1080',
    createdAt: '2024-01-12T14:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  },
  {
    id: '5',
    filename: 'love-quote-5.png',
    templateName: 'Romantic Pink',
    label: 'Love & Relationships',
    size: '1080x1350',
    createdAt: '2024-01-11T11:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&h=400&fit=crop'
  },
  {
    id: '6',
    filename: 'fitness-quote-6.png',
    templateName: 'Energy Orange',
    label: 'Health & Fitness',
    size: '1080x1080',
    createdAt: '2024-01-10T08:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
  },
  {
    id: '7',
    filename: 'wisdom-quote-7.png',
    templateName: 'Classic Serif',
    label: 'Philosophy',
    size: '1200x800',
    createdAt: '2024-01-09T16:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop'
  },
  {
    id: '8',
    filename: 'nature-quote-8.png',
    templateName: 'Natural Green',
    label: 'Nature & Environment',
    size: '1080x1080',
    createdAt: '2024-01-08T12:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop'
  },
  {
    id: '9',
    filename: 'creative-quote-9.png',
    templateName: 'Artistic Purple',
    label: 'Creativity',
    size: '1080x1080',
    createdAt: '2024-01-07T19:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop'
  },
  {
    id: '10',
    filename: 'tech-quote-10.png',
    templateName: 'Digital Matrix',
    label: 'Technology',
    size: '1920x1080',
    createdAt: '2024-01-06T13:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop'
  },
  {
    id: '11',
    filename: 'travel-quote-11.png',
    templateName: 'Adventure Yellow',
    label: 'Travel & Adventure',
    size: '1080x1080',
    createdAt: '2024-01-05T17:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop'
  },
  {
    id: '12',
    filename: 'family-quote-12.png',
    templateName: 'Warm Sunset',
    label: 'Family',
    size: '1200x1200',
    createdAt: '2024-01-04T20:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400&h=400&fit=crop'
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '6')
  const search = searchParams.get('search') || ''

  // Filter assets based on search
  let filteredAssets = mockAssets
  if (search) {
    const searchLower = search.toLowerCase()
    filteredAssets = mockAssets.filter(asset =>
      asset.templateName.toLowerCase().includes(searchLower) ||
      asset.label?.toLowerCase().includes(searchLower) ||
      asset.filename.toLowerCase().includes(searchLower)
    )
  }

  // Sort by created date (most recent first)
  filteredAssets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  // Paginate
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedAssets = filteredAssets.slice(startIndex, endIndex)

  return NextResponse.json({
    assets: paginatedAssets,
    pagination: {
      page,
      limit,
      total: filteredAssets.length,
      totalPages: Math.ceil(filteredAssets.length / limit),
      hasNext: endIndex < filteredAssets.length,
      hasPrev: page > 1
    }
  })
}