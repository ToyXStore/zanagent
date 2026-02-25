'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { 
  Key, 
  Check, 
  X, 
  Eye, 
  EyeOff, 
  Loader2,
  Sparkles
} from 'lucide-react'

interface Provider {
  id: string
  name: string
  description: string
  baseUrl?: string
  models: string[]
  icon: string
}

const providers: Provider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'GPT-4, GPT-3.5, and more',
    models: ['gpt-4o', 'gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'],
    icon: '🤖',
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    description: 'Claude 3 Opus, Sonnet, Haiku',
    models: ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
    icon: '🧠',
  },
  {
    id: 'google',
    name: 'Google AI',
    description: 'Gemini Pro, Gemini Ultra',
    models: ['gemini-pro', 'gemini-1.5-pro', 'gemini-1.5-flash'],
    icon: '💎',
  },
  {
    id: 'azure',
    name: 'Azure OpenAI',
    description: 'Azure-hosted OpenAI models',
    baseUrl: 'https://your-resource.openai.azure.com',
    models: ['gpt-4o', 'gpt-4-turbo', 'gpt-35-turbo'],
    icon: '☁️',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    description: 'DeepSeek Chat and Coder models',
    models: ['deepseek-chat', 'deepseek-coder'],
    icon: '🔮',
  },
  {
    id: 'groq',
    name: 'Groq',
    description: 'Ultra-fast LLM inference',
    models: ['llama-3.1-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768'],
    icon: '⚡',
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    description: 'Mistral and Mixtral models',
    models: ['mistral-large-latest', 'mistral-medium', 'mistral-small'],
    icon: '🌀',
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    description: 'Access to 100+ models via one API',
    baseUrl: 'https://openrouter.ai/api/v1',
    models: ['openai/gpt-4o', 'anthropic/claude-3-opus', 'google/gemini-pro'],
    icon: '🔀',
  },
]

interface ApiKeyState {
  [key: string]: {
    apiKey: string
    baseUrl: string
    isActive: boolean
    isEditing: boolean
    isLoading: boolean
    showKey: boolean
  }
}

export default function ProvidersPage() {
  const [keys, setKeys] = useState<ApiKeyState>({})
  const { toast } = useToast()

  useEffect(() => {
    // Load saved API keys
    fetchApiKeys()
  }, [])

  const fetchApiKeys = async () => {
    try {
      const response = await fetch('/api/providers')
      if (response.ok) {
        const data = await response.json()
        const keyState: ApiKeyState = {}
        data.forEach((key: any) => {
          keyState[key.provider] = {
            apiKey: '••••••••••••', // Masked
            baseUrl: key.baseUrl || '',
            isActive: key.isActive,
            isEditing: false,
            isLoading: false,
            showKey: false,
          }
        })
        setKeys(keyState)
      }
    } catch (error) {
      console.error('Failed to fetch API keys:', error)
    }
  }

  const handleSave = async (providerId: string) => {
    const keyState = keys[providerId]
    if (!keyState?.apiKey || keyState.apiKey === '••••••••••••') {
      toast({
        title: 'Error',
        description: 'Please enter a valid API key',
        variant: 'destructive',
      })
      return
    }

    setKeys(prev => ({
      ...prev,
      [providerId]: { ...prev[providerId], isLoading: true },
    }))

    try {
      const response = await fetch('/api/providers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: providerId,
          apiKey: keyState.apiKey,
          baseUrl: keyState.baseUrl,
        }),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'API key saved successfully',
        })
        setKeys(prev => ({
          ...prev,
          [providerId]: {
            ...prev[providerId],
            isEditing: false,
            isLoading: false,
            isActive: true,
            apiKey: '••••••••••••',
          },
        }))
      } else {
        throw new Error('Failed to save API key')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save API key',
        variant: 'destructive',
      })
      setKeys(prev => ({
        ...prev,
        [providerId]: { ...prev[providerId], isLoading: false },
      }))
    }
  }

  const handleDelete = async (providerId: string) => {
    try {
      const response = await fetch(`/api/providers?provider=${providerId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'API key removed successfully',
        })
        setKeys(prev => {
          const newState = { ...prev }
          delete newState[providerId]
          return newState
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove API key',
        variant: 'destructive',
      })
    }
  }

  const updateKeyState = (providerId: string, updates: Partial<ApiKeyState[string]>) => {
    setKeys(prev => ({
      ...prev,
      [providerId]: {
        ...prev[providerId],
        apiKey: '',
        baseUrl: '',
        isActive: false,
        isEditing: false,
        isLoading: false,
        showKey: false,
        ...updates,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">LLM Providers</h1>
        <p className="text-slate-400 mt-1">
          Configure your API keys for different LLM providers. Your keys are encrypted and stored securely.
        </p>
      </div>

      <div className="grid gap-4">
        {providers.map((provider) => {
          const keyState = keys[provider.id] || {
            apiKey: '',
            baseUrl: provider.baseUrl || '',
            isActive: false,
            isEditing: false,
            isLoading: false,
            showKey: false,
          }

          return (
            <Card key={provider.id} className="border-slate-800 bg-slate-900/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{provider.icon}</span>
                    <div>
                      <CardTitle className="text-lg text-white">{provider.name}</CardTitle>
                      <CardDescription className="text-slate-400">
                        {provider.description}
                      </CardDescription>
                    </div>
                  </div>
                  {keyState.isActive && !keyState.isEditing && (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Check className="h-4 w-4" />
                      <span className="text-sm">Connected</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {keyState.isEditing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">API Key</Label>
                      <div className="relative">
                        <Input
                          type={keyState.showKey ? 'text' : 'password'}
                          value={keyState.apiKey}
                          onChange={(e) => updateKeyState(provider.id, { apiKey: e.target.value })}
                          placeholder={`Enter your ${provider.name} API key`}
                          className="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => updateKeyState(provider.id, { showKey: !keyState.showKey })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                        >
                          {keyState.showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    {provider.baseUrl !== undefined && (
                      <div className="space-y-2">
                        <Label className="text-slate-300">Base URL (Optional)</Label>
                        <Input
                          type="text"
                          value={keyState.baseUrl}
                          onChange={(e) => updateKeyState(provider.id, { baseUrl: e.target.value })}
                          placeholder={provider.baseUrl}
                          className="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500"
                        />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleSave(provider.id)}
                        disabled={keyState.isLoading}
                        className="bg-primary-500 hover:bg-primary-600"
                      >
                        {keyState.isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          'Save'
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => updateKeyState(provider.id, { isEditing: false })}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-400">
                      {keyState.isActive ? (
                        <span>API key configured</span>
                      ) : (
                        <span>No API key configured</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateKeyState(provider.id, { isEditing: true })}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        {keyState.isActive ? 'Update' : 'Add Key'}
                      </Button>
                      {keyState.isActive && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(provider.id)}
                          className="text-red-400 hover:bg-red-500/10 hover:text-red-400"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Info card */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary-400" />
            <CardTitle className="text-lg text-white">Need an API key?</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-slate-400 space-y-2">
          <p>Get your API keys from the following providers:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">OpenAI</a></li>
            <li><a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">Anthropic</a></li>
            <li><a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">Google AI</a></li>
            <li><a href="https://deepseek.com/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">DeepSeek</a></li>
            <li><a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">Groq</a></li>
            <li><a href="https://console.mistral.ai/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">Mistral AI</a></li>
            <li><a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">OpenRouter</a></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
