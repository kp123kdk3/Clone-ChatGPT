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
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="relative flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Send a message..."
              disabled={disabled}
              className={cn(
                'w-full resize-none rounded-lg border border-gray-300 dark:border-gray-600',
                'bg-white dark:bg-gray-800 px-4 py-3 pr-12',
                'text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400',
                'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'min-h-[44px] max-h-[200px]'
              )}
              style={{ height: 'auto' }}
            />
          </div>
          
          {isLoading ? (
            <Button
              onClick={handleStop}
              variant="outline"
              size="icon"
              className="flex-shrink-0 h-11 w-11"
              disabled={disabled}
            >
              <Square className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!message.trim() || disabled}
              size="icon"
              className="flex-shrink-0 h-11 w-11 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
          Press Shift + Enter for new line
        </div>
      </div>
    </div>
  )
}