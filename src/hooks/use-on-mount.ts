import { useEffect } from 'react'

export const useOnMount = (cb: React.EffectCallback) => {
  useEffect(cb, [])
}
