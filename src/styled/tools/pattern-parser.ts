import { parseThemeSentence } from 'ui-utilities/parsers'
import { TypedMap } from 'ui-types/generics'

const REGEX_PROP_TAG = /\$[a-zA-Z][0-9a-zA-Z\-]*/g
const REGEX_THEME_PROP_TAG = /^\$the?me?(\-[0-9a-zA-Z]+)+/
const REGEX_THEME_MIN = /^thm/

const parseNumberType = (val: string | number | (string | number)[]): string =>
  Array.isArray(val)
    ? val.map(parseNumberType).join(' ')
    : typeof val === 'number'
    ? `${val * 0.25}rem`
    : val

const replacerData = (data: TypedMap, dataKey: string) => {
  const iteration = ([pattern, value]: [string, any]) => {
    const replacer = new RegExp(`\\$${pattern}`, 'g')

    if (!data[dataKey]) return

    if (typeof value === 'object' && !Array.isArray(value)) {
      const originalDataValue = data[dataKey]
      delete data[dataKey]

      if ('media' in value) {
        const media: TypedMap = value.media

        for (const k in media) {
          if (k === 'base') {
            data[dataKey] = originalDataValue.replace(
              replacer,
              parseNumberType(media.base),
            )
          } else if ('base' in media) {
            data[`@media ${k}`] = Object.assign(data[`@media ${k}`] || {}, {
              [dataKey]: originalDataValue.replace(
                replacer,
                parseNumberType(media[k]),
              ),
            })
          }
        }
      }
    } else if (typeof value === 'function') {
      iteration([pattern, value()])
    } else if ('%DEL%' === value) {
      delete data[dataKey]
    } else {
      data[dataKey] = data[dataKey].replace(replacer, parseNumberType(value))
    }
  }

  return iteration
}

export const patternParser = (data: TypedMap, props: TypedMap) => {
  const result: TypedMap = { ...data }

  for (const cssProp in result) {
    const value = result[cssProp]
    // Se o valor não for `string` é um `object`
    if (typeof value !== 'string') {
      // Repassar `object`
      result[cssProp] = patternParser(result[cssProp], props)
      continue
    }

    // Capturar padrões
    const matches =
      value.match(REGEX_PROP_TAG)?.filter((m, i, l) => l.indexOf(m) === i) || []
    if (!matches.length) continue

    // Mapear padrões e seus valores
    const entries = matches.map<[string, any]>((m) => {
      let val: any
      const key = m.substr(1)
      if (REGEX_THEME_PROP_TAG.test(m)) {
        let variable: string = key
        if (!REGEX_THEME_MIN.test(m)) {
          variable = variable
            .split('-')
            .map<string>(parseThemeSentence)
            .join('-')
        }
        val = `var(--flui${variable})`
      } else val = props[key] || '%DEL%'

      return [key, val]
    })

    entries.forEach(replacerData(result, cssProp))
  }

  return result
}
