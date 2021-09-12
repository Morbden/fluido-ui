import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { ReelProps_, Reel_ } from './styled'

export interface ReelProps extends ReelProps_ {}

export type ReelType = FluiComponent<'div', ReelProps>

export const Reel = forwardRef<HTMLDivElement, ReelProps>(
  ({ children, ...props }, ref) => {
    return (
      <Reel_ ref={ref} {...props}>
        {children}
      </Reel_>
    )
  },
) as ReelType
