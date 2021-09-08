import { Button_ } from './styled'

interface Props {}

type Component = React.FC<Props> & typeof Button_

export const Button: Component = ({ children, ...props }) => {
  return (
    <Button_ className='btn' {...props}>
      {children}
    </Button_>
  )
}
