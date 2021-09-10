import { useEffect, useState } from 'react'

export const useDebounceTrigger = (
  cb: React.EffectCallback,
  timeInMillis: number = 1000,
) => {
  const [change, setChange] = useState(false)

  useEffect(() => {
    const id = setTimeout(cb, timeInMillis)
    return () => clearTimeout(id)
  }, [change])

  return () => setChange((v) => !v)
}
