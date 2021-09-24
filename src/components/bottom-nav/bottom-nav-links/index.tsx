import { Switcher } from 'ui-containers'
import { Flui } from 'ui-styled'

interface Props {}

export const BottomNavLinks = Flui<'div', Props>(
  ({ children, ...props }, ref) => {
    return (
      <Switcher
        data-switcher
        limit={5}
        threshold={0}
        gap={0}
        ref={ref}
        {...props}>
        {children}
      </Switcher>
    )
  },
)
