import { CenterProps_, Center_ } from './styled'

export interface CenterProps extends CenterProps_ {}

export const Center: React.FC<CenterProps> = ({ children, ...props }) => {
  return <Center_ {...props}>{children}</Center_>
}
