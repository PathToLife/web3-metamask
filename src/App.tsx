import React from 'react'
import { WelcomePage } from './pages/WelcomePage'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AppPage } from './pages/AppPage'

export const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route path={'/'} exact>
          <WelcomePage />
        </Route>
        <Route path={'/app'}>
          <AppPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
