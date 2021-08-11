/* Chain IDs
Mainnet : Ethereum main network
chain_id: 1
Ropsten : Ethereum test network (PoW)
chain_id: 3
Rinkeby : Ethereum test network (PoA)
chain_id: 4
Kovan : Ethereum test network (PoA)
chain_id: 42
*/

import { InjectedConnector } from '@web3-react/injected-connector'

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 42],
})
