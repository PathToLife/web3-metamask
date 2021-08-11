import React from 'react'
import PageContainer from '../../components/layout/PageContainer'
import { PageHeader } from '../../components/layout/PageHeader'
import { useHistory } from 'react-router-dom'

const ContactAddPage: React.FC = () => {
  const history = useHistory()
  const handleBack = () => {
    history.goBack()
  }
  return (
    <PageContainer>
      <PageHeader onBack={handleBack} title={'New Contact'} />
    </PageContainer>
  )
}
export default ContactAddPage
