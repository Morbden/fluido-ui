import { useEffect } from 'react'

export interface useIntervalFunction {
  (cb: React.EffectCallback, timeInMillis?: number): void
}

export const useInterval: useIntervalFunction = (cb, timeInMillis = 1000) => {
  useEffect(() => {
    const id = setInterval(cb, timeInMillis)
    return () => clearInterval(id)
  }, [])
}
