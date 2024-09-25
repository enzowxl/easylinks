import clsx from 'clsx'
import { LucideProps } from 'lucide-react'

const variants = {
  big: '!p-3',
}

interface InputType {
  title?: string
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  label?: string
  classnamecontainer?: string
  classnameinputcontainer?: string
  variant?: keyof typeof variants
}

const Input = (
  props: React.InputHTMLAttributes<HTMLInputElement> & InputType,
) => {
  return (
    <div className={clsx('flex flex-col gap-2.5', props.classnamecontainer)}>
      {props.label && <h5>{props.label}</h5>}
      <div
        className={clsx(
          'hover:scale-105 flex items-center gap-2.5 duration-500 border border-neutrals-11 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-neutrals-12 to-neutrals-13',
          props.disabled ? 'hover:!scale-100 !cursor-not-allowed' : '',
          props.classnameinputcontainer,
          props.variant && variants[props.variant],
        )}
      >
        {props.icon && (
          <props.icon
            className={clsx(
              'w-5 h-5 text-neutrals-6',
              props.disabled ? '!text-neutrals-7' : '',
            )}
          />
        )}
        <input
          className={clsx(
            'w-full bg-transparent outline-none flex-1 placeholder:text-neutrals-6',
            props.disabled
              ? '!cursor-not-allowed placeholder:!text-neutrals-7 '
              : '',
          )}
          {...props}
        />
      </div>
    </div>
  )
}

export { Input }
