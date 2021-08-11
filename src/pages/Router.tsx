import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import WelcomePage from './WelcomePage'
import TestPage from './TestPage'
import AddressBookPage from './Contacts/AddressBookPage'
import ContactAddPage from './Contacts/ContactAddPage'
import ContactEditPage from './Contacts/ContactEditPage'
import ContactSendValuePage from './Contacts/ContactSendValuePage'

export const routePaths = {
  welcome: '/',
  contacts: {
    list: '/contacts/list',
    new: '/contact/new',
    send: '/contact/send',
    edit: '/contacts/edit',
  },
}

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'}>
          <WelcomePage />
        </Route>
        <Route path={'/test'}>
          <TestPage />
        </Route>
        <Route exact path={routePaths.contacts.list}>
          <AddressBookPage />
        </Route>
        <Route exact path={routePaths.contacts.new}>
          <ContactAddPage />
        </Route>
        <Route path={routePaths.contacts.send + '/:id'}>
          <ContactSendValuePage />
        </Route>
        <Route path={routePaths.contacts.edit + '/:id'}>
          <ContactEditPage />
        </Route>
        <Route exact path={'*'}>
          <Redirect to={'/'} />
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRouter
