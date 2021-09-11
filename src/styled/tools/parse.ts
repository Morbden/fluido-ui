import { prefix } from './prefix'
import { TypedMap } from 'ui-types/generics'

const SR = /([^,])+/g
const NEW_RULE =
  /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/g
const RULE_CLEAN = /\/\*[^]*?\*\/|\s\s+|\n/g

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

export const parseStringToObj = (val: string) => {
  const tree: TypedMap[] = [{}]
  let block: RegExpExecArray | null

  while ((block = NEW_RULE.exec(val.replace(RULE_CLEAN, '')))) {
    if (block[4]) tree.shift()

    if (block[3]) {
      tree.unshift((tree[0][block[3]] = tree[0][block[3]] || {}))
    } else if (!block[4]) {
      tree[0][block[1]] = block[2]
    }
  }

  return tree[0]
}
