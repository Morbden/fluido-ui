import { Flui } from 'ui-utilities'
import { SidebarProps_, Sidebar_ } from './styled'

export interface SidebarProps extends SidebarProps_ {
  children: [React.ReactNode, React.ReactNode]
}
export const Sidebar = Flui<'div', SidebarProps>(({ children, ...props }) => {
  return <Sidebar_ {...props}>{children}</Sidebar_>
})
