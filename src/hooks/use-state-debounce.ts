import { useEffect, useState } from 'react'

export interface UseStateDebounceFunction {
  <T = undefined>(timeInMillis?: number, initial?: T): [
    T | undefined,
    React.Dispatch<React.SetStateAction<T | undefined>>,
  ]
}

export const useStateDebounce: UseStateDebounceFunction = (
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
