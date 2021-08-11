import React, { useContext, useState } from 'react'
import PageContainer from '../../components/layout/PageContainer'
import { PageHeader } from '../../components/layout/PageHeader'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { routePaths } from '../Router'
import AppContext, { IContact } from '../../context/AppContext'
import ContactForm from '../../components/ContactForm'
import { useWeb3Loader } from '../../hooks/useWeb3Loader'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
}))

const ContactAddPage: React.FC = () => {
  useWeb3Loader(false, routePaths.contacts.list)

  const history = useHistory()
  const classes = useStyles()
  const { contactsModule } = useContext(AppContext)

  const [contact, setContact] = useState<IContact>({
    name: '',
    ethAddress: '',
  })
  const [err, setErr] = useState('')

  const handleBack = () => {
    history.goBack()
  }

  const handleSubmit = () => {
    if (!contact || err !== '') return
    contactsModule.addContact(contact)
    history.push(routePaths.contacts.list)
  }

  return (
    <PageContainer>
      <PageHeader onBack={handleBack} title={'New Contact'} />
      <div className={classes.container}>
        <ContactForm
          err={err}
          setErr={setErr}
          contact={contact}
          onChange={(contact) => setContact(contact)}
          onSubmit={handleSubmit}
        />
      </div>
    </PageContainer>
  )
}
export default ContactAddPage
