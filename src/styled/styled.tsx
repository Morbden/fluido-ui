import { forwardRef, memo } from 'react'
import { TypedMap } from 'ui-types/generics'
import { StyledFactory } from 'ui-types'
import { htmlElementAttributes } from 'ui-utilities/html-attrs'
import { cssBase } from './css'

/**
 * Fabrica de geração do styled
 */
export const styled: StyledFactory = (tag) => {
  return (templates, ...args) => {
    return function StyledComponent({
      as: asComp,
      className,
      children,
      ...props
    }) {
      const _props: TypedMap = props

      const cssClassName = cssBase({ p: _props }, templates, ...args)

      const purge: string =
        (typeof asComp === 'string' && asComp) ||
        (typeof tag === 'string' && tag) ||
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

      return (
        <Node
          className={cssClassName + ((className && ' ' + className) || '')}
          {..._props}>
          {children}
        </Node>
      )
    }
  }
}
