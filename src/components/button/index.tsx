import { Flui } from 'ui-utilities'
import { Button_ } from './styled'

interface Props {}

export const Button = Flui<'div', Props>(({ children, ...props }) => {
  return <Button_ {...props}>{children}</Button_>
})
