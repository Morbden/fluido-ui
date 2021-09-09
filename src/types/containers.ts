import { DefaultTheme as GooberDefaultTheme } from 'goober'
import React from 'react'

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
  theme?: DefaultTheme
}

export type TagType<P = any> = React.ElementType<P>

export interface ComponentProps<T extends TagType> {
  as?: T
}

export type OmitCommonProps<
  T,
  OmitAdditionalProps extends keyof any = never,
> = Omit<T, 'as' | OmitAdditionalProps>

export type RightJoinProps<
  SourceProps extends object = {},
  OverrideProps extends object = {},
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps

export type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = {},
  AsComponent extends TagType = TagType,
> = RightJoinProps<ComponentProps, AdditionalProps> &
  RightJoinProps<AsProps, AdditionalProps> & {
    as?: AsComponent
  }

export type FluiComponent<
  Component extends TagType,
  Props extends object = {},
> = {
  <AsComponent extends TagType>(
    props: MergeWithAs<
      React.ComponentProps<Component>,
      React.ComponentProps<AsComponent>,
      Props,
      AsComponent
    >,
  ): JSX.Element

  displayName?: string
  propTypes?: React.WeakValidationMap<any>
  contextTypes?: React.ValidationMap<any>
  defaultProps?: Partial<any>
  id?: string
}
