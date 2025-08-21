'use client'

import { useEffect, useRef } from 'react'
import { MessageBubble } from './MessageBubble'
import { InputBox } from './InputBox'
import { Message, Conversation } from '@/types/chat'
import { Button } from '@/components/ui/Button'
import { RotateCcw } from 'lucide-react'

interface ChatInterfaceProps {
  conversation?: Conversation | null
  messages: Message[]
  onSendMessage: (message: string, conversationId?: string) => void
  isLoading?: boolean
  onStopGeneration?: () => void
  onRegenerateResponse?: () => void
}

export function ChatInterface({
  conversation,
  messages,
  onSendMessage,
  isLoading = false,
  onStopGeneration,
  onRegenerateResponse
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (message: string) => {
    onSendMessage(message, conversation?.id)
  }

  const allMessages = [...messages]

  return (
    <div className="flex-1 flex flex-col">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto">
        {allMessages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center space-y-6 max-w-3xl">
              <div className="mb-8">
                <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h1 className="text-3xl font-medium text-gray-800 dark:text-gray-100 mb-2">
                  How can I help you today?
                </h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200 group">
                  <p className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                    Write a thank you note to my colleague for helping me with a project
                  </p>
                </div>
                <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200 group">
                  <p className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                    Explain quantum computing in simple terms
                  </p>
                </div>
                <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200 group">
                  <p className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                    Help me debug this Python code
                  </p>
                </div>
                <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200 group">
                  <p className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                    Plan a weekend trip to Paris
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            {allMessages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            {/* Regenerate button for last assistant message */}
            {!isLoading && 
             allMessages.length > 0 && 
             allMessages[allMessages.length - 1].role === 'ASSISTANT' && 
             onRegenerateResponse && (
              <div className="max-w-4xl mx-auto px-4 py-2">
                <Button
                  onClick={onRegenerateResponse}
                  variant="outline"
                  size="sm"
                  className="text-gray-600 dark:text-gray-400"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Regenerate response
                </Button>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <InputBox
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        onStopGeneration={onStopGeneration}
        disabled={false}
      />
    </div>
  )
}