'use client'

import React, { useState } from 'react'
import { Sparkles, Zap, Code, Plane, BookOpen, Lightbulb, Send } from 'lucide-react'

interface LandingProps {
  onSendMessage: (message: string) => void
}

const suggestedPrompts = [
  { text: "Plan a trip to Japan", icon: Plane, color: "from-blue-500 to-cyan-500" },
  { text: "Explain quantum computing", icon: Lightbulb, color: "from-purple-500 to-pink-500" },
  { text: "Help me write a Python script", icon: Code, color: "from-green-500 to-emerald-500" },
  { text: "Summarize a research paper", icon: BookOpen, color: "from-orange-500 to-red-500" },
]

export function Landing({ onSendMessage }: LandingProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handlePromptClick = (prompt: string) => {
    onSendMessage(prompt)
  }

  return (
    <div className="relative flex-1 flex items-center justify-center bg-gradient-dark min-h-screen">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      
      {/* Main content container - perfectly centered */}
      <div className="relative z-10 w-full max-w-4xl px-6 text-center">
        
        {/* Main heading - perfectly centered with consistent spacing */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-lg md:text-xl font-semibold text-gray-200 mb-4">
            Ask me anything. I'm here to help you explore, create, and discover.
          </h1>
        </div>

        {/* Search bar - perfectly centered with max-width and responsive design */}
        <div className="mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="relative max-w-2xl w-full mx-auto">
            <div className="flex items-center rounded-xl border border-gray-600 bg-gray-800 px-4 py-3 shadow-lg focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything…"
                className="w-full bg-transparent border-0 rounded-xl px-0 py-0 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-0 resize-none min-h-[48px] max-h-[200px] leading-relaxed text-base"
                style={{ height: 'auto' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = 'auto'
                  target.style.height = Math.min(target.scrollHeight, 200) + 'px'
                }}
                aria-label="Ask anything input field"
              />
              
              {/* Send button - perfectly aligned */}
              <button
                onClick={handleSubmit}
                disabled={!message.trim()}
                className="ml-3 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white transition-all duration-200 ease-in-out flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Suggested prompts - perfectly aligned grid with responsive design */}
        <div className="animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 max-w-4xl mx-auto">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt.text)}
                className="min-w-[200px] h-12 flex items-center justify-center rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg group"
                aria-label={`Quick prompt: ${prompt.text}`}
              >
                <div className="flex items-center gap-2 px-3">
                  <div className={`p-2 rounded-md bg-gradient-to-r ${prompt.color} shadow-sm`}>
                    <prompt.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-200">
                    {prompt.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Additional info text */}
        <div className="mt-8 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <p className="text-sm text-gray-400">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  )
}
