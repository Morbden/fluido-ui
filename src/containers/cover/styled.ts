import { styled } from 'ui-styled'
import { Length } from 'ui-types'
import { makeNthChildSelector } from 'ui-utilities'
import { Box, BoxProps } from '../box'

export interface CoverProps_ extends BoxProps {
  centered?: number | number[]
  fill?: number | number[]
  gap?: Length
  minHeight?: Length
}

export const Cover_ = styled(Box, {
  functions: { makeNthChildSelector },
})<CoverProps_>`
  display: flex;
  flex-direction: column;
  min-height: #or(~$minHeight, 100vh);
  gap: #or(~$gap, $theme.spaces.md);

  & > :is(#func(makeNthChildSelector, $centered)) {
    margin-top: auto;
    margin-bottom: auto;
  }

  & > :is(#func(makeNthChildSelector, $fill)) {
    flex: 1;
  }
`
