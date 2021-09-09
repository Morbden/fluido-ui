import { useEffect, useRef } from 'react'

const useUpdateEffect = (cb: VoidFunction, dependencies: any[]) => {
  const firstUse = useRef(true)
  useEffect(() => {
    if (firstUse.current) {
      firstUse.current = false
      return
    }

    return () => cb()
  }, dependencies)
}
