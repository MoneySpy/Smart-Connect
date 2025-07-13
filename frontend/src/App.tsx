import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { useTheme } from './contexts/ThemeContext'
import { useNotifications } from './contexts/NotificationContext'
import LoadingSpinner from './components/ui/LoadingSpinner'
import ErrorBoundary from './components/ui/ErrorBoundary'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Footer from './components/layout/Footer'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Employees from './pages/Employees'
import Schedule from './pages/Schedule'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

// Lazy load components for better performance
const Chat = lazy(() => import('./pages/Chat'))
const Analytics = lazy(() => import('./pages/Analytics'))
const AdminPanel = lazy(() => import('./pages/AdminPanel'))

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode; roles?: string[] }> = ({
  children,
  roles = []
}) => {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (roles.length > 0 && user && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}

// Main App component
const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const { notifications } = useNotifications()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Handle theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + K for search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        // Open search modal
        console.log('Open search')
      }

      // Ctrl/Cmd + / for theme toggle
      if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault()
        toggleTheme()
      }

      // Escape to close sidebar
      if (event.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [toggleTheme, isSidebarOpen])

  // Handle service worker updates
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload()
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Offline indicator */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-yellow-900 px-4 py-2 text-center text-sm font-medium">
          You are currently offline. Some features may be unavailable.
        </div>
      )}

      {/* Notification toast */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-4 py-3 rounded-lg shadow-lg max-w-sm animate-slide-in-right ${
                notification.type === 'success'
                  ? 'bg-green-500 text-white'
                  : notification.type === 'error'
                  ? 'bg-red-500 text-white'
                  : notification.type === 'warning'
                  ? 'bg-yellow-500 text-yellow-900'
                  : 'bg-blue-500 text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{notification.message}</span>
                <button
                  onClick={() => notification.onDismiss?.()}
                  className="ml-2 text-white hover:text-gray-200"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main layout */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <Navbar
            onMenuClick={() => setIsSidebarOpen(true)}
            onThemeToggle={toggleTheme}
            theme={theme}
          />

          {/* Page content */}
          <main className="flex-1 overflow-y-auto">
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Protected routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/employees"
                    element={
                      <ProtectedRoute roles={['admin', 'manager']}>
                        <Employees />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/schedule"
                    element={
                      <ProtectedRoute>
                        <Schedule />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports"
                    element={
                      <ProtectedRoute roles={['admin', 'manager']}>
                        <Reports />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/analytics"
                    element={
                      <ProtectedRoute roles={['admin', 'manager']}>
                        <Analytics />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/chat"
                    element={
                      <ProtectedRoute>
                        <Chat />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute roles={['admin']}>
                        <AdminPanel />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />

                  {/* Error routes */}
                  <Route path="/unauthorized" element={<UnauthorizedPage />} />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>

      {/* Keyboard shortcuts help */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => {
            // Show keyboard shortcuts modal
            console.log('Show keyboard shortcuts')
          }}
          className="p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors"
          title="Keyboard shortcuts (Ctrl/Cmd + /)"
        >
          ⌨️
        </button>
      </div>

      {/* Performance monitoring */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 z-40">
          <div className="bg-black text-white px-3 py-2 rounded-lg text-xs">
            <div>FPS: {Math.round(1000 / 16)}</div>
            <div>Memory: {Math.round(performance.memory?.usedJSHeapSize / 1024 / 1024)}MB</div>
          </div>
        </div>
      )}
    </div>
  )
}

// Unauthorized page component
const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          You don't have permission to access this page.
        </p>
        <button
          onClick={() => window.history.back()}
          className="btn btn-primary"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

export default App 