import { hash } from './tools/hash'
import { compile } from './tools/compile'
import { getSheet } from './tools/get-sheet'
import { TypedMap } from 'ui-types/styled'

/**
 * Compilador de css
 */
export const cssBase = <T extends Function | string>(
  ctx: TypedMap,
  template: TemplateStringsArray,
  ...args: T[]
) => {
  return hash(
    compile(template, args, ctx.p),
    ctx.p,
    getSheet(),
    ctx.g,
    ctx.o,
    ctx.k,
  )
}

/**
 * Compilador de css puro
 */
const css = <T extends Function | string>(
  template: TemplateStringsArray,
  ...args: T[]
) => cssBase({}, template, ...args)

/**
 * CSS Global
 */
const glob = <T extends Function | string>(
  template: TemplateStringsArray,
  ...args: T[]
) => cssBase({ g: true }, template, ...args)

/**
 * `keyframes` function for defining animations
 * @type {Function}
 */
const keyframes = <T extends Function | string>(
  template: TemplateStringsArray,
  ...args: T[]
) => cssBase({ k: true }, template, ...args)

export { css, glob, keyframes }
