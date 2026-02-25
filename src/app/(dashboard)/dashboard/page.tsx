'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  MessageSquare, 
  Bot, 
  Key, 
  Activity,
  ArrowRight,
  Zap
} from 'lucide-react'

const quickActions = [
  {
    title: 'Start Chat',
    description: 'Start a new conversation with your AI agent',
    icon: MessageSquare,
    href: '/chat',
    color: 'from-primary-500 to-primary-600',
  },
  {
    title: 'Create Agent',
    description: 'Build a custom AI agent for your needs',
    icon: Bot,
    href: '/agents',
    color: 'from-accent-500 to-accent-600',
  },
  {
    title: 'Configure API Keys',
    description: 'Add your LLM provider API keys',
    icon: Key,
    href: '/settings/providers',
    color: 'from-emerald-500 to-emerald-600',
  },
]

export default function DashboardPage() {
  const { data: session } = useSession()

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="rounded-2xl bg-gradient-to-r from-primary-900/50 to-accent-900/50 p-8">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-5 w-5 text-primary-400" />
          <span className="text-sm text-primary-400">Welcome back</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Hello, {session?.user?.name || 'User'}!
        </h1>
        <p className="text-slate-400">
          Ready to build something amazing with AI today?
        </p>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className="group h-full border-slate-800 bg-slate-900/50 transition-all hover:border-slate-700 hover:bg-slate-800/50">
                <CardHeader>
                  <div className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${action.color}`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-white">{action.title}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="group-hover:text-primary-400 text-slate-400 p-0">
                    Get started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats section */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Your Activity</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-slate-800 bg-slate-900/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-slate-400">Conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">0</div>
            </CardContent>
          </Card>
          <Card className="border-slate-800 bg-slate-900/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-slate-400">Agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">0</div>
            </CardContent>
          </Card>
          <Card className="border-slate-800 bg-slate-900/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-slate-400">API Calls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">0</div>
            </CardContent>
          </Card>
          <Card className="border-slate-800 bg-slate-900/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-slate-400">Tokens Used</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">0</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Getting started guide */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader>
          <CardTitle className="text-white">Getting Started</CardTitle>
          <CardDescription className="text-slate-400">
            Follow these steps to set up your AI workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">
                1
              </div>
              <div>
                <h3 className="font-medium text-white">Add your API keys</h3>
                <p className="text-sm text-slate-400">
                  Configure your LLM provider API keys in the settings to start using AI features.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">
                2
              </div>
              <div>
                <h3 className="font-medium text-white">Create your first agent</h3>
                <p className="text-sm text-slate-400">
                  Build a custom AI agent with specific system prompts and tools.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">
                3
              </div>
              <div>
                <h3 className="font-medium text-white">Start chatting</h3>
                <p className="text-sm text-slate-400">
                  Begin a conversation with your AI agent and explore its capabilities.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}