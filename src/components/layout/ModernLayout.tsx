'use client'

import { useState, useEffect } from 'react'
import { ModernSidebar } from './ModernSidebar'
import { ModernChatWindow } from '../chat/ModernChatWindow'
import { Message, Conversation } from '@/types/chat'
import { Menu } from 'lucide-react'

interface Chat {
  id: string
  title: string
  updatedAt: Date
}

interface ModernLayoutProps {
  messages: Message[]
  conversation?: Conversation | null
  onSendMessage: (message: string) => void
  isLoading?: boolean
  onStopGeneration?: () => void
  onRegenerateResponse?: () => void
  onNewChat: () => void
}

export function ModernLayout({
  messages,
  conversation,
  onSendMessage,
  isLoading = false,
  onStopGeneration,
  onRegenerateResponse,
  onNewChat
}: ModernLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Mock chat history - in a real app, this would come from props or context
  const [chats] = useState<Chat[]>([
    {
      id: 'demo',
      title: 'Demo Conversation',
      updatedAt: new Date()
    },
    {
      id: '1',
      title: 'Help with React components',
      updatedAt: new Date(Date.now() - 86400000) // 1 day ago
    },
    {
      id: '2',
      title: 'Explain quantum computing',
      updatedAt: new Date(Date.now() - 172800000) // 2 days ago
    },
    {
      id: '3',
      title: 'Plan weekend trip to Paris',
      updatedAt: new Date(Date.now() - 259200000) // 3 days ago
    },
    {
      id: '4',
      title: 'Debug Python code errors',
      updatedAt: new Date(Date.now() - 345600000) // 4 days ago
    },
    {
      id: '5',
      title: 'Write a professional email',
      updatedAt: new Date(Date.now() - 432000000) // 5 days ago
    }
  ])

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSelectChat = (chatId: string) => {
    console.log('Select chat:', chatId)
    // In a real app, this would load the selected conversation
    setIsSidebarOpen(false)
  }

  const handleDeleteChat = (chatId: string) => {
    console.log('Delete chat:', chatId)
    // In a real app, this would delete the conversation
  }

  const handleRenameChat = (chatId: string, newTitle: string) => {
    console.log('Rename chat:', chatId, 'to:', newTitle)
    // In a real app, this would rename the conversation
  }

  const handleNewChatClick = () => {
    onNewChat()
    setIsSidebarOpen(false)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Mobile menu button */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50 lg:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
          >
            <Menu className="h-5 w-5" />
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
        <ModernSidebar
          chats={chats}
          currentChatId={conversation?.id || 'demo'}
          onNewChat={handleNewChatClick}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
          onRenameChat={handleRenameChat}
          isCollapsed={false}
          onToggleCollapse={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <ModernChatWindow
          conversation={conversation}
          messages={messages}
          onSendMessage={onSendMessage}
          isLoading={isLoading}
          onStopGeneration={onStopGeneration}
          onRegenerateResponse={onRegenerateResponse}
        />
      </div>
    </div>
  )
}