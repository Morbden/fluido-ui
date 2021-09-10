import React, { useMemo } from 'react'

export type AnyRef<T> = ((node: T) => void) | React.MutableRefObject<T>

export interface useForkRefFunction {
  <T extends Element>(...refs: AnyRef<T>[]): (node: T) => void
}

const setRef = <T extends Element>(ref: AnyRef<T>, value: T) => {
  if (typeof ref === 'function') {
    ref(value)
  } else {
    ref.current = value
  }
}

export const useForkRef: useForkRefFunction = (...refs) => {
  return useMemo(
    () => (refValue) => refs.forEach((r) => setRef(r, refValue)),
    refs,
  )
}
