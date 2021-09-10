import { useEffect } from 'react'

export interface useTimeoutFunction {
  (cb: React.EffectCallback, timeInMillis?: number): void
}

export const useTimeout: useTimeoutFunction = (cb, timeInMillis = 1000) => {
  useEffect(() => {
    const id = setTimeout(cb, timeInMillis)
    return () => clearTimeout(id)
  }, [])
}
