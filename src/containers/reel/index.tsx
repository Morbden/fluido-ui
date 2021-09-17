import { Flui } from 'ui-utilities'
import { ReelProps_, Reel_ } from './styled'

export interface ReelProps extends ReelProps_ {}

export const Reel = Flui<'div', ReelProps>(({ children, ...props }) => {
  return <Reel_ {...props}>{children}</Reel_>
})
