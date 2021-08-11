import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'

const getLibrary = (provider: any, connector: any) => {
  return new Web3(provider)
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <App />
  </Web3ReactProvider>,
  document.getElementById('root')
)
