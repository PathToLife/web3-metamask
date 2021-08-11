import React, { useReducer } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { themes } from './styles/theme'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { useContacts } from './hooks/useContacts'
import ErrorNotifications from './components/ErrorNotifications'
import AppRouter from './pages/Router'
import AppContext from './context/AppContext'

const AppContextThemeProvider: React.FC = ({ children }) => {
  return (
    <AppContext.Consumer>
      {({ theme }) => {
        return <ThemeProvider theme={theme}>{children}</ThemeProvider>
      }}
    </AppContext.Consumer>
  )
}

const App: React.FC = () => {
  const [theme, setTheme] = useReducer((_: any, type: string) => {
    switch (type) {
      case 'dark':
        return themes.dark
      case 'light':
      default:
        return themes.light
    }
  }, themes.light)

  const contacts = useContacts()

  return (
    <AppContext.Provider
      value={{
        theme: theme,
        setTheme: (type) => setTheme(type),
        contactsModule: contacts,
      }}
    >
      <AppContextThemeProvider>
        <CssBaseline />
        <ErrorNotifications />
        <ToastContainer />
        <AppRouter />
      </AppContextThemeProvider>
    </AppContext.Provider>
  )
}

export default App
