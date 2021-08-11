import React, { useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Button, Typography } from '@material-ui/core'
import { toast } from 'react-toastify'
import Web3 from 'web3'
import { Route, Switch, useHistory } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer'
import ContactAddPage from './Contacts/ContactAddPage'

const TestPage: React.FC = () => {
  const history = useHistory()
  const { error, account, library } = useWeb3React<Web3>()

  const accountAddress = useMemo(() => {
    if (!account) return 'Metamask connection required'

    return account
  }, [account])

  useEffect(() => {
    if (!error) return
    toast.error(error.message)
  }, [error])

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
    <PageContainer>
      <Typography variant={'h2'}>AppPage</Typography>
      <Typography variant={'body1'}>{accountAddress}</Typography>
      <Button onClick={handleSend}>Send</Button>
      <Switch>
        <Route exact path={'/'} />
        <Route path={'/add'} component={ContactAddPage} />
      </Switch>
    </PageContainer>
  )
}

export default TestPage
