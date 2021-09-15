import { TypedMap } from 'ui-types'

export interface PatternFunction {
  (...args: string[]): string
}

export const funcs: TypedMap<PatternFunction> = {}
