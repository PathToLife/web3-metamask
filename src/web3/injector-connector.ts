import { InjectedConnector } from '@web3-react/injected-connector'
import { routePaths } from '../pages/Router'
import { useHistory } from 'react-router'
import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

/**
 * Chain IDs
 Mainnet : Ethereum main network
 chain_id: 1
 Ropsten : Ethereum test network (PoW)
 chain_id: 3
 Rinkeby : Ethereum test network (PoA)
 chain_id: 4
 Kovan : Ethereum test network (PoA)
 chain_id: 42
 */
export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 42],
})

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
