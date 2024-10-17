import { ReactNode } from 'react'

const EditLinkItem = ({
  children,
  title,
  description,
}: {
  children: ReactNode
  title: string
  description: string
}) => {
  return (
    <section className="flex flex-col gap-5 w-full bg-neutrals-12 rounded-lg p-5">
      <div>
        <h4 className="max-sm:text-base font-bold text-lg">{title}</h4>
        <p className="max-sm:text-sm text-neutrals-6">{description}</p>
      </div>
      {children}
    </section>
  )
}

export { EditLinkItem }
