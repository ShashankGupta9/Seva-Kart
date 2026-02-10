"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Star, Users, Shield, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ServiceCard from "@/components/service-card"
import SearchFilters from "@/components/search-filters"

const featuredServices = [
  {
    id: 1,
    title: "Professional Plumbing",
    description: "Expert plumbing services for all your home needs",
    price: 500,
    rating: 4.8,
    reviews: 124,
    location: "Mumbai",
    provider: "Raj Plumbing Co.",
    category: "Plumbing",
    image: "/plumber-fixing-pipes.png",
  },
  {
    id: 2,
    title: "Home Cleaning Service",
    description: "Deep cleaning and regular maintenance for your home",
    price: 800,
    rating: 4.9,
    reviews: 89,
    location: "Delhi",
    provider: "CleanPro Services",
    category: "Cleaning",
    image: "/home-cleaning-service-professional.jpg",
  },
  {
    id: 3,
    title: "Electrical Repairs",
    description: "Safe and reliable electrical work by certified electricians",
    price: 600,
    rating: 4.7,
    reviews: 156,
    location: "Bangalore",
    provider: "PowerFix Solutions",
    category: "Electrical",
    image: "/electrician-installing-light-fixture.jpg",
  },
  {
    id: 4,
    title: "Personal Chef Service",
    description: "Delicious home-cooked meals prepared by professional chefs",
    price: 1200,
    rating: 4.9,
    reviews: 67,
    location: "Chennai",
    provider: "Chef Masters",
    category: "Cooking",
    image: "/chef-cooking-delicious-food-kitchen.jpg",
  },
]

const stats = [
  { icon: Users, label: "Happy Customers", value: "10,000+" },
  { icon: Shield, label: "Verified Providers", value: "5,000+" },
  { icon: Star, label: "Average Rating", value: "4.8" },
  { icon: Clock, label: "Services Completed", value: "50,000+" },
]

export default function HomePage() {
  const [filteredServices, setFilteredServices] = useState(featuredServices)

  const handleSearch = (searchTerm) => {
    const filtered = featuredServices.filter(
      (service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredServices(filtered)
  }

  const handleCategoryChange = (category) => {
    if (!category) {
      setFilteredServices(featuredServices)
      return
    }
    const filtered = featuredServices.filter((service) => service.category.toLowerCase() === category.toLowerCase())
    setFilteredServices(filtered)
  }

  const handleLocationChange = (location) => {
    if (!location) {
      setFilteredServices(featuredServices)
      return
    }
    const filtered = featuredServices.filter((service) => service.location.toLowerCase() === location.toLowerCase())
    setFilteredServices(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Find Trusted Service Providers
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            >
              Connect with verified professionals for all your home service needs. From plumbing to cooking, we've got
              you covered.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/services">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Browse Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/signup?type=provider">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
                >
                  Become a Provider
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12 text-primary" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our most popular services from trusted providers in your area
            </p>
          </motion.div>

          <SearchFilters
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
            onLocationChange={handleLocationChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {filteredServices.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">No services found matching your criteria.</p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link href="/services">
              <Button size="lg">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
