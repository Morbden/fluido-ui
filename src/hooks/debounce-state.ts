import React, { useEffect, useState } from 'react'

export interface UseDebounceStateFunction {
  <T = undefined>(timeInMillis?: number, initial?: T): [
    T | undefined,
    React.Dispatch<React.SetStateAction<T | undefined>>,
  ]
}

export const useDebounceState: UseDebounceStateFunction = (
  timeInMillis = 1000,
  initial,
) => {
  const [content, setContent] = useState(initial)
  const [debounceContent, setDebounceContent] = useState(initial)

  useEffect(() => {
    const id = setTimeout(() => setDebounceContent(content), timeInMillis)
    return () => clearTimeout(id)
  }, [content])

  return [debounceContent, setContent]
}
