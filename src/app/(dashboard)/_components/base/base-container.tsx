import clsx from 'clsx'
import { FormHTMLAttributes, ReactNode } from 'react'

interface BaseContainerType extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
  className?: string
  isForm?: boolean
}

const BaseContainer = ({
  className,
  children,
  isForm,
  ...formProps
}: BaseContainerType) => {
  const classname = clsx(className, 'flex flex-col gap-8 pt-5 flex-1 h-full')

  if (isForm) {
    return (
      <form {...formProps} className={classname}>
        {children}
      </form>
    )
  } else {
    return <div className={classname}>{children}</div>
  }
}

export { BaseContainer }
