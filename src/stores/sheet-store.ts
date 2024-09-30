import { ReactNode } from 'react'
import { createStore } from 'zustand/vanilla'

export type SheetState = {
  state: {
    isOpen: boolean
    data: ReactNode | null
  }
}

export type SheetDispatch = {
  dispatch: {
    openSheet: (data: ReactNode) => void
    closeSheet: () => void
  }
}

export type SheetStore = SheetState & SheetDispatch

export const defaultInitState: SheetState = {
  state: {
    isOpen: false,
    data: null,
  },
}

export const createSheetStore = (initState: SheetState = defaultInitState) => {
  return createStore<SheetStore>((set) => ({
    ...initState,
    dispatch: {
      openSheet: (data: ReactNode) =>
        set(() => ({
          state: { isOpen: true, data },
        })),
      closeSheet: () =>
        set(() => ({
          state: { isOpen: false, data: null },
        })),
    },
  }))
}
