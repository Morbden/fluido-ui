import { setup } from 'goober'
import { prefix } from 'goober/prefixer'
import { createElement } from 'react'

export const uiSetup = () => {
  setup(createElement, prefix)
}
