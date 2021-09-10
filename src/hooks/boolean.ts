import { useState } from 'react'

export const useBoolean = () => {
  const [value, setValue] = useState(false)

  return [
    value,
    {
      on: () => setValue(true),
      off: () => setValue(false),
      toggle: () => setValue((v) => !v),
    },
  ]
}
