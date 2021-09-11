import { forwardRef, memo } from 'react'
import { StyledFactory } from 'ui-types/styled'
import { htmlElementAttributes } from 'ui-utilities/html-attrs'
import { cssBase } from './css'

/**
 * Fabrica de geração do styled
 */
export const styled: StyledFactory = (tag) => {
  return (templates, ...args) => {
    return memo(
      forwardRef<any, any>(function (props, ref) {
        const { as, className, children, ..._props } = props
        _props.ref = ref

        const cssClassName = cssBase({ p: _props }, templates, ...args)
        // Tipo de nó
        const Node: any = as || tag

        // Limpar propriedades
        if (!as || typeof as === 'string') {
          const key: keyof typeof htmlElementAttributes = as || tag
          const attrs: string[] =
            key in htmlElementAttributes ? htmlElementAttributes[key] : []

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

        return (
          <Node
            ref={ref}
            className={cssClassName + ((className && ' ' + className) || '')}
            {..._props}>
            {children}
          </Node>
        )
      }),
    )
  }
}
