import React, { useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Button, Container, makeStyles, Typography } from '@material-ui/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { toast } from 'react-toastify'
import Web3 from 'web3'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

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

const injector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 42],
})

export const AppPage: React.FC = () => {
  const classes = useStyles()

  const { activate, error, account, library } = useWeb3React<Web3>()

  useEffect(() => {
    activate(injector)
  }, [activate])

  useEffect(() => {
    if (!error) return
    toast.error(error.message)
  }, [error])

  const accountAddress = useMemo(() => {
    if (!account) return 'Metamask connection required'

    return account
  }, [account])

  const handleSend = () => {
    if (!account) return
    library?.givenProvider
      .request({
        method: 'eth_getEncryptionPublicKey',
        params: [account],
      })
      .then((res: string) => {
        console.log(res)
      })
  }

  return (
    <Container maxWidth={'sm'} className={classes.container}>
      <Typography variant={'h2'}>AppPage</Typography>
      <Typography variant={'body1'}>{accountAddress}</Typography>
      <Button onClick={handleSend}>Send</Button>
    </Container>
  )
}
