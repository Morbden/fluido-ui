import { Flui } from 'ui-styled'
import { CoverProps_, Cover_ } from './styled'

export interface CoverProps extends CoverProps_ {}

export const Cover = Flui<'div', CoverProps>(({ children, ...props }) => {
  return <Cover_ {...props}>{children}</Cover_>
})
