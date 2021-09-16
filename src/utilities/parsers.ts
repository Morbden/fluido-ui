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
export const sortLengthOrder = (a: string, b: string) => b.length - a.length
// Transformadores de lista
export const listTrim = (v: string) => v.trim()
export const listClear = (s: string) => s !== ''
