import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY && process.env.NODE_ENV !== 'production') {
  console.warn('Missing OPENAI_API_KEY environment variable')
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build',
})

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function createChatCompletion(
  messages: ChatMessage[],
  options?: {
    model?: string
    temperature?: number
    max_tokens?: number
    top_p?: number
    stream?: boolean
  }
) {
  const {
    model = 'gpt-3.5-turbo',
    temperature = 0.7,
    max_tokens = 1000,
    top_p = 1,
    stream = false
  } = options || {}

  return await openai.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens,
    top_p,
    stream
  })
}

export async function createStreamingChatCompletion(
  messages: ChatMessage[],
  options?: {
    model?: string
    temperature?: number
    max_tokens?: number
    top_p?: number
  }
) {
  const {
    model = 'gpt-3.5-turbo',
    temperature = 0.7,
    max_tokens = 1000,
    top_p = 1
  } = options || {}

  return await openai.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens,
    top_p,
    stream: true
  })
}