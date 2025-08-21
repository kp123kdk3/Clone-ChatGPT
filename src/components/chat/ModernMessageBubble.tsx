'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { 
  Copy, 
  Check, 
  User, 
  Bot,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Share
} from 'lucide-react'
import { Message } from '@/types/chat'
import { cn } from '@/lib/utils'

interface ModernMessageBubbleProps {
  message: Message
  onRegenerateResponse?: () => void
  isLastMessage?: boolean
}

export function ModernMessageBubble({ 
  message, 
  onRegenerateResponse,
  isLastMessage = false 
}: ModernMessageBubbleProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [showActions, setShowActions] = useState(false)
  
  const isUser = message.role === 'USER'
  const isAssistant = message.role === 'ASSISTANT'

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const CodeBlock = ({ language, value, ...props }: any) => {
    const codeId = `code-${Math.random()}`
    
    return (
      <div className="relative group">
        <div className="flex items-center justify-between bg-gray-800 px-4 py-2 text-xs text-gray-300 rounded-t-lg">
          <span>{language || 'code'}</span>
          <button
            onClick={() => copyToClipboard(value, codeId)}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
          >
            {copiedCode === codeId ? (
              <>
                <Check className="h-3 w-3" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy code</span>
              </>
            )}
          </button>
        </div>
        <SyntaxHighlighter
          style={oneDark}
          language={language}
          PreTag="div"
          className="!mt-0 !rounded-t-none"
          {...props}
        >
          {String(value).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    )
  }

  const InlineCode = ({ children, ...props }: any) => (
    <code 
      className="bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  )

  return (
    <div
      className={cn(
        'group relative py-6 px-4 transition-colors',
        isUser 
          ? 'bg-transparent' 
          : 'bg-gray-50 dark:bg-gray-800/50'
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="max-w-4xl mx-auto flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center text-white',
            isUser 
              ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
              : 'bg-gradient-to-br from-green-500 to-emerald-600'
          )}>
            {isUser ? (
              <User className="h-4 w-4" />
            ) : (
              <Bot className="h-4 w-4" />
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <span className={cn(
              'font-semibold text-sm',
              isUser ? 'text-gray-900 dark:text-gray-100' : 'text-gray-900 dark:text-gray-100'
            )}>
              {isUser ? 'You' : 'ChatGPT'}
            </span>
          </div>
          
          <div className={cn(
            'prose prose-sm max-w-none',
            'dark:prose-invert',
            'prose-p:leading-relaxed prose-p:mb-3',
            'prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700',
            'prose-code:text-red-600 dark:prose-code:text-red-400',
            'prose-code:bg-gray-100 dark:prose-code:bg-gray-800',
            'prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm',
            'prose-code:before:content-none prose-code:after:content-none',
            'prose-strong:text-gray-900 dark:prose-strong:text-gray-100',
            'prose-ul:mb-3 prose-ol:mb-3',
            'prose-li:mb-1',
            'prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20',
            'prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:my-4'
          )}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  const language = match ? match[1] : ''
                  
                  return !inline && language ? (
                    <CodeBlock
                      language={language}
                      value={String(children).replace(/\n$/, '')}
                      {...props}
                    />
                  ) : (
                    <InlineCode {...props}>
                      {children}
                    </InlineCode>
                  )
                },
                p({ children }) {
                  return <p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-3 last:mb-0">{children}</p>
                },
                ul({ children }) {
                  return <ul className="text-gray-800 dark:text-gray-200 space-y-1 mb-3">{children}</ul>
                },
                ol({ children }) {
                  return <ol className="text-gray-800 dark:text-gray-200 space-y-1 mb-3">{children}</ol>
                },
                li({ children }) {
                  return <li className="text-gray-800 dark:text-gray-200">{children}</li>
                },
                h1({ children }) {
                  return <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{children}</h1>
                },
                h2({ children }) {
                  return <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">{children}</h2>
                },
                h3({ children }) {
                  return <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2">{children}</h3>
                },
                strong({ children }) {
                  return <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>
                },
                blockquote({ children }) {
                  return (
                    <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 pl-4 py-2 my-4 text-gray-700 dark:text-gray-300 italic">
                      {children}
                    </blockquote>
                  )
                }
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>

          {/* Message Actions */}
          {isAssistant && (showActions || isLastMessage) && (
            <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                <ThumbsUp className="h-4 w-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                <ThumbsDown className="h-4 w-4" />
              </button>
              <button 
                onClick={() => copyToClipboard(message.content, `message-${message.id}`)}
                className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                {copiedCode === `message-${message.id}` ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
              {isLastMessage && onRegenerateResponse && (
                <button 
                  onClick={onRegenerateResponse}
                  className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
              <button className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                <Share className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}