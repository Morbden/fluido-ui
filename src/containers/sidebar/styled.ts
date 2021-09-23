import { styled } from 'ui-styled'
import { Length } from 'ui-types'
import { Box, BoxProps } from '../box'

export interface SidebarProps_ extends BoxProps {
  contentMin?: Length
  preventStretch?: boolean
  gap?: Length
  noStretch?: boolean
  side?: 'left' | 'right'
  sideWidth?: Length
}

export const Sidebar_ = styled(Box)<SidebarProps_>`
  display: flex;
  flex-wrap: wrap;
  gap: #or(~$gap, $theme.spaces.md);
  align-items: #select($preventStretch, flex-start, stretch);

  & > #select($side == right, :first-child, :last-child) {
    flex-basis: ~$sideWidth;
    flex-grow: 1;
  }

  & > #select($side == right, :last-child, :first-child) {
    flex-basis: 0;
    flex-grow: 9999;
    min-width: min(#or(~$contentMin, 50%), 100%);
  }
`
