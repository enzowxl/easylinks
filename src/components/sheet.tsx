import { useSheetStore } from '@/providers/sheet-provider'
import { X } from 'lucide-react'
import React, { ReactNode } from 'react'
import { Logo } from './logo'

const Sheet = ({
  children,
  onClose,
  title,
}: {
  children: ReactNode
  onClose?: () => void
  title?: string
}) => {
  const { dispatch, state } = useSheetStore((state) => state)

  const closeSheet = () => {
    dispatch.closeSheet()
    onClose && onClose()
  }

  if (!state.isOpen) return null

  return (
    <div
      onClick={closeSheet}
      className="fixed top-0 bottom-0 left-0 right-0 z-[1] flex w-full h-full bg-black/80 overflow-hidden"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="max-sm:w-full w-[320px] h-full flex flex-col gap-5 bg-neutrals-12 p-5"
      >
        <div className="flex w-full items-center justify-between">
          <Logo />
          <X className="cursor-pointer" onClick={closeSheet} />
        </div>
        {title && <h4 className="font-bold">{title}</h4>}
        {children}
      </div>
    </div>
  )
}

export { Sheet }
