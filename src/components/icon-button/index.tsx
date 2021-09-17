import { Flui } from 'ui-utilities'
import { IconButton_ } from './styled'

interface Props {}

export const IconButton = Flui<'div', Props>(({ children, ...props }) => {
  return <IconButton_ {...props}>{children}</IconButton_>
})
