import { styled } from 'ui-styled'
import { Length, StyledProps } from 'ui-types'

export interface BoxProps_ extends StyledProps {
  /** One, two, three or four values for CSS `padding` shorthand
   * @default null
   */
  p?:
    | Length
    | [Length, Length]
    | [Length, Length, Length]
    | [Length, Length, Length, Length]
  /** Single value for CSS `padding-top`
   * @default null
   */
  pt?: Length
  /** Single value for CSS `padding-right`
   * @default null
   */
  pr?: Length
  /** Single value for CSS `padding-bottom`
   * @default null
   */
  pb?: Length
  /** Single value for CSS `padding-left`
   * @default null
   */
  pl?: Length
  /** Single value for CSS `padding-top` plus `padding-bottom`
   * @default null
   */
  py?: Length
  /** Single value for CSS `padding-left` plus `padding-right`
   * @default null
   */
  px?: Length
  /** One or two values for CSS `padding-block`. Shorthand for `padding-block-start` plus `padding-block-end`
   * @default null
   */
  pbl?: Length | [Length, Length]
  /** Value for CSS `padding-block-start`
   * @default null
   */
  pbs?: Length
  /** Value for CSS `padding-block-end`
   * @default null
   */
  pbe?: Length
  /** One or two values for CSS `padding-inline`. Shorthand for `padding-inline-start` plus `padding-inline-end`
   * @default null
   */
  pil?: Length | [Length, Length]
  /** Value for CSS `padding-inline-start`
   * @default null
   */
  pis?: Length
  /** Value for CSS `padding-inline-end`
   * @default null
   */
  pie?: Length
  /** Prevents the user selection using `user-select: none`
   * @default false
   */
  preventSelection?: boolean
  /** Hides the component for visible users, but shows for screen readers */
  srOnly?: boolean
  bgColor?: string
  color?: string
  borderColor?: string
  borderStyle?:
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'ridge'
    | 'solid'
  border?: Length
}

export const Box_ = styled('div')<BoxProps_>`
  padding: ~$p;
  padding-top: #or(~$pt, ~$py);
  padding-right: #or(~$pr, ~$px);
  padding-bottom: #or(~$pb, ~$py);
  padding-left: #or(~$pl, ~$px);
  padding-inline: ~$pil;
  padding-inline-start: ~$pis;
  padding-inline-end: ~$pie;
  padding-block: ~$pbl;
  padding-block-start: ~$pbs;
  padding-block-end: ~$pbe;
  padding-inline: ~$pil;
  padding-inline-start: ~$pis;
  padding-inline-end: ~$pie;

  user-select: #and($preventSelection, none);
  background-color: $bgColor;
  color: $color;

  #if($border) {
    border-color: #or($borderColor, currentColor);
    border-style: #or($borderStyle, solid);
    border-width: ~$border;
  }
`
