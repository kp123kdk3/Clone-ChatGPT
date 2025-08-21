'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Send, Square, Plus, Mic, Volume2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InputBoxProps {
  onSendMessage: (message: string) => void
  isLoading?: boolean
  onStopGeneration?: () => void
  disabled?: boolean
}

export function InputBox({ 
  onSendMessage, 
  isLoading = false, 
  onStopGeneration,
  disabled = false 
}: InputBoxProps) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = () => {
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    
    // Auto-resize textarea
    const textarea = e.target
    textarea.style.height = 'auto'
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'
  }

  const handleStop = () => {
    if (onStopGeneration) {
      onStopGeneration()
    }
  }

  return (
    <div className="bg-gradient-dark border-t border-white/10 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Input container with futuristic styling */}
          <div className="relative bg-gradient-glass backdrop-blur-xl border border-white/20 rounded-2xl shadow-glass hover:shadow-futuristic-lg transition-all duration-500 focus-within:border-futuristic-primary/50 focus-within:shadow-futuristic-lg group">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              disabled={disabled}
              className={cn(
                'w-full resize-none rounded-2xl border-0 bg-transparent px-6 py-4 pr-40',
                'text-white placeholder-gray-400',
                'focus:outline-none focus:ring-0',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'min-h-[60px] max-h-[200px] text-lg leading-relaxed font-medium'
              )}
              style={{ height: 'auto' }}
            />
            
            {/* Action buttons - futuristic styling */}
            <div className="absolute right-3 bottom-3 flex items-center space-x-2">
              {/* Plus button (attachment) */}
              <button
                className="p-2 text-gray-400 hover:text-futuristic-primary transition-all duration-300 rounded-xl hover:bg-white/10 hover:scale-110 group/btn"
                disabled={disabled}
              >
                <Plus className="h-4 w-4 group-hover/btn:rotate-90 transition-transform duration-300" />
              </button>
              
              {/* Microphone button */}
              <button
                className="p-2 text-gray-400 hover:text-futuristic-primary transition-all duration-300 rounded-xl hover:bg-white/10 hover:scale-110 group/btn"
                disabled={disabled}
              >
                <Mic className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
              </button>
              
              {/* Audio levels icon */}
              <button
                className="p-2 text-gray-400 hover:text-futuristic-primary transition-all duration-300 rounded-xl hover:bg-white/10 hover:scale-110 group/btn"
                disabled={disabled}
              >
                <Volume2 className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
              </button>
              
              {/* Send/Stop button */}
              {isLoading ? (
                <button
                  onClick={handleStop}
                  className="p-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-300 flex items-center justify-center shadow-neon hover:shadow-futuristic-lg hover:scale-105"
                  disabled={disabled}
                >
                  <Square className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!message.trim() || disabled}
                  className={cn(
                    "p-3 rounded-xl transition-all duration-300 flex items-center justify-center shadow-neon hover:shadow-futuristic-lg hover:scale-105",
                    message.trim() && !disabled 
                      ? "bg-gradient-to-r from-futuristic-primary to-futuristic-secondary text-white hover:from-futuristic-primary/90 hover:to-futuristic-secondary/90" 
                      : "bg-white/10 text-gray-500 cursor-not-allowed border border-white/20"
                  )}
                >
                  <Send className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
          
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-futuristic-primary/20 via-futuristic-secondary/20 to-futuristic-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        </div>
        
        {/* Helper text */}
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-400">
            Press <kbd className="px-2 py-1 bg-white/10 rounded-lg text-xs">Enter</kbd> to send, <kbd className="px-2 py-1 bg-white/10 rounded-lg text-xs">Shift + Enter</kbd> for new line
          </p>
        </div>
      </div>
    </div>
  )
}