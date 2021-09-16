import { Text } from 'ui-components'
import { Box, Center, Stack } from 'ui-containers'
import { BottomNavLink_ } from './styled'

interface Props {
  icon?: React.ReactNode
}

const BottomNavLink: React.FC<Props> = ({ children, icon, ...props }) => {
  return (
    <Stack p={2} {...props}>
      {icon && (
        <Center intrinsic andText>
          <Box
            bgColor='red'
            style={{
              width: '1.5rem',
              height: '1.5rem',
              lineHeight: '1.5rem',
            }}>
            {icon}
          </Box>
        </Center>
      )}
      <Center andText>
        <Text as='span'>{children}</Text>
      </Center>
    </Stack>
  )
}

export default BottomNavLink
