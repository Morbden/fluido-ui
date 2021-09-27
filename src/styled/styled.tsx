import React, { forwardRef } from 'react'
import {
  FluiComponent,
  StyledComponentProps,
  TagType,
  TypedFunction,
  TypedMap,
} from '..'
import { htmlElementAttributes } from '../utilities/html-attrs'
import { cssBase } from './css'

/**
 * Styled factory
 */
export const styled = <T extends TagType>(
  tag: T,
  opts?: StyledComponentProps,
) => {
  return <P extends object = {}>(
    templates: TemplateStringsArray,
    ...args: (TypedFunction<P> | string)[]
  ) => {
    return forwardRef(function StyledComponent(
      { as: asComp, className, children, ...props },
      ref,
    ) {
      const _props: TypedMap = props
      if (!('functions' in _props)) {
        _props.functions = opts?.functions
      }
      const cssClassName = cssBase({ p: _props }, templates, ...args)

      const purge: string =
        (typeof tag === 'string' && typeof asComp === 'string' && asComp) ||
        (typeof tag === 'string' && !asComp && tag) ||
        ''

      // Limpar propriedades
      if (purge) {
        const attrs: string[] = htmlElementAttributes[purge] || []

        for (const k in _props) {
          if (
            !/^(data|on|aria)/.test(k) &&
            !attrs.includes(k) &&
            !htmlElementAttributes['*'].includes(k)
          ) {
            delete _props[k]
          }
        }
      }

      let Node: any

      if (asComp && tag && typeof tag !== 'string') {
        Node = tag
        _props.as = asComp
      } else {
        Node = asComp || tag
      }

      const classes: string[] = []
      cssClassName && classes.push(cssClassName)
      className && classes.push(className)

      return (
        <Node className={classes.join(' ')} ref={ref} {..._props}>
          {children}
        </Node>
      )
    } as FluiComponent<T, P> as any)
  }
}
