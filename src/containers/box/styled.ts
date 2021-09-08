import { styled } from 'goober'
import {
  getComputedLength,
  validadeValue,
} from 'ui-utilities/get-computed-length'
import { Length, StyledProps } from 'ui-types/containers'

interface Props extends StyledProps {
  p?: Length
  pt?: Length
  pr?: Length
  pb?: Length
  pl?: Length
  py?: Length
  px?: Length
}

export const Box_ = styled('div')<Props>`
  ${({ p, theme }) => getComputedLength('padding', p || 0, theme)}
  ${({ pt, theme }) => getComputedLength('padding-top', pt || 0, theme)}
  ${({ pr, theme }) => getComputedLength('padding-right', pr || 0, theme)}
  ${({ pb, theme }) => getComputedLength('padding-bottom', pb || 0, theme)}
  ${({ pl, theme }) => getComputedLength('padding-left', pl || 0, theme)}
`
