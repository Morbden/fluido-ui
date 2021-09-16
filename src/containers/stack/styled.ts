import { styled } from 'ui-styled'
import { Length } from 'ui-types'
import { makeNthChildSelector } from 'ui-utilities'
import { Box, BoxProps } from '../box'

export interface StackProps_ extends BoxProps {
  gap?: Length
  splitAfter?: number | number[]
}

export const Stack_ = styled(Box, {
  functions: { makeNthChildSelector },
})<StackProps_>`
  display: flex;
  flex-direction: column;
  gap: #or(~$gap, $theme.spaces.xl);

  & > :is(#func(makeNthChildSelector, $splitAfter, 1)) {
    margin-top: auto;
  }
`
