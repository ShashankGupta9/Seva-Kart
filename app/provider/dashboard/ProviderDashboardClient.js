"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Star, Calendar, DollarSign, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Mock data for provider services
const mockServices = [
  {
    id: 1,
    title: "Professional Plumbing",
    description: "Expert plumbing services for all your home needs",
    price: 500,
    category: "Plumbing",
    status: "active",
    bookings: 24,
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Emergency Plumbing",
    description: "24/7 emergency plumbing services",
    price: 800,
    category: "Plumbing",
    status: "active",
    bookings: 12,
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
  },
]

const stats = [
  { title: "Total Earnings", value: "₹45,000", icon: DollarSign, change: "+12%" },
  { title: "Active Services", value: "8", icon: Star, change: "+2" },
  { title: "Total Bookings", value: "156", icon: Calendar, change: "+8%" },
  { title: "Customer Rating", value: "4.8", icon: Users, change: "+0.2" },
]

export default function ProviderDashboardClient() {
  const [services, setServices] = useState(mockServices)
  const [loading, setLoading] = useState(true)
  const { user, userType, isAuthenticated } = useAuth()

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (!isAuthenticated || userType !== "provider") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h1>
            <p className="text-gray-600 dark:text-gray-400">Only service providers can access this dashboard.</p>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-8 w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-300 dark:bg-gray-700 h-32 rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-300 dark:bg-gray-700 h-64 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.name}!</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your services and track your performance</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Service
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <stat.icon className="h-8 w-8 text-primary mb-2" />
                        <div className="flex items-center text-sm text-green-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {stat.change}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Services Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Services</h2>
              <Button variant="outline">View All</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge
                          className="absolute top-2 right-2"
                          variant={service.status === "active" ? "default" : "secondary"}
                        >
                          {service.status}
                        </Badge>
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                          {service.description}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="text-lg font-bold text-primary">₹{service.price}</div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{service.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm text-gray-600 dark:text-gray-400">{service.bookings} bookings</div>
                          <Badge variant="outline">{service.category}</Badge>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "New booking received", service: "Professional Plumbing", time: "2 hours ago" },
                    { action: "Service completed", service: "Emergency Plumbing", time: "5 hours ago" },
                    { action: "Payment received", service: "Professional Plumbing", time: "1 day ago" },
                    { action: "New review received", service: "Emergency Plumbing", time: "2 days ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{activity.service}</p>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
