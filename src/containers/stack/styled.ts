import { Box, BoxProps } from '../box'
import { styled } from 'ui-styled'
import { Length } from 'ui-types'

export interface StackProps_ extends BoxProps {
  gap?: Length
  splitAfter?: number | number[]
}

function makeSplitSelector(value: number | number[]) {
  if (Array.isArray(value)) {
    return value.map((v) => `:nth-child(${v + 1})`).join(',')
  }
  return `:nth-child(${value + 1})`
}

export const Stack_ = styled(Box)<StackProps_>`
  display: flex;
  flex-direction: column;

  & > :is(${({ splitAfter }) => splitAfter && makeSplitSelector(splitAfter)}) {
    margin-top: auto;
  }

  & > * + * {
    margin-top: $gap;
  }
`
