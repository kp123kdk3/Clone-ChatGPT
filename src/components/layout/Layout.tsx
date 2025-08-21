'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { ChatWindow } from '../chat/ChatWindow'
import { Landing } from '../chat/Landing'
import { Message, Conversation } from '@/types/chat'
import { Menu, X } from 'lucide-react'

interface LayoutProps {
  messages: Message[]
  conversation?: Conversation | null
  onSendMessage: (message: string) => void
  isLoading?: boolean
  onStopGeneration?: () => void
  onRegenerateResponse?: () => void
  onNewChat: () => void
  conversations: Conversation[]
  onSelectConversation: (id: string) => void
  onDeleteConversation: (id: string) => void
  onRenameConversation: (id: string, title: string) => void
}

export function Layout({
  messages,
  conversation,
  onSendMessage,
  isLoading = false,
  onStopGeneration,
  onRegenerateResponse,
  onNewChat,
  conversations,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation
}: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Show landing when no conversation is active
  const showLanding = !conversation && messages.length === 0

  return (
    <div className="flex h-screen bg-futuristic-dark">
      {/* Mobile menu button */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50 lg:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-gradient-glass backdrop-blur-xl border border-white/10 shadow-glass hover:shadow-futuristic text-white transition-all duration-300 hover:scale-105"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobile 
          ? `fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`
          : 'relative'
        }
      `}>
        <Sidebar
          conversations={conversations}
          currentConversationId={conversation?.id}
          onNewChat={onNewChat}
          onSelectConversation={(id) => {
            onSelectConversation(id)
            setIsSidebarOpen(false)
          }}
          onDeleteConversation={onDeleteConversation}
          onRenameConversation={onRenameConversation}
        />
      </div>

      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {showLanding ? (
          <Landing onSendMessage={onSendMessage} />
        ) : (
          <ChatWindow
            conversation={conversation}
            messages={messages}
            onSendMessage={onSendMessage}
            isLoading={isLoading}
            onStopGeneration={onStopGeneration}
            onRegenerateResponse={onRegenerateResponse}
          />
        )}
      </div>
    </div>
  )
}
