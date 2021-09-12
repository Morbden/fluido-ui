import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types/styled'
import { ClusterProps_, Cluster_ } from './styled'

export interface ClusterProps extends ClusterProps_ {}

export type ClusterType = FluiComponent<'div', ClusterProps>

export const Cluster = forwardRef<HTMLDivElement, ClusterProps>(
  ({ children, ...props }, ref) => {
    return (
      <Cluster_ ref={ref} {...props}>
        {children}
      </Cluster_>
    )
  },
) as ClusterType
