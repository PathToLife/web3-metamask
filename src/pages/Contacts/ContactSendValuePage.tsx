import React, { useMemo, useState } from 'react'
import PageContainer from '../../components/layout/PageContainer'
import { PageHeader } from '../../components/layout/PageHeader'
import { useHistory } from 'react-router'
import { routePaths } from '../Router'
import { PrimaryButton, TextButton } from '../../components/Buttons'
import { useRouterContactLoader } from '../../hooks/useContacts'
import { InputAdornment, makeStyles, Typography } from '@material-ui/core'
import { useWeb3Loader } from '../../hooks/useWeb3Loader'
import StyledAvatar from '../../components/StyledAvatar'
import { useInitials } from '../../hooks/useInitials'
import { useWeb3React } from '@web3-react/core'
import { StyledTextField } from '../../components/StyledTextField'
import Web3 from 'web3'
import { useWeb3SendEth } from '../../hooks/useWeb3SendEth'

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginTop: theme.spacing(4),
    width: 100,
    height: 100,
    fontSize: '2.5em',
  },
  ethAddress: {
    marginTop: theme.spacing(2),
    fontWeight: 550,
    width: 160,
    textAlign: 'center',
    wordWrap: 'break-word',
  },
  textInput: {
    marginTop: theme.spacing(2),
  },
  transactionFee: {
    marginTop: theme.spacing(2),
  },
}))

const ContactSendValuePage: React.FC = () => {
  useWeb3Loader(false, routePaths.contacts.list)

  const classes = useStyles()
  const history = useHistory()

  const { contact, index } = useRouterContactLoader()
  const { account } = useWeb3React<Web3>()
  const [sendAmount, setSendAmount] = useState('0')

  const { transactionFeeEstimate, send } = useWeb3SendEth(
    account,
    contact?.ethAddress,
    Number(sendAmount)
  )

  const usdValue = useMemo(() => {
    return parseFloat((transactionFeeEstimate * 3100).toFixed(2))
  }, [transactionFeeEstimate])

  const handleBack = () => {
    history.push(routePaths.contacts.list)
  }

  const handleEdit = () => {
    if (index === undefined) return
    history.push(routePaths.contacts.edit + '/' + index)
  }

  const initials = useInitials(contact?.name || '')

  const handleSend = () => {
    console.log('hi')

    send()
  }

  const handleEthSendValueChange = (text: string) => {
    setSendAmount(text)
  }

  return (
    <PageContainer>
      <PageHeader
        onBack={handleBack}
        title={`Send to ${contact && contact.name}`}
        rightSide={
          <TextButton color={'secondary'} onClick={handleEdit}>
            Edit
          </TextButton>
        }
      />
      <StyledAvatar className={classes.avatar}>{initials}</StyledAvatar>
      <Typography
        color={'secondary'}
        variant={'caption'}
        className={classes.ethAddress}
      >
        {contact?.ethAddress.toLowerCase()}
      </Typography>
      <StyledTextField
        type={'number'}
        value={sendAmount}
        onChange={(e) => handleEthSendValueChange(e.target.value)}
        className={classes.textInput}
        InputProps={{
          endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
        }}
      />
      <Typography
        color={'secondary'}
        variant={'caption'}
        className={classes.transactionFee}
      >
        Txn fee: {parseFloat(transactionFeeEstimate.toFixed(6))} ETH ${usdValue}
      </Typography>
      <PrimaryButton onClick={handleSend}>Send</PrimaryButton>
    </PageContainer>
  )
}

export default ContactSendValuePage
