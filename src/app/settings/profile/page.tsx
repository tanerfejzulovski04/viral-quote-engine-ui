"use client"

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/lib/use-toast"

// Timezone options
const timezones = [
  { value: 'America/New_York', label: 'Eastern Time (US & Canada)' },
  { value: 'America/Chicago', label: 'Central Time (US & Canada)' },
  { value: 'America/Denver', label: 'Mountain Time (US & Canada)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)' },
  { value: 'America/Phoenix', label: 'Arizona' },
  { value: 'America/Anchorage', label: 'Alaska' },
  { value: 'Pacific/Honolulu', label: 'Hawaii' },
  { value: 'Europe/London', label: 'London' },
  { value: 'Europe/Paris', label: 'Paris' },
  { value: 'Europe/Berlin', label: 'Berlin' },
  { value: 'Europe/Rome', label: 'Rome' },
  { value: 'Europe/Madrid', label: 'Madrid' },
  { value: 'Asia/Tokyo', label: 'Tokyo' },
  { value: 'Asia/Shanghai', label: 'Shanghai' },
  { value: 'Asia/Kolkata', label: 'India (IST)' },
  { value: 'Australia/Sydney', label: 'Sydney' },
]

const plans = [
  { value: 'free', label: 'Free', color: 'secondary' },
  { value: 'starter', label: 'Starter', color: 'default' },
  { value: 'pro', label: 'Pro', color: 'default' },
  { value: 'enterprise', label: 'Enterprise', color: 'default' },
]

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  timezone: z.string().min(1, {
    message: "Please select a timezone.",
  }),
})

type FormValues = z.infer<typeof formSchema>

interface UserData {
  id: string
  name: string
  email: string
  timezone: string
  plan: string
}

export default function ProfileSettings() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string>('')
  const [isSwitchingPlan, setIsSwitchingPlan] = useState(false)
  const { toast } = useToast()

  const isDev = process.env.NEXT_PUBLIC_VITE_DEV_ENABLE_BILLING_TOGGLE === 'true'

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      timezone: "",
    },
  })

  // Load user data on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await fetch('/api/auth/me')
        const result = await response.json()
        
        if (result.success) {
          const user = result.data
          setUserData(user)
          setSelectedPlan(user.plan)
          form.reset({
            name: user.name,
            timezone: user.timezone,
          })
        } else {
          toast({
            title: "Error",
            description: "Failed to load profile data",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Network error while loading profile",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [form, toast])

  const onSubmit = async (values: FormValues) => {
    setIsSaving(true)
    
    try {
      const response = await fetch('/api/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setUserData(result.data)
        toast({
          title: "Success",
          description: result.message || "Profile updated successfully!",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update profile",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error while saving profile",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePlanSwitch = async (newPlan: string) => {
    if (newPlan === selectedPlan) return
    
    setIsSwitchingPlan(true)
    
    try {
      const response = await fetch('/api/plan/switch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: newPlan }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSelectedPlan(newPlan)
        if (userData) {
          setUserData({ ...userData, plan: newPlan })
        }
        toast({
          title: "Success",
          description: result.message || "Plan switched successfully!",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to switch plan",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error while switching plan",
        variant: "destructive",
      })
    } finally {
      setIsSwitchingPlan(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="space-y-3">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentPlan = plans.find(p => p.value === userData?.plan)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your profile information and preferences
          </p>
        </div>

        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timezone</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your timezone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timezones.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value}>
                            {tz.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose your timezone for accurate time display.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Current Plan</FormLabel>
                <div>
                  <Badge variant={currentPlan?.color as any || "secondary"}>
                    {currentPlan?.label || userData?.plan}
                  </Badge>
                </div>
                <FormDescription>
                  Your current subscription plan.
                </FormDescription>
              </div>

              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Form>

          {isDev && (
            <div className="border-t pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Developer Options</h3>
                  <p className="text-sm text-muted-foreground">
                    These options are only visible when VITE_DEV_ENABLE_BILLING_TOGGLE=true
                  </p>
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Switch Plan (Dev Only)</FormLabel>
                  <Select 
                    value={selectedPlan} 
                    onValueChange={handlePlanSwitch}
                    disabled={isSwitchingPlan}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {plans.map((plan) => (
                        <SelectItem key={plan.value} value={plan.value}>
                          {plan.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Switch between different plans for testing purposes.
                  </FormDescription>
                  {isSwitchingPlan && (
                    <p className="text-sm text-muted-foreground">Switching plan...</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}