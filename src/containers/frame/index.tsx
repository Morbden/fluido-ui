import { Flui } from 'ui-styled'
import { FrameProps_, Frame_ } from './styled'

export interface FrameProps extends FrameProps_ {}

export const Frame = Flui<'div', FrameProps>(({ children, ...props }, ref) => {
  return (
    <Frame_ ref={ref} {...props}>
      {children}
    </Frame_>
  )
})
