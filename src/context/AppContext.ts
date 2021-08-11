import { createContext } from 'react'
import { themes } from '../styles/theme'

export const AppContext = createContext({
  theme: themes.light,
  setTheme: (type: string) => {},
})
