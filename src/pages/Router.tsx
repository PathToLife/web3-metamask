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

const root = process.env.PUBLIC_URL
export const routePaths = {
  welcome: root + '/',
  test: root + '/test',
  contacts: {
    list: root + '/contacts/list',
    new: root + '/contact/new',
    send: root + '/contact/send',
    edit: root + '/contacts/edit',
  },
}

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={root}>
          <WelcomePage />
        </Route>
        <Route path={routePaths.test}>
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
          <Redirect to={root} />
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRouter
