import { useMemo } from 'react'

function setRef(ref: any, value: any) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    ref.current = value
  }
}

export const useForkRef = (...refs: any[]) => {
  return useMemo(
    () => (refValue: any) => refs.forEach((r) => setRef(r, refValue)),
    refs,
  )
}
