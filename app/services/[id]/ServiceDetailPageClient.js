"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, MapPin, Phone, Mail, Calendar, Clock, Shield, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const getServiceById = (id) => {
  const services = {
    1: {
      id: 1,
      title: "Professional Plumbing",
      description:
        "Expert plumbing services for all your home needs including pipe repairs, installations, and emergency fixes. Our certified plumbers have over 10 years of experience and use only high-quality materials.",
      price: 500,
      rating: 4.8,
      reviews: 124,
      location: "Mumbai",
      provider: "Raj Plumbing Co.",
      category: "Plumbing",
      image: "/plumber-fixing-pipes.png",
      providerInfo: {
        name: "Rajesh Kumar",
        experience: "10+ years",
        phone: "+91 98765 43210",
        email: "raj@plumbingco.com",
        verified: true,
        completedJobs: 500,
      },
      features: [
        "Emergency 24/7 service",
        "Licensed and insured",
        "Free estimates",
        "Quality guarantee",
        "Modern equipment",
      ],
      gallery: [
        "/plumber-fixing-bathroom-pipes.jpg",
        "/professional-plumbing-installation.jpg",
        "/pipe-repair-work-residential.jpg",
        "/plumber-tool-and-equipment.jpg",
      ],
    },
    2: {
      id: 2,
      title: "Home Cleaning Service",
      description:
        "Deep cleaning and regular maintenance for your home with eco-friendly products. We provide comprehensive cleaning solutions for residential spaces with trained and verified professionals.",
      price: 800,
      rating: 4.9,
      reviews: 89,
      location: "Delhi",
      provider: "CleanPro Services",
      category: "Cleaning",
      image: "/professional-home-cleaning.png",
      providerInfo: {
        name: "Priya Sharma",
        experience: "8+ years",
        phone: "+91 98765 54321",
        email: "priya@cleanpro.com",
        verified: true,
        completedJobs: 350,
      },
      features: [
        "Eco-friendly products",
        "Trained professionals",
        "Flexible scheduling",
        "Deep cleaning available",
        "Satisfaction guarantee",
      ],
      gallery: [
        "/home-cleaning-living-room-professional.jpg",
        "/cleaning-service-kitchen-interior.jpg",
        "/professional-house-cleaning-residential.jpg",
        "/cleaning-staff-with-equipment.jpg",
      ],
    },
    3: {
      id: 3,
      title: "Electrical Repairs",
      description:
        "Safe and reliable electrical work by certified electricians for all your electrical needs. We handle everything from installations to repairs with safety compliance and modern tools.",
      price: 600,
      rating: 4.7,
      reviews: 156,
      location: "Bangalore",
      provider: "PowerFix Solutions",
      category: "Electrical",
      image: "/electrician-installing-light-fixture.jpg",
      providerInfo: {
        name: "Amit Verma",
        experience: "12+ years",
        phone: "+91 98765 65432",
        email: "amit@powerfix.com",
        verified: true,
        completedJobs: 600,
      },
      features: [
        "Certified electricians",
        "Safety compliance",
        "24/7 emergency service",
        "Modern equipment",
        "Warranty on work",
      ],
      gallery: [
        "/electrician-installing-wiring.jpg",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
      ],
    },
    4: {
      id: 4,
      title: "Personal Chef Service",
      description:
        "Delicious home-cooked meals prepared by professional chefs with fresh ingredients. Customized menus tailored to your preferences and dietary requirements with premium quality food.",
      price: 1200,
      rating: 4.9,
      reviews: 67,
      location: "Chennai",
      provider: "Chef Masters",
      category: "Cooking",
      image: "/placeholder.svg?height=400&width=600",
      providerInfo: {
        name: "Chef Vikram",
        experience: "15+ years",
        phone: "+91 98765 76543",
        email: "vikram@chefmasters.com",
        verified: true,
        completedJobs: 400,
      },
      features: [
        "Customized menus",
        "Fresh ingredients",
        "Dietary options",
        "Professional kitchen",
        "Catering available",
      ],
      gallery: [
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
      ],
    },
    5: {
      id: 5,
      title: "Car Mechanic Service",
      description:
        "Professional automotive repair and maintenance services at your doorstep. Expert mechanics with years of experience handling all vehicle types and issues.",
      price: 900,
      rating: 4.6,
      reviews: 203,
      location: "Mumbai",
      provider: "AutoCare Experts",
      category: "Mechanic",
      image: "/mechanic-repairing-car-engine.jpg",
      providerInfo: {
        name: "Rajesh Patel",
        experience: "18+ years",
        phone: "+91 98765 87654",
        email: "rajesh@autocare.com",
        verified: true,
        completedJobs: 800,
      },
      features: [
        "All vehicle types",
        "Genuine spare parts",
        "Warranty on repairs",
        "Quick service",
        "Transparent pricing",
      ],
      gallery: [
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
      ],
    },
    6: {
      id: 6,
      title: "Garden Maintenance",
      description:
        "Complete garden care including landscaping, pruning, and plant care services. Transform your outdoor space with professional gardening expertise.",
      price: 700,
      rating: 4.8,
      reviews: 92,
      location: "Bangalore",
      provider: "Green Thumb Gardens",
      category: "Gardening",
      image: "/gardener-landscaping-garden-plants.jpg",
      providerInfo: {
        name: "Suresh Kumar",
        experience: "9+ years",
        phone: "+91 98765 98765",
        email: "suresh@greenthumbs.com",
        verified: true,
        completedJobs: 280,
      },
      features: [
        "Landscape design",
        "Plant care expertise",
        "Seasonal maintenance",
        "Organic solutions",
        "Garden transformation",
      ],
      gallery: [
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
      ],
    },
    7: {
      id: 7,
      title: "House Painting",
      description:
        "Professional interior and exterior painting services with premium quality paints. Expert painters ensuring perfect finishes and attention to detail.",
      price: 1500,
      rating: 4.7,
      reviews: 134,
      location: "Delhi",
      provider: "Color Craft Painters",
      category: "Painting",
      image: "/painter-painting-interior-walls.jpg",
      providerInfo: {
        name: "Ravi Singh",
        experience: "11+ years",
        phone: "+91 98765 11111",
        email: "ravi@colorcraft.com",
        verified: true,
        completedJobs: 450,
      },
      features: [
        "Premium quality paints",
        "Interior and exterior",
        "Perfect finishes",
        "Fast turnaround",
        "Warranty included",
      ],
      gallery: [
        "/painter-painting-interior-walls.jpg",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
      ],
    },
    8: {
      id: 8,
      title: "Furniture Repair",
      description:
        "Expert carpentry services for furniture repair, custom furniture, and woodwork. Skilled craftsmen delivering quality woodwork solutions.",
      price: 800,
      rating: 4.5,
      reviews: 78,
      location: "Chennai",
      provider: "Wood Works Pro",
      category: "Carpentry",
      image: "/carpenter-woodworking-furniture.jpg",
      providerInfo: {
        name: "Madhavan",
        experience: "14+ years",
        phone: "+91 98765 22222",
        email: "madhavan@woodworks.com",
        verified: true,
        completedJobs: 350,
      },
      features: [
        "Furniture repair",
        "Custom woodwork",
        "Quality materials",
        "Expert craftsmanship",
        "Finishing options",
      ],
      gallery: [
        "/carpenter-woodworking-furniture.jpg",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
      ],
    },
  }
  return services[id] || null
}

export default function ServiceDetailPageClient({ params }) {
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  const { addToCart } = useCart()
  const { userType } = useAuth()

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const serviceData = getServiceById(params.id)
      setService(serviceData)
      setLoading(false)
    }, 500)
  }, [params.id])

  const handleAddToCart = () => {
    if (service) {
      addToCart(service)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="bg-gray-300 dark:bg-gray-700 h-96 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
              <div>
                <div className="bg-gray-300 dark:bg-gray-700 h-64 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Service Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400">The service you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-96 rounded-lg overflow-hidden mb-8"
        >
          <img
            src={service.gallery[selectedImage] || "/placeholder.svg"}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 flex space-x-2">
            {service.gallery.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-3 h-3 rounded-full ${selectedImage === index ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">{service.category}</Badge>
                <div className="text-2xl font-bold text-primary">₹{service.price}</div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{service.rating}</span>
                  <span className="text-gray-500">({service.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  {service.location}
                </div>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{service.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Gallery */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {service.gallery.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 rounded-lg overflow-hidden ${
                      selectedImage === index ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Provider Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {service.providerInfo.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{service.providerInfo.name}</h3>
                    <p className="text-sm text-gray-500">{service.provider}</p>
                  </div>
                  {service.providerInfo.verified && <Shield className="h-5 w-5 text-green-500" />}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-medium">{service.providerInfo.experience}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Completed Jobs</span>
                    <span className="font-medium">{service.providerInfo.completedJobs}+</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Booking Card */}
            {userType === "user" && (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-primary mb-2">₹{service.price}</div>
                    <p className="text-gray-600">Starting price</p>
                  </div>

                  <div className="space-y-4">
                    <Button onClick={handleAddToCart} className="w-full">
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      Available 24/7
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Trust Indicators */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Why Choose Us?</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Verified Professional</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">Quality Guaranteed</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <span className="text-sm">On-Time Service</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
