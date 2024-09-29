import { ReactNode } from 'react'
import { createStore } from 'zustand/vanilla'

export type ModalState = {
  state: {
    isOpen: boolean
    data: ReactNode | null
  }
}

export type ModalDispatch = {
  dispatch: {
    openModal: (data: ReactNode) => void
    closeModal: () => void
  }
}

export type ModalStore = ModalState & ModalDispatch

export const defaultInitState: ModalState = {
  state: {
    isOpen: false,
    data: null,
  },
}

export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>((set) => ({
    ...initState,
    dispatch: {
      openModal: (data: ReactNode) =>
        set(() => ({
          state: { isOpen: true, data },
        })),
      closeModal: () =>
        set(() => ({
          state: { isOpen: false, data: null },
        })),
    },
  }))
}
