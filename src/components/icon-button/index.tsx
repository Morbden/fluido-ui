import { Flui } from 'ui-styled'
import { IconButton_ } from './styled'

interface Props {}

export const IconButton = Flui<'div', Props>(({ children, ...props }, ref) => {
  return (
    <IconButton_ ref={ref} {...props}>
      {children}
    </IconButton_>
  )
})
