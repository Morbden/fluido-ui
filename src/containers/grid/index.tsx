import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { useTheme } from 'ui-contexts'
import { GridProps_, Grid_ } from './styled'

export interface GridProps extends GridProps_ {}

export type GridType = FluiComponent<'div', GridProps>

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, gap, min, ...props }, ref) => {
    const theme = useTheme()
    return (
      <Grid_ ref={ref} gap={gap || theme.spaces.md} min={min} {...props}>
        {children}
      </Grid_>
    )
  },
) as GridType
