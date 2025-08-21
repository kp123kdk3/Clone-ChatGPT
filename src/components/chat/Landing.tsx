'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Sparkles, Zap, Code, Plane, BookOpen, Lightbulb } from 'lucide-react'

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
    <div className="relative flex-1 flex items-center justify-center bg-gradient-dark overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-futuristic-primary rounded-full opacity-20 animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${20 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Gradient mesh overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-futuristic-primary/10 via-transparent to-futuristic-secondary/10" />

      <div className="relative z-10 w-full max-w-4xl px-6 text-center">
        {/* Main heading */}
        <div className="mb-12 animate-fadeIn">
          <h1 className="text-5xl md:text-7xl font-futuristic font-bold bg-gradient-to-r from-futuristic-primary via-futuristic-secondary to-futuristic-accent bg-clip-text text-transparent mb-6">
            What's on your mind today?
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Ask me anything. I'm here to help you explore, create, and discover.
          </p>
        </div>

        {/* Centered input box */}
        <div className="mb-12 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="relative max-w-3xl mx-auto">
            <div className="relative bg-gradient-glass backdrop-blur-xl border border-white/10 rounded-2xl shadow-glass hover:shadow-futuristic-lg transition-all duration-500 group">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                className="w-full bg-transparent border-0 rounded-2xl px-6 py-4 pr-20 text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-0 resize-none min-h-[60px] max-h-[200px] leading-relaxed"
                style={{ height: 'auto' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = 'auto'
                  target.style.height = Math.min(target.scrollHeight, 200) + 'px'
                }}
              />
              
              {/* Send button */}
              <button
                onClick={handleSubmit}
                disabled={!message.trim()}
                className="absolute right-3 bottom-3 p-3 bg-gradient-to-r from-futuristic-primary to-futuristic-secondary rounded-xl text-white shadow-neon hover:shadow-futuristic-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover:scale-105"
              >
                <Sparkles className="h-5 w-5" />
              </button>
            </div>
            
            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-futuristic-primary/20 via-futuristic-secondary/20 to-futuristic-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          </div>
        </div>

        {/* Suggested prompts */}
        <div className="animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <p className="text-gray-400 mb-6 text-lg">Try asking me about:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt.text)}
                className="group relative p-4 bg-gradient-glass backdrop-blur-xl border border-white/10 rounded-xl hover:border-futuristic-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-futuristic"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${prompt.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <prompt.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                    {prompt.text}
                  </span>
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-futuristic-primary/10 to-futuristic-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </button>
            ))}
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-futuristic-primary/20 to-futuristic-secondary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-futuristic-accent/20 to-futuristic-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  )
}
