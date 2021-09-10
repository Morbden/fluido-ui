import { createContext, useContext, useMemo } from 'react'
import { BaseDefaultTheme, DefaultTheme } from 'ui-types/styled'
import { THEME } from 'ui-utilities/constants'
import deepmerge from 'deepmerge'

const Context = createContext<DefaultTheme>({} as any)

export const useTheme = () => useContext(Context)

interface ProviderProps {
  theme?: BaseDefaultTheme
}

export const FluiProvider: React.FC<ProviderProps> = ({ children, theme }) => {
  const validTheme = useMemo(
    () => (theme ? deepmerge(THEME, theme) : THEME),
    [theme],
  )

  return <Context.Provider value={validTheme}>{children}</Context.Provider>
}
