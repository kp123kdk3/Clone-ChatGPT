'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Conversation } from '@/types/chat'
import { cn } from '@/lib/utils'
import { useTheme } from '@/hooks/useTheme'
import { 
  Plus, 
  MessageSquare, 
  Settings, 
  LogOut, 
  User,
  Trash2,
  Edit2,
  ChevronDown,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react'

interface SidebarProps {
  conversations: Conversation[]
  currentConversationId?: string
  onNewChat: () => void
  onSelectConversation: (id: string) => void
  onDeleteConversation: (id: string) => void
  onRenameConversation: (id: string, title: string) => void
}

export function Sidebar({
  conversations,
  currentConversationId,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation
}: SidebarProps) {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleRename = (conversation: Conversation) => {
    setEditingId(conversation.id)
    setEditTitle(conversation.title)
  }

  const handleSaveRename = () => {
    if (editingId && editTitle.trim()) {
      onRenameConversation(editingId, editTitle.trim())
    }
    setEditingId(null)
    setEditTitle('')
  }

  const handleCancelRename = () => {
    setEditingId(null)
    setEditTitle('')
  }

  return (
    <div className="flex flex-col h-full w-64 bg-gradient-glass backdrop-blur-xl border-r border-white/10 shadow-glass">
      {/* Header with New Chat button */}
      <div className="p-4 border-b border-white/10">
        <Button
          onClick={onNewChat}
          className="w-full bg-gradient-to-r from-futuristic-primary to-futuristic-secondary hover:from-futuristic-primary/90 hover:to-futuristic-secondary/90 text-white border-0 rounded-xl py-3 px-4 font-medium transition-all duration-300 shadow-neon hover:shadow-futuristic-lg hover:scale-105 group"
        >
          <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          New Chat
        </Button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                'group relative flex items-center p-3 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105',
                currentConversationId === conversation.id
                  ? 'bg-gradient-to-r from-futuristic-primary/20 to-futuristic-secondary/20 border border-futuristic-primary/30 shadow-futuristic'
                  : 'hover:bg-gradient-glass hover:border-white/20 hover:shadow-glass'
              )}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg mr-3 flex-shrink-0 transition-all duration-300',
                currentConversationId === conversation.id
                  ? 'bg-gradient-to-r from-futuristic-primary to-futuristic-secondary text-white shadow-neon'
                  : 'bg-white/10 text-gray-300 group-hover:bg-futuristic-primary/20 group-hover:text-futuristic-primary'
              )}>
                <MessageSquare className="h-4 w-4" />
              </div>
              
              {editingId === conversation.id ? (
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={handleSaveRename}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveRename()
                    if (e.key === 'Escape') handleCancelRename()
                  }}
                  className="flex-1 bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-futuristic-primary border border-white/20"
                  autoFocus
                />
              ) : (
                <span className={cn(
                  "flex-1 truncate text-sm transition-colors duration-300",
                  currentConversationId === conversation.id
                    ? 'text-white font-medium'
                    : 'text-gray-300 group-hover:text-white'
                )}>
                  {conversation.title}
                </span>
              )}

              {/* Action buttons */}
              <div className="hidden group-hover:flex items-center space-x-1 ml-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 text-gray-400 hover:text-futuristic-primary hover:bg-white/10 rounded-lg transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRename(conversation)
                  }}
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteConversation(conversation.id)
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Menu */}
      <div className="p-4 border-t border-white/10">
        <div className="space-y-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gradient-glass rounded-lg transition-all duration-300 group"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <div className="mr-3 p-1 rounded-lg bg-gradient-to-r from-futuristic-primary/20 to-futuristic-secondary/20 group-hover:from-futuristic-primary/30 group-hover:to-futuristic-secondary/30 transition-all duration-300">
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-futuristic-primary" />
              ) : (
                <Moon className="h-4 w-4 text-futuristic-secondary" />
              )}
            </div>
            {theme === 'dark' ? 'Light' : 'Dark'} mode
          </Button>
          
          {/* Settings */}
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gradient-glass rounded-lg transition-all duration-300 group"
          >
            <div className="mr-3 p-1 rounded-lg bg-gradient-to-r from-futuristic-accent/20 to-futuristic-primary/20 group-hover:from-futuristic-accent/30 group-hover:to-futuristic-primary/30 transition-all duration-300">
              <Settings className="h-4 w-4 text-futuristic-accent" />
            </div>
            Settings
          </Button>
          
          {/* User Account */}
          {session?.user && (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-full flex items-center p-2 rounded-lg hover:bg-gradient-glass transition-all duration-300 group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-futuristic-primary to-futuristic-secondary text-white text-sm font-medium shadow-neon group-hover:shadow-futuristic-lg transition-all duration-300">
                  {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="ml-3 flex-1 text-left">
                  <p className="text-sm font-medium text-white truncate">
                    {session.user.name || 'Demo User'}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {session.user.email || 'demo@example.com'}
                  </p>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-gray-400 transition-transform duration-300",
                  isUserMenuOpen ? "rotate-180" : ""
                )} />
              </button>
              
              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-gradient-glass backdrop-blur-xl border border-white/10 rounded-xl shadow-glass z-10 animate-fadeIn">
                  <div className="p-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                      onClick={() => signOut()}
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign out
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}