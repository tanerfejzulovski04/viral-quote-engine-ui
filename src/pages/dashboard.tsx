import React from 'react'
import { useAuth } from '@/contexts/auth-context'

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}! Here's an overview of your viral quote engine.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Quotes</p>
              <div className="text-2xl font-bold">24</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            +2 from last week
          </p>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
              <div className="text-2xl font-bold">85%</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            +5% from last week
          </p>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Templates Used</p>
              <div className="text-2xl font-bold">12</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            +3 from last week
          </p>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Created new quote template</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Quote shared on social media</p>
              <p className="text-xs text-muted-foreground">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Updated brand kit colors</p>
              <p className="text-xs text-muted-foreground">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}