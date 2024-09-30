import { useModalStore } from '@/providers/modal-provider'
import { X } from 'lucide-react'
import React, { ReactNode } from 'react'

const Modal = ({
  children,
  onClose,
  title,
}: {
  children: ReactNode
  onClose?: () => void
  title: string
}) => {
  const { dispatch, state } = useModalStore((state) => state)

  const closeModal = () => {
    dispatch.closeModal()
    onClose && onClose()
  }

  if (!state.isOpen) return null

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 bottom-0 left-0 right-0 z-[1] flex items-center justify-center w-full h-full bg-black/80 overflow-hidden"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="max-sm:w-full w-[460px] flex flex-col gap-5 mx-5 rounded-lg bg-neutrals-12 p-5"
      >
        <div className="flex w-full items-center justify-between">
          <h4 className="font-bold">{title}</h4>
          <X className="cursor-pointer" onClick={closeModal} />
        </div>
        {children}
      </div>
    </div>
  )
}

export { Modal }
