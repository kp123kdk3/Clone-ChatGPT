import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { createStreamingChatCompletion, ChatMessage } from '@/lib/openai'
import { generateConversationTitle } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { message, conversationId } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    let conversation
    let messages: any[] = []

    if (conversationId) {
      // Get existing conversation
      conversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          userId: session.user.id
        },
        include: {
          messages: {
            orderBy: {
              createdAt: 'asc'
            }
          }
        }
      })

      if (!conversation) {
        return NextResponse.json(
          { error: 'Conversation not found' },
          { status: 404 }
        )
      }

      messages = conversation.messages
    } else {
      // Create new conversation
      const title = generateConversationTitle(message)
      conversation = await prisma.conversation.create({
        data: {
          title,
          userId: session.user.id
        }
      })
    }

    // Add user message to database
    const userMessage = await prisma.message.create({
      data: {
        content: message,
        role: 'USER',
        conversationId: conversation.id
      }
    })

    // Prepare messages for OpenAI
    const chatMessages: ChatMessage[] = [
      {
        role: 'system',
        content: 'You are a helpful AI assistant. Provide helpful, accurate, and thoughtful responses.'
      },
      ...messages.map((msg: any) => ({
        role: msg.role.toLowerCase() as 'user' | 'assistant',
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ]

    // Create streaming response
    const stream = await createStreamingChatCompletion(chatMessages)

    const encoder = new TextEncoder()
    let assistantMessage = ''
    let assistantMessageId: string

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || ''
            assistantMessage += content

            // Send the chunk to the client
            const data = JSON.stringify({
              content,
              done: false,
              conversationId: conversation.id,
              messageId: assistantMessageId
            })
            
            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
          }

          // Save assistant message to database
          const savedMessage = await prisma.message.create({
            data: {
              content: assistantMessage,
              role: 'ASSISTANT',
              conversationId: conversation.id
            }
          })

          assistantMessageId = savedMessage.id

          // Update conversation timestamp
          await prisma.conversation.update({
            where: {
              id: conversation.id
            },
            data: {
              updatedAt: new Date()
            }
          })

          // Send final chunk
          const finalData = JSON.stringify({
            content: '',
            done: true,
            conversationId: conversation.id,
            messageId: assistantMessageId
          })
          
          controller.enqueue(encoder.encode(`data: ${finalData}\n\n`))
          controller.close()
        } catch (error) {
          console.error('Streaming error:', error)
          controller.error(error)
        }
      }
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('Chat stream error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}