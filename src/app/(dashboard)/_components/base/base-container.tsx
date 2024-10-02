import clsx from 'clsx'
import { ReactNode } from 'react'

interface BaseContainerType {
  children: ReactNode
  className?: string
}

const BaseContainer = ({ className, children }: BaseContainerType) => {
  return (
    <div className={clsx(className, 'flex flex-col gap-8 pt-5 flex-1 h-full')}>
      {children}
    </div>
  )
}

export { BaseContainer }
