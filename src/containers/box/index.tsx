import { forwardRef } from 'react'
import { useTheme } from 'ui-contexts/ui-provider'
import { FluiComponent } from 'ui-types/styled'
import { BoxProps_, Box_ } from './styled'

export interface BoxProps extends BoxProps_ {
  motion?: boolean
}

export type BoxType = FluiComponent<'div', BoxProps>

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, ...props }, ref) => {
    const theme = useTheme()

    return (
      <Box_ ref={ref} theme={theme} {...props}>
        {children}
      </Box_>
    )
  },
) as BoxType
