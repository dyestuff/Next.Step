import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  brand: string
  price: string
  image: string
  size: number
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string, size: number) => void
  updateQuantity: (id: string, size: number, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          const existing = state.items.find(i => i.id === product.id && i.size === product.size)
          if (existing) {
            return {
              items: state.items.map(i =>
                i.id === product.id && i.size === product.size
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              )
            }
          }
          return { items: [...state.items, { ...product, quantity: 1 }] }
        })
      },

      removeItem: (id, size) => {
        set((state) => ({
          items: state.items.filter(i => !(i.id === id && i.size === size))
        }))
      },

      updateQuantity: (id, size, quantity) => {
        if (quantity < 1) return get().removeItem(id, size)
        set((state) => ({
          items: state.items.map(i =>
            i.id === id && i.size === size ? { ...i, quantity } : i
          )
        }))
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () => get().items.reduce((acc, item) => acc + item.quantity, 0),

      getTotalPrice: () => get().items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
    }),
    {
      name: 'nextstep-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
)