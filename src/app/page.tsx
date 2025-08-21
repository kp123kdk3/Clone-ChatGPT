'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { Message, Conversation } from '@/types/chat'

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'demo',
      title: 'Demo Conversation',
      userId: 'demo',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)

  const handleSendMessage = async (message: string) => {
    if (isLoading) return

    setIsLoading(true)
    
    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: 'USER',
      conversationId: currentConversation?.id || 'demo',
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
          conversationId: currentConversation?.id || 'demo',
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
        conversationId: currentConversation?.id || 'demo',
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
    setCurrentConversation(null)
  }

  const handleSelectConversation = (id: string) => {
    const conversation = conversations.find(c => c.id === id)
    setCurrentConversation(conversation || null)
    // In a real app, you would load the messages for this conversation
    setMessages([])
  }

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id))
    if (currentConversation?.id === id) {
      setCurrentConversation(null)
      setMessages([])
    }
  }

  const handleRenameConversation = (id: string, title: string) => {
    setConversations(prev => prev.map(c => 
      c.id === id ? { ...c, title, updatedAt: new Date() } : c
    ))
    if (currentConversation?.id === id) {
      setCurrentConversation(prev => prev ? { ...prev, title, updatedAt: new Date() } : null)
    }
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
    <Layout
      messages={messages}
      conversation={currentConversation}
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
      onStopGeneration={handleStopGeneration}
      onRegenerateResponse={handleRegenerateResponse}
      onNewChat={handleNewChat}
      conversations={conversations}
      onSelectConversation={handleSelectConversation}
      onDeleteConversation={handleDeleteConversation}
      onRenameConversation={handleRenameConversation}
    />
  )
}
