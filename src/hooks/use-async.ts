import { useEffect, useState } from 'react'

export interface UseAsyncFunction {
  <T = undefined>(cb: () => Promise<T>, dependencies: never[]): {
    loading: boolean
    error?: any
    value?: T
  }
}

export const useAsync: UseAsyncFunction = <T = undefined>(
  cb: () => Promise<T>,
  dependencies = [],
) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [value, setValue] = useState<T>()

  useEffect(() => {
    setLoading(true)
    setError(undefined)
    setValue(undefined)
    cb()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false))
  }, dependencies)

  return { loading, error, value }
}
