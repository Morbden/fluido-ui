import { useTheme } from 'ui-contexts/ui-provider'
import { FluiComponent } from 'ui-types/containers'
import { BoxProps, Box_ } from './styled'

interface Props {
  motion?: boolean
}

export const Box: FluiComponent<'div', Props & BoxProps> = ({
  children,
  ...props
}) => {
  const theme = useTheme()

  return (
    <Box_ theme={theme} {...props}>
      {children}
    </Box_>
  )
}
