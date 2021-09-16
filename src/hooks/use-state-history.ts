import React, { useCallback, useRef, useState } from 'react'

interface StateHistoryOptions {
  /** @default 10 */
  max?: number
}

interface StateHistoryControl<T> {
  history: T[]
  pointer: number
  back: VoidFunction
  forward: VoidFunction
  go: (val: number) => void
}

export interface usePreviousStateFunction {
  <T = undefined>(initial: T, opt?: StateHistoryOptions): [
    T | undefined,
    React.Dispatch<React.SetStateAction<T>>,
    StateHistoryControl<T>,
  ]
}

export const useStateHistory: usePreviousStateFunction = <T = undefined>(
  initial: T,
  { max = 10 } = {},
) => {
  const [value, setValue] = useState<T>(initial)
  const historyRef = useRef<T[]>([value])
  const pointerRef = useRef(0)

  return [
    value,
    (v: any) => {
      const resolvedValue = (typeof v === 'function' && v(value)) || v
      if (historyRef.current[pointerRef.current] !== resolvedValue) {
        if (pointerRef.current < historyRef.current.length - 1) {
          historyRef.current.splice(pointerRef.current + 1)
        }
        historyRef.current.push(resolvedValue)

        while (historyRef.current.length > max) {
          historyRef.current.shift()
        }
        pointerRef.current = historyRef.current.length - 1
      }
      setValue(resolvedValue)
    },
    {
      history: historyRef.current,
      pointer: pointerRef.current,
      back() {
        if (pointerRef.current <= 0) return
        pointerRef.current--
        setValue(historyRef.current[pointerRef.current])
      },
      forward() {
        if (pointerRef.current >= historyRef.current.length - 1) return
        pointerRef.current++
        setValue(historyRef.current[pointerRef.current])
      },
      go(index) {
        if (index < 0 || index >= historyRef.current.length - 1) return
        pointerRef.current = index
        setValue(historyRef.current[pointerRef.current])
      },
    },
  ]
}
