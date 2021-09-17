import { Breakpoints, Colors, DefaultTheme, Spaces, TypedMap } from 'ui-types'

export const BREAKPOINTS: Breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1904px',
}

export const COLORS: Colors = {
  blue: {
    '50': '#eff6ff',
    '100': '#dbeafe',
    '200': '#bfdbfe',
    '300': '#93c5fd',
    '400': '#60a5fa',
    '500': '#3b82f6',
    '600': '#2563eb',
    '700': '#1b4ed8',
    '800': '#1e40af',
    '900': '#1e3a8a',
  },
}

export const SPACES: Spaces = {
  xs: 0.5,
  sm: 1,
  md: 2,
  lg: 2.5,
  xl: 3,
  '2xl': 4,
}

export const THEME: DefaultTheme = {
  breakpoints: BREAKPOINTS,
  colors: COLORS,
  spaces: SPACES,
  fontFamily: {
    base: ['system-ui', 'sans-serif'],
    display: ['system-ui', 'sans-serif'],
    mono: ['system-ui', 'mono'],
  },
  fontWeight: '500',
  letterSpace: '0',
  lineHeight: '1',
  fontSize: {
    xs: '.75rem',
    sm: '.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
}

export const THEME_DICTIONARY: TypedMap<string> = {
  bkp: 'breakpoints',
  clr: 'colors',
  ff: 'font-family',
  fts: 'fonts',
  fs: 'font-size',
  fw: 'font-weight',
  ls: 'letter-space',
  lh: 'line-height',
  thm: 'theme',
  breakpoints: 'breakpoints',
  breakpoint: 'breakpoints',
  colors: 'colors',
  color: 'colors',
  fontFamily: 'font-family',
  fonts: 'fonts',
  font: 'font',
  fontSize: 'font-size',
  fontWeight: 'font-weight',
  letterSpace: 'letter-space',
  lineHeight: 'line-height',
}
