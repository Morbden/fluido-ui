import { useEffect } from 'react'

export interface useDebounceFunction {
  (cb: React.EffectCallback, timeInMillis: number, dependencies: any[]): void
}

export const useDebounce: useDebounceFunction = (
  cb,
  timeInMillis,
  dependencies,
) => {
  useEffect(() => {
    const id = setTimeout(cb, timeInMillis)
    return () => clearTimeout(id)
  }, dependencies)
}
