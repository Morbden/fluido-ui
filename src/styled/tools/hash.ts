import sha256 from 'crypto-js/sha256'
import { TypedMap } from 'ui-types/generics'
import { parseObjToString, parseStringToObj } from './parse'
import { createClassName } from './classname'
import { update } from './update'
import { patternParser } from './pattern-parser'

/**
 * Parse cache
 */
const cacheCompiled: TypedMap<string> = {}
const cacheClassName: TypedMap<string> = {}

const stringify = (data: TypedMap) => {
  let out = ''
  for (const p in data) {
    const val = data[p]
    out += p + (typeof val === 'object' ? stringify(val) : val)
  }
  return out
}

/**
 * Gera o `className` necessário
 */
export let hash = (
  compiled: string | TypedMap,
  props: TypedMap,
  sheet: Text,
  global: boolean,
  append: boolean,
) => {
  // Transforma o `objeto` css em `string`
  const stringifiedCompiled =
    typeof compiled === 'object' ? stringify(compiled) : compiled
  // Hash para comparação
  const hashCompiled = sha256(stringifiedCompiled).toString()

  // Recupera `className` pelo hash do estilo
  const canParse = !cacheCompiled[hashCompiled]
  const className =
    cacheCompiled[hashCompiled] ||
    (cacheCompiled[hashCompiled] = createClassName(hashCompiled))

  // Se contem atualização a ser feita
  if (canParse) {
    // Trazer objeto `css` para padronização
    const data =
      typeof compiled === 'object' ? compiled : parseStringToObj(compiled)
    // Compilar os patterns exclusivos
    const parsed = patternParser(data, props)

    // Passar para estilo e armazenar no cache
    cacheClassName[className] = parseObjToString(
      parsed,
      // Checar se é `css` global
      global ? '' : '.' + className,
    )

    // Atualizar o stylesheet
    update(Object.values(cacheClassName).join('\n'), sheet, append)
  }

  return className
}
