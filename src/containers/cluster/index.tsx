import { forwardRef } from 'react'
import { FluiComponent } from 'ui-types'
import { ClusterProps_, Cluster_ } from './styled'

export interface ClusterProps extends ClusterProps_ {}

export type ClusterType = FluiComponent<'div', ClusterProps>

export const Cluster = forwardRef<HTMLDivElement, ClusterProps>(
  ({ children, debugClass, className, ...props }, ref) => {
    const classes: string[] = []
    className && classes.push(className)
    debugClass && classes.push('cluster')
    return (
      <Cluster_ ref={ref} className={classes.join(' ')} {...props}>
        {children}
      </Cluster_>
    )
  },
) as ClusterType
