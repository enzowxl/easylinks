'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type ModalStore, createModalStore } from '@/stores/modal-store'

export type ModalStoreApi = ReturnType<typeof createModalStore>

export const ModalStoreContext = createContext<ModalStoreApi | undefined>(
  undefined,
)

export interface ModalStoreProviderProps {
  children: ReactNode
}

export const ModalStoreProvider = ({ children }: ModalStoreProviderProps) => {
  const storeRef = useRef<ModalStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createModalStore()
  }

  const modalContent = useStore(storeRef.current, (state) => state.state.data)

  return (
    <ModalStoreContext.Provider value={storeRef.current}>
      {children}
      {modalContent}
    </ModalStoreContext.Provider>
  )
}

export const useModalStore = <T,>(selector: (store: ModalStore) => T): T => {
  const modalStoreContext = useContext(ModalStoreContext)

  if (!modalStoreContext) {
    throw new Error(`useModalStore must be used within ModalStoreProvider`)
  }

  return useStore(modalStoreContext, selector)
}
