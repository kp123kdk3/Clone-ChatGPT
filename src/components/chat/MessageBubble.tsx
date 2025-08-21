'use client'

import { Message } from '@/types/chat'
import { cn } from '@/lib/utils'
import { User, Bot, Sparkles } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MessageBubbleProps {
  message: Message
  isLast?: boolean
}

export function MessageBubble({ message, isLast = false }: MessageBubbleProps) {
  const isUser = message.role === 'USER'
  
  return (
    <div className={cn(
      'group w-full border-b border-white/5 transition-all duration-300 animate-fadeIn',
      isUser ? 'bg-gradient-dark' : 'bg-gradient-glass'
    )}>
      <div className="flex gap-4 max-w-4xl mx-auto px-4 py-6">
        <div className="flex-shrink-0">
          <div className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110',
            isUser 
              ? 'bg-gradient-to-r from-futuristic-primary to-futuristic-secondary text-white shadow-neon group-hover:shadow-futuristic-lg' 
              : 'bg-gradient-to-r from-futuristic-accent to-futuristic-primary text-white shadow-neon group-hover:shadow-futuristic-lg'
          )}>
            {isUser ? (
              <User className="h-5 w-5" />
            ) : (
              <Bot className="h-5 w-5" />
            )}
          </div>
        </div>
        <div className="flex-1 space-y-2 overflow-hidden">
          <div className="prose max-w-none dark:prose-invert prose-sm">
            {isUser ? (
              <div className="whitespace-pre-wrap break-words text-white leading-relaxed">
                {message.content}
              </div>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-xl border border-white/10 shadow-glass"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className="bg-white/10 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-sm font-mono border border-white/20" {...props}>
                        {children}
                      </code>
                    )
                  },
                  p({ children }) {
                    return <p className="mb-4 last:mb-0 text-white leading-relaxed">{children}</p>
                  },
                  ul({ children }) {
                    return <ul className="list-disc list-inside mb-4 last:mb-0 space-y-1 text-white">{children}</ul>
                  },
                  ol({ children }) {
                    return <ol className="list-decimal list-inside mb-4 last:mb-0 space-y-1 text-white">{children}</ol>
                  },
                  li({ children }) {
                    return <li className="text-white">{children}</li>
                  },
                  blockquote({ children }) {
                    return (
                      <blockquote className="border-l-4 border-futuristic-primary/50 pl-4 italic text-gray-300 mb-4 bg-gradient-glass backdrop-blur-sm rounded-r-lg p-3">
                        {children}
                      </blockquote>
                    )
                  },
                  h1({ children }) {
                    return <h1 className="text-2xl font-bold mb-4 text-white bg-gradient-to-r from-futuristic-primary to-futuristic-secondary bg-clip-text text-transparent">{children}</h1>
                  },
                  h2({ children }) {
                    return <h2 className="text-xl font-bold mb-3 text-white bg-gradient-to-r from-futuristic-primary to-futuristic-secondary bg-clip-text text-transparent">{children}</h2>
                  },
                  h3({ children }) {
                    return <h3 className="text-lg font-bold mb-2 text-white bg-gradient-to-r from-futuristic-primary to-futuristic-secondary bg-clip-text text-transparent">{children}</h3>
                  },
                  table({ children }) {
                    return (
                      <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border border-white/20 rounded-lg overflow-hidden">
                          {children}
                        </table>
                      </div>
                    )
                  },
                  th({ children }) {
                    return (
                      <th className="border border-white/20 px-3 py-2 bg-gradient-glass backdrop-blur-sm text-left text-sm font-medium text-white">
                        {children}
                      </th>
                    )
                  },
                  td({ children }) {
                    return (
                      <td className="border border-white/20 px-3 py-2 text-sm text-white">
                        {children}
                      </td>
                    )
                  },
                  a({ children, href }) {
                    return (
                      <a href={href} className="text-futuristic-primary hover:text-futuristic-secondary underline decoration-futuristic-primary/50 hover:decoration-futuristic-secondary transition-all duration-300">
                        {children}
                      </a>
                    )
                  },
                  strong({ children }) {
                    return <strong className="text-white font-semibold">{children}</strong>
                  },
                  em({ children }) {
                    return <em className="text-gray-300 italic">{children}</em>
                  }
                }}
                className="text-white"
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}