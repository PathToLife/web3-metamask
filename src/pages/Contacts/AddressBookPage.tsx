import PageContainer from '../../components/layout/PageContainer'
import { PageHeader } from '../../components/layout/PageHeader'
import React from 'react'
import { useHistory } from 'react-router'
import ContactsList from '../../components/ContactsList'
import { SecondaryButton } from '../../components/Buttons'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import LoadingPanel from '../../components/LoadingPanel'
import { useWeb3Loader } from '../../hooks/useWeb3Loader'
import { routePaths } from '../Router'

const AddressBookPage: React.FC = () => {
  const { isLoading } = useWeb3Loader(true)

  const history = useHistory()
  const { deactivate } = useWeb3React<Web3>()

  const handleBack = () => {
    history.push(routePaths.welcome)
  }

  const handleDeactivate = () => {
    deactivate()
    history.push(routePaths.welcome)
  }

  return (
    <PageContainer>
      <PageHeader onBack={handleBack} title={'Address Book'} />
      <LoadingPanel isLoading={isLoading}>
        <ContactsList />
        <SecondaryButton onClick={handleDeactivate}>Disconnect</SecondaryButton>
      </LoadingPanel>
    </PageContainer>
  )
}

export default AddressBookPage
