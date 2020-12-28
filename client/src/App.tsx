import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { Profile } from './pages/Profie'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
