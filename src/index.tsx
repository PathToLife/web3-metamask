import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'

const theme = createTheme({
  palette: {
    type: 'dark',
  },
})

const getLibrary = (provider: any, connector: any) => {
  return new Web3(provider)
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
