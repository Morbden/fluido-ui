import { IconButton_ } from './styled'

interface Props {}

export const IconButton: React.FC<Props> = ({ children, ...props }) => {
  return <IconButton_ {...props}>{children}</IconButton_>
}
