import { listClear, listTrim } from 'ui-utilities'
import { GenericNode } from './generic-node'
import { prefix } from './prefix'

const RULE_CLEAN = /\/\*\*?.*\*\/|\/\/.*\n/g
const BLOCK = /{[^{}]+}/g
const BLOCK_ID = /%BLOCK-\d+-\d+%/
const PSEUDO_CLASSES =
  /(?:\:(?:active|any|autofill|blank|checked|current|default|defined|dir|disabled|empty|enabled|first|fullscreen|future|focus|has|host|hover|indeterminate|in|is|lang|last|left|link|local|not|nth|only|optional|out|past|picture|placeholder|paused|playing|read|required|right|root|scope|state|target|user|valid|visited|where)|\:\:)/

const propsToBuffer = (node: GenericNode, buffer: string[]) => {
  for (const k in node.properties) {
    const val = prefix(k, node.properties[k])
    buffer.push(val)
  }
}
export const parseObjToString = (node: GenericNode, selector: string) => {
  const buffer: string[] = []

  if (node.id === 'root') {
    buffer.push(selector)
    buffer.push('{')
    propsToBuffer(node, buffer)
    buffer.push('}')
    node.getChildren().forEach((c) => {
      buffer.push(parseObjToString(c, selector))
    })
  } else if (node.id[0] === '@') {
    buffer.push(node.id)
    buffer.push('{')
    buffer.push(selector)
    buffer.push('{')
    propsToBuffer(node, buffer)
    buffer.push('}')
    node.getChildren().forEach((c) => {
      buffer.push(parseObjToString(c, selector))
    })
    buffer.push('}')
  } else {
    if (/&/g.test(node.id)) {
      buffer.push(node.id.replace(/&/g, selector))
    } else {
      buffer.push(selector)
      buffer.push(' > ')
      buffer.push(node.id)
    }
    buffer.push('{')
    propsToBuffer(node, buffer)
    buffer.push('}')
  }

  return buffer.join('')
}

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

  const blockRoot = modCode.split(';').map(listTrim).filter(listClear)
  const childrenBlocks = blockBuffer.map((bks) =>
    bks.map((b) =>
      b
        .substr(1, b.length - 2)
        .split(';')
        .map(listTrim)
        .filter(listClear),
    ),
  )

  blockRoot.forEach(parseLinesToNode(tree))
  const children = tree.getChildren()
  children.forEach((c) => {
    parseBlocksToTree(c, childrenBlocks)
  })

  return tree
}
