interface Props {
  css: string
}

export const SSRStyle: React.FC<Props> = ({ css }) => {
  return <style id='_goober' dangerouslySetInnerHTML={{ __html: css }} />
}
