import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from './contexts/auth-context'
import { ThemeProvider } from './components/theme-provider'
import { AuthGuard } from './components/auth-guard'
import { AppLayout } from './components/app-layout'
import { ErrorBoundary } from './components/ErrorBoundary'

// Auth pages
import { LoginPage } from './pages/auth/login'
import { RegisterPage } from './pages/auth/register'

// Private pages
import { DashboardPage } from './pages/dashboard'
import { EditorPage } from './pages/editor'
import { TemplatesPage } from './pages/templates'
import { AssetsPage } from './pages/assets'
import { ProfilePage } from './pages/settings/profile'
import { BrandKitPage } from './pages/settings/brand-kit'

// Demo page for API functionality
import { ApiDemo } from './components/ApiDemo'

import './index.css'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/api-demo" element={<ApiDemo />} />
              
              {/* Private routes */}
              <Route path="/" element={<AuthGuard><AppLayout><Navigate to="/dashboard" replace /></AppLayout></AuthGuard>} />
              <Route path="/dashboard" element={<AuthGuard><AppLayout><DashboardPage /></AppLayout></AuthGuard>} />
              <Route path="/editor" element={<AuthGuard><AppLayout><EditorPage /></AppLayout></AuthGuard>} />
              <Route path="/templates" element={<AuthGuard><AppLayout><TemplatesPage /></AppLayout></AuthGuard>} />
              <Route path="/assets" element={<AuthGuard><AppLayout><AssetsPage /></AppLayout></AuthGuard>} />
              <Route path="/settings/profile" element={<AuthGuard><AppLayout><ProfilePage /></AppLayout></AuthGuard>} />
              <Route path="/settings/brand-kit" element={<AuthGuard><AppLayout><BrandKitPage /></AppLayout></AuthGuard>} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
      {/* Global Toaster */}
      <Toaster 
        position="top-right" 
        richColors 
        closeButton
        toastOptions={{
          style: {
            background: 'white',
            border: '1px solid #e5e7eb',
          },
        }}
      />
    </ErrorBoundary>
  )
}
}

export default App
