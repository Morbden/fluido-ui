import { Flui } from 'ui-styled'
import { ClusterProps_, Cluster_ } from './styled'

export interface ClusterProps extends ClusterProps_ {}

export const Cluster = Flui<'div', ClusterProps>(({ children, ...props }) => {
  return <Cluster_ {...props}>{children}</Cluster_>
})
