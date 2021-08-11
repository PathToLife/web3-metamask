import React, { useEffect } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { useHistory } from 'react-router'
import { useWeb3React } from '@web3-react/core'
import { injectedConnector } from '../web3/injector-connector'
import Web3 from 'web3'
import { MainButton } from '../components/Buttons'
import PageContainer from '../components/layout/PageContainer'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
  },
  text: {
    marginTop: theme.spacing(2),
  },
  logo: {
    width: '50%',
  },
}))

const WelcomePage: React.FC = () => {
  const classes = useStyles()

  const history = useHistory()
  const { activate, active } = useWeb3React<Web3>()

  useEffect(() => {
    if (active) {
      history.push('/list')
    }
  }, [history, active])

  const handleStart = () => {
    activate(injectedConnector).then()
  }

  return (
    <PageContainer className={classes.container}>
      <img
        src={'/images/metamask-fox.svg'}
        alt={'logo'}
        className={classes.logo}
      />
      <Typography align="center" variant={'h5'}>
        Crypto address book
      </Typography>
      <Typography align="center" variant={'body1'} className={classes.text}>
        The easiest and quickest way to manage and pay your contacts. Connect
        your wallet to begin.
      </Typography>
      <MainButton onClick={handleStart}>Connect Wallet</MainButton>
    </PageContainer>
  )
}

export default WelcomePage
