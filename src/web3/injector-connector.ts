import { InjectedConnector } from '@web3-react/injected-connector'

/**
 * Chain IDs
 Mainnet : Ethereum main network
 chain_id: 1
 Ropsten : Ethereum test network (PoW)
 chain_id: 3
 Rinkeby : Ethereum test network (PoA)
 chain_id: 4
 Goerli:
 chain_id: 5
 Kovan : Ethereum test network (PoA)
 chain_id: 42
 */
export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
})
