import clsx from 'clsx'
import { ReactNode } from 'react'

interface BaseContentType {
  children: ReactNode
  className?: string
}

const BaseContent = ({ className, children }: BaseContentType) => {
  return (
    <div
      className={clsx(
        className,
        'flex flex-col gap-2.5 px-5 pb-5 flex-1 overflow-y-auto',
      )}
    >
      {children}
    </div>
  )
}

export { BaseContent }
