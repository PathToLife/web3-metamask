import React, { useContext, useState } from 'react'
import PageContainer from '../../components/layout/PageContainer'
import { PageHeader } from '../../components/layout/PageHeader'
import { useHistory } from 'react-router-dom'
import { StyledTextField } from '../../components/TextInput'
import { makeStyles } from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { toast } from 'react-toastify'
import { PrimaryButton } from '../../components/Buttons'
import { useWeb3Loader } from '../../web3/injector-connector'
import { routePaths } from '../Router'
import { AppContext } from '../../context/AppContext'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
}))

const ContactAddPage: React.FC = () => {
  const history = useHistory()
  const classes = useStyles()
  const { library: web3 } = useWeb3React<Web3>()
  const { contactsModule } = useContext(AppContext)

  const [name, setName] = useState('')
  const [ethAddress, setEthAddress] = useState('')
  const [ethAddressError, setEthAddressError] = useState('')

  useWeb3Loader(false, routePaths.contacts.list)

  const handleBack = () => {
    history.goBack()
  }

  const validateAll = async () => {
    return validateEthAddressInput(ethAddress) && validateNameInput(name)
  }

  const validateEthAddressInput = (text: string) => {
    if (!web3) {
      toast.error('web3 library undefined, please try refresh page')
      return false
    }
    if (!web3.utils.isAddress(text)) {
      setEthAddressError('Please enter a valid Ethereum address')
      return false
    } else {
      setEthAddressError('')
    }
    return true
  }
  const handleEthAddressInput = (text: string) => {
    validateEthAddressInput(text) // trigger error render, ignore result
    setEthAddress(text)
  }

  const validateNameInput = (text: string) => {
    return true
  }
  const handleNameInput = (text: string) => {
    validateNameInput(text)
    setName(text)
  }

  const handleSubmit = () => {
    if (!validateAll()) return
    contactsModule.addContact({
      name,
      ethAddress,
    })
    history.push(routePaths.contacts.list)
  }

  return (
    <PageContainer>
      <PageHeader onBack={handleBack} title={'New Contact'} />
      <div className={classes.container}>
        <StyledTextField
          placeholder={'Name'}
          value={name}
          onChange={(e) => handleNameInput(e.target.value)}
          className={classes.textField}
          size={'small'}
        />
        <StyledTextField
          placeholder={'Ethereum address'}
          value={ethAddress}
          onChange={(e) => handleEthAddressInput(e.target.value)}
          className={classes.textField}
          error={ethAddressError !== ''}
          helperText={ethAddressError}
          size={'small'}
          multiline
        />
      </div>
      <PrimaryButton onClick={handleSubmit} disabled={!!ethAddressError}>
        Save
      </PrimaryButton>
    </PageContainer>
  )
}
export default ContactAddPage
