'use client'

import { useEffect, useRef } from 'react'
import { MessageBubble } from './MessageBubble'
import { InputBox } from './InputBox'
import { Message, Conversation } from '@/types/chat'
import { Button } from '@/components/ui/Button'
import { RotateCcw, Sparkles } from 'lucide-react'

interface ChatWindowProps {
  conversation?: Conversation | null
  messages: Message[]
  onSendMessage: (message: string, conversationId?: string) => void
  isLoading?: boolean
  onStopGeneration?: () => void
  onRegenerateResponse?: () => void
}

export function ChatWindow({
  conversation,
  messages,
  onSendMessage,
  isLoading = false,
  onStopGeneration,
  onRegenerateResponse
}: ChatWindowProps) {
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
    <div className="flex-1 flex flex-col bg-gradient-dark">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto">
        {allMessages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center space-y-6 max-w-3xl">
              <div className="mb-8">
                <h1 className="text-4xl font-futuristic font-bold bg-gradient-to-r from-futuristic-primary via-futuristic-secondary to-futuristic-accent bg-clip-text text-transparent mb-2">
                  Start a new conversation
                </h1>
                <p className="text-xl text-gray-300">
                  Type your first message below to begin chatting
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            {allMessages.map((message, index) => (
              <MessageBubble 
                key={message.id} 
                message={message} 
                isLast={index === allMessages.length - 1}
              />
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
                  className="text-gray-400 hover:text-futuristic-primary border-white/20 hover:border-futuristic-primary/50 bg-gradient-glass backdrop-blur-sm hover:bg-white/10 transition-all duration-300 rounded-xl"
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
