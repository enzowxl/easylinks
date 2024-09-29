import { ReactNode } from 'react'
import { createStore } from 'zustand/vanilla'

export type ModalState = {
  states: {
    isOpen: boolean
    data: ReactNode | null
  }
}

export type ModalDispatch = {
  dispatchs: {
    openModal: (data: ReactNode) => void
    closeModal: () => void
  }
}

export type ModalStore = ModalState & ModalDispatch

export const defaultInitState: ModalState = {
  states: {
    isOpen: false,
    data: null,
  },
}

export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>((set) => ({
    ...initState,
    dispatchs: {
      openModal: (data: ReactNode) =>
        set(() => ({
          states: { isOpen: true, data },
        })),
      closeModal: () =>
        set(() => ({
          states: { isOpen: false, data: null },
        })),
    },
  }))
}
