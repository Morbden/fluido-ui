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

  /** One, two, three or four values for CSS `margin` shorthand
   * @default null
   */
  m?:
    | 'auto'
    | 'full'
    | Length
    | [Length, Length]
    | [Length, Length, Length]
    | [Length, Length, Length, Length]

  /** One, two, three or four values for CSS `margin` shorthand
   * @default null
   */
  margin?:
    | 'auto'
    | 'full'
    | Length
    | [Length, Length]
    | [Length, Length, Length]
    | [Length, Length, Length, Length]

  /** Single value for CSS `margin-top`
   * @default null
   */
  mt?: Length | 'auto' | 'full'

  /** Single value for CSS `margin-top`
   * @default null
   */
  marginTop?: Length | 'auto' | 'full'

  /** Single value for CSS `margin-right`
   * @default null
   */
  mr?: Length | 'auto' | 'full'

  /** Single value for CSS `margin-right`
   * @default null
   */
  marginRight?: Length | 'auto' | 'full'

  /** Single value for CSS `margin-bottom`
   * @default null
   */
  mb?: Length | 'auto' | 'full'

  /** Single value for CSS `margin-bottom`
   * @default null
   */
  marginBottom?: Length | 'auto' | 'full'

  /** Single value for CSS `margin-left`
   * @default null
   */
  ml?: Length | 'auto' | 'full'

  /** Single value for CSS `margin-left`
   * @default null
   */
  marginLeft?: Length | 'auto' | 'full'

  /** Single value for CSS `margin-top` plus `margin-bottom`
   * @default null
   */
  my?: Length | 'auto' | 'full'

  /** Single value for CSS `margin-left` plus `margin-right`
   * @default null
   */
  mx?: Length | 'auto' | 'full'

  /** One or two values for CSS `margin-block`. Shorthand for `margin-block-start` plus `margin-block-end`
   * @default null
   */
  mbl?: Length | [Length, Length] | 'auto' | 'full'

  /** One or two values for CSS `margin-block`. Shorthand for `margin-block-start` plus `margin-block-end`
   * @default null
   */
  marginBlock?: Length | [Length, Length] | 'auto' | 'full'

  /** Value for CSS `margin-block-start`
   * @default null
   */
  mbs?: Length | 'auto' | 'full'

  /** Value for CSS `margin-block-start`
   * @default null
   */
  marginBlockStart?: Length | 'auto' | 'full'

  /** Value for CSS `margin-block-end`
   * @default null
   */
  mbe?: Length | 'auto' | 'full'

  /** Value for CSS `margin-block-end`
   * @default null
   */
  marginBlockEnd?: Length | 'auto' | 'full'

  /** One or two values for CSS `margin-inline`. Shorthand for `margin-inline-start` plus `margin-inline-end`
   * @default null
   */
  mil?: Length | [Length, Length] | 'auto' | 'full'

  /** One or two values for CSS `margin-inline`. Shorthand for `margin-inline-start` plus `margin-inline-end`
   * @default null
   */
  marginInline?: Length | [Length, Length] | 'auto' | 'full'

  /** Value for CSS `margin-inline-start`
   * @default null
   */
  mis?: Length | 'auto' | 'full'

  /** Value for CSS `margin-inline-start`
   * @default null
   */
  marginInlineStart?: Length | 'auto' | 'full'

  /** Value for CSS `margin-inline-end`
   * @default null
   */
  mie?: Length | 'auto' | 'full'

  /** Value for CSS `margin-inline-end`
   * @default null
   */
  marginInlineEnd?: Length | 'auto' | 'full'
  opacity?: string

  /** One, two, three or four values for CSS `padding` shorthand
   * @default null
   */
  p?:
    | Length
    | [Length, Length]
    | [Length, Length, Length]
    | [Length, Length, Length, Length]

  /** One, two, three or four values for CSS `padding` shorthand
   * @default null
   */
  padding?:
    | Length
    | [Length, Length]
    | [Length, Length, Length]
    | [Length, Length, Length, Length]

  /** Single value for CSS `padding-top`
   * @default null
   */
  pt?: Length

  /** Single value for CSS `padding-top`
   * @default null
   */
  paddingTop?: Length

  /** Single value for CSS `padding-right`
   * @default null
   */
  pr?: Length

  /** Single value for CSS `padding-right`
   * @default null
   */
  paddingRight?: Length

  /** Single value for CSS `padding-bottom`
   * @default null
   */
  pb?: Length

  /** Single value for CSS `padding-bottom`
   * @default null
   */
  paddingBottom?: Length

  /** Single value for CSS `padding-left`
   * @default null
   */
  pl?: Length

  /** Single value for CSS `padding-left`
   * @default null
   */
  paddingLeft?: Length

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

  /** One or two values for CSS `padding-block`. Shorthand for `padding-block-start` plus `padding-block-end`
   * @default null
   */
  paddingBlock?: Length | [Length, Length]

  /** Value for CSS `padding-block-start`
   * @default null
   */
  pbs?: Length

  /** Value for CSS `padding-block-start`
   * @default null
   */
  paddingBlockStart?: Length

  /** Value for CSS `padding-block-end`
   * @default null
   */
  pbe?: Length

  /** Value for CSS `padding-block-end`
   * @default null
   */
  paddingBlockEnd?: Length

  /** One or two values for CSS `padding-inline`. Shorthand for `padding-inline-start` plus `padding-inline-end`
   * @default null
   */
  pil?: Length | [Length, Length]

  /** One or two values for CSS `padding-inline`. Shorthand for `padding-inline-start` plus `padding-inline-end`
   * @default null
   */
  paddingInline?: Length | [Length, Length]

  /** Value for CSS `padding-inline-start`
   * @default null
   */
  pis?: Length

  /** Value for CSS `padding-inline-start`
   * @default null
   */
  paddingInlineStart?: Length

  /** Value for CSS `padding-inline-end`
   * @default null
   */
  pie?: Length

  /** Value for CSS `padding-inline-end`
   * @default null
   */
  paddingInlineEnd?: Length

  /** Prevents the user selection using `user-select: none`
   * @default false
   */
  preventSelection?: boolean

  /** Hides the component for visible users, but shows for screen readers.
   * applies the CSS class `.sr-only` to the component.
   * @default false
   */
  srOnly?: boolean

  /** Value for CSS `text-decoration-line`.
   * Using this also applies default values for `textDecorationColor`, `textDecorationStyle` and `textDecorationThickness`
   * @default null
   */
  textDecoration?: 'underline' | 'overline' | 'line-through' | 'none'

  /** Value for CSS `text-decoration-color`.
   * `textDecoration` must be set for this to work.
   * @default 'currentColor'
   */
  textDecorationColor?: string

  /** Value for CSS `text-decoration-style`.
   * this property changes the style of the line, from a solid line
   * to a more decorative style such as 'wavy' or 'dashed'
   * `textDecoration` must be set for this to work.
   * @default 'solid'
   */
  textDecorationStyle?:
    | 'solid'
    | 'dashed'
    | 'dotted'
    | 'wavy'
    | 'double'
    | 'inherit'
    | 'unset'

  /** Value for CSS `text-decoration-thickness`.
   * `textDecoration` must be set for this to work.
   * Specifies the thickness of the line, such as '3px'.
   * @default 'from-font'
   */
  textDecorationThickness?: 'auto' | 'from-font' | Length

  /** Value for CSS `text-decoration-skip-ink`.
   * `textDecoration = 'underline'` must be set for this to work.
   * By default CSS underlines skip characters that have descendants,
   * such as lowercase "j" or "y" in some font-families.
   * @default false
   */
  avoidSkipInk?: boolean

  /** Value for CSS `width`
   * @default null
   */
  w?: Length

  /** Value for CSS `width`
   * @default null
   */
  width?: Length

  /** Value for CSS `min-width`
   * @default null
   */
  minW?: Length

  /** Value for CSS `min-width`
   * @default null
   */
  minWidth?: Length

  /** Value for CSS `max-width`
   * @default null
   */
  maxW?: Length

  /** Value for CSS `max-width`
   * @default null
   */
  maxWidth?: Length

  /** Value for CSS `height`
   * @default null
   */
  h?: Length

  /** Value for CSS `height`
   * @default null
   */
  height?: Length

  /** Value for CSS `min-height`
   * @default null
   */
  minH?: Length

  /** Value for CSS `min-height`
   * @default null
   */
  minHeight?: Length

  /** Value for CSS `max-height`
   * @default null
   */
  maxH?: Length

  /** Value for CSS `max-height`
   * @default null
   */
  maxHeight?: Length

  /** One or two values for CSS `width` and `height`.
   * @default null
   */
  size?: Length | [Length, Length]

  fontFamily?: string
  fontSize?: Length
  fontWeight?: string
  fontStyle?: string
  letterSpacing?: string
  lineHeight?: Length
  textAlign?:
    | 'center'
    | 'end'
    | 'inherit'
    | 'initial'
    | 'justify'
    | 'left'
    | 'right'
    | 'start'
    | 'unset'
  textTransform?: 'capitalize' | 'lowercase' | 'uppercase' | 'inherit' | 'unset'

  overflow?: 'auto' | 'hidden' | 'visible' | 'scroll'
  overflowX?: 'auto' | 'hidden' | 'visible' | 'scroll'
  overflowY?: 'auto' | 'hidden' | 'visible' | 'scroll'

  display?:
    | 'block'
    | 'flex'
    | 'flow-root'
    | 'grid'
    | 'inline-block'
    | 'inline-flex'
    | 'inline-grid'
    | 'inline'
    | 'none'

  borderRadius?: Length
  radius?: Length
  borderTopLeftRadius?: Length
  radiusTL?: Length
  borderTopRightRadius?: Length
  radiusTR?: Length
  borderBottomLeftRadius?: Length
  radiusBL?: Length
  borderBottomRightRadius?: Length
  radiusBR?: Length
  borderTopRadius?: Length
  radiusT?: Length
  borderRightRadius?: Length
  radiusR?: Length
  borderBottomRadius?: Length
  radiusB?: Length
  borderLeftRadius?: Length
  radiusL?: Length

  // parent
  alignItems?: string
  items?: string
  alignContent?: string
  justifyItems?: string
  justifyContent?: string
  justify?: string
  flexWrap?: string
  wrap?: string
  flexDirection?: string
  direction?: string
  // children
  flex?: string
  flexGrow?: string
  flexShrink?: string
  flexBasis?: string
  justifySelf?: string
  alignSelf?: string
  order?: string

  boxShadow?: string
  shadow?: Length
}

export const Box_ = styled('div')<BoxProps_>`
  background: #or($background, $bg);
  background-color: #or($backgroundColor, $bgColor);

  color: $color;

  margin: #or(~$margin, ~$m);
  margin-top: #or(~$marginTop, ~$mt, ~$my);
  margin-right: #or(~$marginRight, ~$mr, ~$mx);
  margin-bottom: #or(~$marginBottom, ~$mb, ~$my);
  margin-left: #or(~$marginLeft, ~$ml, ~$mx);
  margin-inline: #or(~$marginInline, ~$mil);
  margin-inline-start: #or(~$marginInlineStart, ~$mis);
  margin-inline-end: #or(~$marginInlineEnd, ~$mie);
  margin-block: #or(~$marginBlock, ~$mbl);
  margin-block-start: #or(~$marginBlockStart, ~$mbs);
  margin-block-end: #or(~$marginBlockEnd, ~$mbe);
  margin-inline: #or(~$marginInline, ~$mil);
  margin-inline-start: #or(~$marginInlineStart, ~$mis);
  margin-inline-end: #or(~$marginInlineEnd, ~$mie);

  padding: #or(~$padding, ~$p);
  padding-top: #or(~$paddingTop, ~$pt, ~$py);
  padding-right: #or(~$paddingRight, ~$pr, ~$px);
  padding-bottom: #or(~$paddingBottom, ~$pb, ~$py);
  padding-left: #or(~$paddingLeft, ~$pl, ~$px);
  padding-inline: #or(~$paddingInline, ~$pil);
  padding-inline-start: #or(~$paddingInlineStart, ~$pis);
  padding-inline-end: #or(~$paddingInlineEnd, ~$pie);
  padding-block: #or(~$paddingBlock, ~$pbl);
  padding-block-start: #or(~$paddingBlockStart, ~$pbs);
  padding-block-end: #or(~$paddingBlockEnd, ~$pbe);
  padding-inline: #or(~$paddingInline, ~$pil);
  padding-inline-start: #or(~$paddingInlineStart, ~$pis);
  padding-inline-end: #or(~$paddingInlineEnd, ~$pie);

  #if($border) {
    border-color: #or($borderColor, currentColor);
    border-style: #or($borderStyle, solid);
    border-width: ~$border;
  }

  border-radius: #or(~$borderRadius, ~$radius);
  border-top-left-radius: #or(
    ~$borderTopLeftRadius,
    ~$radiusTL,
    ~$borderTopRadius,
    ~$radiusT,
    ~$borderLeftRadius,
    ~$radiusL
  );
  border-top-right-radius: #or(
    ~$borderTopRightRadius,
    ~$radiusTR,
    ~$borderTopRadius,
    ~$radiusT,
    ~$borderRightRadius,
    ~$radiusR
  );
  border-bottom-left-radius: #or(
    ~$borderBottomLeftRadius,
    ~$radiusBL,
    ~$borderBottomRadius,
    ~$radiusB,
    ~$borderLeftRadius,
    ~$radiusL
  );
  border-bottom-right-radius: #or(
    ~$borderBottomRightRadius,
    ~$radiusBR,
    ~$borderBottomRadius,
    ~$radiusB,
    ~$borderRightRadius,
    ~$radiusR
  );

  #if($boxShadow) {
    box-shadow: #or($boxShadow);
  }

  #if($shadow) {
    box-shadow: 0px calc(~$shadow / 8 * ($shadow / 2))
        calc(~$shadow / 8 * ($shadow)) calc(~$shadow / 8 * ($shadow * -0.25))
        rgb(0 0 0 / calc(0.12 + $shadow / 50)),
      0px calc(~$shadow / 6 * ($shadow / 2 + 1))
        calc(~$shadow / 6 * ($shadow * 1.25))
        calc(~$shadow / 6 * ($shadow * -0.25)) rgb(0 0 0 / 0.12),
      0px calc(~$shadow / 4 * ($shadow / 2))
        calc(~$shadow / 4 * ($shadow * 1.25))
        calc(~$shadow / 4 * ($shadow * -0.5))
        rgb(0 0 0 / calc(0.12 - $shadow / 50));
  }

  #if($textDecoration) {
    text-decoration-color: #or($textDecorationColor, currentColor);
    text-decoration-style: #or($textDecorationStyle, solid);
    text-decoration-thickness: #or($textDecorationThickness, from-font);
    text-decoration-skip-ink: #and($avoidSkipInk, none);
    text-decoration-line: $textDecoration;
  }

  width: #or(~$width, ~$w, ~$size);
  min-width: #or(~$minWidth, ~$minW);
  max-width: #or(~$maxWidth, ~$maxW);

  height: #or(~$height, ~$h, ~$size);
  min-height: #or(~$minHeight, ~$minH);
  max-height: #or(~$maxHeight, ~$maxH);

  opacity: $opacity;

  user-select: #and($preventSelection, none);

  font-family: $fontFamily, $theme.fontFamily.base;
  font-size: ~$fontSize;
  font-weight: $fontWeight;
  letter-spacing: $letterSpacing;
  line-height: ~$lineHeight;
  text-align: $textAlign;
  font-style: $fontStyle;
  text-decoration: $textDecoration;
  text-transform: $textTransform;

  overflow: $overflow;
  overflow-x: $overflowX;
  overflow-y: $overflowY;

  display: #or($display, $d);
`

// sm
// 0 1px 2px 0 rgba(0, 0, 0, 0.05);

// base
// 0 1px 3px 0 rgba(0, 0, 0, 0.1)
// 0 1px 2px 0 rgba(0, 0, 0, 0.06);

// 0 n/4*(n-1) n/4*(n) 0
// 0 4/4 4/4+2 0

// md:
// 0 4px 6px -1px rgba(0, 0, 0, 0.1)
// 0 2px 4px -1px rgba(0, 0, 0, 0.06)
