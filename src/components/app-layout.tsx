import React from 'react'
import { DesktopSidebar } from './sidebar'
import { TopBar } from './topbar'
import { BreadcrumbNav } from './breadcrumb-nav'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <DesktopSidebar />
      <div className="lg:ml-64">
        <TopBar />
        <BreadcrumbNav />
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}