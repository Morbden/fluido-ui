import { Box, BoxProps } from '../box'
import { styled } from 'ui-styled'
import { Length } from 'ui-types'

export interface StackProps_ extends BoxProps {
  gap?: Length
  splitAfter?: number | number[]
}

function makeSplitSelector(value: number | number[], offset: number = 0) {
  if (Array.isArray(value)) {
    return value.map((v) => `:nth-child(${v + offset})`).join(',')
  }
  return `:nth-child(${value + offset})`
}

export const Stack_ = styled(Box)<StackProps_>`
  display: flex;
  flex-direction: column;

  &
    > :is(${({ splitAfter }) =>
        splitAfter && makeSplitSelector(splitAfter, 1)}) {
    margin-top: auto;
  }

  & > * + * {
    margin-top: $gap;
  }
`
