import { Box, BoxProps } from '../box'
import { styled } from 'ui-styled'
import { Length } from 'ui-types'

export interface SidebarProps_ extends BoxProps {
  contentMin?: Length
  equalHeight?: boolean
  gap?: Length
  noStretch?: boolean
  side?: 'left' | 'right'
  sideWidth?: Length
}

export const Sidebar_ = styled(Box)<SidebarProps_>`
  display: flex;
  flex-wrap: wrap;
  gap: $gap;
  align-items: $equalHeight;

  & > :first-child {
    flex-basis: $sideWidth;
    flex-grow: 1;
  }

  & > :last-child {
    flex-basis: 0;
    flex-grow: 9999;
    min-width: min($contentMin, 100%);
  }

  /* & > $if(side = left, :first-child, :last-child) {
    flex-basis: $sideWidth;
    flex-grow: 1;
  }

  & > $if(side = left, :last-child, :first-child) {
    flex-basis: 0;
    flex-grow: 999;
    min-width: $contentMin;
  } */
`
