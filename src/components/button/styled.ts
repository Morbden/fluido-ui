import { styled } from 'goober'
import { StyledProps } from 'ui-types/goober'

interface Props extends StyledProps {
  padding?: number
  inverted?: boolean
}

export const Button_ = styled('div')<Props>`
  background-color: red;
`

export const Other_ = styled('div')<Props>`
  padding: ${({ padding = 0 }) => padding * 0.25}rem;
  background-color: red;
`
