import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const agentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  systemPrompt: z.string().optional(),
  model: z.string().default('gpt-4o'),
  provider: z.string().default('openai'),
  temperature: z.number().min(0).max(1).default(0.7),
})

// GET - Fetch all agents for the user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const agents = await prisma.agent.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(agents)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create a new agent
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const data = agentSchema.parse(body)

    const agent = await prisma.agent.create({
      data: {
        userId: session.user.id,
        name: data.name,
        description: data.description || null,
        systemPrompt: data.systemPrompt || null,
        model: data.model,
        provider: data.provider,
        temperature: data.temperature,
      },
    })

    return NextResponse.json(agent)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
