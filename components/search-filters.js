"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const categories = [
  "All Categories",
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Cooking",
  "Mechanic",
  "Gardening",
  "Painting",
  "Carpentry",
]

const locations = [
  "All Locations",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
]

export default function SearchFilters({ onSearch, onCategoryChange, onLocationChange }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")

  const handleSearch = () => {
    onSearch(searchTerm)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    onCategoryChange(category === "All Categories" ? "" : category)
  }

  const handleLocationChange = (location) => {
    setSelectedLocation(location)
    onLocationChange(location === "All Locations" ? "" : location)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Location Filter */}
        <Select value={selectedLocation} onValueChange={handleLocationChange}>
          <SelectTrigger>
            <MapPin className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search Button */}
        <Button onClick={handleSearch} className="w-full">
          Search
        </Button>
      </div>
    </motion.div>
  )
}
