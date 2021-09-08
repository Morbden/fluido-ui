import { Box_ } from './styled'

interface Props {}

export const Box: React.FC<Props> & typeof Box_ = ({ children, ...props }) => {
  return <Box_ {...props}>{children}</Box_>
}
