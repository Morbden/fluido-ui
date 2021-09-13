import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { useTheme } from 'ui-contexts'
import { SidebarProps_, Sidebar_ } from './styled'

export interface SidebarProps extends SidebarProps_ {}

export type SidebarType = FluiComponent<'div', SidebarProps>

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ children, contentMin, gap, equalHeight, ...props }, ref) => {
    const theme = useTheme()
    return (
      <Sidebar_
        ref={ref}
        contentMin={contentMin || '50%'}
        equalHeight={equalHeight || true}
        gap={gap || theme.spaces.md}
        {...props}>
        {children}
      </Sidebar_>
    )
  },
) as SidebarType
