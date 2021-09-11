import { STYLE_ID_FIXED, STYLE_ID_THEME } from 'ui-styled/tools/get-sheet'

interface Props {
  css?: string
  cssTheme?: string
}

export const SSRStyle: React.FC<Props> = ({ css, cssTheme }) => {
  return (
    <>
      <style
        id={STYLE_ID_THEME}
        dangerouslySetInnerHTML={{ __html: cssTheme || ' ' }}
      />
      <style
        id={STYLE_ID_FIXED}
        dangerouslySetInnerHTML={{ __html: css || ' ' }}
      />
    </>
  )
}
