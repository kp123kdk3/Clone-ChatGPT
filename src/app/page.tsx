'use client'

import { useState } from 'react'
import { ModernLayout } from '@/components/layout/ModernLayout'
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

  const handleRegenerateResponse = () => {
    if (messages.length === 0) return
    
    // Find the last user message
    const lastUserMessage = [...messages].reverse().find(msg => msg.role === 'USER')
    if (lastUserMessage) {
      // Remove the last assistant message and regenerate
      setMessages(prev => prev.filter(msg => 
        !(msg.role === 'ASSISTANT' && msg.id === messages[messages.length - 1]?.id)
      ))
      
      // Re-send the last user message
      setTimeout(() => {
        handleSendMessage(lastUserMessage.content)
      }, 100)
    }
  }

  return (
    <ModernLayout
      messages={messages}
      conversation={null}
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
      onStopGeneration={handleStopGeneration}
      onRegenerateResponse={handleRegenerateResponse}
      onNewChat={handleNewChat}
    />
  )
}
