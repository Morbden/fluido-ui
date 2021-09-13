import { Box, BoxProps } from '../box'
import { styled } from 'ui-styled'
import { Length } from 'ui-types'

export interface GridProps_ extends BoxProps {
  min?: Length
  gap?: Length
  fill?: boolean
}

export const Grid_ = styled(Box)<GridProps_>`
  display: grid;
  gap: $gap;
  grid-template-columns: repeat(
    #if($fill, auto-fill, auto-fit),
    minmax(min(#fallback($min, 10rem), 100%), 1fr)
  );
`
