import PageContainer from '../../components/layout/PageContainer'
import { PageHeader } from '../../components/layout/PageHeader'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import ContactsList from '../../components/ContactsList'
import { SecondaryButton } from '../../components/Buttons'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'

const AddressBookPage: React.FC = () => {
  const history = useHistory()
  const { active, deactivate } = useWeb3React<Web3>()

  // redirect to welcome page if not connected to web3
  useEffect(() => {
    if (!active) {
      history.push('/')
    }
  }, [active, history])

  const handleBack = () => {
    history.push('/')
  }

  const handleDeactivate = () => {
    deactivate()
  }

  return (
    <PageContainer>
      <PageHeader onBack={handleBack} title={'Address Book'} />
      <ContactsList />
      <SecondaryButton onClick={handleDeactivate}>Deactivate</SecondaryButton>
    </PageContainer>
  )
}

export default AddressBookPage
