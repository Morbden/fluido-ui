import { styled } from 'ui-styled'
import { Length, StyledProps } from 'ui-types'

export interface BoxProps_ {
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
  /** One or two values for CSS `padding-block`. Shorthand for `padding-block-start` plus `padding-block-end`
   * @default null
   */
  pbl?: Length
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
}

export const Box_ = styled('div')<BoxProps_ & StyledProps>`
  padding: $p;
  padding-top: $pt;
  padding-right: $pr;
  padding-bottom: $pb;
  padding-left: $pl;
  padding-inline: $pil;
  padding-inline-start: $pis;
  padding-inline-end: $pie;
  padding-block: $pbl;
  padding-block-start: $pbs;
  padding-block-end: $pbe;
`
