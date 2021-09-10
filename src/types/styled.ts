import React from 'react'

export interface TypedMap<T = any> {
  [key: string]: T
}

export interface TypedFunction<A = any, R = any> {
  (arg: A): R
}

export interface TypedReturnFunction<R = any> {
  (): R
}

export type Length =
  | number
  | string
  | TypedReturnFunction<number | string>
  | {
      media?: TypedMap<number | string>
      container?: TypedMap<number | string>
    }

export type Optional<T> = {
  [P in keyof T]?: T[P]
}

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

export interface Breakpoints {
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  '4xl': string
}

export interface DefaultTheme {
  breakpoints: Breakpoints
  colors: []
  typography: []
}

export type BaseDefaultTheme = Optional<DefaultTheme>

export interface StyledProps {
  theme?: DefaultTheme
}

export type TagType<P = any> = React.ElementType<P>

export type OmitCommonProps<
  T,
  OmitAdditionalProps extends keyof any = never,
> = Omit<T, 'as' | OmitAdditionalProps>

export interface ComponentProps<T extends TagType> {
  as?: T
}

export interface StyledCompileCss {
  <T extends TagType>(tag: T): <P extends object = {}>(
    templates: TemplateStringsArray,
    ...args: (TypedFunction<P> | string)[]
  ) => FluiComponent<T, P>
}

export interface StyledFactory {
  <T extends TagType>(tag: T): <P extends object = {}>(
    templates: TemplateStringsArray,
    ...args: (TypedFunction<P> | string)[]
  ) => FluiComponent<T, P>
}

export type RightJoinProps<
  SP extends object = {},
  OP extends object = {},
> = OmitCommonProps<SP, keyof OP> & OP

export type MergeWithAs<
  CP extends object,
  AsP extends object,
  AP extends object = {},
  AsC extends TagType = TagType,
> = RightJoinProps<CP, AP> &
  RightJoinProps<AsP, AP> & {
    as?: AsC
  }

export type FluiComponent<C extends TagType, P extends object = {}> = {
  <AsC extends TagType>(
    props: MergeWithAs<
      React.ComponentProps<C>,
      React.ComponentProps<AsC>,
      P,
      AsC
    >,
    ...args: any[]
  ): JSX.Element | React.ReactElement | null

  displayName?: string
  propTypes?: React.WeakValidationMap<any>
  contextTypes?: React.ValidationMap<any>
  defaultProps?: Partial<any>
  id?: string
}
