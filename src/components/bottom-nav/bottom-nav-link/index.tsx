import { Text } from 'ui-components'
import { Box, Center, Stack } from 'ui-containers'
import { Flui } from 'ui-styled'

interface Props {
  icon?: React.ReactNode
}

export const BottomNavLink = Flui<'div', Props>(
  ({ children, icon, ...props }, ref) => {
    return (
      <Stack p={2} ref={ref} {...props}>
        {icon && (
          <Center intrinsic andText>
            <Box bgColor='red' size={6}>
              <Text as='span' lineHeight={6}>
                {icon}
              </Text>
            </Box>
          </Center>
        )}
        <Center andText>
          <Text as='span'>{children}</Text>
        </Center>
      </Stack>
    )
  },
)
