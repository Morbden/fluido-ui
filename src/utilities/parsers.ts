import { THEME_DICTIONARY } from './constants'

export const parseThemeSentence = (val: string): string => {
  if (val in THEME_DICTIONARY) {
    return THEME_DICTIONARY[val]
  } else {
    return val.replace(/[A-Z]/g, '-$&').toLowerCase()
  }
}
