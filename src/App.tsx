import { Toaster } from 'sonner'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ApiDemo } from './components/ApiDemo'
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100">
        <ApiDemo />
      </div>
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

export default App
