import { prefix } from './prefix'
import { TypedMap } from 'ui-types'
import { GenericNode } from './generic-node'

const SR = /([^,])+/g
const RULE_CLEAN = /\/\*\*?.*\*\/|\/\/.*\n/g
const BLOCK = /{[^{}]+}/g
const BLOCK_ID = /%BLOCK-\d+-\d+%/
const PSEUDO_CLASSES =
  /(?:\:(?:active|any|autofill|blank|checked|current|default|defined|dir|disabled|empty|enabled|first|fullscreen|future|focus|has|host|hover|indeterminate|in|is|lang|last|left|link|local|not|nth|only|optional|out|past|picture|placeholder|paused|playing|read|required|right|root|scope|state|target|user|valid|visited|where)|\:\:)/

export let parseObjToString = (
  obj: TypedMap<string | TypedMap>,
  selector: string,
) => {
  let outer = ''
  let blocks = ''
  let current = ''
  let next: string

  for (let key in obj) {
    let val = obj[key]

    if (typeof val === 'string') {
      if (key[0] === '@' && key[1] === 'i') {
        outer = key + ' ' + val + ';'
      } else {
        key = key.replace(/[A-Z]/g, '-$&').toLowerCase()
        current += prefix(key, val)
      }
      continue
    }

    next = selector
      ? // Vá até o seletor e substitua os vários seletores correspondentes, se houver
        selector.replace(SR, (sel) => {
          // Retorna o seletor atual com a chave combinando com vários seletores, se houver
          return key.replace(SR, (k) => {
            // Se o `k`(chave) atual tiver um seletor aninhado, substitua-o
            if (/&/.test(k)) return k.replace(/&/g, sel)

            // Se houver um seletor atual concatenar
            return sel ? sel + ' ' + k : k
          })
        })
      : key

    // Se é uma `rule`
    if (key[0] == '@') {
      // Lidar com o `@font-face` onde o
      // bloco não precisa dos colchetes enrolados
      if (key[1] == 'f') {
        blocks += parseObjToString(val, key)
      } else {
        // `rule` de bloco
        const subProps = parseObjToString(val, key[1] == 'k' ? '' : selector)

        blocks += key + '{' + subProps + '}'
      }
    } else {
      blocks += parseObjToString(val, next)
    }
  }

  // Se tem propriedades
  if (current[0]) {
    next = selector ? selector + '{' + current + '}' : current
    return outer + next + blocks
  }

  return outer + blocks
}

const trimList = (s: string) => s.trim()
const clearList = (s: string) => s !== ''
const parseLinesToNode = (parent: GenericNode) => {
  let pseudo = ''
  return (line: string) => {
    if (/%BLOCK/.test(line)) {
      pseudo += line
      const node = new GenericNode(pseudo.replace(/\n/g, ' ').trim())
      parent.addChild(node)
      pseudo = ''
    } else if (
      PSEUDO_CLASSES.test(line) ||
      !line.includes(':') ||
      /\(.*\:.*\)/.test(line)
    ) {
      pseudo += line
    } else {
      const prop = line.split(':')
      parent.properties[prop[0].trim()] = prop[1].trim()
    }
  }
}

const parseBlocksToTree = (node: GenericNode, blocks: string[][][]) => {
  const m = node.id.match(BLOCK_ID) as string[]
  if (!m) return
  node.id = node.id.replace(BLOCK_ID, '').trim()
  const im = m[0].substr(7, m[0].length - 8).split('-')
  const block = blocks[+im[0]][+im[1]]

  block.forEach(parseLinesToNode(node))

  if (!node.isEmpty()) {
    const children = node.getChildren()
    children.forEach((c) => {
      parseBlocksToTree(c, blocks)
    })
  }
}

export const parseStringToObj = (val: string) => {
  const code = val.replace(RULE_CLEAN, '\n')

  const blockBuffer: string[][] = []
  const tree = new GenericNode('root')
  let modCode = code
  let matches = code.match(BLOCK)
  let counter = 0
  while (matches) {
    matches.forEach((b, i) => {
      modCode = modCode.replace(b, `%BLOCK-${counter}-${i}%;`)
    })
    blockBuffer.push(matches)
    counter++
    matches = modCode.match(BLOCK)
  }

  const blockRoot = modCode.split(';').map(trimList).filter(clearList)
  const childrenBlocks = blockBuffer.map((bks) =>
    bks.map((b) =>
      b
        .substr(1, b.length - 2)
        .split(';')
        .map(trimList)
        .filter(clearList),
    ),
  )

  blockRoot.forEach(parseLinesToNode(tree))
  const children = tree.getChildren()
  children.forEach((c) => {
    parseBlocksToTree(c, childrenBlocks)
  })

  return tree
}
