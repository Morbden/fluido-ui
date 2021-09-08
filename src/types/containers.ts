import { DefaultTheme as GooberDefaultTheme } from 'goober'

export interface TypedMap<T = any> {
  [key: string]: T
}

export type Length = number | string | TypedMap<number | string>

export type Increment = number | string | TypedMap<number | string>

export type Breakpoint =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'

export interface Breakpoints {
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
  '3xl'?: string
  '4xl'?: string
}

export interface DefaultTheme extends GooberDefaultTheme {
  colors?: []
  breakpoints?: Breakpoints
  typography?: []
}

export interface StyledProps {
  as?: string | goober.StyledVNode<any>
  theme?: DefaultTheme
}
