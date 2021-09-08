import { StyledProps } from 'ui-types/goober'
import { Button_ } from './styled'

interface Props extends StyledProps {
  title?: string
}

export const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Button_ className='btn2' {...props}>
      {children}
    </Button_>
  )
}
