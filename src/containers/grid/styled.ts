import { styled } from 'ui-styled'
import { Length } from 'ui-types'
import { Box, BoxProps } from '../box'

export interface GridProps_ extends BoxProps {
  min?: Length
  gap?: Length
  fill?: boolean
}

export const Grid_ = styled(Box)<GridProps_>`
  display: grid;
  gap: #or(~$gap, $theme.spaces.md);
  grid-template-columns: repeat(
    #select($fill, auto-fill, auto-fit),
    minmax(min(#or(~$min, 10rem), 100%), 1fr)
  );
`
