import { useEffect, useState } from 'react'

export interface useDebounceTriggerFunction {
  (cb: React.EffectCallback, timeInMillis?: number): void
}

export const useDebounceTrigger: useDebounceTriggerFunction = (
  cb,
  timeInMillis = 1000,
) => {
  const [change, setChange] = useState(false)

  useEffect(() => {
    const id = setTimeout(cb, timeInMillis)
    return () => clearTimeout(id)
  }, [change])

  return () => setChange((v) => !v)
}
