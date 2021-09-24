import React, { forwardRef } from 'react'
import { FluiComponent, TagType, TypedMap } from 'ui-types'

export const Flui = <T extends TagType<any> = 'div', P extends TypedMap = {}>(
  component: (props: React.PropsWithChildren<P>, ref: any) => React.ReactNode,
) => {
  return forwardRef((props, ref) => {
    const Component = component as any
    return <Component {...props} ref={ref} />
  }) as unknown as FluiComponent<T, P>
}
