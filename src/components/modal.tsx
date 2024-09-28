import { X } from 'lucide-react'
import React, { createElement, isValidElement, ReactNode } from 'react'

const Modal = ({
  children,
  trigger,
  onClose,
  title,
}: {
  children: ({ closeModal }: { closeModal: () => void }) => ReactNode
  trigger: ReactNode
  onClose?: () => void
  title: string
}) => {
  const [isModalVisible, updateIsModalVisible] = React.useState<boolean>(false)

  const closeModal = () => {
    updateIsModalVisible(false)
    onClose && onClose()
  }

  const openModal = () => {
    updateIsModalVisible(true)
  }

  return (
    <React.Fragment>
      {isValidElement(trigger) &&
        createElement(trigger.type, {
          ...trigger.props,
          onClick: openModal,
        })}

      {isModalVisible && (
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
            {children({ closeModal })}
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export { Modal }
