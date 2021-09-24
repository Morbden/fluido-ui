import { TinyColor } from '@ctrl/tinycolor'
import { THEME_DICTIONARY } from './constants'

export const parseThemeSentence = (val: string): string => {
  if (val in THEME_DICTIONARY) {
    return THEME_DICTIONARY[val]
  } else {
    return val.replace(/[A-Z]/g, '-$&').toLowerCase()
  }
}

// Filtros de lista
export const filterClearSame = (e: any, i: number, l: any[]) =>
  l.indexOf(e) === i
// Ordenadores de lista
export const sortLengthOrder =
  (asc = true) =>
  (a: string, b: string) =>
    asc ? b.length - a.length : a.length - b.length
// Transformadores de lista
export const listTrim = (v: string) => v.trim()
export const listClear = (s: string) => s !== ''

export function makeNthChildSelector(value: string, offset: string) {
  const children = value.split(/\s+/g)
  return children
    .map((v) => {
      const c = parseInt(v) + parseInt(offset || '0')
      if (isNaN(c)) {
        return ''
      }
      return `:nth-child(${c})`
    })
    .filter((c) => !!c)
    .join(',')
}

export const tryParseColor = (val: string, alias = 'color') => {
  const color = new TinyColor(val)
  if (!/^[0-9]/.test(val) && color.isValid) {
    const { h, s, l } = color.toHsl()
    return `hsl(
      ${Math.round(h * 100) / 100}
      ${Math.round(s * 10000) / 100}%
      ${Math.round(l * 10000) / 100}%
      / var(--flui-${alias}-opacity,1))`
  }
  return val.toString()
}

export const tryParseColorHSL = (val: string) => {
  const color = new TinyColor(val)
  if (!/^[0-9]/.test(val) && color.isValid) {
    const { h, s, l, a } = color.toHsl()
    return `hsl(
      ${Math.round(h * 100) / 100}
      ${Math.round(s * 10000) / 100}%
      ${Math.round(l * 10000) / 100}%
      / ${Math.round(a * 100) / 100}`
  }
  return val.toString()
}
