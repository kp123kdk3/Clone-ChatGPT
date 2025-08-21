'use client'

import { useState, useCallback, useRef } from 'react'
import { Message, Conversation } from '@/types/chat'

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState('')
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchConversations = useCallback(async () => {
    try {
      const response = await fetch('/api/conversations')
      if (response.ok) {
        const data = await response.json()
        setConversations(data)
      }
    } catch (error) {
      console.error('Error fetching conversations:', error)
    }
  }, [])

  const fetchConversation = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/conversations/${id}`)
      if (response.ok) {
        const conversation = await response.json()
        setCurrentConversation(conversation)
        setMessages(conversation.messages || [])
      }
    } catch (error) {
      console.error('Error fetching conversation:', error)
    }
  }, [])

  const createConversation = useCallback(async (title: string) => {
    try {
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      })
      
      if (response.ok) {
        const conversation = await response.json()
        setConversations(prev => [conversation, ...prev])
        return conversation
      }
    } catch (error) {
      console.error('Error creating conversation:', error)
    }
  }, [])

  const deleteConversation = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/conversations/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setConversations(prev => prev.filter(conv => conv.id !== id))
        if (currentConversation?.id === id) {
          setCurrentConversation(null)
          setMessages([])
        }
      }
    } catch (error) {
      console.error('Error deleting conversation:', error)
    }
  }, [currentConversation])

  const renameConversation = useCallback(async (id: string, title: string) => {
    try {
      const response = await fetch(`/api/conversations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      })
      
      if (response.ok) {
        setConversations(prev => 
          prev.map(conv => 
            conv.id === id ? { ...conv, title } : conv
          )
        )
        if (currentConversation?.id === id) {
          setCurrentConversation(prev => prev ? { ...prev, title } : null)
        }
      }
    } catch (error) {
      console.error('Error renaming conversation:', error)
    }
  }, [currentConversation])

  const sendMessage = useCallback(async (content: string, conversationId?: string) => {
    if (isLoading) return

    setIsLoading(true)
    setStreamingMessage('')
    
    // Add user message to UI immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'USER',
      conversationId: conversationId || '',
      createdAt: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])

    try {
      // Create abort controller for this request
      abortControllerRef.current = new AbortController()

      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          conversationId
        }),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6))
                
                if (data.content) {
                  assistantContent += data.content
                  setStreamingMessage(assistantContent)
                }

                if (data.done) {
                  // Add final assistant message to messages
                  const assistantMessage: Message = {
                    id: data.messageId || Date.now().toString(),
                    content: assistantContent,
                    role: 'ASSISTANT',
                    conversationId: data.conversationId,
                    createdAt: new Date()
                  }
                  
                  setMessages(prev => [...prev, assistantMessage])
                  setStreamingMessage('')
                  
                  // Update current conversation if new one was created
                  if (!conversationId && data.conversationId) {
                    await fetchConversations()
                    await fetchConversation(data.conversationId)
                  }
                }
              } catch (e) {
                console.error('Error parsing stream data:', e)
              }
            }
          }
        }
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Error sending message:', error)
        // Remove the user message if there was an error
        setMessages(prev => prev.slice(0, -1))
      }
    } finally {
      setIsLoading(false)
      setStreamingMessage('')
      abortControllerRef.current = null
    }
  }, [isLoading, fetchConversations, fetchConversation])

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setIsLoading(false)
      setStreamingMessage('')
    }
  }, [])

  const newChat = useCallback(() => {
    setCurrentConversation(null)
    setMessages([])
    setStreamingMessage('')
  }, [])

  return {
    conversations,
    currentConversation,
    messages,
    isLoading,
    streamingMessage,
    fetchConversations,
    fetchConversation,
    createConversation,
    deleteConversation,
    renameConversation,
    sendMessage,
    stopGeneration,
    newChat
  }
}