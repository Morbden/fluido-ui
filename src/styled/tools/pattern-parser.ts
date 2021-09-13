import { parseThemeSentence } from 'ui-utilities/parsers'
import { TypedMap } from 'ui-types/generics'

const REGEX_PROP_TAG = /\$[a-z][0-9a-z\-]*/gi
const REGEX_FUNC_TAG =
  /#[a-z][0-9a-z\-]*\((?:(?:(?:[0-9a-z\-]+\((?:[0-9a-z\.\-%]+\s*(?:[,\+\-\*\/]|==|<=?|>=?|!=)?\s*)+\)|[0-9a-z\.\-%]+)+,?\s*)*)+\)/gi
const REGEX_FUNC_TYPES = /\#(if|f(all)?b(ack)?)/i
const REGEX_FUNC_TYPES_CLEAR = /\#(if|f(all)?b(ack)?)\(/i
const REGEX_THEME_PROP_TAG = /^\$the?me?(\-[0-9a-z]+)+/i
const REGEX_THEME_MIN = /^\$thm/i
const REGEX_IF_SIGNAL = /(==|<=?|>=?|!=)/g

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
    } else if ('%DEL%' === value && !REGEX_FUNC_TYPES.test(data[dataKey])) {
      delete data[dataKey]
    } else {
      data[dataKey] = data[dataKey].replace(replacer, parseNumberType(value))
    }
  }

  return iteration
}

const fixNestingSplit = () => {
  let counter = 0

  return (p: string[], c: string): string[] => {
    const opens = c.match(/\(/) || []
    const closes = c.match(/\)/) || []
    const reallyOpens = opens.length - closes.length
    if (reallyOpens > 0) {
      if (counter > 0) {
        p[p.length - 1] += ',' + c
      } else {
        p.push(c)
      }
    } else if (counter > 0) {
      p[p.length - 1] += ',' + c
    } else {
      p.push(c)
    }

    counter += reallyOpens
    return p
  }
}

export const patternParser = (
  data: TypedMap,
  props: TypedMap,
  sub: boolean = false,
) => {
  const result: TypedMap = { ...data }

  for (const cssProp in result) {
    const value = result[cssProp]
    // Se o valor não for `string` é um `object`
    if (typeof value !== 'string') {
      // Repassar `object`
      const buffer: TypedMap = patternParser(value, props, true)
      if (sub || cssProp[0] === '@') {
        result[cssProp] = buffer
        continue
      }

      delete result[cssProp]
      let pure: TypedMap | undefined
      for (const k in buffer) {
        if (typeof buffer[k] !== 'object') {
          pure = Object.assign(pure || {}, { [k]: buffer[k] })
          continue
        }
        result[k] = Object.assign(result[k] || {}, { [cssProp]: buffer[k] })
      }
      if (pure) {
        result[cssProp] = pure
      }
      continue
    }

    // Capturar padrões de propriedades
    const matchesProps =
      value.match(REGEX_PROP_TAG)?.filter((m, i, l) => l.indexOf(m) === i) || []
    if (!matchesProps.length) continue

    // Mapear valores em propriedades do component
    const entries = matchesProps.map<[string, any]>((m) => {
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
        val = `var(--flui-${variable.toLowerCase()})`
      } else val = props[key] || '%DEL%'

      return [key, val]
    })

    // Replace dos valores em suas determinas posições
    entries.forEach(replacerData(result, cssProp))

    const replacedValue = result[cssProp] as string
    if (!replacedValue) continue

    // Capturar padrões de funções
    const matchesFuncs =
      replacedValue
        .match(REGEX_FUNC_TAG)
        ?.filter((m, i, l) => l.indexOf(m) === i) || []

    if (matchesFuncs.length && !REGEX_FUNC_TYPES.test(replacedValue)) {
      delete result[cssProp]
      continue
    }

    if (!matchesFuncs.length) continue

    matchesFuncs.forEach((func) => {
      if (!result[cssProp]) return

      const contentMatch: string[] = func

        .replace(REGEX_FUNC_TYPES_CLEAR, '')
        .replace(/\)$/, '')
        .split(/(?!\(.*)\s*,\s*(?!\).*)/)
        .reduce<string[]>(fixNestingSplit(), [])

      if (/^#f(all)?b(ack)?/i.test(func)) {
        const val = contentMatch.find((v) => v !== '%DEL%')
        if (val) {
          result[cssProp] = result[cssProp].replace(func, val)
        } else {
          delete result[cssProp]
        }
      } else if (/^#if/i.test(func)) {
        console.log(contentMatch)
        if (contentMatch[0] === 'true') {
          result[cssProp] = result[cssProp].replace(func, contentMatch[1])
        } else if (contentMatch[0] === '%DEL%') {
          if (contentMatch[2]) {
            result[cssProp] = result[cssProp].replace(func, contentMatch[2])
          } else {
            delete result[cssProp]
          }
        } else {
          const signals = contentMatch[0].match(REGEX_IF_SIGNAL)
          const values = contentMatch[0].split(REGEX_IF_SIGNAL)

          console.log(signals, values)
        }
      }
    })
  }

  return result
}
