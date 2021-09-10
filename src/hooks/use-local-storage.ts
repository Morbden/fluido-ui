import { useLayoutEffect, useState } from 'react'

export interface useLocalStorageFunction {
  <T = undefined>(key: string, initValue: T): [
    value: T,
    setValue: React.Dispatch<React.SetStateAction<T>>,
  ]
}

export const useLocalStorage: useLocalStorageFunction = (key, initValue) => {
  const [value, setValue] = useState(initValue)

  useLayoutEffect(() => {
    if (key in localStorage) {
      setValue(JSON.parse(localStorage[key]))
    }
  }, [key])

  useLayoutEffect(() => {
    if (value !== localStorage[key]) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue]
}
