import { Box, BoxProps } from '../box'
import { styled } from 'ui-styled'
import { Length } from 'ui-types'

export interface StackProps_ extends BoxProps {
  gap?: Length
}

export const Stack_ = styled(Box)<StackProps_>`
  outline: 1px solid red;
  & > * {
    outline: 1px solid green;
  }
  & > * + * {
    margin-top: $gap;
  }
`
