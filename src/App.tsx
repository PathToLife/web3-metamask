import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { themes } from './styles/theme'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { AppContext } from './context/AppContext'
import ErrorNotifications from './components/ErrorNotifications'
import AppRouter from './pages/Router'

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
  const [theme, setTheme] = useState(themes.light)

  const changeTheme = (type: string) => {
    switch (type) {
      case 'dark':
        setTheme(themes.dark)
        break
      case 'light':
      default:
        setTheme(themes.light)
    }
  }

  return (
    <AppContext.Provider
      value={{
        theme: theme,
        setTheme: (type) => changeTheme(type),
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
