export const createClassName = (str: string) => {
  let i = 0,
    out = 11
  while (i < str.length) out = (101 * out + str.charCodeAt(i++)) >>> 0
  return 'flui-' + out.toString(16).toLowerCase()
}
