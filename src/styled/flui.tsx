import React, { forwardRef } from 'react'
import { FluiComponent, TagType, TypedMap } from 'ui-types'

export const Flui = <T extends TagType<any> = 'div', P extends TypedMap = {}>(
  component: (props: React.PropsWithChildren<P>, ref: any) => React.ReactNode,
) => {
  return forwardRef(component as any) as unknown as FluiComponent<T, P>
}
