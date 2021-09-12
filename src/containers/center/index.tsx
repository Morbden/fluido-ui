import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types/styled'
import { CenterProps_, Center_ } from './styled'

export interface CenterProps extends CenterProps_ {}

export type CenterType = FluiComponent<'div', CenterProps>

export const Center = forwardRef<HTMLDivElement, CenterProps>(
  ({ children, ...props }, ref) => {
    return (
      <Center_ ref={ref} {...props}>
        {children}
      </Center_>
    )
  },
) as CenterType
