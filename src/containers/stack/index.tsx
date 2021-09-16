import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { StackProps_, Stack_ } from './styled'

export interface StackProps extends StackProps_ {}

export type StackType = FluiComponent<'div', StackProps>

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ children, debugClass, className, ...props }, ref) => {
    const classes: string[] = []
    className && classes.push(className)
    debugClass && classes.push('stack')
    return (
      <Stack_ ref={ref} className={classes.join(' ')} {...props}>
        {children}
      </Stack_>
    )
  },
) as StackType
