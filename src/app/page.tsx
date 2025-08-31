"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem("user")
    if (userData) {
      window.location.href = "/dashboard"
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Viral Quote Engine</CardTitle>
          <CardDescription className="text-center">
            Welcome! Please log in or create an account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => window.location.href = "/login"} 
            className="w-full"
          >
            Sign In
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.href = "/register"} 
            className="w-full"
          >
            Create Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
