import { useState } from 'react'

export const useArrayState = <T = undefined>(initial: T[]) => {
  const [array, setArray] = useState(initial)

  const handlePush = (...values: T[]) => {
    setArray((l) => [...l, ...values])
  }
  const handleRemove = (start: number, size: number = 1) => {
    setArray((l) => {
      l.splice(start, size)
      return [...l]
    })
  }
  const handleClear = (replace?: T[]) => {
    setArray(replace || [])
  }
  const handleSet = (index: number, value: T) => {
    setArray((l) => {
      l.splice(index, 1, value)
      return [...l]
    })
  }
  const handleFilter = (
    filter: (value: T, index: number, list: T[]) => T[],
  ) => {
    setArray((l) => {
      const fl = l.filter(filter)
      return [...fl]
    })
  }

  return [
    array,
    {
      push: handlePush,
      remove: handleRemove,
      clear: handleClear,
      set: handleSet,
      filter: handleFilter,
    },
  ]
}
