import { useEffect } from 'react'

export const useCallOnce = (cb: React.EffectCallback) => {
  useEffect(cb, [])
}
