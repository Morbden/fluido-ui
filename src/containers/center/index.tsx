import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { CenterProps_, Center_ } from './styled'

export interface CenterProps extends CenterProps_ {}

export type CenterType = FluiComponent<'div', CenterProps>

export const Center = forwardRef<HTMLDivElement, CenterProps>(
  ({ children, maxWidth, intrinsic, ...props }, ref) => {
    return (
      <Center_
        intrinsic={intrinsic}
        maxWidth={maxWidth || '65ch'}
        ref={ref}
        {...props}>
        {children}
      </Center_>
    )
  },
) as CenterType
