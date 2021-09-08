import { Breakpoint, DefaultTheme, Length } from 'ui-types/containers'
import { BREAKPOINTS, THEME } from './constants'

export function getBreakpoint(bp: string | Breakpoint, theme?: DefaultTheme) {
  if (bp in BREAKPOINTS) {
    return (
      (theme?.breakpoints && theme.breakpoints[bp as Breakpoint]) ||
      BREAKPOINTS[bp as Breakpoint]
    )
  }
  return bp as string
}

export function getComputedLength(
  property: string,
  length: Length | undefined | null,
  theme: DefaultTheme = THEME,
) {
  if (length === null || length === undefined) return ''
  if (typeof length === 'number') return `${property}: ${length * 0.25}rem;`
  if (typeof length === 'string') return `${property}: ${length};`

  const breakpoints = Object.entries(length).map(([key, value]) => {
    const bp = getBreakpoint(key, theme)
    if (typeof value === 'number') {
      return { prop: `${property}: ${value * 0.25}rem;`, bp }
    }
    return { prop: `${property}: ${value};`, bp }
  })
  const mediaQueries: string[] = []
  breakpoints.forEach((entry) => {
    if (entry.bp === 'default') {
      mediaQueries.push(entry.prop)
    } else {
      mediaQueries.push(`@media (min-width: ${entry.bp}){ ${entry.prop} }`)
    }
  })

  return mediaQueries.join('\n')
}
