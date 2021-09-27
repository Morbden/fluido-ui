import equal from 'deep-is'
import React, { createContext, useContext, useRef } from 'react'
import { deepmerge } from 'utilities/deepmerge'
import { BaseDefaultTheme, DefaultTheme, TypedMap } from '..'
import { parseThemeSentence, THEME, tryParseColorHSL } from '../utilities'
import { getSheetTheme } from './tools/get-sheet'

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
      // Tentar como cor
      const sVal = tryParseColorHSL(val.toString())
      list.push([base, sVal])
    }
  }

  return list
}

export const FluiProvider: React.FC<ProviderProps> = ({ children, theme }) => {
  const themeRef = useRef<BaseDefaultTheme | undefined>(theme)
  const vTheme = useRef<DefaultTheme>()

  const diff = !equal(themeRef.current || {}, theme || {})

  if (diff || !vTheme.current) {
    themeRef.current = theme
    vTheme.current = theme
      ? deepmerge(THEME, theme, { arrayMerge: arrayMergeReplace })
      : THEME

    const parsed = themeParser(vTheme.current)
    const data =
      ':root{' + parsed.map<string>(([k, p]) => `${k}:${p};`).join('') + '}\n'
    const sheet = getSheetTheme()
    sheet.data = data
  }

  return <Context.Provider value={vTheme.current}>{children}</Context.Provider>
}
