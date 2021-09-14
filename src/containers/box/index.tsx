import { forwardRef } from 'react'
import { useTheme } from 'ui-contexts'
import { FluiComponent, Length } from 'ui-types'
import { BoxProps_, Box_ } from './styled'

export interface BoxProps extends BoxProps_ {}

export type BoxType = FluiComponent<'div', BoxProps>

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, srOnly, className, ...props }, ref) => {
    const theme = useTheme()

    return (
      <Box_
        className={className + (srOnly ? ' sr-only' : '')}
        ref={ref}
        theme={theme}
        {...props}>
        {children}
      </Box_>
    )
  },
) as BoxType
