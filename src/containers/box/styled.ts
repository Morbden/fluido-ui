import { styled } from 'ui-styled/styled'
import { Length, StyledProps } from 'ui-types/styled'

export interface BoxProps_ {
  p?: Length
  pt?: Length
  pr?: Length
  pb?: Length
  pl?: Length
  py?: Length
  px?: Length
  pil?: Length
  pis?: Length
  pie?: Length
  pbl?: Length
  pbs?: Length
  pbe?: Length
}

export const Box_ = styled('div')<BoxProps_ & StyledProps>`
  padding: $p;
  padding-top: $pt;
  padding-right: $pr;
  padding-bottom: $pb;
  padding-left: $pl;
  padding-right: $px;
  padding-left: $px;
  padding-top: $py;
  padding-bottom: $py;
  padding-inline: $pil;
  padding-inline-start: $pis;
  padding-inline-end: $pie;
  padding-block: $pbl;
  padding-block-start: $pbs;
  padding-block-end: $pbe;
`
