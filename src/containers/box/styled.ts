import { styled } from 'ui-styled/styled'
import { Length, StyledProps } from 'ui-types/styled'

export interface BoxProps {
  p?: Length
  pt?: Length
  pr?: Length
  pb?: Length
  pl?: Length
  py?: Length
  px?: Length
}

export const Box_ = styled('div')<BoxProps & StyledProps>`
  padding: $p;
  padding-top: $pt;
  padding-bottom: $pb;
`
