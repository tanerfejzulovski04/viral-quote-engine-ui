"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Files, Palette, TrendingUp, Users, FileText, Calendar, LogOut, Settings } from "lucide-react";

// Mock data for KPIs and usage
const kpiData = [
  { title: "Total Exports", value: "1,234", change: "+12%", icon: FileText, description: "This month" },
  { title: "Active Templates", value: "45", change: "+5", icon: Files, description: "Available" },
  { title: "Team Members", value: "8", change: "+2", icon: Users, description: "Active users" },
  { title: "Monthly Growth", value: "23%", change: "+4%", icon: TrendingUp, description: "Quote generation" },
];

// Mock usage data
const usageData = {
  used: 750,
  total: 1000,
  label: "API Calls"
};

// Quick action cards data
const quickActions = [
  {
    title: "Create Quote",
    description: "Generate a new viral quote with AI assistance",
    icon: PlusCircle,
    href: "/quotes/create",
    color: "bg-gradient-to-br from-blue-500 to-blue-600"
  },
  {
    title: "Open Editor",
    description: "Access the quote editor with advanced tools",
    icon: Edit,
    href: "/editor",
    color: "bg-gradient-to-br from-green-500 to-green-600"
  },
  {
    title: "Templates",
    description: "Browse and manage quote templates",
    icon: Files,
    href: "/templates",
    color: "bg-gradient-to-br from-purple-500 to-purple-600"
  },
  {
    title: "Brand Kit",
    description: "Customize your brand colors and styles",
    icon: Palette,
    href: "/brand-kit",
    color: "bg-gradient-to-br from-orange-500 to-orange-600"
  },
  {
    title: "Profile Settings",
    description: "Manage your profile information and preferences",
    icon: Settings,
    href: "/settings/profile",
    color: "bg-gradient-to-br from-indigo-500 to-indigo-600"
  },
];

interface User {
  id: string
  name: string
  email: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const usagePercentage = (usageData.used / usageData.total) * 100;

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      // Redirect to login if no user data
      window.location.href = "/login"
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/login"
  };

  const handleCardClick = (href: string) => {
    // Navigate to profile settings if it's that route, otherwise show placeholder
    if (href === "/settings/profile") {
      window.location.href = href;
    } else {
      console.log(`Navigate to: ${href}`);
      alert(`Would navigate to: ${href}`);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Viral Quote Engine</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}! Here&apos;s your dashboard overview.</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => {
            const IconComponent = kpi.icon;
            return (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 font-medium">{kpi.change}</span> {kpi.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Usage Bar */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Usage Overview</span>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
            <CardDescription>
              Your current usage for this billing period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{usageData.label}</span>
                <span className="text-muted-foreground">
                  {usageData.used.toLocaleString()} / {usageData.total.toLocaleString()}
                </span>
              </div>
              <Progress value={usagePercentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{usagePercentage.toFixed(1)}% used</span>
                <span>{(usageData.total - usageData.used).toLocaleString()} remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card 
                key={index} 
                className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 relative overflow-hidden"
                onClick={() => handleCardClick(action.href)}
              >
                <div className={`absolute inset-0 ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-200`} />
                <CardHeader className="text-center">
                  <div className={`mx-auto w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                    Open
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}