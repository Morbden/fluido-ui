import { Flui } from 'ui-styled'
import { ClusterProps_, Cluster_ } from './styled'

export interface ClusterProps extends ClusterProps_ {}

export const Cluster = Flui<'div', ClusterProps>(
  ({ children, ...props }, ref) => {
    return (
      <Cluster_ ref={ref} {...props}>
        {children}
      </Cluster_>
    )
  },
)
