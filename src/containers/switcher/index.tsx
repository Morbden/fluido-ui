import { forwardRef } from 'react'
import { useTheme } from 'ui-contexts'
import { FluiComponent } from 'ui-types'
import { SwitcherProps_, Switcher_ } from './styled'

export interface SwitcherProps extends SwitcherProps_ {}

export type SwitcherType = FluiComponent<'div', SwitcherProps>

export const Switcher = forwardRef<HTMLDivElement, SwitcherProps>(
  ({ children, gap, limit, threshold, ...props }, ref) => {
    const theme = useTheme()
    return (
      <Switcher_
        gap={gap || theme.spaces.xl}
        limit={limit || 4}
        threshold={threshold || 120}
        ref={ref}
        {...props}>
        {children}
      </Switcher_>
    )
  },
) as SwitcherType
