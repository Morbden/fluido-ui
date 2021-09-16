import { useRef } from 'react'

export interface useStatePreviousFunction {
  <T = undefined>(value: T): T | undefined
}

export const useStatePrevious: useStatePreviousFunction = <T = undefined>(
  value: T,
) => {
  const curr = useRef<T>(value)
  const prev = useRef<T>()

  if (curr.current !== value) {
    prev.current = curr.current
    curr.current = value
  }

  return prev.current
}
