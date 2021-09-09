import { useEffect } from 'react'

export const useInterval = (
  cb: React.EffectCallback,
  timeInMillis: number = 1000,
) => {
  useEffect(() => {
    const id = setInterval(cb, timeInMillis)
    return () => clearInterval(id)
  }, [])
}
