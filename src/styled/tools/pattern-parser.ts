import { TypedMap } from 'ui-types/generics'

const REGEX_PROP_TAG = /\$[a-zA-Z][0-9a-zA-Z\-]*/g
const REGEX_THEME_PROP_TAG = /\$theme(\-[0-9a-zA-Z]+)+/g

const parseNumberType = (number: string | number) =>
  typeof number === 'number' ? `${number * 0.25}rem` : number

const replacerData = (data: TypedMap, dataKey: string) => {
  const iteration = ([pattern, value]: [string, any]) => {
    const replacer = new RegExp(`\\$${pattern}`, 'g')

    if (value === null || value === undefined) {
      data[dataKey] = data[dataKey].replace(replacer, 'initial')
    } else if (['number', 'string'].includes(typeof value)) {
      data[dataKey] = data[dataKey].replace(replacer, parseNumberType(value))
    } else if (typeof value === 'object') {
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
          } else {
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
    const entries = matches.map<[string, any]>((m) => [
      m.substr(1),
      props[m.substr(1)],
    ])

    entries.forEach(replacerData(result, cssProp))
  }

  return result
}
