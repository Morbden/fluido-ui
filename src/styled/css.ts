import { TypedMap } from 'ui-types/generics'
import { compile } from './tools/compile'
import { hash } from './tools/hash'

/**
 * CSS base compiler
 */
export const cssBase = <T extends Function | string>(
  ctx: TypedMap,
  template: TemplateStringsArray,
  ...args: T[]
) => {
  const compiled = compile(template, args, ctx.p)
  return hash(compiled, ctx.p, ctx.g)
}

/**
 * CSS loader for external components
 */
const css = <T extends Function | string>(
  template: TemplateStringsArray,
  ...args: T[]
) => cssBase({}, template, ...args)

/**
 * Global CSS
 */
const glob = <T extends Function | string>(
  template: TemplateStringsArray,
  ...args: T[]
) => cssBase({ g: true }, template, ...args)

export { css, glob }
