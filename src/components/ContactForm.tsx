import React, { useState } from 'react'
import { IContact } from '../context/AppContext'
import { StyledTextField } from './StyledTextField'
import { toast } from 'react-toastify'
import { makeStyles } from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { PrimaryButton } from './Buttons'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(2),
  },
  narrowMarginTop: {
    marginTop: theme.spacing(1),
  },
}))

interface ContactFormProps {
  contact: IContact
  onChange: (contact: IContact) => void
  onSubmit: () => void
  setErr?: (err: string) => void
  err?: string
}

const ContactForm: React.FC<ContactFormProps> = ({
  contact,
  onChange,
  setErr,
  onSubmit,
  children,
}) => {
  const classes = useStyles()

  const { library: web3 } = useWeb3React<Web3>()

  const [ethAddressError, setEthAddressError] = useState('')
  const [nameInputError, setNameInputError] = useState('')

  const validateEthAddressInput = (text: string) => {
    if (!web3) {
      toast.error('web3 library undefined, please try refresh page')
      return false
    }
    if (text.length < 40 || !web3.utils.isAddress(text)) {
      setEthAddressError('Please enter a valid Ethereum address')
      setErr && setErr('Please enter a valid Ethereum address')
      return false
    }

    setEthAddressError('')
    setErr && setErr('')
    return true
  }

  const handleEthAddressInput = (text: string) => {
    validateEthAddressInput(text) // trigger error render, ignore result
    onChange({
      ...contact,
      ethAddress: text,
    })
  }

  const validateNameInput = (text: string) => {
    if (text.length < 1) {
      setNameInputError('Name is required')
      setErr && setErr('Name is required')
      return false
    }
    setNameInputError('')
    return true
  }

  const handleNameInput = (text: string) => {
    validateNameInput(text)
    onChange({
      ...contact,
      name: text,
    })
  }

  const validateAll = () => {
    return [
      validateNameInput(contact.name),
      validateEthAddressInput(contact.ethAddress),
    ].every((v) => v)
  }

  const handleSubmit = () => {
    if (!validateAll()) return
    onSubmit()
  }

  return (
    <>
      <StyledTextField
        placeholder={'Name'}
        value={contact.name}
        onChange={(e) => handleNameInput(e.target.value)}
        className={classes.textField}
        error={nameInputError !== ''}
        helperText={nameInputError}
        size={'small'}
        required
      />
      <StyledTextField
        placeholder={'Ethereum address'}
        value={contact.ethAddress}
        onChange={(e) => handleEthAddressInput(e.target.value)}
        className={classes.textField}
        error={ethAddressError !== ''}
        helperText={ethAddressError}
        size={'small'}
        multiline
        required
      />
      {children}
      <PrimaryButton
        onClick={handleSubmit}
        disabled={!!nameInputError || !!ethAddressError}
        className={clsx(!!children && classes.narrowMarginTop)}
      >
        Save
      </PrimaryButton>
    </>
  )
}

export default ContactForm
