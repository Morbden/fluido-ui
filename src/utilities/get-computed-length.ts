import {
  Breakpoint,
  Breakpoints,
  DefaultTheme,
  Length,
} from 'ui-types/containers'

const breakpoints: Breakpoints = {
  xs: '24em',
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
  '3xl': '120em',
  '4xl': '132em',
}

export function getBreakpoint(bp: string | Breakpoint, theme?: DefaultTheme) {
  if (bp in breakpoints) {
    return (
      (theme?.breakpoints && theme.breakpoints[bp as Breakpoint]) ||
      breakpoints[bp as Breakpoint]
    )
  }
  return bp as string
}

export function validateValue(value: any) {
  return value !== null && value !== undefined
}

const THEME: DefaultTheme = {}

export function getComputedLength(
  property: string,
  length: Length | undefined | null,
  theme: DefaultTheme = THEME,
) {
  if (
    (typeof length !== 'number' &&
      typeof length !== 'string' &&
      typeof length !== 'object') ||
    typeof length === null
  )
    return
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
