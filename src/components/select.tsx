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
import { Calendar } from 'lucide-react'

const Select = ({
  label,
  items,
  placeholder,
  onValueChange,
  defaultValue,
}: {
  label?: string
  items: {
    value: string
    label: string
  }[]
  placeholder: string
  onValueChange?: (value: string) => void
  defaultValue?: string
}) => {
  return (
    <SelectContainer
      defaultValue={defaultValue}
      onValueChange={(e) => onValueChange && onValueChange(e)}
    >
      <SelectTrigger className="!select-none">
        <div className="flex items-center gap-2.5 text-base">
          <Calendar className="w-5 h-5" />
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
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
