import { useEffect, useMemo, useState } from 'react'

export const useTimer = (
  precision: number = 2,
  step: number = 1000,
): [
  number,
  {
    start: VoidFunction
    stop: VoidFunction
    restart: VoidFunction
  },
] => {
  const [value, setValue] = useState(0)
  const [start, setStart] = useState(false)
  const pres = useMemo(() => Math.pow(10, precision || 0), [precision])

  useEffect(() => {
    if (!start) return

    const id = setInterval(() => setValue((v) => v + step / 1000), step)

    return () => clearInterval(id)
  }, [start, pres])

  return [
    Math.round(value * pres) / pres,
    {
      start: () => setStart(true),
      stop: () => setStart(false),
      restart: () => {
        setValue(0)
        setStart(true)
      },
    },
  ]
}
