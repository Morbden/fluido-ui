import { Box, BoxProps } from '../box'
import { styled } from 'ui-styled'
import { Length } from 'ui-types'

export interface CoverProps_ extends BoxProps {
  centered?: number | number[]
  fill?: number | number[]
  gap?: Length
  minHeight?: Length
}

function makeFillSelector(value: number | number[]) {
  if (Array.isArray(value)) {
    return value.map((v) => `:nth-child(${v})`).join(',')
  }
  return `:nth-child(${value})`
}

export const Cover_ = styled(Box)<CoverProps_>`
  display: flex;
  flex-direction: column;
  min-height: $minHeight;
  background-color: red;
  gap: $gap;

  & > :is(${({ centered }) => centered && makeFillSelector(centered)}) {
    margin-top: auto;
    margin-bottom: auto;
  }

  & > :is(${({ fill }) => (fill && makeFillSelector(fill)) || 'a'}) {
    flex: 1;
  }
`
