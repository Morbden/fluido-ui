import { forwardRef } from 'react'
import { useTheme } from 'ui-contexts/ui-provider'
import { FluiComponent } from 'ui-types/containers'
import { BoxProps, Box_ } from './styled'

interface Props {
  motion?: boolean
}

type Type = FluiComponent<'div', Props & BoxProps>

export const Box = forwardRef<HTMLDivElement, Props & BoxProps>(
  ({ children, ...props }, ref) => {
    const theme = useTheme()

    return (
      <Box_ ref={ref} theme={theme} {...props}>
        {children}
      </Box_>
    )
  },
) as Type
