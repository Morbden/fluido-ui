import { TypedMap } from 'ui-types/generics'
import { Breakpoints, Colors, DefaultTheme } from 'ui-types/styled'

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

export const THEME: DefaultTheme = {
  breakpoints: BREAKPOINTS,
  colors: COLORS,
  fonts: {
    display: {
      fontFamily: ['system-ui', 'sans-serif'],
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
    },
  },
}

export const THEME_DICTIONARY: TypedMap<string> = {
  breakpoints: 'bkp',
  breakpoint: 'bkp',
  colors: 'clr',
  color: 'clr',
  fontFamily: 'ff',
  fonts: 'fts',
  font: 'fts',
  fontSize: 'fs',
  fontWeight: 'fw',
  letterSpace: 'ls',
  lineHeight: 'lh',
  theme: 'thm',
}
