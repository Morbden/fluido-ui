import { Flui } from 'ui-styled'
import { CenterProps_, Center_ } from './styled'

export interface CenterProps extends CenterProps_ {}

export const Center = Flui<'div', CenterProps>(({ children, ...props }) => {
  return <Center_ {...props}>{children}</Center_>
})
