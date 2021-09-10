import { useState } from 'react'

export interface useBooleanFunction {
  (): [boolean, { on: VoidFunction; off: VoidFunction; toggle: VoidFunction }]
}

export const useBoolean: useBooleanFunction = () => {
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
