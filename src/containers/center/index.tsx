import { Flui } from 'ui-styled'
import { CenterProps_, Center_ } from './styled'

export interface CenterProps extends CenterProps_ {}

export const Center = Flui<'div', CenterProps>(
  ({ children, ...props }, ref) => {
    return (
      <Center_ ref={ref} {...props}>
        {children}
      </Center_>
    )
  },
)
