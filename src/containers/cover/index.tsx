import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { CoverProps_, Cover_ } from './styled'

export interface CoverProps extends CoverProps_ {}

export type CoverType = FluiComponent<'div', CoverProps>

export const Cover = forwardRef<HTMLDivElement, CoverProps>(
  ({ children, debugClass, className, ...props }, ref) => {
    const classes: string[] = []
    className && classes.push(className)
    debugClass && classes.push('cover')
    return (
      <Cover_ ref={ref} className={classes.join(' ')} {...props}>
        {children}
      </Cover_>
    )
  },
) as CoverType
