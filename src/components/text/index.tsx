import { Flui } from 'ui-styled'
import { TextProps_, Text_ } from './styled'

export interface TextProps extends TextProps_ {
  // as?: Exclude<any, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>
}

export const Text = Flui<'p', TextProps>(({ children, as, ...props }, ref) => {
  return (
    <Text_ as={as || 'p'} ref={ref} {...props}>
      {children}
    </Text_>
  )
})
