import { forwardRef } from 'react'
import { useTheme } from 'ui-contexts'
import { FluiComponent, Length } from 'ui-types'
import { BoxProps_, Box_ } from './styled'

export interface BoxProps extends BoxProps_ {
  /** Single value for CSS `padding-top` plus `padding-bottom`
   * @default null
   */
  py?: Length
  /** Single value for CSS `padding-left` plus `padding-right`
   * @default null
   */
  px?: Length
}

export type BoxType = FluiComponent<'div', BoxProps>

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, px, py, pt, pb, pr, pl, ...props }, ref) => {
    const theme = useTheme()

    return (
      <Box_
        ref={ref}
        theme={theme}
        pt={pt || py}
        pr={pr || px}
        pb={pb || py}
        pl={pl || px}
        {...props}>
        {children}
      </Box_>
    )
  },
) as BoxType
