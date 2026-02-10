"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const savedCart = localStorage.getItem("sevakart_cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("sevakart_cart", JSON.stringify(items))
  }, [items])

  const addToCart = (service) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === service.id)
      if (existingItem) {
        return prev.map((item) => (item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...service, quantity: 1 }]
    })
  }

  const removeFromCart = (serviceId) => {
    setItems((prev) => prev.filter((item) => item.id !== serviceId))
  }

  const updateQuantity = (serviceId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(serviceId)
      return
    }
    setItems((prev) => prev.map((item) => (item.id === serviceId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
