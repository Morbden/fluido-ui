import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { SidebarProps_, Sidebar_ } from './styled'

export interface SidebarProps extends SidebarProps_ {
  children: [React.ReactNode, React.ReactNode]
}

export type SidebarType = FluiComponent<'div', SidebarProps>

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ children, debugClass, className, ...props }, ref) => {
    const classes: string[] = []
    className && classes.push(className)
    debugClass && classes.push('sidebar')
    return (
      <Sidebar_ ref={ref} className={classes.join(' ')} {...props}>
        {children}
      </Sidebar_>
    )
  },
) as SidebarType
