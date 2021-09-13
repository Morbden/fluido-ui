import { Box, BoxProps } from '../box'
import { styled } from 'ui-styled'
import { Length } from 'ui-types'
import { makeNthChildSelector } from 'ui-utilities'

export interface CoverProps_ extends BoxProps {
  centered?: number | number[]
  fill?: number | number[]
  gap?: Length
  minHeight?: Length
}

export const Cover_ = styled(Box)<CoverProps_>`
  display: flex;
  flex-direction: column;
  min-height: $minHeight;
  gap: $gap;

  & > :is(${({ centered }) => centered && makeNthChildSelector(centered)}) {
    margin-top: auto;
    margin-bottom: auto;
  }

  & > :is(${({ fill }) => (fill && makeNthChildSelector(fill)) || 'a'}) {
    flex: 1;
  }
`
