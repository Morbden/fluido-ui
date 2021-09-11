import sha256 from 'crypto-js/sha256'
import { TypedMap } from 'ui-types/generics'
import { createClassName } from './classname'
import { getSheetFixed } from './get-sheet'
import { parseObjToString, parseStringToObj } from './parse'
import { patternParser } from './pattern-parser'
import { update } from './update'

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
  props: TypedMap | undefined,
  global: boolean,
) => {
  // Trazer objeto `css` para padronização e propriedades
  const data =
    typeof compiled === 'object' ? compiled : parseStringToObj(compiled)
  // Compilar os patterns exclusivos
  const parsed = patternParser(data, props || {})

  // Transforma o `objeto` css em `string`
  const stringifiedCompiled = stringify(parsed)
  // Hash para comparação
  const hashCompiled = sha256(stringifiedCompiled).toString()

  // Recupera `className` pelo hash do estilo
  const canParse = !cacheCompiled[hashCompiled]
  const className =
    cacheCompiled[hashCompiled] ||
    (cacheCompiled[hashCompiled] = createClassName(hashCompiled))

  // Se contem atualização a ser feita
  if (canParse) {
    // Passar para estilo e armazenar no cache
    cacheClassName[className] = parseObjToString(
      parsed,
      // Checar se é `css` global
      global ? '' : '.' + className,
    )
    // Atualizar o stylesheet
    const fSheet = getSheetFixed()
    update(cacheClassName, fSheet)
  }

  return className
}
