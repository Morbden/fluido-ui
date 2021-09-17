import { TinyColor } from '@ctrl/tinycolor'
import { TypedMap } from 'ui-types'
import {
  filterClearSame,
  parseThemeSentence,
  sortLengthOrder,
} from 'ui-utilities'
import { GenericNode } from './generic-node'
import { funcs, ifComparison } from './reserved-function'

type ValueType =
  | number
  | string
  | (number | string)[]
  | (() => number | string | (number | string)[])

// Identificadores
const REGEX_PROPS = /~?\$[a-z][a-z0-9\.]*/gi
const REGEX_THEME = /^\$the?me?[a-z0-9\.]+/i
const REGEX_FUNC = /#(if|else|func|or|and|math|select)\(/gi

// Capturadores

// Encontrar todas as propriedades de valor e armazenar no buffer
const computePropIds = (node: GenericNode, buffer: string[]) => {
  buffer.push(...(node.id.match(REGEX_PROPS) || []))
  for (let k in node.properties) {
    buffer.push(...(node.properties[k].match(REGEX_PROPS) || []))
  }
  node.getChildren().forEach((c) => computePropIds(c, buffer))
}

// Processador de valor
const computePropType = (val: ValueType, unit = false): string => {
  switch (typeof val) {
    case 'function':
      return computePropType(val())
    case 'object':
      if (Array.isArray(val))
        return val.map((v) => computePropType(v, unit)).join(' ')
    case 'number':
      return (unit && `${val * 0.25}rem`) || `${val}`
    case 'string':
      if (/\d+un$/.test(val)) return `${parseFloat(val) * 0.25}rem`

      const color = new TinyColor(val)
      if (/^#/.test(val) && color.isValid) {
        const { h, s, l } = color.toHsl()
        return `hsl(${h} ${s} ${l} / var(--flui-theme-colors-opacity,1))`
      }
    default:
      return val.toString()
  }
}

// Mapear valores das propriedades
const setPropValue = (
  node: GenericNode,
  regexp: RegExp,
  val: ValueType,
  removeOthers = false,
) => {
  if (regexp.test(node.id)) {
    node.id = node.id.replace(
      regexp,
      computePropType(val, regexp.source[0] === '~'),
    )
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
      computePropType(val, regexp.source[0] === '~'),
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
const collectValuesInFunc = (val: string): string[] => {
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

// Capturar função em uma string
const functionCatcher = (val: string): string[] => {
  const buffer: string[] = []
  const funcs = val.match(REGEX_FUNC) as string[]
  let strBuffer: string[] = []
  let brackets = 0
  let step = 0

  for (let i = 0; i < val.length; i++) {
    if (brackets === 0 && step >= funcs.length) break
    if (brackets === 0) {
      i = val.indexOf(funcs[step], i) + funcs[step].length
      strBuffer = [funcs[step]]
      step++
      brackets++
    }
    const char = val[i]
    if (char === '(') {
      brackets++
    }
    if (char === ')') {
      brackets--
    }
    strBuffer.push(char)
    if (brackets === 0) {
      buffer.push(strBuffer.join(''))
    }
  }
  return buffer
}

// Capturador de funções em buffer
const functionFinderInBuffer = (input: string[], buffer: string[]) => {
  for (let i in input) {
    if (!REGEX_FUNC.test(input[i])) continue
    buffer.push(...functionCatcher(input[i]))
  }
}

// Capturador de funções
const functionFinder = (node: GenericNode, buffer: string[]) => {
  if (REGEX_FUNC.test(node.id)) {
    buffer.push(...functionCatcher(node.id))
  }

  for (const k in node.properties) {
    if (!REGEX_FUNC.test(node.properties[k])) continue
    buffer.push(...functionCatcher(node.properties[k]))
  }
  node.getChildren().forEach((c) => functionFinder(c, buffer))
}

// Processador de funções
const computeFunction =
  (data: TypedMap) =>
  (func: string): [string, string] => {
    if (func.startsWith('#if')) {
      const value = func.substring(4, func.length - 1)
      if (ifComparison(value)) {
        return [func, 'true']
      }
    } else if (/^#(and|or|math|select)/.test(func)) {
      const values = collectValuesInFunc(func)
      const name = (
        ((func.match(/^#[a-z]+\(/i) as String[])[0] as string) || ''
      ).replace(/[#\()]/g, '')
      if (name in funcs) {
        return [func, funcs[name](...values)]
      }
    } else if (func.startsWith('#func')) {
      const values = collectValuesInFunc(func)
      const funcName = values.shift()
      if (!funcName) {
        return [func, 'false']
      }

      if (funcName in funcs) {
        return [func, funcs[funcName](...values) || 'false']
      } else if (data?.functions && funcName in data.functions) {
        return [func, data.functions[funcName](...values) || 'false']
      }
    }
    return [func, 'false']
  }

// Limpeza da arvore
const treeShaker = (node: GenericNode) => {
  if (node.id.includes('false') || (node.isEmpty() && node.isPropsEmpty())) {
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
  propsIds = propsIds.filter(filterClearSame).sort(sortLengthOrder())

  // Caves de valor das propriedades
  const propsEntries = propsIds.map<[RegExp, any]>((key) => {
    let val: any
    if (REGEX_THEME.test(key)) {
      // Se propriedade é tipo `theme` gera valor de tema baseado em `css-var`
      val = key.substr(1).split('.').map<string>(parseThemeSentence).join('-')
      val = `var(--flui-${val.toLowerCase()})`
    } else {
      val = data[key.substr(key[0] === '~' ? 2 : 1)]
      if (val === undefined || val === null || val === '' || val === false) {
        val = 'false'
      }
    }
    return [new RegExp(key.replace(/[\$\.]/g, '\\$&'), 'g'), val]
  })

  // Setar valores de propriedades
  computePropValues(tree, propsEntries)

  /*** Computação de funções ***/
  let funcBlocks: string[][] = []

  // Encontrando funções
  let funcBuffer: string[] = []
  functionFinder(tree, funcBuffer)
  funcBuffer.length &&
    funcBlocks.push(funcBuffer.filter(filterClearSame).sort(sortLengthOrder()))

  while (funcBuffer.length > 0) {
    const newBlockBuffer: string[] = []
    functionFinderInBuffer(
      funcBuffer.map((f) => f.substr(1)),
      newBlockBuffer,
    )
    funcBuffer = newBlockBuffer
    funcBuffer.length &&
      funcBlocks.push(
        funcBuffer.filter(filterClearSame).sort(sortLengthOrder()),
      )
  }

  let funcEntries: [RegExp, string][] = []

  for (let i = funcBlocks.length - 1; i >= 0; i--) {
    const fb = funcBlocks[i]
      .map(computeFunction(data))
      .map<[RegExp, string]>((c) => [
        new RegExp(
          c[0].replace(/[\(\)\{\}\[\]\.\$\^\+\-\*\\\/\?\|]/g, '\\$&'),
          'g',
        ),
        c[1],
      ])

    funcEntries.push(...fb)
    if (i > 0) {
      funcBlocks[i - 1] = funcBlocks[i - 1].map<string>((ff) => {
        const replacer = fb.find(([reg]) => reg.test(ff))
        if (replacer) {
          return ff.replace(replacer[0], replacer[1])
        }
        return ff
      })
    }
  }

  funcEntries = funcEntries.sort((a, b) =>
    sortLengthOrder()(a[0].source, b[0].source),
  )
  funcEntries.forEach(([regexp, val]) => {
    setDeepPropValue(tree, regexp, val)
  })

  treeShaker(tree)
}
