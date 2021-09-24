import { Flui } from 'ui-styled'
import { StackProps_, Stack_ } from './styled'

export interface StackProps extends StackProps_ {}

export const Stack = Flui<'div', StackProps>(({ children, ...props }) => {
  return <Stack_ {...props}>{children}</Stack_>
})
