'use client'

import { CheckIcon } from 'lucide-react'
import { useState } from 'react'

interface CheckBoxType {
  name: string
}

const CheckBox = ({ name }: CheckBoxType) => {
  const [state, updateState] = useState(false)

  function onChange() {
    updateState(!state)
  }

  return (
    <button
      onClick={onChange}
      className="hover:scale-105 duration-500 w-5 h-5 flex items-center justify-center rounded-lg bg-neutrals-12 border border-neutrals-10"
    >
      <input
        name={name}
        type="checkbox"
        className="hidden"
        onChange={onChange}
        checked={state}
      />
      {state && <CheckIcon className="w-3 h-3" />}
    </button>
  )
}

export { CheckBox }
