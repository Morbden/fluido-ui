import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { TextProps_, Text_ } from './styled'

export interface TextProps extends TextProps_ {}

export type TextType = FluiComponent<'p', TextProps>

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ children, as, ...props }, ref) => {
    return (
      <Text_ as={as || 'p'} ref={ref} {...props}>
        {children}
      </Text_>
    )
  },
) as TextType
