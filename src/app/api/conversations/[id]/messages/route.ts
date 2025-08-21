import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Verify conversation belongs to user
    const conversation = await prisma.conversation.findFirst({
      where: {
        id,
        userId: session.user.id
      }
    })

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      )
    }

    const messages = await prisma.message.findMany({
      where: {
        conversationId: id
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { content, role } = await request.json()

    if (!content || !role) {
      return NextResponse.json(
        { error: 'Content and role are required' },
        { status: 400 }
      )
    }

    // Verify conversation belongs to user
    const conversation = await prisma.conversation.findFirst({
      where: {
        id,
        userId: session.user.id
      }
    })

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      )
    }

    const message = await prisma.message.create({
      data: {
        content,
        role,
        conversationId: id
      }
    })

    // Update conversation timestamp
    await prisma.conversation.update({
      where: {
        id
      },
      data: {
        updatedAt: new Date()
      }
    })

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}