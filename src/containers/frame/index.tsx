import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { FrameProps_, Frame_ } from './styled'

export interface FrameProps extends FrameProps_ {}

export type FrameType = FluiComponent<'div', FrameProps>

export const Frame = forwardRef<HTMLDivElement, FrameProps>(
  ({ children, debugClass, className, ...props }, ref) => {
    const classes: string[] = []
    className && classes.push(className)
    debugClass && classes.push('frame')
    return (
      <Frame_ ref={ref} className={classes.join(' ')} {...props}>
        {children}
      </Frame_>
    )
  },
) as FrameType
