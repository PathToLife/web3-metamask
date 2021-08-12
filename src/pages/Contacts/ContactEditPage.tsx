import React, { useContext, useState } from 'react'
import PageContainer from '../../components/layout/PageContainer'
import { PageHeader } from '../../components/layout/PageHeader'
import { useHistory } from 'react-router'
import { routePaths } from '../Router'
import { StyledOutlinedButton } from '../../components/Buttons'
import AppContext from '../../context/AppContext'
import { useRouterContactLoader } from '../../hooks/useContacts'
import ContactForm from '../../components/ContactForm'
import { toast } from 'react-toastify'
import { useWeb3Loader } from '../../hooks/useWeb3Loader'

const ContactEditPage: React.FC = () => {
  useWeb3Loader(false, routePaths.contacts.list)

  const history = useHistory()
  const { contactsModule } = useContext(AppContext)
  const { contact: originalContact, index } = useRouterContactLoader()

  const [contact, setContact] = useState(originalContact)

  const handleBack = () => {
    if (index === undefined) return
    history.push(routePaths.contacts.send + '/' + index)
  }

  const handleEditSave = () => {
    if (!contact || index === undefined) return
    contactsModule.editContact(index, contact)
    toast.success('saved!')
    handleBack()
  }

  const handleDelete = () => {
    if (!contact) return
    contactsModule.deleteContact(contact)
    history.push(routePaths.contacts.list)
  }

  if (!contact) {
    history.push(routePaths.contacts.edit)
    return null
  }

  return (
    <PageContainer>
      <PageHeader onBack={handleBack} title={'Edit'} />
      <ContactForm
        contact={contact}
        onChange={setContact}
        onSubmit={handleEditSave}
      >
        <StyledOutlinedButton onClick={handleDelete}>
          Delete Contact
        </StyledOutlinedButton>
      </ContactForm>
    </PageContainer>
  )
}

export default ContactEditPage
