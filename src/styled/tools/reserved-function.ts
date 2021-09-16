import stringMath from 'string-math'
import { PatternFunction, TypedMap } from 'ui-types'

const REGEX_BOOLEAN = /(false|[^a-z1-9#]0+[^\.1-9]+[a-z]*)/i
const REGEX_IF_OPERATORS = /==|<=?|>=?|!=|\|\||\&\&/

// To boolean value
export const toBooleanValue = (val: string) => {
  const nots = (val.match(/^!+/g) || [])[0] || ''

  if (!(REGEX_BOOLEAN.test(val) && nots.length % 2 === 0)) {
    return true
  }
  if (REGEX_BOOLEAN.test(val) && nots.length % 2 === 1) {
    return true
  }
  return false
}

export const ifComparison = (value: string) => {
  const v = value
    .replace(/false/g, "''")
    .replace(/[a-z0-9\%\-\+\/\\\^\(\)]+/gi, "'$&'")
  return !!eval(v)
}

export const funcs: TypedMap<PatternFunction> = {
  and(...args) {
    if (args.length > 0 && args.every((c) => toBooleanValue(c))) {
      return args.pop() as string
    }
    return 'false'
  },
  or(...args) {
    const v = args.find((c) => toBooleanValue(c))
    return v || 'false'
  },
  select(compare, a, b) {
    if (ifComparison(compare)) {
      return a || 'false'
    }
    return b || 'false'
  },
  math(calc) {
    return `${stringMath(calc)}`
  },
  makeNthChildSelector(value, offset) {
    const children = value.split(/\s+/g)
    return children
      .map((v) => {
        const c = parseInt(v) + parseInt(offset || '0')
        if (isNaN(c)) {
          return ''
        }
        return `:nth-child(${c})`
      })
      .filter((c) => !!c)
      .join(',')
  },
}
