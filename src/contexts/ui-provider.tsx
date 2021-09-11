import { TinyColor } from '@ctrl/tinycolor'
import equal from 'deep-equal'
import deepmerge from 'deepmerge'
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { BaseDefaultTheme, DefaultTheme, TypedMap } from 'ui-types/styled'
import { THEME, THEME_DICTIONARY } from 'ui-utilities/constants'

interface ProviderProps {
  theme?: BaseDefaultTheme
}

const Context = createContext<DefaultTheme>({} as any)

export const useTheme = () => useContext(Context)

const arrayMergeReplace = (_: any, src: any, __: any) => src

const parseSentence = (val: string): string => {
  if (val in THEME_DICTIONARY) {
    return THEME_DICTIONARY[val]
  } else {
    return val.replace(/[A-Z]/g, '-$&').toLowerCase()
  }
}

const themeParser = (
  theme: TypedMap,
  root: boolean = true,
): [string, string][] => {
  const list: [string, string][] = []
  if (root) list.push(['--fluithm-clr-op', '1'])

  for (const k in theme) {
    const sentence = parseSentence(k)
    const base = root ? `--fluithm-${sentence}` : '-' + sentence
    const val = theme[k]
    if (typeof val === 'object' && !Array.isArray(val)) {
      list.push(
        ...themeParser(val, false).map<[string, string]>(([k, v]) => [
          base + k,
          v,
        ]),
      )
    } else if (typeof val === 'number') {
      list.push([base, `${val * 0.25}rem`])
    } else if (Array.isArray(val)) {
      const aVal: string[] = val
      list.push([base, aVal.map((s) => '"' + s + '"').join(',')])
    } else if (val) {
      const sVal: string = val.toString()

      // Tentar como cor
      const color = new TinyColor(sVal)
      if (/^(rgb|#|hs)/.test(sVal) && color.isValid) {
        const { r, g, b } = color.toRgb()
        list.push([base, `rgb(${r} ${g} ${b} / var(--fluithm-clr-op,1))`])
      } else {
        list.push([base, sVal])
      }
    }
  }

  return list
}

export const FluiProvider: React.FC<ProviderProps> = ({ children, theme }) => {
  const [contentTheme, setContentTheme] = useState('')
  const themeRef = useRef<BaseDefaultTheme>()
  const diff = !equal(themeRef.current, theme)

  const validTheme = useMemo(
    () =>
      theme
        ? deepmerge(THEME, theme, { arrayMerge: arrayMergeReplace })
        : THEME,
    [diff],
  )

  useEffect(() => {
    const parsed = themeParser(validTheme)
    setContentTheme(
      ':root{' + parsed.map<string>(([k, p]) => `${k}:${p};`).join('') + '}\n',
    )
  }, [validTheme])

  useLayoutEffect(() => {
    if (!contentTheme) return

    const styleTheme: HTMLStyleElement =
      document.head.querySelector('#_fluithm') ||
      document.head.appendChild(
        Object.assign(document.createElement('style'), {
          id: '_fluithm',
          innerHTML: ' ',
        }),
      )

    const sheet = styleTheme.firstChild as Text
    sheet.data = contentTheme
  }, [contentTheme])

  themeRef.current = theme
  return <Context.Provider value={validTheme}>{children}</Context.Provider>
}
