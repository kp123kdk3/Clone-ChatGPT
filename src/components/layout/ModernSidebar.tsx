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
      <div className="w-16 bg-gray-900 dark:bg-gray-950 flex flex-col border-r border-gray-800 dark:border-gray-700">
        <div className="p-3">
          <button
            onClick={onToggleCollapse}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 dark:hover:bg-gray-800 text-gray-300 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-3">
          <button
            onClick={onNewChat}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1"></div>

        <div className="p-3 border-t border-gray-800 dark:border-gray-700">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 dark:hover:bg-gray-800 text-gray-300 transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-64 bg-gray-900 dark:bg-gray-950 flex flex-col border-r border-gray-800 dark:border-gray-700">
      {/* Header */}
      <div className="p-3 border-b border-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-800 text-gray-300 transition-colors lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
          <h1 className="text-white font-semibold text-lg">ChatGPT</h1>
          <div className="w-6 lg:hidden"></div>
        </div>
        
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors group"
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm font-medium">New chat</span>
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400">
            <MessageSquare className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">No conversations yet</p>
            <p className="text-xs opacity-75">Start a new chat to begin</p>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={cn(
                'group relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200',
                currentChatId === chat.id
                  ? 'bg-gray-800 dark:bg-gray-800'
                  : 'hover:bg-gray-800/50 dark:hover:bg-gray-800/50'
              )}
              onMouseEnter={() => setHoveredChatId(chat.id)}
              onMouseLeave={() => setHoveredChatId(null)}
              onClick={() => !editingChatId && onSelectChat(chat.id)}
            >
              <MessageSquare className="h-4 w-4 text-gray-400 flex-shrink-0" />
              
              {editingChatId === chat.id ? (
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onBlur={handleSaveEdit}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-gray-700 text-white text-sm rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
              ) : (
                <span className="flex-1 text-gray-300 text-sm truncate">
                  {chat.title}
                </span>
              )}

              {!editingChatId && (hoveredChatId === chat.id || currentChatId === chat.id) && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleStartEditing(chat)
                    }}
                    className="p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-gray-300"
                  >
                    <Edit3 className="h-3 w-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteChat(chat.id)
                    }}
                    className="p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="h-3 w-3" />
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