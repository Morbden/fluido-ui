import React from 'react'
import {
  Optional,
  TypedFunction,
  TypedMap,
  TypedReturnFunction,
} from './generics'

export type Length =
  | number
  | string
  | TypedReturnFunction<number | string>
  | {
      media?: TypedMap<number | string | TypedReturnFunction<number | string>>
      container?: TypedMap<
        number | string | TypedReturnFunction<number | string>
      >
    }

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

export interface Breakpoints {
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
}

export interface Sizes {}

export interface Spaces {
  xs: Length
  sm: Length
  md: Length
  lg: Length
  xl: Length
  '2xl': Length
}

export interface ColorWeight {
  50?: string
  100?: string
  200?: string
  300?: string
  400?: string
  500?: string
  600?: string
  700?: string
  800?: string
  900?: string
}

export interface Colors {
  blue: ColorWeight
  [key: string]: ColorWeight
}

export interface FontSizes {
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
  '3xl'?: string
  '4xl'?: string
  '5xl'?: string
  '6xl'?: string
  '7xl'?: string
  '8xl'?: string
  '9xl'?: string
}

export interface Font {
  fontFamily?: string[]
  fontSize?: FontSizes
  fontWeight?: string
  letterSpace?: string
  lineHeight?: string
}

export interface DefaultTheme {
  [key: string]: any
}

export type BaseDefaultTheme = Optional<DefaultTheme>

export interface PatternFunction {
  (...args: string[]): string
}

export interface StyledProps extends React.HTMLAttributes<Element> {
  theme?: DefaultTheme
  functions?: TypedMap<PatternFunction>
  debugClass?: boolean
  as?: TagType
}

export type TagType<P = any> = React.ElementType<P>

export type OmitCommonProps<
  T,
  OmitAdditionalProps extends keyof any = never,
> = Omit<T, 'as' | OmitAdditionalProps>

export interface StyledCompileCss {
  <T extends TagType>(tag: T): <P extends object = {}>(
    templates: TemplateStringsArray,
    ...args: (TypedFunction<P> | string)[]
  ) => FluiComponent<T, P>
}

export interface StyledComponentProps {
  functions?: TypedMap<PatternFunction>
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
      React.PropsWithChildren<P> & React.HTMLAttributes<Element>,
      AsC
    >,
    ...args: any[]
  ): JSX.Element | React.ReactElement | null

  displayName?: string
  propTypes?: React.WeakValidationMap<any>
  contextTypes?: React.ValidationMap<any>
  defaultProps?: Partial<any>
  id?: string
} & { [key: string]: React.FC | React.Component }
