'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Square, Paperclip, Mic } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModernInputBoxProps {
  onSendMessage: (message: string) => void
  isLoading?: boolean
  onStopGeneration?: () => void
  disabled?: boolean
  placeholder?: string
}

export function ModernInputBox({ 
  onSendMessage, 
  isLoading = false, 
  onStopGeneration,
  disabled = false,
  placeholder = "Message ChatGPT..."
}: ModernInputBoxProps) {
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'
    const scrollHeight = textarea.scrollHeight
    const maxHeight = 200 // Maximum height in pixels
    
    if (scrollHeight > maxHeight) {
      textarea.style.height = `${maxHeight}px`
      textarea.style.overflowY = 'auto'
    } else {
      textarea.style.height = `${scrollHeight}px`
      textarea.style.overflowY = 'hidden'
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [message])

  const handleSubmit = () => {
    const trimmedMessage = message.trim()
    if (trimmedMessage && !isLoading && !disabled) {
      onSendMessage(trimmedMessage)
      setMessage('')
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow new line with Shift+Enter
        return
      } else {
        // Send message with Enter
        e.preventDefault()
        handleSubmit()
      }
    }
  }

  const handleStop = () => {
    if (onStopGeneration) {
      onStopGeneration()
    }
  }

  const canSend = message.trim() && !disabled && !isLoading

  return (
    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto p-4">
        <div 
          ref={containerRef}
          className={cn(
            'relative rounded-3xl border transition-all duration-200',
            isFocused 
              ? 'border-gray-300 dark:border-gray-600 shadow-sm' 
              : 'border-gray-200 dark:border-gray-700',
            'bg-white dark:bg-gray-800'
          )}
        >
          {/* Main input area */}
          <div className="flex items-end gap-3 p-3">
            {/* Attachment button */}
            <button
              className="flex-shrink-0 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={disabled}
              title="Attach files"
            >
              <Paperclip className="h-5 w-5" />
            </button>

            {/* Text input */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                disabled={disabled}
                rows={1}
                className={cn(
                  'w-full resize-none border-0 bg-transparent py-2 px-0',
                  'text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400',
                  'focus:outline-none focus:ring-0',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'text-base leading-6'
                )}
                style={{
                  minHeight: '24px',
                  maxHeight: '200px'
                }}
              />
            </div>

            {/* Voice input button */}
            {!canSend && !isLoading && (
              <button
                className="flex-shrink-0 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={disabled}
                title="Voice input"
              >
                <Mic className="h-5 w-5" />
              </button>
            )}

            {/* Send/Stop button */}
            {isLoading ? (
              <button
                onClick={handleStop}
                className="flex-shrink-0 p-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
                title="Stop generating"
              >
                <Square className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canSend}
                className={cn(
                  'flex-shrink-0 p-2 rounded-xl transition-all duration-200',
                  canSend
                    ? 'bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 shadow-sm'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                )}
                title={canSend ? "Send message" : "Type a message to send"}
              >
                <Send className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Footer text */}
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ChatGPT can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  )
}