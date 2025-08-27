import React, { useState } from 'react'
import apiClient from '../api/client'
import { useAuthStore } from '../store/auth'
import { notifySuccess, notifyError, notifyInfo } from '../lib/notifications'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

export const ApiDemo: React.FC = () => {
  const { token, setToken, clearToken } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<any>(null)

  const testSuccessRequest = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Mock a successful API call
      const mockSuccessResponse = {
        data: { message: 'Success! Data retrieved successfully', quotes: ['Quote 1', 'Quote 2'] }
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setResponse(mockSuccessResponse.data)
      notifySuccess('API request completed successfully!')
    } catch (err: any) {
      setError(err.error?.message || 'An error occurred')
      notifyError(err.error?.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  const testErrorRequest = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Mock an API error
      const mockError = {
        error: { message: 'Validation failed: Invalid request parameters' }
      }
      throw mockError
    } catch (err: any) {
      setError(err.error?.message || 'An error occurred')
      notifyError(err.error?.message || 'Request failed')
      setResponse(null)
    } finally {
      setLoading(false)
    }
  }

  const testNetworkError = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // This will likely fail due to CORS or non-existent endpoint
      await apiClient.get('/nonexistent-endpoint')
    } catch (err: any) {
      setError(err.error?.message || 'Network error occurred')
      notifyError(err.error?.message || 'Network request failed')
      setResponse(null)
    } finally {
      setLoading(false)
    }
  }

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newToken = e.target.value
    if (newToken) {
      setToken(newToken)
      notifyInfo('Auth token updated')
    } else {
      clearToken()
      notifyInfo('Auth token cleared')
    }
  }

  const triggerErrorBoundary = () => {
    throw new Error('This is a test error to trigger the error boundary')
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          API Client & Toast Demo
        </h1>
        
        {/* Auth Token Management */}
        <div className="mb-6 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Auth Token Management</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Token:
              </label>
              <input
                type="text"
                placeholder="Enter auth token..."
                value={token || ''}
                onChange={handleTokenChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-sm text-gray-600">
              Token is persisted in localStorage and automatically attached to API requests
            </p>
          </div>
        </div>

        {/* API Test Buttons */}
        <div className="mb-6 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-3">API Client Tests</h2>
          <div className="space-x-3">
            <button
              onClick={testSuccessRequest}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              Test Success Response
            </button>
            <button
              onClick={testErrorRequest}
              disabled={loading}
              className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50"
            >
              Test Error Response
            </button>
            <button
              onClick={testNetworkError}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              Test Network Error
            </button>
            <button
              onClick={triggerErrorBoundary}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Trigger Error Boundary
            </button>
          </div>
          {loading && (
            <div className="mt-3 text-blue-600">
              Loading...
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>API Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Success Response Display */}
        {response && (
          <Alert variant="success" className="mb-6">
            <AlertTitle>API Success</AlertTitle>
            <AlertDescription>
              <pre className="mt-2 text-xs bg-green-100 p-2 rounded">
                {JSON.stringify(response, null, 2)}
              </pre>
            </AlertDescription>
          </Alert>
        )}

        {/* Configuration Info */}
        <div className="p-4 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-3">Configuration</h2>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><strong>Base URL:</strong> {import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'}</li>
            <li><strong>Toast Position:</strong> top-right</li>
            <li><strong>Auth Token Storage:</strong> localStorage (via Zustand persist)</li>
            <li><strong>Response Unwrapping:</strong> Automatically unwraps {`{ data }`} envelopes</li>
            <li><strong>Error Normalization:</strong> Converts all errors to {`{ error: { message } }`} format</li>
          </ul>
        </div>
      </div>
    </div>
  )
}