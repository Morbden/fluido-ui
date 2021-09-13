import { Box, BoxProps } from '../box'
import { styled } from 'ui-styled'
import { Length } from 'ui-types'

export interface CenterProps_ extends BoxProps {
  maxWidth?: Length
  andText?: boolean
  intrinsic?: boolean
}

export const Center_ = styled(Box)<CenterProps_>`
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  max-width: $maxWidth;
  text-align: $if(andText, center);
  display: $if(intrinsic, flex);
  flex-direction: $if(intrinsic, column);
  align-items: $if(intrinsic, var(--center, center));
`
