export const STYLE_ID_THEME = '_flui_theme'
export const STYLE_ID_FIXED = '_flui'

const ssrTheme = {
  data: '',
} as Text
const ssrFixed = {
  data: '',
} as Text

const getSheet = (cache: Text, id: string) => (): Text => {
  if (typeof window !== 'object') return cache

  const sheet =
    document.head.querySelector('#' + id) ||
    Object.assign(document.head.appendChild(document.createElement('style')), {
      innerHTML: ' ',
      id: id,
    })

  return sheet.firstChild as Text
}

export const getSheetTheme = getSheet(ssrTheme, STYLE_ID_THEME)
export const getSheetFixed = getSheet(ssrFixed, STYLE_ID_FIXED)
