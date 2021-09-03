interface StyleProps {
  /** @default 'sans-serif' */
  fontFamily?: string
  /** @default '0px' */
  letterSpacing?: string
  /** @default '1rem' */
  fontSize?: string
  /** @default '400' */
  fontWeight?: string
  /** @default 'auto' */
  lineHeight?: string
}

function isWebBrowser() {
  try {
    return !!window
  } catch (_) {
    return false
  }
}

const ELEMENT_ID = 'FLUIDO_TEXT_CALC_SIZE'

function getNode() {
  const n = document.getElementById(ELEMENT_ID)
  if (n) return n

  const node = document.createElement('div')
  node.style.position = 'absolute'
  node.style.zIndex = '-1'
  node.style.opacity = '0'
  node.style.color = 'transparent'
  node.style.backgroundColor = 'transparent'
  node.style.height = 'auto'
  node.style.width = 'auto'
  node.style.whiteSpace = 'nowrap'
  node.id = ELEMENT_ID

  document.body.prepend(node)
}

export default function calcTextSize(text: string, style?: StyleProps) {
  if (!isWebBrowser()) return

  const node = getNode()
  node.innerHTML = text

  node.style.fontFamily = style?.fontFamily || 'sans-serif'
  node.style.letterSpacing = style?.letterSpacing || '0px'
  node.style.fontSize = style?.fontSize || '1rem'
  node.style.fontWeight = style?.fontWeight || '400'
  node.style.lineHeight = style?.lineHeight || 'auto'

  const res = [node.clientWidth, node.clientHeight]

  node.innerHTML = ''

  return res
}

if (isWebBrowser()) {
  Object.defineProperty(window, 'calcTextSize', {
    value: calcTextSize,
    configurable: false,
    writable: false,
    enumerable: false,
  })
}
