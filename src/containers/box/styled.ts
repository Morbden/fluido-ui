import { styled } from 'ui-styled'
import { Length, StyledProps } from 'ui-types'

export interface BoxProps_ extends StyledProps {
  bg?: string
  background?: string
  backgroundColor?: string
  bgColor?: string
  border?: Length
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
  color?: string
  fontFamily?: string | [string]
  fontSize?: string
  fontWeight?: string
  fontStyle?: string

  letterSpacing?: string
  lineHeight?: string

  /** One, two, three or four values for CSS `margin` shorthand
   * @default null
   */
  m?:
    | 'auto'
    | Length
    | [Length, Length]
    | [Length, Length, Length]
    | [Length, Length, Length, Length]
  /** Single value for CSS `margin-top`
   * @default null
   */
  mt?: Length | 'auto'
  /** Single value for CSS `margin-right`
   * @default null
   */
  mr?: Length | 'auto'
  /** Single value for CSS `margin-bottom`
   * @default null
   */
  mb?: Length | 'auto'
  /** Single value for CSS `margin-left`
   * @default null
   */
  ml?: Length | 'auto'
  /** Single value for CSS `margin-top` plus `margin-bottom`
   * @default null
   */
  my?: Length | 'auto'
  /** Single value for CSS `margin-left` plus `margin-right`
   * @default null
   */
  mx?: Length | 'auto'
  /** One or two values for CSS `margin-block`. Shorthand for `margin-block-start` plus `margin-block-end`
   * @default null
   */
  mbl?: Length | [Length, Length] | 'auto'
  /** Value for CSS `margin-block-start`
   * @default null
   */
  mbs?: Length | 'auto'
  /** Value for CSS `margin-block-end`
   * @default null
   */
  mbe?: Length | 'auto'
  /** One or two values for CSS `margin-inline`. Shorthand for `margin-inline-start` plus `margin-inline-end`
   * @default null
   */
  mil?: Length | [Length, Length] | 'auto'
  /** Value for CSS `margin-inline-start`
   * @default null
   */
  mis?: Length | 'auto'
  /** Value for CSS `margin-inline-end`
   * @default null
   */
  mie?: Length | 'auto'
  opacity?: string
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

  /** Hides the component for visible users, but shows for screen readers.
   * applies the CSS class `.sr-only` to the component.
   */
  srOnly?: boolean
  strikethrough?: boolean
  overline?: boolean
  underline?: boolean
  textDecorationColor?: string
  textDecorationStyle?:
    | 'solid'
    | 'dashed'
    | 'dotted'
    | 'wavy'
    | 'double'
    | 'inherit'
    | 'unset'
  textDecorationThickness?: 'auto' | 'from-font' | Length
  avoidSkipInk?: boolean
  textTransform?: 'capitalize' | 'lowercase' | 'uppercase' | 'inherit' | 'unset'
}

export const Box_ = styled('div')<BoxProps_>`
  background: #or($background, $bg);
  background-color: #or($backgroundColor, $bgColor);
  color: $color;

  margin: ~$m;
  margin-top: #or(~$mt, ~$my);
  margin-right: #or(~$mr, ~$mx);
  margin-bottom: #or(~$mb, ~$my);
  margin-left: #or(~$ml, ~$mx);
  margin-inline: ~$mil;
  margin-inline-start: ~$mis;
  margin-inline-end: ~$mie;
  margin-block: ~$mbl;
  margin-block-start: ~$mbs;
  margin-block-end: ~$mbe;
  margin-inline: ~$mil;
  margin-inline-start: ~$mis;
  margin-inline-end: ~$mie;

  opacity: $opacity;

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

  #if($border) {
    border-color: #or($borderColor, currentColor);
    border-style: #or($borderStyle, solid);
    border-width: ~$border;
  }

  #if($underline || $overline || $strikethrough) {
    text-decoration-color: #or($textDecorationColor, currentColor);
    text-decoration-style: #or($textDecorationStyle, solid);
    text-decoration-thickness: #or($textDecorationThickness, from-font);
    text-decoration-skip-ink: #and($avoidSkipInk, none);
  }

  text-transform: $textTransform;
`
