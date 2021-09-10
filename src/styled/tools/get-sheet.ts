const STYLE_ID = '_flui'
const ssr = {
  data: '',
}

export let getSheet = (target?: Element): Text => {
  if (typeof window !== 'object') return ssr as Text

  const sheet = ((target || document.head).querySelector('#' + STYLE_ID) ||
    Object.assign(
      (target || document.head).appendChild(document.createElement('style')),
      {
        innerHTML: ' ',
        id: STYLE_ID,
      },
    )) as HTMLStyleElement

  return sheet.firstChild as Text
}
