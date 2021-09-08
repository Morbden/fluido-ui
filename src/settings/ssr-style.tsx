import { minify } from 'csso'
import { extractCss as extractCssGoober } from 'goober'

const DEV_MODE = process.env.NODE_ENV !== 'production'

export const extractCss = () => {
  const css = extractCssGoober()
  return DEV_MODE ? css : minify(css).css
}

interface Props {
  css: string
}

export const SSRStyle: React.FC<Props> = ({ css }) => {
  return <style id='_goober' dangerouslySetInnerHTML={{ __html: css }} />
}
