"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ServiceCard from "@/components/service-card"
import SearchFilters from "@/components/search-filters"

const allServices = [
  {
    id: 1,
    title: "Professional Plumbing",
    description:
      "Expert plumbing services for all your home needs including pipe repairs, installations, and emergency fixes",
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
    description: "Deep cleaning and regular maintenance for your home with eco-friendly products",
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
    description: "Safe and reliable electrical work by certified electricians for all your electrical needs",
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
    description: "Delicious home-cooked meals prepared by professional chefs with fresh ingredients",
    price: 1200,
    rating: 4.9,
    reviews: 67,
    location: "Chennai",
    provider: "Chef Masters",
    category: "Cooking",
    image: "/chef-cooking-delicious-food-kitchen.jpg",
  },
  {
    id: 5,
    title: "Car Mechanic Service",
    description: "Professional automotive repair and maintenance services at your doorstep",
    price: 900,
    rating: 4.6,
    reviews: 203,
    location: "Mumbai",
    provider: "AutoCare Experts",
    category: "Mechanic",
    image: "/mechanic-repairing-car-engine.jpg",
  },
  {
    id: 6,
    title: "Garden Maintenance",
    description: "Complete garden care including landscaping, pruning, and plant care services",
    price: 700,
    rating: 4.8,
    reviews: 92,
    location: "Bangalore",
    provider: "Green Thumb Gardens",
    category: "Gardening",
    image: "/gardener-landscaping-garden-plants.jpg",
  },
  {
    id: 7,
    title: "House Painting",
    description: "Professional interior and exterior painting services with premium quality paints",
    price: 1500,
    rating: 4.7,
    reviews: 134,
    location: "Delhi",
    provider: "Color Craft Painters",
    category: "Painting",
    image: "/painter-painting-interior-walls.jpg",
  },
  {
    id: 8,
    title: "Furniture Repair",
    description: "Expert carpentry services for furniture repair, custom furniture, and woodwork",
    price: 800,
    rating: 4.5,
    reviews: 78,
    location: "Chennai",
    provider: "Wood Works Pro",
    category: "Carpentry",
    image: "/carpenter-woodworking-furniture.jpg",
  },
]

export default function ServicesPageClient() {
  const [filteredServices, setFilteredServices] = useState(allServices)
  const [loading, setLoading] = useState(false)

  const handleSearch = (searchTerm) => {
    setLoading(true)
    setTimeout(() => {
      const filtered = allServices.filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.provider.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredServices(filtered)
      setLoading(false)
    }, 500)
  }

  const handleCategoryChange = (category) => {
    setLoading(true)
    setTimeout(() => {
      if (!category) {
        setFilteredServices(allServices)
      } else {
        const filtered = allServices.filter((service) => service.category.toLowerCase() === category.toLowerCase())
        setFilteredServices(filtered)
      }
      setLoading(false)
    }, 500)
  }

  const handleLocationChange = (location) => {
    setLoading(true)
    setTimeout(() => {
      if (!location) {
        setFilteredServices(allServices)
      } else {
        const filtered = allServices.filter((service) => service.location.toLowerCase() === location.toLowerCase())
        setFilteredServices(filtered)
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">All Services</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse through our comprehensive list of services from verified professionals
          </p>
        </motion.div>

        <SearchFilters
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          onLocationChange={handleLocationChange}
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 dark:bg-gray-700 h-48 rounded-t-lg"></div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-b-lg">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>

            {filteredServices.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <p className="text-xl text-gray-600 dark:text-gray-400">No services found matching your criteria.</p>
                <p className="text-gray-500 dark:text-gray-500 mt-2">Try adjusting your search filters.</p>
              </motion.div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}
