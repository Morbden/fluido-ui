import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types/styled'
import { GridProps_, Grid_ } from './styled'

export interface GridProps extends GridProps_ {}

export type GridType = FluiComponent<'div', GridProps>

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, ...props }, ref) => {
    return (
      <Grid_ ref={ref} {...props}>
        {children}
      </Grid_>
    )
  },
) as GridType
