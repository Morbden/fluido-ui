import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { BoxProps_, Box_ } from './styled'

export interface BoxProps extends BoxProps_ {}

export type BoxType = FluiComponent<'div', BoxProps>

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, srOnly, className, debugClass, ...props }, ref) => {
    const classes: string[] = []

    className && classes.push(className)
    srOnly && classes.push(' sr-only')
    debugClass && classes.push('box')

    return (
      <Box_ className={classes.join(' ')} ref={ref} {...props}>
        {children}
      </Box_>
    )
  },
) as BoxType
