import { styled } from 'goober'
import { getComputedLength } from 'ui-utilities/computed'
import { Length, StyledProps } from 'ui-types/containers'

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
  ${({ p, theme }) => getComputedLength('padding', p, theme)}
  ${({ pt, theme }) => getComputedLength('padding-top', pt, theme)}
  ${({ pr, theme }) => getComputedLength('padding-right', pr, theme)}
  ${({ pb, theme }) => getComputedLength('padding-bottom', pb, theme)}
  ${({ pl, theme }) => getComputedLength('padding-left', pl, theme)}
`
