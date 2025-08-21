'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Send, Square } from 'lucide-react'
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
    <div className="bg-white dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Message ChatGPT..."
              disabled={disabled}
              className={cn(
                'w-full resize-none rounded-2xl border border-gray-300 dark:border-gray-600',
                'bg-white dark:bg-gray-800 px-4 py-3 pr-12',
                'text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400',
                'focus:border-gray-400 dark:focus:border-gray-500 focus:outline-none',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'min-h-[52px] max-h-[200px] text-base'
              )}
              style={{ height: 'auto' }}
            />
            
            {isLoading ? (
              <button
                onClick={handleStop}
                className="absolute right-3 bottom-3 w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                disabled={disabled}
              >
                <Square className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!message.trim() || disabled}
                className={cn(
                  "absolute right-3 bottom-3 w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                  message.trim() && !disabled 
                    ? "bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-200" 
                    : "bg-gray-200 dark:bg-gray-700"
                )}
              >
                <Send className={cn(
                  "h-4 w-4",
                  message.trim() && !disabled 
                    ? "text-white dark:text-gray-900" 
                    : "text-gray-400 dark:text-gray-500"
                )} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}