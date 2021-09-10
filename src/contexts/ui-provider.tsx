import { createContext, useContext, useMemo } from 'react'
import { DefaultTheme } from 'ui-types/styled'
import { THEME } from 'ui-utilities/constants'

const Context = createContext<DefaultTheme>({} as any)

export const useTheme = () => useContext(Context)

interface ProviderProps {
  theme?: DefaultTheme
}

export const FluiProvider: React.FC<ProviderProps> = ({ children, theme }) => {
  const validTheme = useMemo(
    () => (theme ? { ...THEME, ...theme } : THEME),
    [theme],
  )

  return <Context.Provider value={validTheme}>{children}</Context.Provider>
}
