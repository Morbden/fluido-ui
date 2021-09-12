import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { FrameProps_, Frame_ } from './styled'

export interface FrameProps extends FrameProps_ {}

export type FrameType = FluiComponent<'div', FrameProps>

export const Frame = forwardRef<HTMLDivElement, FrameProps>(
  ({ children, ...props }, ref) => {
    return (
      <Frame_ ref={ref} {...props}>
        {children}
      </Frame_>
    )
  },
) as FrameType
