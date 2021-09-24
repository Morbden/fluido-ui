import { Flui } from 'ui-styled'
import { SwitcherProps_, Switcher_ } from './styled'

export interface SwitcherProps extends SwitcherProps_ {}

export const Switcher = Flui<'div', SwitcherProps>(({ children, ...props }) => {
  return <Switcher_ {...props}>{children}</Switcher_>
})
