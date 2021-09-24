import { Flui } from 'ui-styled'
import { CoverProps_, Cover_ } from './styled'

export interface CoverProps extends CoverProps_ {}

export const Cover = Flui<'div', CoverProps>(({ children, ...props }, ref) => {
  return (
    <Cover_ ref={ref} {...props}>
      {children}
    </Cover_>
  )
})
