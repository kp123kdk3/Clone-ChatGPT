'use client'

import { useState } from 'react'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { Message } from '@/types/chat'

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (message: string) => {
    if (isLoading) return

    setIsLoading(true)
    
    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: 'USER',
      conversationId: 'demo',
      createdAt: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])

    try {
      // Call OpenAI API directly (simplified for demo)
      const response = await fetch('/api/chat/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      if (response.ok) {
        const data = await response.json()
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          role: 'ASSISTANT',
          conversationId: 'demo',
          createdAt: new Date()
        }
        
        setMessages(prev => [...prev, assistantMessage])
      } else {
        throw new Error('Failed to get response')
      }
    } catch (error) {
      console.error('Error:', error)
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please make sure you have set up your OpenAI API key in the environment variables.',
        role: 'ASSISTANT',
        conversationId: 'demo',
        createdAt: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleStopGeneration = () => {
    setIsLoading(false)
  }

  const handleNewChat = () => {
    setMessages([])
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Simple sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4">
        <button
          onClick={handleNewChat}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 px-4 py-2 rounded-lg mb-4"
        >
          + New Chat
        </button>
        <div className="text-sm text-gray-400">
          <p className="mb-2">🎉 Demo Mode</p>
          <p>No login required!</p>
          <p className="mt-4 text-xs">
            Messages: {messages.length}
          </p>
        </div>
      </div>
      
      {/* Chat interface */}
      <div className="flex-1 flex flex-col">
        <ChatInterface
          conversation={null}
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          onStopGeneration={handleStopGeneration}
        />
      </div>
    </div>
  )
}
