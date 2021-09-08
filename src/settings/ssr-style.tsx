import { extractCss } from 'goober'
import { minify } from 'csso'

const DEV_MODE = process.env.NODE_ENV !== 'production'
const css = extractCss()
export const SSRStyle: React.FC = ({}) => {
  return <style id='_goober'>{DEV_MODE ? css : minify(css).css}</style>
}
