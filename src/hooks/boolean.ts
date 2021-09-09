import { useState } from 'react'

export const useBoolean = () => {
  const [value, setValue] = useState(false)

  return [
    value,
    {
      on: () => setValue(true),
      off: () => setValue(true),
      toggle: () => setValue((v) => !v),
    },
  ]
}
