import { setup } from 'goober'
import { prefix } from 'goober/prefixer'
import { shouldForwardProp } from 'goober/should-forward-prop'
import { createElement } from 'react'

export const uiSetup = () => {
  setup(
    createElement,
    prefix,
    undefined,
    shouldForwardProp((prop) => !prop.startsWith('data-')),
  )
}
