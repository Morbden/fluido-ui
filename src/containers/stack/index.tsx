import { Flui } from 'ui-styled'
import { StackProps_, Stack_ } from './styled'

export interface StackProps extends StackProps_ {}

export const Stack = Flui<'div', StackProps>(({ children, ...props }, ref) => {
  return (
    <Stack_ ref={ref} {...props}>
      {children}
    </Stack_>
  )
})
