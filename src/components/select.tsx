'use client'

import * as React from 'react'

import {
  Select as SelectContainer,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LucideProps } from 'lucide-react'
import clsx from 'clsx'

export interface SelectType {
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  label?: string
  items: {
    value: string
    label: string
  }[]
  placeholder: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  disabled?: boolean
  className?: string
}

const Select = ({
  icon,
  label,
  items,
  placeholder,
  onValueChange,
  defaultValue,
  disabled,
  className,
}: SelectType) => {
  const Icon = icon
  return (
    <SelectContainer
      defaultValue={defaultValue}
      onValueChange={(e) => onValueChange && onValueChange(e)}
    >
      <SelectTrigger
        className={clsx(
          'outline-none text-neutrals-6',
          disabled ? '!text-neutrals-7' : '',
          className,
        )}
      >
        <div className="flex items-center gap-2.5 text-base">
          {Icon && <Icon className={clsx('w-5 h-5')} />}
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && (
            <React.Fragment>
              <SelectLabel>{label}</SelectLabel>
              <SelectSeparator />
            </React.Fragment>
          )}
          {items &&
            items.map(({ value, label }, index) => (
              <React.Fragment key={value}>
                <SelectItem value={value}>{label}</SelectItem>
                {items.length !== index + 1 && <SelectSeparator />}
              </React.Fragment>
            ))}
        </SelectGroup>
      </SelectContent>
    </SelectContainer>
  )
}

export { Select }
