import React from 'react'
import { Ellipsis } from 'lucide-react'

const DotOptions = React.forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <button
      ref={ref}
      className="hover:scale-105 duration-500 outline-none rounded-xl px-2 py-1 bg-neutrals-12 border border-neutrals-10"
      {...props}
    >
      <Ellipsis />
    </button>
  )
})

DotOptions.displayName = 'DotOptions'

export { DotOptions }
