'use client'

import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format, subMonths } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const DatePickerWithRange = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  })

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          'hover:scale-105 text-neutrals-6 h-max py-1.5 flex items-center gap-2.5 duration-500 border border-neutrals-11 px-2.5 rounded-lg bg-gradient-to-r from-neutrals-12 to-neutrals-13',
        )}
      >
        <CalendarIcon className="text-neutrals-6 h-5 w-5" />
        {date?.from ? (
          date.to ? (
            <>
              {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
            </>
          ) : (
            format(date.from, 'LLL dd, y')
          )
        ) : (
          <span>Pick a date</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          className="text-white"
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePickerWithRange }
