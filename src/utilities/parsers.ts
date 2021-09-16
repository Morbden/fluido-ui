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
