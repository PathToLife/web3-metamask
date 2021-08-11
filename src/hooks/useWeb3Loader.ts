import { routePaths } from '../pages/Router'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { injectedConnector } from '../web3/injector-connector'

/**
 * React Hook, autoLoad web3
 */
export const useWeb3Loader = (
  autoConnect: boolean = false,
  to = routePaths.welcome
) => {
  const { active, activate } = useWeb3React()
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    if (!active) {
      if (autoConnect) {
        activate(injectedConnector).then(() => {
          setIsLoading(false)
        })
      } else {
        history.push(to)
      }
    } else {
      setIsLoading(false)
    }
  }, [active, to, autoConnect, activate, history])

  return {
    isLoading,
  }
}
