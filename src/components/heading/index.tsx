import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { HeadingProps_, Heading_ } from './styled'

export interface HeadingProps extends HeadingProps_ {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export type HeadingType = FluiComponent<'p', HeadingProps>

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, as, ...props }, ref) => {
    return (
      <Heading_ as={as || 'h2'} ref={ref} {...props}>
        {children}
      </Heading_>
    )
  },
) as HeadingType
