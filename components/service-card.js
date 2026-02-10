"use client"

import { motion } from "framer-motion"
import { Star, MapPin, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function ServiceCard({ service, index = 0 }) {
  const { addToCart } = useCart()
  const { userType } = useAuth()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(service)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link href={`/services/${service.id}`}>
        <Card className="h-full cursor-pointer service-card-hover">
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-sm font-semibold">
                ₹{service.price}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{service.description}</p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{service.rating}</span>
                  <span className="text-sm text-gray-500">({service.reviews})</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  {service.location}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">by {service.provider}</div>
                {userType === "user" && (
                  <Button size="sm" onClick={handleAddToCart} className="flex items-center space-x-1">
                    <Plus className="h-4 w-4" />
                    <span>Add</span>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
