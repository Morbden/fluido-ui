import { minify } from 'csso'
import { TypedMap } from 'ui-types/generics'
import { cssReset } from './css-reset'
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
 * Updates the sheet with cached CSS
 *
 * In production mode or in browser, CSS will be minified
 */
export const update = (cache: TypedMap<string>, sheet: Text) => {
  const data = cssReset + Object.values(cache).join('')

  if (
    typeof process !== 'object' ||
    !process.env.NODE_ENV ||
    process.env.NODE_ENV === 'production'
  ) {
    sheet.data = minify(data).css
  } else {
    sheet.data = data
  }
}
