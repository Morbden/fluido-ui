import { forwardRef, memo } from 'react'
import { StyledFactory } from 'ui-types/styled'
import { cssBase } from './css'

/**
 * Fabrica de geração do styled
 */
export const styled: StyledFactory = (tag) => {
  return (templates, ...args) => {
    return memo(
      forwardRef<any, any>((props, ref) => {
        const { as, className, ..._props } = props
        _props.ref = ref

        const cssClassName = cssBase({ p: _props }, templates, ...args)
        // Tipo de nó
        const Node = as || tag

        return (
          <Node
            ref={ref}
            className={cssClassName + ((className && ' ' + className) || '')}
            {..._props}
          />
        )
      }),
    )
  }
}
