import { THEME_DICTIONARY } from './constants'

export const parseThemeSentence = (val: string): string => {
  if (val in THEME_DICTIONARY) {
    return THEME_DICTIONARY[val]
  } else {
    return val.replace(/[A-Z]/g, '-$&').toLowerCase()
  }
}

export function makeNthChildSelector(
  value: number | number[],
  offset: number = 0,
) {
  if (Array.isArray(value)) {
    return value.map((v) => `:nth-child(${v + offset})`).join(',')
  }
  return `:nth-child(${value + offset})`
}
