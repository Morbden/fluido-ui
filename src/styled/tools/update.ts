import { minify } from 'csso'
import { getSheet } from './get-sheet'
/**
 * Extracts and wipes the cache
 */
export const extractCss = (target?: Element) => {
  const sheet = getSheet(target)
  const out = sheet.data || ''
  sheet.data = ''
  return out
}

/**
 * Updates the target and keeps a local cache
 */
export const update = (css: string, sheet: Text, append: boolean) => {
  sheet.data = minify(css).css
}
