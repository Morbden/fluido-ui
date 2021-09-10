import {
  MouseEventHandler,
  PointerEventHandler,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react'
import { useForkRef } from './use-fork-ref'

export const useOutsideClick = (
  handler: MouseEventHandler | PointerEventHandler,
  block: boolean = false,
  ref?: any,
) => {
  const validRef = useRef<Element>()
  const savedHandler = useRef<MouseEventHandler | PointerEventHandler>()
  const mainRef = useForkRef(validRef, ref)
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
