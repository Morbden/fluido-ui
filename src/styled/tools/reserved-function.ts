import { listTrim } from 'ui-utilities'
import stringMath from 'string-math'
import { PatternFunction, TypedMap } from 'ui-types'

const REGEX_IF_OPERATORS = /==|!=|>=?|<=?|&&|\|\|/g
const OPERATORS = ['=', '!=', '>', '<', '||', '&&']

const containOperator = (val: string) => {
  return OPERATORS.some((o) => val.includes(o))
}

export const ifComparison = (value: string, debug = false) => {
  if (containOperator(value)) {
    const sp = value
      .split(REGEX_IF_OPERATORS)
      .map(listTrim)
      .map((s) => {
        const sc = s.trim()
        return sc === 'false' ? [sc, "''"] : [sc, `'${sc}'`]
      })

    const v = sp.reduce((p, c) => p.replace(c[0], c[1]), value)
    return !!eval(v)
  } else {
    return !(value.trim() === 'false')
  }
}

export const funcs: TypedMap<PatternFunction> = {
  and(...args) {
    if (args.length > 0 && args.every((c) => ifComparison(c))) {
      return args.pop() as string
    }
    return 'false'
  },
  or(...args) {
    const v = args.find((c) => ifComparison(c))
    return v || 'false'
  },
  select(compare, a, b) {
    const test = ifComparison(compare, true)
    const res = (test && a) || b || 'false'
    return res
  },
  math(calc) {
    return `${stringMath(calc)}`
  },
}
