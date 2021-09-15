import { parseThemeSentence } from 'ui-utilities'
import { TypedMap } from 'ui-types'
import { GenericNode } from './generic-node'
import { funcs } from './reserved-function'

type ValueType =
  | number
  | string
  | (number | string)[]
  | (() => number | string | (number | string)[])

// Identificadores
const REGEX_PROPS = /\$[a-z][a-z0-9]*/gi
const REGEX_THEME = /^\$the?me?(\.[a-z0-9]+)+/i
const REGEX_IF_OPERATORS = /==|<=?|>=?|!=/
const REGEX_BOOLEAN = /(false|0+[^\.1-9]+[a-z]*)/i

// Capturadores
const REGEX_FUNC_TAG =
  /#(if|else|func(tion)?|call|or|and)\((?:(?:(?:[0-9a-z\-]+\((?:(?:(?:[0-9a-z\-]+\((?:(?:(?:[0-9a-z\-]+\((?:[0-9a-z\.\-%!#]+\s*(?:[,\+\-\*\/])?\s*)+\)|[0-9a-z\.\-%!#]+)+\s*(?:,|==|<=?|>=?|!=)?\s*)*)+\)|[0-9a-z\.\-%!#]+)+\s*(?:,|==|<=?|>=?|!=)?\s*)*)+\)|[0-9a-z\.\-%!#]+)+\s*(?:,|==|<=?|>=?|!=)?\s*)*)+\)/gi

// To boolean value
const toBooleanValue = (val: string) => {
  const nots = (val.match(/^!+/g) || [])[0] || ''
  if (!(REGEX_BOOLEAN.test(val) && nots.length % 2 === 0)) {
    return true
  }
  return false
}

// Filtros de lista
const filterClearSame = (e: any, i: number, l: any[]) => l.indexOf(e) === i
// Ordenadores de lista
const sortLengthOrder = (a: string, b: string) => b.length - a.length
// Transformadores de lista
const listTrim = (v: string) => v.trim()

// Encontrar todas as propriedades de valor e armazenar no buffer
const computePropIds = (node: GenericNode, buffer: string[]) => {
  buffer.push(...(node.id.match(REGEX_PROPS) || []))
  for (let k in node.properties) {
    buffer.push(...(node.properties[k].match(REGEX_PROPS) || []))
  }
  node.getChildren().forEach((c) => computePropIds(c, buffer))
}

// Processador de valor
const computePropType = (val: ValueType): string =>
  typeof val === 'function'
    ? computePropType(val())
    : Array.isArray(val)
    ? val.map(computePropType).join(' ')
    : typeof val === 'number'
    ? `${val * 0.25}rem`
    : val.toString()

// Mapear valores das propriedades
const setPropValue = (
  node: GenericNode,
  regexp: RegExp,
  val: ValueType,
  removeOthers = false,
) => {
  if (regexp.test(node.id)) {
    node.id = node.id.replace(regexp, computePropType(val))
  }
  for (let k in node.properties) {
    if (!regexp.test(node.properties[k])) {
      if (removeOthers) {
        delete node.properties[k]
      }
      continue
    }
    node.properties[k] = node.properties[k].replace(
      regexp,
      computePropType(val),
    )
  }
}

// Mapear valores das propriedades em nivel profundo
const setDeepPropValue = (
  node: GenericNode,
  regexp: RegExp,
  val: ValueType,
  removeOthers = false,
) => {
  setPropValue(node, regexp, val, removeOthers)
  node.getChildren().forEach((c) => {
    setDeepPropValue(c, regexp, val, removeOthers)
  })
}

// Repassar valores em seus respectivos locais
const computePropValue = (node: GenericNode, [regexp, val]: [RegExp, any]) => {
  if (typeof val === 'object' && !Array.isArray(val)) {
    if ('media' in val) {
      let childInTree = node
      while (childInTree?.parent?.parent) {
        childInTree = childInTree.parent
      }
      const origin = (childInTree || node).clone()
      const isTree = !childInTree.parent

      for (let m in val.media) {
        if (m === 'base') {
          setPropValue(node, regexp, val.media.base)
          continue
        }

        if (!origin.id.includes('@')) {
          const mediaNode = new GenericNode(`@media ${m}`)
          const cloned = origin.clone()

          setPropValue(cloned, regexp, val.media[m], true)
          if (!cloned.isPropsEmpty()) {
            if (isTree) {
              for (const k in cloned.properties) {
                mediaNode.properties[k] = cloned.properties[k]
              }
            } else {
              mediaNode.addChild(cloned)
            }
            node.addInTree(mediaNode)
          }
        }
      }
    } else if ('container' in val) {
      setPropValue(
        node,
        regexp,
        `var(--flui-self-${regexp.source.substr(2)}, ${computePropType(
          val.container.base,
        )})`,
      )
    }
  } else {
    setPropValue(node, regexp, val)
  }

  node.getChildren().forEach((c) => {
    computePropValue(c, [regexp, val])
  })
}

// Repassador de valores de propriedades
const computePropValues = (node: GenericNode, buffer: [RegExp, any][]) => {
  buffer.forEach((value) => {
    computePropValue(node, value)
  })
}

const inOpenBrackets = (val: string) => {
  const opens = (val.match(/\(/g) || []).length
  const closes = (val.match(/\)/g) || []).length

  return opens - closes
}

// Separador de valores
const collectValuesIFunc = (val: string): string[] => {
  let v = val.replace(/^#[a-z]+\(/i, '')
  const buffer: string[] = v.substring(0, v.length - 1).split(/\s*,\s*/g)

  let counter = 0
  for (let i = 0; i < buffer.length; i++) {
    const c = counter + inOpenBrackets(buffer[i])
    if (counter > 0) {
      buffer.splice(i - 1, 2, `${buffer[i - 1]},${buffer[i]}`)
      i--
    }
    counter = c
  }

  return buffer
}

// Capturador de funções
const functionFinder = (node: GenericNode, buffer: string[]) => {
  buffer.push(...(node.id.match(REGEX_FUNC_TAG) || []))
  for (const k in node.properties) {
    buffer.push(...(node.properties[k].match(REGEX_FUNC_TAG) || []))
  }

  node.getChildren().forEach((c) => functionFinder(c, buffer))
}

// Processador de funções
const computeFunction =
  (data: TypedMap) =>
  (func: string): [string, string] => {
    if (func.startsWith('#if')) {
      const value = func.substring(4, func.length - 1)
      if (REGEX_IF_OPERATORS.test(value)) {
        const op = (value.match(REGEX_IF_OPERATORS) as string[])[0]
        const vs = value.split(REGEX_IF_OPERATORS).map(listTrim)

        if (
          (op === '==' && vs[0] === vs[1]) ||
          (op === '!=' && vs[0] !== vs[1]) ||
          (op === '>' && parseFloat(vs[0]) > parseFloat(vs[1])) ||
          (op === '>=' && parseFloat(vs[0]) >= parseFloat(vs[1])) ||
          (op === '<' && parseFloat(vs[0]) < parseFloat(vs[1])) ||
          (op === '<=' && parseFloat(vs[0]) <= parseFloat(vs[1]))
        ) {
          return [func, 'true']
        }
      } else {
        if (toBooleanValue(value)) {
          return [func, 'true']
        }
      }
    } else if (func.startsWith('#and')) {
      const values = collectValuesIFunc(func)
      if (values.length > 0 && values.every((c) => toBooleanValue(c))) {
        return [func, values.pop() as string]
      }
    } else if (func.startsWith('#or')) {
      const values = collectValuesIFunc(func)
      const v = values.find((c) => toBooleanValue(c))
      if (v) {
        return [func, v]
      }
    } else if (func.startsWith('#func') || func.startsWith('#call')) {
      const values = collectValuesIFunc(func)
      const funcName = values.shift()
      if (!funcName) {
        return [func, 'false']
      }

      if (funcName in funcs) {
        return [func, funcs[funcName](...values) || 'false']
      } else if (data?.handlers && funcName in data.handlers) {
        return [func, data.handlers[funcName](...values) || 'false']
      }
    }
    return [func, 'false']
  }

// Limpeza da arvore
const treeShaker = (node: GenericNode) => {
  if (node.id.includes('false')) {
    node.destroy()
    return
  }

  for (let k in node.properties) {
    if (node.properties[k].includes('false')) {
      delete node.properties[k]
    }
  }

  if (node.id === 'true') {
    node.mergeToParent()
  }

  node.getChildren().forEach((c) => treeShaker(c))
}

// Compilador de flui syntax
export const patternParser = (tree: GenericNode, data: TypedMap) => {
  let propsIds: string[] = []
  computePropIds(tree, propsIds)
  propsIds = propsIds.filter(filterClearSame).sort(sortLengthOrder)

  // Caves de valor das propriedades
  const propsEntries = propsIds.map<[RegExp, any]>((key) => {
    let val: any
    if (REGEX_THEME.test(key)) {
      // Se propriedade é tipo `theme` gera valor de tema baseado em `css-var`
      val = key.split('.').map<string>(parseThemeSentence).join('-')
      val = `var(--flui-${val.toLowerCase()})`
    } else {
      val = data[key.substr(1)] || 'false'
    }
    return [new RegExp(`\\${key}`, 'g'), val]
  })

  // Setar valores de propriedades
  computePropValues(tree, propsEntries)

  /*** Computação de funções ***/
  let funcBuffer: string[] = []

  // Encontrando funções
  functionFinder(tree, funcBuffer)
  funcBuffer = funcBuffer.filter(filterClearSame).sort(sortLengthOrder)
  const funcEntries = funcBuffer
    .map(computeFunction(data))
    .map<[RegExp, string]>((c) => [
      new RegExp(c[0].replace(/[\(\)\.\$\^\+\-\*\\\/\?]/g, '\\$&'), 'g'),
      c[1],
    ])

  funcEntries.forEach(([regexp, val]) => {
    setDeepPropValue(tree, regexp, val)
  })
  treeShaker(tree)
}
