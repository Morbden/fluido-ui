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
 * Updates the target and keeps a local cache
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
