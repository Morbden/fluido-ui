import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { CenterProps_, Center_ } from './styled'

export interface CenterProps extends CenterProps_ {}

export type CenterType = FluiComponent<'div', CenterProps>

export const Center = forwardRef<HTMLDivElement, CenterProps>(
  ({ children, debugClass, className, ...props }, ref) => {
    const classes: string[] = []
    className && classes.push(className)
    debugClass && classes.push('center')
    return (
      <Center_ ref={ref} className={classes.join(' ')} {...props}>
        {children}
      </Center_>
    )
  },
) as CenterType
