import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import WelcomePage from './WelcomePage'
import TestPage from './TestPage'
import AddressBookPage from './Contacts/AddressBookPage'

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path={'/'} exact>
          <WelcomePage />
        </Route>
        <Route path={'/test'}>
          <TestPage />
        </Route>
        <Route path={'/list'}>
          <AddressBookPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRouter
