import clsx from 'clsx'
import { Input, InputType } from './input'
import { Select, SelectType } from './select'

interface SelectInputType {
  input: React.InputHTMLAttributes<HTMLInputElement> & InputType
  select: SelectType
  label?: string
  className?: string
  classnamecontainer?: string
}

const SelectInput = ({
  input,
  select,
  label,
  classnamecontainer,
  className,
}: SelectInputType) => {
  return (
    <div className={clsx(classnamecontainer, 'flex flex-col gap-2.5 w-full')}>
      <h5>{label}</h5>
      <div className={clsx(className, 'flex w-full')}>
        <Select {...select} />
        <Input {...input} label={undefined} />
      </div>
    </div>
  )
}

export { SelectInput }
