import { Box, BoxProps } from '../box'
import { styled } from 'ui-styled'
import { Length } from 'ui-types'

export interface SwitcherProps_ extends BoxProps {
  threshold?: Length
  gap?: Length
  limit?: number
}

export const Switcher_ = styled(Box)<SwitcherProps_>`
  display: flex;
  flex-wrap: wrap;
  gap: $gap;

  & > * {
    flex-grow: 1;
    flex-basis: calc(($threshold - 100%) * 999);
  }

  & > :nth-last-child(n + ${({ limit }) => (limit ? limit + 1 : null)}),
  & > :nth-last-child(n + ${({ limit }) => (limit ? limit + 1 : null)}) ~ * {
    flex-basis: 100%;
  }

  & > * > * {
    max-width: 100%;
  }
`
