import { styled } from 'ui-styled'
import { Length } from 'ui-types'
import { Box, BoxProps } from '../box'

export interface ClusterProps_ extends BoxProps {
  gap?: Length
  justify?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
  items?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch'
}

export const Cluster_ = styled(Box)<ClusterProps_>`
  display: flex;
  flex-wrap: wrap;
  gap: #or(~$gap, $theme.spaces.md);
  justify-content: $justify;
  align-items: $items;
`
