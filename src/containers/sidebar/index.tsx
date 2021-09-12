import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { SidebarProps_, Sidebar_ } from './styled'

export interface SidebarProps extends SidebarProps_ {}

export type SidebarType = FluiComponent<'div', SidebarProps>

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ children, ...props }, ref) => {
    return (
      <Sidebar_ ref={ref} {...props}>
        {children}
      </Sidebar_>
    )
  },
) as SidebarType
