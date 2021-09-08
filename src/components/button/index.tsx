import { Button_ } from './styled'

interface Props {}

export const Button: React.FC<Props> = ({ children, ...props }) => {
  return <Button_ {...props}>{children}</Button_>
}
