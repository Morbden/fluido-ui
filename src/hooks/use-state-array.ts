import { useState } from 'react'

export interface useStateArrayFunction {
  <T = undefined>(initial: T[]): [
    T[],
    {
      push: (...values: T[]) => void
      remove: (start: number, size?: number) => void
      clear: (replace?: T[]) => void
      set: (index: number, value: T) => void
      filter: (f: (value: T, index: number, list: T[]) => T[]) => void
    },
  ]
}

export const useStateArray: useStateArrayFunction = (initial) => {
  const [array, setArray] = useState(initial)

  return [
    array,
    {
      push: (...values) => {
        setArray((l) => [...l, ...values])
      },
      remove: (start, size = 1) => {
        setArray((l) => {
          l.splice(start, size)
          return [...l]
        })
      },
      clear: (replace) => {
        setArray(replace || [])
      },
      set: (index, value) => {
        setArray((l) => {
          l.splice(index, 1, value)
          return [...l]
        })
      },
      filter: (filter) => {
        setArray((l) => {
          const fl = l.filter(filter)
          return [...fl]
        })
      },
    },
  ]
}
