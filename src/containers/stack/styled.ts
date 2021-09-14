import { Box, BoxProps } from '../box'
import { styled } from 'ui-styled'
import { Length } from 'ui-types'
import { makeNthChildSelector } from 'ui-utilities'

export interface StackProps_ extends BoxProps {
  gap?: Length
  splitAfter?: number | number[]
}

export const Stack_ = styled(Box)<StackProps_>`
  display: flex;
  flex-direction: column;
  gap: $gap;

  &
    > :is(${({ splitAfter }) =>
        splitAfter && makeNthChildSelector(splitAfter, 1)}) {
    margin-top: auto;
  }
`
