import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { StackProps_, Stack_ } from './styled'

export interface StackProps extends StackProps_ {}

export type StackType = FluiComponent<'div', StackProps>

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ children, ...props }, ref) => {
    return (
      <Stack_ ref={ref} {...props}>
        {children}
      </Stack_>
    )
  },
) as StackType
