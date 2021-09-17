import { Flui } from 'ui-utilities'
import { GridProps_, Grid_ } from './styled'

export interface GridProps extends GridProps_ {}

export const Grid = Flui<'div', GridProps>(({ children, ...props }) => {
  return <Grid_ {...props}>{children}</Grid_>
})
