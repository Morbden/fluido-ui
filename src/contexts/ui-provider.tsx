import { TinyColor } from '@ctrl/tinycolor'
import equal from 'deep-equal'
import deepmerge from 'deepmerge'
import { createContext, useContext, useMemo, useRef } from 'react'
import { getSheetTheme } from 'ui-styled/tools/get-sheet'
import { BaseDefaultTheme, DefaultTheme, TypedMap } from 'ui-types'
import { parseThemeSentence, THEME } from 'ui-utilities'

interface ProviderProps {
  theme?: BaseDefaultTheme
}

const Context = createContext<DefaultTheme>({} as any)

export const useTheme = () => useContext(Context)

const arrayMergeReplace = (_: any, src: any, __: any) => src

const themeParser = (
  theme: TypedMap,
  root: boolean = true,
): [string, string][] => {
  const list: [string, string][] = []
  if (root) list.push(['--flui-theme-colors-opacity', '1'])

  for (const k in theme) {
    const sentence = parseThemeSentence(k)
    const base = root ? `--flui-theme-${sentence}` : '-' + sentence
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
      if (/^#/.test(sVal) && color.isValid) {
        const { h, s, l } = color.toHsl()
        list.push([
          base,
          `hsl(${h} ${s} ${l} / var(--flui-theme-colors-opacity,1))`,
        ])
      } else {
        list.push([base, sVal])
      }
    }
  }

  return list
}

export const FluiProvider: React.FC<ProviderProps> = ({ children, theme }) => {
  const themeRef = useRef<BaseDefaultTheme>()
  const diff = !equal(themeRef.current || {}, theme)

  const validTheme = useMemo(() => {
    themeRef.current = theme

    return theme
      ? deepmerge(THEME, theme, { arrayMerge: arrayMergeReplace })
      : THEME
  }, [diff])

  if (diff) {
    const parsed = themeParser(validTheme)
    const data =
      ':root{' + parsed.map<string>(([k, p]) => `${k}:${p};`).join('') + '}\n'
    const sheet = getSheetTheme()
    sheet.data = data
  }

  return <Context.Provider value={validTheme}>{children}</Context.Provider>
}
