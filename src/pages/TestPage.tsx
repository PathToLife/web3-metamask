import React, { useMemo, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Button, makeStyles, Typography } from '@material-ui/core'
import Web3 from 'web3'
import PageContainer from '../components/layout/PageContainer'
import { useWeb3Loader } from '../web3/injector-connector'
import LoadingPanel from '../components/LoadingPanel'
import { PrimaryButton, SecondaryButton } from '../components/Buttons'
import { StyledTextField } from '../components/TextInput'
import { useMetaMaskEncryption } from '../web3/encryptionDecryption'

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(4),
  },
}))

const TestPage: React.FC = () => {
  const classes = useStyles()
  const { account, library } = useWeb3React<Web3>()

  const [text, setText] = useState('')

  const accountAddress = useMemo(() => {
    if (!account) return 'Metamask connection required'

    return account
  }, [account])

  const { isLoading } = useWeb3Loader(true)
  const {
    encrypt,
    decrypt,
    encryptionPublicKey,
    requestMetaMaskPublicKey,
  } = useMetaMaskEncryption()

  const handleSend = () => {
    if (!library) return
  }

  const handleEncrypt = () => {
    if (!encryptionPublicKey) return
    setText(encrypt(text))
  }

  const handleDecrypt = () => {
    decrypt(text).then((result: string) => setText(result))
  }

  return (
    <PageContainer>
      <Typography variant={'h2'}>Test Page</Typography>
      <LoadingPanel isLoading={isLoading}>
        <Typography variant={'caption'}>{accountAddress}</Typography>
        <Button onClick={handleSend}>Send</Button>
        <StyledTextField
          onChange={(e) => setText(e.target.value)}
          value={text}
          multiline
          minRows={3}
        />
        <PrimaryButton onClick={handleEncrypt} disabled={!encryptionPublicKey}>
          Encrypt
        </PrimaryButton>
        <SecondaryButton onClick={handleDecrypt}>Decrypt</SecondaryButton>
        <SecondaryButton onClick={requestMetaMaskPublicKey}>
          Request Key
        </SecondaryButton>
        <Button
          className={classes.button}
          color={'primary'}
          fullWidth
          variant={'contained'}
        >
          Normal Button
        </Button>
      </LoadingPanel>
    </PageContainer>
  )
}

export default TestPage
