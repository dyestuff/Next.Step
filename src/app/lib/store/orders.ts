import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface OrderShipping {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  city: string
  address: string
  zip: string
  notes: string
}

export interface OrderItem {
  id: string
  name: string
  price: string
  quantity: number
  size: number
  image: string
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  shipping: OrderShipping
  createdAt: string
}

interface OrderStore {
  orders: Order[]
  addOrder: (order: Order) => void
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
    }),
    {
      name: 'nextstep-orders',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
