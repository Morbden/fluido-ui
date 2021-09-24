import { FluiComponent, TypedMap } from 'ui-types'
import { Flui } from 'ui-styled'
import { BoxProps_, Box_ } from './styled'

export interface BoxProps extends BoxProps_ {}

export type BoxType = FluiComponent<'div', BoxProps>

const watchedProps = [
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'mil',
  'mis',
  'mie',
  'mbl',
  'mbs',
  'mbe',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginInline',
  'marginInlineStart',
  'marginInlineEnd',
  'marginBlock',
  'marginBlockStart',
  'marginBlockEnd',
  'marginInline',
  'marginInlineStart',
  'marginInlineEnd',
]

export const Box = Flui<'div', BoxProps>(
  ({ children, srOnly, className, debugClass, ...props }, ref) => {
    const classes: string[] = []
    const wProps: TypedMap = props

    className && classes.push(className)
    srOnly && classes.push(' sr-only')
    debugClass && classes.push('box')

    for (const k in wProps) {
      if (watchedProps.includes(k)) {
        switch (wProps[k]) {
          case 'full':
            wProps[k] = '100%'
            break
          case 'half':
            wProps[k] = '50%'
            break
          case 'third':
            wProps[k] = '33.3333%'
            break
          case 'quarter':
            wProps[k] = '25%'
            break
        }
      }
    }

    return (
      <Box_ className={classes.join(' ')} ref={ref} {...wProps}>
        {children}
      </Box_>
    )
  },
)
