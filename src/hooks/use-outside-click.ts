import {
  MouseEventHandler,
  PointerEventHandler,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react'
import { useForkRef, AnyRef } from './use-fork-ref'

export interface useClickOutsideFunction {
  <T extends Element>(
    handler: MouseEventHandler | PointerEventHandler,
    block?: boolean,
    ref?: AnyRef<T>,
  ): (node: T) => void
}

export const useClickOutside: useClickOutsideFunction = (
  handler,
  block = false,
  ref,
) => {
  const validRef = useRef<any>()
  const savedHandler = useRef<MouseEventHandler | PointerEventHandler>()
  const mainRef = useForkRef(validRef, ref as any)
  const memoizedCallback = useCallback((e: any) => {
    if (
      validRef &&
      validRef.current &&
      !validRef.current.contains(e.target as Element)
    ) {
      savedHandler.current && savedHandler.current(e)
    }
  }, [])

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useLayoutEffect(() => {
    if (block) return

    document.addEventListener('click', memoizedCallback, true)
    document.addEventListener('ontouchstart', memoizedCallback, true)

    return () => {
      document.removeEventListener('click', memoizedCallback, true)
      document.removeEventListener('ontouchstart', memoizedCallback, true)
    }
  }, [ref, handler, block])

  return mainRef
}
