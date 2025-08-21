'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { useChat } from '@/hooks/useChat'

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const {
    conversations,
    currentConversation,
    messages,
    isLoading,
    streamingMessage,
    fetchConversations,
    fetchConversation,
    deleteConversation,
    renameConversation,
    sendMessage,
    stopGeneration,
    newChat
  } = useChat()

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/auth/login')
      return
    }

    fetchConversations()
  }, [session, status, router, fetchConversations])

  const handleSelectConversation = (id: string) => {
    fetchConversation(id)
  }

  const handleSendMessage = (message: string, conversationId?: string) => {
    sendMessage(message, conversationId)
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar
        conversations={conversations}
        currentConversationId={currentConversation?.id}
        onNewChat={newChat}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={deleteConversation}
        onRenameConversation={renameConversation}
      />
      
      <div className="flex-1 flex flex-col lg:ml-0 ml-0">
        <ChatInterface
          conversation={currentConversation}
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          onStopGeneration={stopGeneration}
        />
      </div>
    </div>
  )
}
