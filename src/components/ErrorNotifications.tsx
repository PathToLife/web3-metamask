import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { NoEthereumProviderError } from '@web3-react/injected-connector'
import Web3 from 'web3'
import { toast } from 'react-toastify'

const ErrorNotifications = () => {
  const { error } = useWeb3React<Web3>()

  useEffect(() => {
    if (!error) return

    if (error instanceof NoEthereumProviderError) {
      toast.error(
        'Failed to establish wallet connection! Please use a browser with metamask, https://metamask.io',
        {
          toastId: `window.ethereum=undefined`,
          autoClose: false,
        }
      )
    } else {
      toast.error(error.message)
    }
  }, [error])

  return null
}

export default ErrorNotifications
