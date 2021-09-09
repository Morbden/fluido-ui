import React, { useEffect } from 'react'

export const useDebounce = (
  cb: React.EffectCallback,
  timeInMillis: number,
  dependencies: any[],
) => {
  useEffect(() => {
    const id = setTimeout(cb, timeInMillis)
    return () => clearTimeout(id)
  }, dependencies)
}
