import { forwardRef } from 'react'
import { useTheme } from 'ui-contexts'
import { FluiComponent } from 'ui-types'
import { CoverProps_, Cover_ } from './styled'

export interface CoverProps extends CoverProps_ {}

export type CoverType = FluiComponent<'div', CoverProps>

export const Cover = forwardRef<HTMLDivElement, CoverProps>(
  ({ children, gap, minHeight, ...props }, ref) => {
    const theme = useTheme()
    return (
      <Cover_
        ref={ref}
        gap={gap || theme.spaces.md}
        minHeight={minHeight || '100vh'}
        {...props}>
        {children}
      </Cover_>
    )
  },
) as CoverType
