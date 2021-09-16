import { listTrim } from 'ui-utilities'
import { PatternFunction, TypedMap } from 'ui-types'
import stringMath from 'string-math'

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
  if (REGEX_IF_OPERATORS.test(value)) {
    const ops = value.match(REGEX_IF_OPERATORS) as string[]
    const vs = value.split(REGEX_IF_OPERATORS).map(listTrim)
    const flags: boolean[] = []
    const comps: string[] = []
    ops.forEach((op, i) => {
      if (
        (op === '||' && (toBooleanValue(vs[i]) || toBooleanValue(vs[i + 1]))) ||
        (op === '&&' && toBooleanValue(vs[i]) && toBooleanValue(vs[i + 1]))
      ) {
        comps.push(op)
      }
      if (
        (op === '==' && vs[i] === vs[i + 1]) ||
        (op === '!=' && vs[i] !== vs[i + 1]) ||
        (op === '>' && parseFloat(vs[i]) > parseFloat(vs[i + 1])) ||
        (op === '>=' && parseFloat(vs[i]) >= parseFloat(vs[i + 1])) ||
        (op === '<' && parseFloat(vs[i]) < parseFloat(vs[i + 1])) ||
        (op === '<=' && parseFloat(vs[i]) <= parseFloat(vs[i + 1]))
      ) {
        flags.push(true)
      }
      return flags.push(false)
    })
    if (flags.length === 1) {
      return flags[0]
    }

    return flags.reduce((p, f, i) => {
      if (i === 0) {
        return f
      }
      if (comps[i - 1] === '||') {
        return p || f
      }
      return p && f
    }, false)
  } else {
    if (toBooleanValue(value)) {
      return true
    }
  }

  return false
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
