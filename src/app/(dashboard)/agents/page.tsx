'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { 
  Plus, 
  Bot, 
  Trash2, 
  Edit, 
  Save,
  X,
  Sparkles
} from 'lucide-react'

interface Agent {
  id: string
  name: string
  description: string
  systemPrompt: string
  model: string
  provider: string
  temperature: number
  isActive: boolean
}

const defaultAgents = [
  {
    name: 'General Assistant',
    description: 'A helpful AI assistant for general tasks',
    systemPrompt: 'You are a helpful AI assistant. Provide clear, accurate, and helpful responses.',
    model: 'gpt-4o',
    provider: 'openai',
    temperature: 0.7,
  },
  {
    name: 'Code Helper',
    description: 'An AI assistant specialized in coding tasks',
    systemPrompt: 'You are an expert programmer. Help users with coding questions, debugging, and software development best practices.',
    model: 'claude-3-sonnet-20240229',
    provider: 'anthropic',
    temperature: 0.5,
  },
  {
    name: 'Creative Writer',
    description: 'An AI assistant for creative writing tasks',
    systemPrompt: 'You are a creative writing assistant. Help users with storytelling, content creation, and creative ideas.',
    model: 'gpt-4o',
    provider: 'openai',
    temperature: 0.9,
  },
]

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    systemPrompt: '',
    model: 'gpt-4o',
    provider: 'openai',
    temperature: 0.7,
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchAgents()
  }, [])

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/agents')
      if (response.ok) {
        const data = await response.json()
        setAgents(data)
      }
    } catch (error) {
      console.error('Failed to fetch agents:', error)
    }
  }

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      toast({
        title: 'Error',
        description: 'Agent name is required',
        variant: 'destructive',
      })
      return
    }

    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Agent created successfully',
        })
        setIsCreating(false)
        setFormData({
          name: '',
          description: '',
          systemPrompt: '',
          model: 'gpt-4o',
          provider: 'openai',
          temperature: 0.7,
        })
        fetchAgents()
      } else {
        throw new Error('Failed to create agent')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create agent',
        variant: 'destructive',
      })
    }
  }

  const handleUpdate = async (id: string) => {
    try {
      const response = await fetch(`/api/agents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Agent updated successfully',
        })
        setEditingId(null)
        fetchAgents()
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update agent',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/agents/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Agent deleted successfully',
        })
        fetchAgents()
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete agent',
        variant: 'destructive',
      })
    }
  }

  const startEdit = (agent: Agent) => {
    setEditingId(agent.id)
    setFormData({
      name: agent.name,
      description: agent.description || '',
      systemPrompt: agent.systemPrompt || '',
      model: agent.model,
      provider: agent.provider,
      temperature: agent.temperature,
    })
  }

  const AgentForm = ({ onSave, onCancel }: { onSave: () => void; onCancel: () => void }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-300">Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Agent name"
            className="border-slate-700 bg-slate-800/50 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Model</Label>
          <select
            value={formData.model}
            onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-md px-3 py-2"
          >
            <option value="gpt-4o">GPT-4o</option>
            <option value="gpt-4-turbo">GPT-4 Turbo</option>
            <option value="claude-3-opus-20240229">Claude 3 Opus</option>
            <option value="claude-3-sonnet-20240229">Claude 3 Sonnet</option>
            <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
            <option value="deepseek-chat">DeepSeek Chat</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-slate-300">Description</Label>
        <Input
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Brief description of what this agent does"
          className="border-slate-700 bg-slate-800/50 text-white"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-slate-300">System Prompt</Label>
        <textarea
          value={formData.systemPrompt}
          onChange={(e) => setFormData(prev => ({ ...prev, systemPrompt: e.target.value }))}
          placeholder="Define the agent's behavior and personality"
          className="w-full h-32 bg-slate-800 border border-slate-700 text-white rounded-md px-3 py-2 resize-none"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-slate-300">Temperature: {formData.temperature}</Label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={formData.temperature}
          onChange={(e) => setFormData(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
          className="w-full"
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={onSave} className="bg-primary-500 hover:bg-primary-600">
          <Save className="h-4 w-4 mr-2" />
          Save Agent
        </Button>
        <Button variant="outline" onClick={onCancel} className="border-slate-700 text-slate-300">
          Cancel
        </Button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Agents</h1>
          <p className="text-slate-400 mt-1">
            Create and manage custom AI agents with specific behaviors
          </p>
        </div>
        <Button
          onClick={() => {
            setIsCreating(true)
            setFormData({
              name: '',
              description: '',
              systemPrompt: '',
              model: 'gpt-4o',
              provider: 'openai',
              temperature: 0.7,
            })
          }}
          className="bg-primary-500 hover:bg-primary-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Agent
        </Button>
      </div>

      {/* Create form */}
      {isCreating && (
        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-white">New Agent</CardTitle>
            <CardDescription className="text-slate-400">
              Create a new AI agent with custom behavior
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AgentForm
              onSave={handleCreate}
              onCancel={() => setIsCreating(false)}
            />
          </CardContent>
        </Card>
      )}

      {/* Agents list */}
      <div className="grid gap-4">
        {agents.length === 0 && !isCreating ? (
          <Card className="border-slate-800 bg-slate-900/50">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bot className="h-12 w-12 text-slate-600 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No agents yet</h3>
              <p className="text-slate-400 text-center max-w-md mb-4">
                Create your first AI agent to get started. Agents help you customize AI behavior for different tasks.
              </p>
              <Button
                onClick={() => setIsCreating(true)}
                className="bg-primary-500 hover:bg-primary-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Agent
              </Button>
            </CardContent>
          </Card>
        ) : (
          agents.map((agent) => (
            <Card key={agent.id} className="border-slate-800 bg-slate-900/50">
              <CardContent className="pt-6">
                {editingId === agent.id ? (
                  <AgentForm
                    onSave={() => handleUpdate(agent.id)}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
                        <Bot className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                        <p className="text-sm text-slate-400">{agent.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">
                            {agent.model}
                          </span>
                          <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">
                            Temp: {agent.temperature}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEdit(agent)}
                        className="text-slate-400 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(agent.id)}
                        className="text-red-400 hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Templates */}
      {agents.length === 0 && !isCreating && (
        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary-400" />
              <CardTitle className="text-lg text-white">Quick Templates</CardTitle>
            </div>
            <CardDescription className="text-slate-400">
              Start with a pre-configured agent template
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-3">
              {defaultAgents.map((template) => (
                <Button
                  key={template.name}
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-start border-slate-700 bg-slate-800/50 hover:bg-slate-800"
                  onClick={() => {
                    setFormData(template)
                    setIsCreating(true)
                  }}
                >
                  <span className="font-medium text-white">{template.name}</span>
                  <span className="text-xs text-slate-400 mt-1">{template.description}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
