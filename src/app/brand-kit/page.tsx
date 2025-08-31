"use client"

import { useEffect } from "react"

export default function BrandKitRedirect() {
  useEffect(() => {
    // Redirect to the actual brand kit settings page
    window.location.href = "/settings/brand-kit"
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Redirecting to Brand Kit...</p>
      </div>
    </div>
  )
}