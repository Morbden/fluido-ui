import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { GridProps_, Grid_ } from './styled'

export interface GridProps extends GridProps_ {}

export type GridType = FluiComponent<'div', GridProps>

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, debugClass, className, ...props }, ref) => {
    const classes: string[] = []
    className && classes.push(className)
    debugClass && classes.push('grid')
    return (
      <Grid_ ref={ref} className={classes.join(' ')} {...props}>
        {children}
      </Grid_>
    )
  },
) as GridType
