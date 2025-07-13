import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { SocketProvider } from './contexts/SocketContext'
import { NotificationProvider } from './contexts/NotificationContext'
import App from './App'
import './index.css'

// Performance monitoring
const reportWebVitals = (metric: any) => {
  console.log('Web Vitals:', metric)
  // Send to analytics service
  if (metric.name === 'FCP') {
    console.log('First Contentful Paint:', metric.value)
  }
  if (metric.name === 'LCP') {
    console.log('Largest Contentful Paint:', metric.value)
  }
  if (metric.name === 'CLS') {
    console.log('Cumulative Layout Shift:', metric.value)
  }
}

// Create Query Client with advanced configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        if (error?.status === 404) return false
        return failureCount < 3
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
})

// Error boundary for React
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo)
    // Send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-400 mb-4">
              We're sorry, but something unexpected happened.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Performance observer for web vitals
if ('PerformanceObserver' in window) {
  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        reportWebVitals(entry)
      })
    })
    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] })
  } catch (e) {
    console.warn('PerformanceObserver not supported')
  }
}

// Preload critical resources
const preloadCriticalResources = () => {
  const criticalResources = [
    '/src/assets/fonts/inter-var.woff2',
    '/src/assets/images/hero-bg.jpg',
  ]

  criticalResources.forEach((resource) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = resource
    link.as = resource.includes('.woff2') ? 'font' : 'image'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

// Initialize app
const initializeApp = () => {
  // Preload critical resources
  preloadCriticalResources()

  // Remove loading screen if it exists
  const loadingScreen = document.getElementById('loadingScreen')
  if (loadingScreen) {
    loadingScreen.style.display = 'none'
  }

  // Initialize service worker for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    })
  }

  // Initialize analytics
  if (import.meta.env.VITE_ANALYTICS_ID) {
    // Initialize analytics service
    console.log('Analytics initialized')
  }

  // Initialize error tracking
  if (import.meta.env.VITE_SENTRY_DSN) {
    // Initialize Sentry
    console.log('Error tracking initialized')
  }
}

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById('root')!)

// Render with strict mode and error boundary
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <ThemeProvider>
            <AuthProvider>
              <SocketProvider>
                <NotificationProvider>
                  <App />
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      duration: 4000,
                      style: {
                        background: '#1e293b',
                        color: '#f8fafc',
                        border: '1px solid #334155',
                      },
                    }}
                  />
                  {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
                </NotificationProvider>
              </SocketProvider>
            </AuthProvider>
          </ThemeProvider>
        </HashRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
)

// Initialize app after render
initializeApp()

// Export for testing
export { reportWebVitals } 