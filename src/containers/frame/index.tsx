import { Flui } from 'ui-utilities'
import { FrameProps_, Frame_ } from './styled'

export interface FrameProps extends FrameProps_ {}

export const Frame = Flui<'div', FrameProps>(({ children, ...props }) => {
  return <Frame_ {...props}>{children}</Frame_>
})
