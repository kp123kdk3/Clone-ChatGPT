export interface Message {
  id: string
  content: string
  role: 'USER' | 'ASSISTANT' | 'SYSTEM'
  conversationId: string
  createdAt: Date
}

export interface Conversation {
  id: string
  title: string
  userId: string
  createdAt: Date
  updatedAt: Date
  messages?: Message[]
}

export interface ChatRequest {
  message: string
  conversationId?: string
}

export interface StreamResponse {
  content: string
  done: boolean
  conversationId?: string
  messageId?: string
}