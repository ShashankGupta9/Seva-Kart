"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingCart, Moon, Sun, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, userType, logout, isAuthenticated } = useAuth()
  const { getTotalItems } = useCart()

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold text-primary">
              SevaKart
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              Services
            </Link>
            {userType === "provider" && (
              <Link
                href="/provider/dashboard"
                className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {userType === "user" && (
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Button>
              </Link>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">Hi, {user?.name}</span>
                <Button variant="ghost" size="icon" onClick={logout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link href="/auth/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900">
                <Link
                  href="/"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
                {userType === "provider" && (
                  <Link
                    href="/provider/dashboard"
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                {userType === "user" && (
                  <Link
                    href="/cart"
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Cart ({getTotalItems()})
                  </Link>
                )}
                {!isAuthenticated && (
                  <>
                    <Link
                      href="/auth/login"
                      className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
