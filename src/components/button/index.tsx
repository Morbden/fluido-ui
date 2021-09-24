import { Flui } from 'ui-styled'
import { Button_ } from './styled'

interface Props {}

export const Button = Flui<'div', Props>(({ children, ...props }, ref) => {
  return (
    <Button_ ref={ref} {...props}>
      {children}
    </Button_>
  )
})
