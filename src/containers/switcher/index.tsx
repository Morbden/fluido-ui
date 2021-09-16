import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { SwitcherProps_, Switcher_ } from './styled'

export interface SwitcherProps extends SwitcherProps_ {}

export type SwitcherType = FluiComponent<'div', SwitcherProps>

export const Switcher = forwardRef<HTMLDivElement, SwitcherProps>(
  ({ children, debugClass, className, ...props }, ref) => {
    const classes: string[] = []
    className && classes.push(className)
    debugClass && classes.push('switcher')
    return (
      <Switcher_ ref={ref} className={classes.join(' ')} {...props}>
        {children}
      </Switcher_>
    )
  },
) as SwitcherType
