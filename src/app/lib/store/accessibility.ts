import { create } from 'zustand'

interface AccessibilityStore {
  isActive: boolean
  toggle: () => void
}

export const useAccessibilityStore = create<AccessibilityStore>()(
  (set) => ({
    isActive: false,
    toggle: () => set((state) => ({ isActive: !state.isActive })),
  })
)
