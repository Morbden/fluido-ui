import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types/styled'
import { ImposterProps_, Imposter_ } from './styled'

export interface ImposterProps extends ImposterProps_ {}

export type ImposterType = FluiComponent<'div', ImposterProps>

export const Imposter = forwardRef<HTMLDivElement, ImposterProps>(
  ({ children, ...props }, ref) => {
    return (
      <Imposter_ ref={ref} {...props}>
        {children}
      </Imposter_>
    )
  },
) as ImposterType
