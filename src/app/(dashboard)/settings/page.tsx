'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { User, Mail, Calendar } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [name, setName] = useState(session?.user?.name || '')

  const handleSaveProfile = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Profile updated successfully',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary-400" />
            <CardTitle className="text-lg text-white">Profile</CardTitle>
          </div>
          <CardDescription className="text-slate-400">
            Update your personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-300">Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-slate-700 bg-slate-800/50 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Email</Label>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-400" />
              <span className="text-slate-300">{session?.user?.email}</span>
            </div>
          </div>
          <Button onClick={handleSaveProfile} className="bg-primary-500 hover:bg-primary-600">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary-400" />
            <CardTitle className="text-lg text-white">Account</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-slate-800">
            <span className="text-slate-400">Account Created</span>
            <span className="text-slate-300">Just now</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-800">
            <span className="text-slate-400">Plan</span>
            <span className="text-primary-400">Free</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-slate-400">API Calls This Month</span>
            <span className="text-slate-300">0 / Unlimited</span>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-900/50 bg-red-950/20">
        <CardHeader>
          <CardTitle className="text-lg text-red-400">Danger Zone</CardTitle>
          <CardDescription className="text-slate-400">
            Irreversible actions for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
