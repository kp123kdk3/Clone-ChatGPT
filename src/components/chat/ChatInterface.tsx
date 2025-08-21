'use client'

import { useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
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
  const { data: session } = useSession()
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

  if (!session) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Welcome to ChatGPT Clone
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please sign in to start chatting
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto">
        {allMessages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center space-y-4 max-w-2xl">
              <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100">
                ChatGPT Clone
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                How can I help you today?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    💡 Creative Writing
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Help me write a story or poem
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    🤔 Problem Solving
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Work through a complex problem
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    📚 Learning
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Explain a concept or topic
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    💻 Coding
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Help with programming tasks
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
        disabled={!session}
      />
    </div>
  )
}