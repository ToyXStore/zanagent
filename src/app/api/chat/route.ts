import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import OpenAI from 'openai'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { messages, model } = await request.json()

    if (!messages || !model) {
      return NextResponse.json({ error: 'Messages and model are required' }, { status: 400 })
    }

    // Determine provider from model
    let provider = 'openai'
    if (model.includes('claude')) provider = 'anthropic'
    else if (model.includes('gemini')) provider = 'google'
    else if (model.includes('deepseek')) provider = 'deepseek'
    else if (model.includes('llama') || model.includes('mixtral')) provider = 'groq'

    // Get API key for provider
    const apiKeyRecord = await prisma.apiKey.findUnique({
      where: {
        userId_provider: {
          userId: session.user.id,
          provider,
        },
      },
    })

    if (!apiKeyRecord) {
      return NextResponse.json(
        { error: `No API key configured for ${provider}. Please add your API key in settings.` },
        { status: 400 }
      )
    }

    let response: string

    // Handle different providers
    switch (provider) {
      case 'openai': {
        const openai = new OpenAI({
          apiKey: apiKeyRecord.apiKey,
          baseURL: apiKeyRecord.baseUrl || 'https://api.openai.com/v1',
        })
        const completion = await openai.chat.completions.create({
          model,
          messages: messages.map((m: any) => ({
            role: m.role,
            content: m.content,
          })),
        })
        response = completion.choices[0]?.message?.content || ''
        break
      }

      case 'anthropic': {
        // Use fetch for Anthropic API
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKeyRecord.apiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model,
            max_tokens: 4096,
            messages: messages.map((m: any) => ({
              role: m.role === 'user' ? 'user' : 'assistant',
              content: m.content,
            })),
          }),
        })
        const data = await res.json()
        response = data.content?.[0]?.text || ''
        break
      }

      case 'google': {
        // Use fetch for Google AI API
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKeyRecord.apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: messages.map((m: any) => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.content }],
              })),
            }),
          }
        )
        const data = await res.json()
        response = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
        break
      }

      case 'deepseek': {
        const openai = new OpenAI({
          apiKey: apiKeyRecord.apiKey,
          baseURL: 'https://api.deepseek.com/v1',
        })
        const completion = await openai.chat.completions.create({
          model,
          messages: messages.map((m: any) => ({
            role: m.role,
            content: m.content,
          })),
        })
        response = completion.choices[0]?.message?.content || ''
        break
      }

      case 'groq': {
        const openai = new OpenAI({
          apiKey: apiKeyRecord.apiKey,
          baseURL: 'https://api.groq.com/openai/v1',
        })
        const completion = await openai.chat.completions.create({
          model,
          messages: messages.map((m: any) => ({
            role: m.role,
            content: m.content,
          })),
        })
        response = completion.choices[0]?.message?.content || ''
        break
      }

      default:
        return NextResponse.json({ error: 'Unsupported provider' }, { status: 400 })
    }

    return NextResponse.json({ content: response })
  } catch (error: any) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process chat' },
      { status: 500 }
    )
  }
}
