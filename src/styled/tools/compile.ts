import { parseObjToString } from './parse'

const CLASS_REGEX = /^flui/

/**
 * Compiler for dynamic data from `objects` and `functions`
 */
export const compile = <T extends Function | string>(
  str: TemplateStringsArray,
  defs: T[],
  data: any,
) => {
  return str.reduce((out, next, i) => {
    const tail = defs[i]

    // Se o dado a ser processado é uma função
    if (typeof tail === 'function') {
      let result: string

      // Compilar resultado passando propriedades
      const res = tail(data)

      // Coletar className
      const className = res && res.props && res.props.className

      // Se não houver nenhum, veja se este é basicamente um `className`
      // previamente estilizado, verificando o prefixo
      const end = className || (CLASS_REGEX.test(res) && res)

      if (end) {
        // Se o `end` é definido significa que é um `className`
        result = '.' + end
      } else if (res && typeof res === 'object') {
        // Se `res` é um objeto, estamos lidando com um `vnode`
        // ou um objeto retornado de uma interpolação de função
        result = res.props ? '' : parseObjToString(res, '')
      } else {
        // Valor regular retornado. Pode ser falso também
        result = res
      }

      if (!result) {
        return out + next
      }

      return out + next + (result || '')
    } else if (typeof tail !== 'object') {
      return out + next + (tail || '')
    }
    return out + next
  }, '')
}
