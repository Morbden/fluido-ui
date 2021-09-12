import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { IconProps_, Icon_ } from './styled'

export interface IconProps extends IconProps_ {}

export type IconType = FluiComponent<'div', IconProps>

export const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({ children, ...props }, ref) => {
    return (
      <Icon_ ref={ref} {...props}>
        {children}
      </Icon_>
    )
  },
) as IconType
