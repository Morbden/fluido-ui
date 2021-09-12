import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { CoverProps_, Cover_ } from './styled'

export interface CoverProps extends CoverProps_ {}

export type CoverType = FluiComponent<'div', CoverProps>

export const Cover = forwardRef<HTMLDivElement, CoverProps>(
  ({ children, ...props }, ref) => {
    return (
      <Cover_ ref={ref} {...props}>
        {children}
      </Cover_>
    )
  },
) as CoverType
