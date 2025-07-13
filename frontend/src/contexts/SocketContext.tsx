import React, { createContext, useContext, useEffect, useState } from 'react'

interface SocketContextType {
  isConnected: boolean
  sendMessage: (event: string, data: any) => void
  subscribe: (event: string, callback: (data: any) => void) => void
  unsubscribe: (event: string) => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}

interface SocketProviderProps {
  children: React.ReactNode
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [eventListeners, setEventListeners] = useState<Map<string, ((data: any) => void)[]>>(new Map())

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket(import.meta.env.VITE_WS_URL || 'ws://localhost:3001')

    ws.onopen = () => {
      setIsConnected(true)
      console.log('WebSocket connected')
    }

    ws.onclose = () => {
      setIsConnected(false)
      console.log('WebSocket disconnected')
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    ws.onmessage = (event) => {
      try {
        const { type, data } = JSON.parse(event.data)
        const listeners = eventListeners.get(type)
        if (listeners) {
          listeners.forEach(callback => callback(data))
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error)
      }
    }

    setSocket(ws)

    return () => {
      ws.close()
    }
  }, [])

  const sendMessage = (event: string, data: any) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify({ type: event, data }))
    }
  }

  const subscribe = (event: string, callback: (data: any) => void) => {
    setEventListeners(prev => {
      const newListeners = new Map(prev)
      const existing = newListeners.get(event) || []
      newListeners.set(event, [...existing, callback])
      return newListeners
    })
  }

  const unsubscribe = (event: string) => {
    setEventListeners(prev => {
      const newListeners = new Map(prev)
      newListeners.delete(event)
      return newListeners
    })
  }

  const value: SocketContextType = {
    isConnected,
    sendMessage,
    subscribe,
    unsubscribe
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
} 