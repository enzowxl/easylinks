import clsx from 'clsx'
import { Input, InputType } from './input'
import { Select, SelectType } from './select'

interface SelectInputType {
  input: React.InputHTMLAttributes<HTMLInputElement> & InputType
  select: SelectType
  label?: string
  className?: string
  classnamecontainer?: string
  required?: boolean
}

const SelectInput = ({
  input,
  select,
  label,
  classnamecontainer,
  className,
  required,
}: SelectInputType) => {
  return (
    <div className={clsx(classnamecontainer, 'flex flex-col gap-2.5 w-full')}>
      {label && (
        <div className="flex gap-2 items-center">
          <h5 className="max-sm:text-sm">{label}</h5>
          {!required && (
            <p className="max-sm:text-xs text-sm text-neutrals-6">(Optional)</p>
          )}
        </div>
      )}
      <div className={clsx(className, 'flex w-full')}>
        <Select {...select} />
        <Input {...input} label={undefined} required={required} />
      </div>
    </div>
  )
}

export { SelectInput }
