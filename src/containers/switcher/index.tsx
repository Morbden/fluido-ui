import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { SwitcherProps_, Switcher_ } from './styled'

export interface SwitcherProps extends SwitcherProps_ {}

export type SwitcherType = FluiComponent<'div', SwitcherProps>

export const Switcher = forwardRef<HTMLDivElement, SwitcherProps>(
  ({ children, ...props }, ref) => {
    return (
      <Switcher_ ref={ref} {...props}>
        {children}
      </Switcher_>
    )
  },
) as SwitcherType
