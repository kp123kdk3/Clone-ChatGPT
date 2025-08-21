'use client'

import { useEffect, useRef } from 'react'
import { ModernMessageBubble } from './ModernMessageBubble'
import { ModernInputBox } from './ModernInputBox'
import { Message, Conversation } from '@/types/chat'
import { Sparkles, Lightbulb, Code, PenTool } from 'lucide-react'

interface ModernChatWindowProps {
  conversation?: Conversation | null
  messages: Message[]
  onSendMessage: (message: string) => void
  isLoading?: boolean
  onStopGeneration?: () => void
  onRegenerateResponse?: () => void
}

const EXAMPLE_PROMPTS = [
  {
    icon: PenTool,
    title: "Write a thank you note to my colleague for helping me with a project",
    category: "Writing"
  },
  {
    icon: Lightbulb,
    title: "Explain quantum computing in simple terms",
    category: "Learning"
  },
  {
    icon: Code,
    title: "Help me debug this Python code",
    category: "Programming"
  },
  {
    icon: Sparkles,
    title: "Plan a weekend trip to Paris",
    category: "Planning"
  }
]

export function ModernChatWindow({
  conversation,
  messages,
  onSendMessage,
  isLoading = false,
  onStopGeneration,
  onRegenerateResponse
}: ModernChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior })
  }

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom()
  }, [messages])

  const handleExamplePrompt = (prompt: string) => {
    onSendMessage(prompt)
  }

  const hasMessages = messages.length > 0

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
      {/* Chat Messages Area */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto"
      >
        {!hasMessages ? (
          /* Welcome Screen */
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-2xl w-full text-center space-y-8">
              {/* Logo and Title */}
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                  How can I help you today?
                </h1>
              </div>

              {/* Example Prompts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {EXAMPLE_PROMPTS.map((prompt, index) => {
                  const IconComponent = prompt.icon
                  return (
                    <button
                      key={index}
                      onClick={() => handleExamplePrompt(prompt.title)}
                      className="group p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 text-left"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                          <IconComponent className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white">
                            {prompt.title}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                <div className="text-center space-y-2">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl mx-auto flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Creative & helpful</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    I can assist with writing, analysis, math, coding, and more.
                  </p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl mx-auto flex items-center justify-center">
                    <Code className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Code assistance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Debug code, explain concepts, and help build applications.
                  </p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl mx-auto flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Versatile support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    From brainstorming to learning, I'm here to help you succeed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Messages */
          <div className="w-full">
            {messages.map((message, index) => (
              <ModernMessageBubble
                key={message.id}
                message={message}
                onRegenerateResponse={
                  index === messages.length - 1 && message.role === 'ASSISTANT' 
                    ? onRegenerateResponse 
                    : undefined
                }
                isLastMessage={index === messages.length - 1}
              />
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="py-6 px-4 bg-gray-50 dark:bg-gray-800/50">
                <div className="max-w-4xl mx-auto flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-2">
                      <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                        ChatGPT
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <ModernInputBox
        onSendMessage={onSendMessage}
        isLoading={isLoading}
        onStopGeneration={onStopGeneration}
        disabled={false}
      />
    </div>
  )
}