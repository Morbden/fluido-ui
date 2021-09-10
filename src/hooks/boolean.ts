import { useState } from 'react'

export const useBoolean = (): [
  boolean,
  { on: VoidFunction; off: VoidFunction; toggle: VoidFunction },
] => {
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
