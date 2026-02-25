import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Bot, 
  Brain, 
  Code2, 
  Globe, 
  Key, 
  MessageSquare, 
  Shield, 
  Zap 
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Multi-LLM Support',
    description: 'Connect to OpenAI, Claude, Gemini, DeepSeek, and many more LLM providers with your own API keys.',
  },
  {
    icon: Bot,
    title: 'AI Agents',
    description: 'Create custom AI agents with specific system prompts, tools, and capabilities.',
  },
  {
    icon: Code2,
    title: 'Code Execution',
    description: 'Execute code safely in sandboxed environments with support for multiple languages.',
  },
  {
    icon: Globe,
    title: 'Browser Automation',
    description: 'Control browsers with natural language using advanced GUI agent capabilities.',
  },
  {
    icon: MessageSquare,
    title: 'Conversations',
    description: 'Persistent conversation history with powerful search and organization features.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your API keys are encrypted and stored securely. Your data stays private.',
  },
  {
    icon: Key,
    title: 'BYOK',
    description: 'Bring Your Own Key - use your existing API keys from any supported provider.',
  },
  {
    icon: Zap,
    title: 'Fast & Reliable',
    description: 'Built on modern infrastructure for speed and reliability.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ZANAGENT</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-300">
            <Zap className="h-4 w-4 text-primary-400" />
            <span>Open Source • Self-Hosted • Privacy First</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            Your AI Agent,
            <br />
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Your Way
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400 sm:text-xl">
            A powerful multimodal AI agent platform. Connect to any LLM provider, 
            create custom agents, and automate tasks with natural language.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="w-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700 sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Everything You Need
            </h2>
            <p className="text-lg text-slate-400">
              Powerful features to build and deploy AI agents
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-primary-500/50 hover:bg-slate-800/50"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 text-primary-400 transition-colors group-hover:from-primary-500/30 group-hover:to-accent-500/30">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LLM Providers Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Connect to Any LLM
          </h2>
          <p className="mb-10 text-lg text-slate-400">
            Bring your own API keys from your favorite LLM providers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['OpenAI', 'Anthropic', 'Google', 'Azure', 'DeepSeek', 'Groq', 'Mistral', 'OpenRouter'].map((provider) => (
              <div
                key={provider}
                className="rounded-lg border border-slate-700 bg-slate-800/50 px-6 py-3 text-slate-300 transition-colors hover:border-primary-500/50 hover:text-white"
              >
                {provider}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-gradient-to-r from-primary-900/50 to-accent-900/50 p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg text-slate-300">
            Create your free account and start building AI agents today.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">ZANAGENT</span>
            </div>
            <p className="text-sm text-slate-500">
              © 2024 ZANAGENT. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
