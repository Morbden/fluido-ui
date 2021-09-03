import { Button_ } from './styled'

interface Props {}

const Button: React.FC<Props> = ({ children, ...props }) => {
  return <Button_ {...props}>{children}</Button_>
}

export default Button
