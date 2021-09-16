import { Switcher } from 'ui-containers'
import { BottomNavLinks_ } from './styled'

interface Props {}

const BottomNavLinks: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Switcher data-switcher limit={5} threshold={0} gap={0} {...props}>
      {children}
    </Switcher>
  )
}

export default BottomNavLinks
