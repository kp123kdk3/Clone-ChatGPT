'use client'

import { Message } from '@/types/chat'
import { cn } from '@/lib/utils'
import { User, Bot } from 'lucide-react'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'USER'
  
  return (
    <div className={cn(
      'group w-full border-b border-black/10 dark:border-gray-900/50',
      isUser ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
    )}>
      <div className="flex gap-4 max-w-4xl mx-auto px-4 py-6">
        <div className="flex-shrink-0">
          <div className={cn(
            'flex h-8 w-8 items-center justify-center rounded-sm',
            isUser 
              ? 'bg-blue-500 text-white' 
              : 'bg-green-500 text-white'
          )}>
            {isUser ? (
              <User className="h-4 w-4" />
            ) : (
              <Bot className="h-4 w-4" />
            )}
          </div>
        </div>
        <div className="flex-1 space-y-2 overflow-hidden">
          <div className="prose max-w-none dark:prose-invert">
            <div className="whitespace-pre-wrap break-words">
              {message.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}