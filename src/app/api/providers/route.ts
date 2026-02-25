import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

// GET - Fetch all API keys for the user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const apiKeys = await prisma.apiKey.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        provider: true,
        baseUrl: true,
        isActive: true,
        createdAt: true,
      },
    })

    return NextResponse.json(apiKeys)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create or update an API key
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { provider, apiKey, baseUrl } = await request.json()

    if (!provider || !apiKey) {
      return NextResponse.json({ error: 'Provider and API key are required' }, { status: 400 })
    }

    // In a real application, you should encrypt the API key before storing
    // For now, we'll store it as-is (you should use proper encryption in production)
    const savedKey = await prisma.apiKey.upsert({
      where: {
        userId_provider: {
          userId: session.user.id,
          provider,
        },
      },
      update: {
        apiKey,
        baseUrl: baseUrl || null,
        isActive: true,
      },
      create: {
        userId: session.user.id,
        provider,
        apiKey,
        baseUrl: baseUrl || null,
        isActive: true,
      },
    })

    return NextResponse.json({ success: true, id: savedKey.id })
  } catch (error) {
    console.error('Error saving API key:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Remove an API key
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const provider = searchParams.get('provider')

    if (!provider) {
      return NextResponse.json({ error: 'Provider is required' }, { status: 400 })
    }

    await prisma.apiKey.delete({
      where: {
        userId_provider: {
          userId: session.user.id,
          provider,
        },
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
