import clsx from 'clsx'
import { NavAuth } from '../nav/nav-auth'
import { ReactNode } from 'react'

interface BaseType {
  title: string
  children: ReactNode
  className?: string
}

const Base = ({ title, className, children }: BaseType) => {
  return (
    <div className="lg:rounded-lg flex flex-col h-full bg-dark">
      <NavAuth title={title} />
      <div
        className={clsx(
          'flex-1 flex flex-col h-full overflow-hidden',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
export { Base }

/* <div className="lg:rounded-lg bg-dark h-full overflow-y-auto"> */
