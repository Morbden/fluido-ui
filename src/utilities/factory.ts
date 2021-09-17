import React, { forwardRef } from 'react'
import { FluiComponent, TagType, TypedMap } from 'ui-types'

export const FluiFactory = <
  T extends TagType<any> = 'div',
  P extends TypedMap = {},
>(
  component: (props: P, ref: any) => React.ReactNode,
) => {
  return forwardRef(component as any) as FluiComponent<T, P>
}
