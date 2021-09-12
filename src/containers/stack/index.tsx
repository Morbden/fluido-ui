import { useTheme } from 'ui-contexts/ui-provider'
import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { StackProps_, Stack_ } from './styled'

export interface StackProps extends StackProps_ {}

export type StackType = FluiComponent<'div', StackProps>

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ children, gap, ...props }, ref) => {
    const theme = useTheme()
    return (
      <Stack_ gap={gap || theme.spaces.xl} ref={ref} {...props}>
        {children}
      </Stack_>
    )
  },
) as StackType
