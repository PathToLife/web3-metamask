import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import AppPage from './pages/AppPage'
import AddressBookPage from './pages/Contacts/AddressBookPage'

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path={'/'} exact>
          <WelcomePage />
        </Route>
        <Route path={'/app'}>
          <AppPage />
        </Route>
        <Route path={'/list'}>
          <AddressBookPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRouter
