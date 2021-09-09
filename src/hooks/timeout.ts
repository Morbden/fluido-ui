import { useEffect } from 'react'

export const useTimeout = (
  cb: React.EffectCallback,
  timeInMillis: number = 1000,
) => {
  useEffect(() => {
    const id = setTimeout(cb, timeInMillis)
    return () => clearTimeout(id)
  }, [])
}
