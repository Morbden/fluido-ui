import { styled } from 'ui-styled'
import { Length } from 'ui-types'
import { Box, BoxProps } from '../box'

export interface SwitcherProps_ extends BoxProps {
  threshold?: Length
  gap?: Length
  limit?: number
}

export const Switcher_ = styled(Box)<SwitcherProps_>`
  display: flex;
  flex-wrap: wrap;
  gap: #or(~$gap, $theme.spaces.xl);

  & > * {
    flex-grow: 1;
    flex-basis: calc((#or(~$threshold, 30rem) - 100%) * 999);
  }

  & > :nth-last-child(n + #math(#or($limit, 5) + 1)),
  & > :nth-last-child(n + #math(#or($limit, 5) + 1)) ~ * {
    flex-basis: 100%;
  }

  & > * > * {
    max-width: 100%;
  }
`
