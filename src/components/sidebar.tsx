import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Edit3, 
  FileText, 
  User, 
  Palette, 
  FolderOpen,
  Menu
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Editor', href: '/editor', icon: Edit3 },
  { name: 'Templates', href: '/templates', icon: FileText },
  { name: 'Assets', href: '/assets', icon: FolderOpen },
]

const settingsNavigation = [
  { name: 'Profile', href: '/settings/profile', icon: User },
  { name: 'Brand Kit', href: '/settings/brand-kit', icon: Palette },
]

interface SidebarContentProps {
  className?: string
  onItemClick?: () => void
}

function SidebarContent({ className, onItemClick }: SidebarContentProps) {
  const location = useLocation()

  return (
    <div className={cn('flex h-full w-64 flex-col bg-background border-r', className)}>
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/dashboard" className="text-xl font-semibold">
          Viral Quote Engine
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onItemClick}
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </div>
        
        <div className="pt-4">
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Settings
          </div>
          <div className="space-y-1">
            {settingsNavigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onItemClick}
                  className={cn(
                    'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}

export function DesktopSidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex">
      <SidebarContent />
    </div>
  )
}

export function MobileSidebar() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <SidebarContent onItemClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}