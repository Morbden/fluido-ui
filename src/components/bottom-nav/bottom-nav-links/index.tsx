import { Switcher } from 'ui-containers'
import { Flui } from 'ui-utilities'

interface Props {}

export const BottomNavLinks = Flui<'div', Props>(({ children, ...props }) => {
  return (
    <Switcher data-switcher limit={5} threshold={0} gap={0} {...props}>
      {children}
    </Switcher>
  )
})
