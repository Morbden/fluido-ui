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
  sheet.data.indexOf(css) == -1 &&
    (sheet.data = append ? css + sheet.data : sheet.data + css)
}
