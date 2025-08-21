import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'demo-key'
})

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // If no API key is set, return a demo response
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'demo-key') {
      return NextResponse.json({
        response: "I'm a demo version of ChatGPT. To get real AI responses, please set your OPENAI_API_KEY environment variable. For now, I can echo back: " + message
      })
    }

    // Make API call to OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    const response = completion.choices[0]?.message?.content || 'No response generated'

    return NextResponse.json({
      response
    })

  } catch (error) {
    console.error('Chat API Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to get response',
        response: 'Sorry, I encountered an error. Please make sure you have set up your OpenAI API key in the environment variables.'
      },
      { status: 500 }
    )
  }
}