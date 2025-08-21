'use client'

import { useState } from 'react'
import { 
  Plus, 
  MessageSquare, 
  Settings, 
  User, 
  MoreHorizontal, 
  Edit3, 
  Trash2,
  Menu,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Chat {
  id: string
  title: string
  updatedAt: Date
}

interface ModernSidebarProps {
  chats: Chat[]
  currentChatId?: string
  onNewChat: () => void
  onSelectChat: (chatId: string) => void
  onDeleteChat: (chatId: string) => void
  onRenameChat: (chatId: string, newTitle: string) => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export function ModernSidebar({
  chats,
  currentChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onRenameChat,
  isCollapsed = false,
  onToggleCollapse
}: ModernSidebarProps) {
  const [editingChatId, setEditingChatId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null)

  const handleStartEditing = (chat: Chat) => {
    setEditingChatId(chat.id)
    setEditingTitle(chat.title)
  }

  const handleSaveEdit = () => {
    if (editingChatId && editingTitle.trim()) {
      onRenameChat(editingChatId, editingTitle.trim())
    }
    setEditingChatId(null)
    setEditingTitle('')
  }

  const handleCancelEdit = () => {
    setEditingChatId(null)
    setEditingTitle('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit()
    } else if (e.key === 'Escape') {
      handleCancelEdit()
    }
  }

  if (isCollapsed) {
    return (
      <div className="w-16 bg-gray-900 flex flex-col border-r border-gray-800 shadow-lg">
        <div className="p-2">
          <button
            onClick={onToggleCollapse}
            className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-gray-800 text-gray-300 hover:text-white transition-all duration-200 group"
            title="Expand sidebar"
          >
            <Menu className="h-5 w-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
        
        <div className="p-2">
          <button
            onClick={onNewChat}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-800 hover:bg-gray-700 text-white transition-all duration-200 shadow-sm hover:shadow-md group"
            title="New chat"
          >
            <Plus className="h-5 w-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="flex-1"></div>

        <div className="p-2 border-t border-gray-800">
          <button 
            className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-gray-800 text-gray-300 hover:text-white transition-all duration-200 group"
            title="Settings"
          >
            <Settings className="h-5 w-5 group-hover:scale-110 transition-transform group-hover:rotate-90" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-64 bg-gray-900 flex flex-col border-r border-gray-800 shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-xl hover:bg-gray-800 text-gray-300 hover:text-white transition-all duration-200 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
          <h1 className="text-white font-bold text-xl tracking-tight">ChatGPT</h1>
          <div className="w-6 lg:hidden"></div>
        </div>
        
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white transition-all duration-200 shadow-sm hover:shadow-md group border border-gray-700 hover:border-gray-600"
        >
          <Plus className="h-4 w-4 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-semibold">New chat</span>
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400 px-4">
            <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 opacity-60" />
            </div>
            <p className="text-sm font-medium mb-1">No conversations yet</p>
            <p className="text-xs opacity-75 text-center leading-relaxed">Start a new chat to begin your conversation</p>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={cn(
                'group relative flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 border',
                currentChatId === chat.id
                  ? 'bg-gray-800 border-gray-700 shadow-sm'
                  : 'hover:bg-gray-800/60 border-transparent hover:border-gray-700/50'
              )}
              onMouseEnter={() => setHoveredChatId(chat.id)}
              onMouseLeave={() => setHoveredChatId(null)}
              onClick={() => !editingChatId && onSelectChat(chat.id)}
            >
              <div className={cn(
                'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                currentChatId === chat.id ? 'bg-gray-700' : 'bg-gray-800 group-hover:bg-gray-700'
              )}>
                <MessageSquare className="h-4 w-4 text-gray-300" />
              </div>
              
              {editingChatId === chat.id ? (
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onBlur={handleSaveEdit}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-gray-700 text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600 focus:border-blue-500"
                  autoFocus
                />
              ) : (
                <span className="flex-1 text-gray-200 text-sm font-medium truncate group-hover:text-white transition-colors">
                  {chat.title}
                </span>
              )}

              {!editingChatId && (hoveredChatId === chat.id || currentChatId === chat.id) && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleStartEditing(chat)
                    }}
                    className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-gray-200 transition-colors"
                    title="Rename chat"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteChat(chat.id)
                    }}
                    className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete chat"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-800 dark:border-gray-700">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-800 cursor-pointer transition-colors group">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-300 text-sm font-medium truncate">Demo User</p>
            <p className="text-gray-500 text-xs truncate">Free plan</p>
          </div>
          <MoreHorizontal className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  )
}