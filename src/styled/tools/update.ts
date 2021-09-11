import { minify } from 'csso'
import { TypedMap } from 'ui-types/generics'
import { getSheetFixed, getSheetTheme } from './get-sheet'

/**
 * Extracts and wipes the cache
 */
export const extractCss = (theme: boolean = false) => {
  let sheet: Text
  if (theme) sheet = getSheetTheme()
  else sheet = getSheetFixed()

  const out = sheet.data || ''
  sheet.data = ''
  return out
}

/**
 * Updates the target and keeps a local cache
 */
export const update = (cache: TypedMap<string>, sheet: Text) => {
  sheet.data = minify(Object.values(cache).join('')).css
}
